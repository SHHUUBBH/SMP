"use strict";

const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const config = require("../config/env");
const AppError = require("../utils/AppError");
const User = require("../models/User");
const RefreshToken = require("../models/RefreshToken");
const audit = require("./audit.service");

const DAY_MS = 24 * 60 * 60 * 1000;

/** Opaque refresh tokens are stored only as a sha256 digest - a DB dump grants nobody a session. */
function hashToken(token) {
  return crypto.createHash("sha256").update(String(token), "utf8").digest("hex");
}

function newFamily() {
  return crypto.randomBytes(16).toString("hex");
}

function clientIp(req) {
  if (!req) return undefined;
  const forwarded = req.headers?.["x-forwarded-for"];
  if (typeof forwarded === "string" && forwarded.length) return forwarded.split(",")[0].trim();
  return req.ip || req.socket?.remoteAddress || undefined;
}

function userAgentOf(req) {
  const ua = req?.headers?.["user-agent"];
  return typeof ua === "string" ? ua.slice(0, 255) : undefined;
}

function idOf(value) {
  if (!value) return value;
  return typeof value === "object" && value._id ? value._id : value;
}

function signAccessToken(user) {
  if (!user || !user._id) throw new AppError(500, "INTERNAL", "Cannot sign a token without a user.");
  return jwt.sign(
    { sub: String(user._id), role: user.role, tv: user.tokenVersion || 0 },
    config.jwt.accessSecret,
    { algorithm: "HS256", expiresIn: config.jwt.accessTtl }
  );
}

/**
 * Throws AppError(401, TOKEN_EXPIRED | INVALID_TOKEN). The original jsonwebtoken error is
 * kept on `err.cause` and `err.expired` flags an expiry so callers can branch without it.
 */
function verifyAccessToken(token) {
  try {
    return jwt.verify(String(token || ""), config.jwt.accessSecret, { algorithms: ["HS256"] });
  } catch (err) {
    const expired = err.name === "TokenExpiredError";
    const wrapped = new AppError(
      401,
      expired ? "TOKEN_EXPIRED" : "INVALID_TOKEN",
      expired ? "Your session has expired. Please sign in again." : "Invalid authentication token."
    );
    wrapped.expired = expired;
    wrapped.cause = err;
    throw wrapped;
  }
}

/** Mints and persists a refresh token. Returns the PLAINTEXT token exactly once. */
async function issueRefreshToken({ userId, family, req } = {}) {
  const user = idOf(userId);
  if (!user) throw new AppError(500, "INTERNAL", "Cannot issue a refresh token without a user.");

  const token = crypto.randomBytes(48).toString("base64url");
  const expiresAt = new Date(Date.now() + config.jwt.refreshTtlDays * DAY_MS);
  const tokenFamily = family || newFamily();

  await RefreshToken.create({
    user,
    tokenHash: hashToken(token),
    family: tokenFamily,
    expiresAt,
    userAgent: userAgentOf(req),
    ip: clientIp(req),
  });

  return { token, expiresAt, family: tokenFamily };
}

/**
 * A revoked token being presented again means it leaked (or a client is replaying):
 * burn the entire family, bump tokenVersion to kill live access tokens, and audit it.
 */
async function handleReuse(stolen, req) {
  await RefreshToken.updateMany(
    { family: stolen.family, revokedAt: null },
    { $set: { revokedAt: new Date() } }
  );
  await User.updateOne({ _id: stolen.user }, { $inc: { tokenVersion: 1 } });
  await audit.record({
    actor: null,
    action: "auth.token_reuse",
    targetUser: stolen.user,
    meta: { family: stolen.family, revokedAt: stolen.revokedAt, ip: clientIp(req) },
    req,
  });
  throw new AppError(401, "TOKEN_REUSE", "Session revoked for security. Please sign in again.");
}

/**
 * Rotates a refresh token.
 *
 * Race safety: the presented token is claimed with a SINGLE atomic findOneAndUpdate that
 * filters on `revokedAt: null`. Mongo guarantees exactly one concurrent caller wins the
 * document; every other caller falls into the miss branch, sees the row already revoked and
 * is treated as reuse. Two parallel refreshes with the same token can never both succeed.
 */
async function rotateRefreshToken({ token, req } = {}) {
  if (!token) throw new AppError(401, "INVALID_REFRESH_TOKEN", "No refresh token was provided.");

  const tokenHash = hashToken(token);
  const now = new Date();

  const claimed = await RefreshToken.findOneAndUpdate(
    { tokenHash, revokedAt: null, expiresAt: { $gt: now } },
    { $set: { revokedAt: now } },
    { new: false }
  );

  if (!claimed) {
    const existing = await RefreshToken.findOne({ tokenHash }).lean();
    if (!existing) {
      throw new AppError(401, "INVALID_REFRESH_TOKEN", "This session is no longer valid. Please sign in again.");
    }
    if (existing.revokedAt) await handleReuse(existing, req);
    throw new AppError(401, "REFRESH_TOKEN_EXPIRED", "Your session has expired. Please sign in again.");
  }

  const user = await User.findById(claimed.user);
  if (!user) {
    throw new AppError(401, "INVALID_REFRESH_TOKEN", "This session is no longer valid. Please sign in again.");
  }
  if (user.status === "banned") {
    await revokeAllForUser(user._id);
    throw new AppError(403, "ACCOUNT_BANNED", "This account has been banned.", {
      reason: user.banReason || undefined,
    });
  }

  const next = await issueRefreshToken({ userId: user._id, family: claimed.family, req });
  await RefreshToken.updateOne(
    { _id: claimed._id },
    { $set: { replacedByHash: hashToken(next.token) } }
  );

  return {
    user,
    accessToken: signAccessToken(user),
    refreshToken: next.token,
    refreshExpiresAt: next.expiresAt,
    family: claimed.family,
  };
}

/** Idempotent single-session revoke (logout). Returns true when this call did the revoking. */
async function revokeRefreshToken(token) {
  if (!token) return false;
  const revoked = await RefreshToken.findOneAndUpdate(
    { tokenHash: hashToken(token), revokedAt: null },
    { $set: { revokedAt: new Date() } },
    { new: false }
  );
  return Boolean(revoked);
}

/**
 * Revokes every live session for a user. `exceptHash` keeps one session alive, which is what
 * a password change needs (kill other devices, keep the current one signed in).
 * Returns the number of sessions revoked.
 */
async function revokeAllForUser(userId, { exceptHash } = {}) {
  const user = idOf(userId);
  if (!user) return 0;
  const filter = { user, revokedAt: null };
  if (exceptHash) filter.tokenHash = { $ne: exceptHash };
  const result = await RefreshToken.updateMany(filter, { $set: { revokedAt: new Date() } });
  return result.modifiedCount || 0;
}

module.exports = {
  signAccessToken,
  verifyAccessToken,
  issueRefreshToken,
  rotateRefreshToken,
  revokeRefreshToken,
  revokeAllForUser,
  hashToken,
};
