"use strict";

const mongoose = require("mongoose");
const config = require("../config/env");
const AppError = require("../utils/AppError");
const User = require("../models/User");
const { verifyAccessToken } = require("../services/token.service");

/** Cookie first (browsers), Bearer header second (curl, requests.http, tests). */
function readToken(req) {
  const fromCookie = req.cookies?.[config.cookie.accessName];
  if (typeof fromCookie === "string" && fromCookie.length) return fromCookie;

  const header = req.headers?.authorization;
  if (typeof header === "string" && /^bearer\s+/i.test(header)) {
    const token = header.replace(/^bearer\s+/i, "").trim();
    if (token) return token;
  }
  return null;
}

function decode(token) {
  try {
    const payload = verifyAccessToken(token);
    if (!payload || !payload.sub) {
      throw new AppError(401, "INVALID_TOKEN", "Invalid authentication token.");
    }
    return payload;
  } catch (err) {
    if (err instanceof AppError) throw err;
    if (err && err.name === "TokenExpiredError") {
      throw new AppError(401, "TOKEN_EXPIRED", "Your session has expired. Please sign in again.");
    }
    throw new AppError(401, "INVALID_TOKEN", "Invalid authentication token.");
  }
}

async function loadUser(payload) {
  if (!mongoose.isValidObjectId(payload.sub)) {
    throw new AppError(401, "INVALID_TOKEN", "Invalid authentication token.");
  }

  const user = await User.findById(payload.sub);
  if (!user) {
    throw new AppError(401, "UNAUTHENTICATED", "Your account no longer exists.");
  }
  if (user.status === "banned") {
    throw new AppError(403, "ACCOUNT_BANNED", user.banReason || "This account has been banned.");
  }
  // tokenVersion lets a password change / ban / logout-all kill live access tokens instantly.
  if (Number(payload.tv) !== Number(user.tokenVersion || 0)) {
    throw new AppError(401, "SESSION_REVOKED", "This session was revoked. Please sign in again.");
  }
  return user;
}

/** Hard gate: populates req.user or rejects with a 401/403. */
async function requireAuth(req, _res, next) {
  try {
    const token = readToken(req);
    if (!token) {
      throw new AppError(401, "UNAUTHENTICATED", "Authentication required.");
    }
    const payload = decode(token);
    req.user = await loadUser(payload);
    req.auth = payload;
    return next();
  } catch (err) {
    return next(err);
  }
}

/** Soft gate: sets req.user when a valid session is present, never fails the request. */
async function optionalAuth(req, _res, next) {
  try {
    const token = readToken(req);
    if (token) {
      const payload = verifyAccessToken(token);
      if (payload && payload.sub && mongoose.isValidObjectId(payload.sub)) {
        const user = await User.findById(payload.sub);
        if (user && user.status !== "banned" && Number(payload.tv) === Number(user.tokenVersion || 0)) {
          req.user = user;
          req.auth = payload;
        }
      }
    }
  } catch {
    // optionalAuth intentionally ignores every auth failure
  }
  return next();
}

module.exports = { requireAuth, optionalAuth };
