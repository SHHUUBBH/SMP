"use strict";

const crypto = require("crypto");
const config = require("../config/env");
const AppError = require("../utils/AppError");

const PROFILE_BY_NAME = "https://api.mojang.com/users/profiles/minecraft/";
const PROFILE_BY_UUID = "https://sessionserver.mojang.com/session/minecraft/profile/";

const NAME_RE = /^[A-Za-z0-9_]{1,16}$/;
const PLAIN_UUID_RE = /^[0-9a-f]{32}$/;

// Negative results are cached briefly so a typo storm cannot hammer Mojang,
// but a freshly created account still becomes visible quickly.
const NEGATIVE_TTL_MS = 60 * 1000;

/** key -> { value, expiresAt } */
const cache = new Map();

function cacheGet(key) {
  const hit = cache.get(key);
  if (!hit) return undefined;
  if (hit.expiresAt <= Date.now()) {
    cache.delete(key);
    return undefined;
  }
  return hit.value;
}

function cacheSet(key, value) {
  const ttl = value === null ? NEGATIVE_TTL_MS : config.mojang.cacheTtlMs;
  cache.set(key, { value, expiresAt: Date.now() + ttl });
}

function clearCache() {
  cache.clear();
}

/** Any UUID shape -> 32 lowercase hex chars, or null when it is not a UUID. */
function toPlainUuid(id) {
  if (typeof id !== "string") return null;
  const plain = id.trim().toLowerCase().replace(/-/g, "");
  return PLAIN_UUID_RE.test(plain) ? plain : null;
}

/** Any UUID shape -> 8-4-4-4-12 lowercase, or null when it is not a UUID. */
function toDashedUuid(id) {
  const plain = toPlainUuid(id);
  if (!plain) return null;
  return [
    plain.slice(0, 8),
    plain.slice(8, 12),
    plain.slice(12, 16),
    plain.slice(16, 20),
    plain.slice(20),
  ].join("-");
}

/**
 * Vanilla offline-mode identity: UUID v3 (MD5) over the UTF-8 bytes of
 * "OfflinePlayer:<name>" - byte-for-byte what Java's UUID.nameUUIDFromBytes does.
 * "Notch" -> b50ad385-829d-3141-a216-7e7d7539ba7f
 */
function offlineUuid(name) {
  const md5 = crypto.createHash("md5").update(`OfflinePlayer:${name}`, "utf8").digest();
  md5[6] = (md5[6] & 0x0f) | 0x30; // version 3
  md5[8] = (md5[8] & 0x3f) | 0x80; // RFC 4122 variant
  return md5.toString("hex");
}

function isValidName(name) {
  return typeof name === "string" && NAME_RE.test(name.trim());
}

/** Remembers name <-> uuid both ways so offline reverse lookups can answer from cache. */
function rememberProfile(profile) {
  cacheSet(`name:${profile.name.toLowerCase()}`, profile);
  cacheSet(`uuid:${profile.uuid}`, profile);
  return profile;
}

async function mojangFetch(url) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), config.mojang.timeoutMs);
  try {
    return await fetch(url, {
      signal: controller.signal,
      headers: { accept: "application/json" },
    });
  } catch (err) {
    const timedOut = err.name === "AbortError";
    throw new AppError(
      503,
      "MOJANG_UNAVAILABLE",
      timedOut
        ? "Minecraft account service timed out. Please try again in a moment."
        : "Minecraft account service is unreachable. Please try again in a moment.",
      { reason: timedOut ? "timeout" : err.message }
    );
  } finally {
    clearTimeout(timer);
  }
}

/**
 * Shared status handling: returns the parsed profile, or null for "no such profile".
 * Never returns a non-AppError failure - a Mojang outage must surface as 503, not 500.
 */
async function readProfile(res) {
  if (res.status === 429) {
    throw new AppError(
      503,
      "MOJANG_RATE_LIMITED",
      "Minecraft account service is rate limiting us. Please try again in a minute."
    );
  }
  // 204 (legacy) / 404 (current) / 400 (malformed name) all mean "no such profile".
  if (res.status === 204 || res.status === 404 || res.status === 400) return null;
  if (!res.ok) {
    throw new AppError(
      503,
      "MOJANG_UNAVAILABLE",
      "Minecraft account service returned an error. Please try again in a moment.",
      { status: res.status }
    );
  }

  let body;
  try {
    body = await res.json();
  } catch {
    throw new AppError(
      503,
      "MOJANG_UNAVAILABLE",
      "Minecraft account service returned an unreadable response."
    );
  }

  if (!body || typeof body !== "object" || body.errorMessage) return null;
  const uuid = toPlainUuid(body.id);
  if (!uuid || typeof body.name !== "string") return null;
  return { uuid, name: body.name };
}

/**
 * Username -> { uuid (dashless lowercase), name (canonical casing) } or null when unknown.
 * With config.mojang.enabled === false this resolves offline (no network).
 */
async function resolveUsername(name) {
  if (!isValidName(name)) return null;
  const trimmed = name.trim();
  const key = `name:${trimmed.toLowerCase()}`;

  const cached = cacheGet(key);
  if (cached !== undefined) return cached;

  if (!config.mojang.enabled) {
    return rememberProfile({ uuid: offlineUuid(trimmed), name: trimmed });
  }

  const res = await mojangFetch(PROFILE_BY_NAME + encodeURIComponent(trimmed));
  const profile = await readProfile(res);
  if (!profile) {
    cacheSet(key, null);
    return null;
  }
  return rememberProfile(profile);
}

/**
 * UUID -> { uuid, name } or null when unknown.
 * Offline mode cannot invert the hash, so it answers from the cache when the name has
 * been seen this process and otherwise returns { uuid, name: null } - callers must
 * treat a null name as "unchanged" rather than overwriting a stored username.
 */
async function resolveUuid(uuid) {
  const plain = toPlainUuid(uuid);
  if (!plain) return null;
  const key = `uuid:${plain}`;

  const cached = cacheGet(key);
  if (cached !== undefined) return cached;

  if (!config.mojang.enabled) return { uuid: plain, name: null };

  const res = await mojangFetch(PROFILE_BY_UUID + plain);
  const profile = await readProfile(res);
  if (!profile) {
    cacheSet(key, null);
    return null;
  }
  return rememberProfile(profile);
}

module.exports = { resolveUsername, resolveUuid, toPlainUuid, toDashedUuid, clearCache };
