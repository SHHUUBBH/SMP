"use strict";

const path = require("path");
const fs = require("fs");
const crypto = require("crypto");
const dotenv = require("dotenv");

const BACKEND_ROOT = path.resolve(__dirname, "..", "..");

// Test runs are hermetic: the developer's .env is ignored so the suite never depends on it.
// Detected from NODE_ENV, `npm test`, or the node:test runner itself.
const runningTests =
  process.env.NODE_ENV === "test" ||
  process.env.npm_lifecycle_event === "test" ||
  Boolean(process.env.NODE_TEST_CONTEXT);

if (runningTests) {
  process.env.NODE_ENV = "test";
  loadEnvFile(path.join(BACKEND_ROOT, ".env.test"));
} else {
  loadEnvFile(path.join(BACKEND_ROOT, ".env"));
}

// Real process env always wins - dotenv never overrides an already-set variable.
function loadEnvFile(file) {
  if (fs.existsSync(file)) dotenv.config({ path: file, quiet: true });
}

const nodeEnv = (process.env.NODE_ENV || "development").trim();
const isProd = nodeEnv === "production";
const isTest = nodeEnv === "test";

function str(key, fallback) {
  const raw = process.env[key];
  if (raw === undefined || raw === null) return fallback;
  const trimmed = String(raw).trim();
  return trimmed === "" ? fallback : trimmed;
}

function num(key, fallback) {
  const raw = str(key);
  if (raw === undefined) return fallback;
  const parsed = Number(raw);
  return Number.isFinite(parsed) ? parsed : fallback;
}

function bool(key, fallback) {
  const raw = str(key);
  if (raw === undefined) return fallback;
  return ["1", "true", "yes", "on"].includes(raw.toLowerCase());
}

function list(key, fallback) {
  const raw = str(key);
  if (raw === undefined) return fallback;
  return raw
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function requiredSecret(key) {
  const value = str(key);
  if (isProd && !value) {
    throw new Error(
      `[config] ${key} is required when NODE_ENV=production. Generate one with: ` +
        `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`
    );
  }
  return value;
}

let accessSecret = requiredSecret("JWT_ACCESS_SECRET");
let refreshSecret = requiredSecret("JWT_REFRESH_SECRET");

if (isProd && accessSecret === refreshSecret) {
  throw new Error("[config] JWT_ACCESS_SECRET and JWT_REFRESH_SECRET must be different values.");
}

if (!accessSecret || !refreshSecret) {
  accessSecret = accessSecret || crypto.randomBytes(32).toString("hex");
  refreshSecret = refreshSecret || crypto.randomBytes(32).toString("hex");
  console.warn(
    "[config] JWT secret(s) missing - generated ephemeral random secrets for this process. " +
      "Every restart invalidates all sessions. Set JWT_ACCESS_SECRET / JWT_REFRESH_SECRET in backend/.env."
  );
}

function deepFreeze(value) {
  if (value && typeof value === "object" && !Object.isFrozen(value)) {
    Object.freeze(value);
    for (const key of Object.keys(value)) deepFreeze(value[key]);
  }
  return value;
}

const config = deepFreeze({
  nodeEnv,
  isProd,
  isTest,
  port: num("PORT", 5000),
  mongoUri: str("MONGODB_URI", "mongodb://127.0.0.1:27017/alone_hometown"),
  useMemoryDb: bool("USE_MEMORY_DB", isTest),
  clientOrigins: list("CLIENT_ORIGINS", ["http://localhost:5173", "http://127.0.0.1:5173"]),
  jwt: {
    accessSecret,
    refreshSecret,
    accessTtl: str("ACCESS_TOKEN_TTL", "15m"),
    refreshTtlDays: num("REFRESH_TOKEN_DAYS", 30),
  },
  cookie: {
    accessName: str("COOKIE_ACCESS_NAME", "ah_access"),
    refreshName: str("COOKIE_REFRESH_NAME", "ah_refresh"),
    refreshPath: str("COOKIE_REFRESH_PATH", "/api/auth"),
    secure: bool("COOKIE_SECURE", isProd),
    sameSite: str("COOKIE_SAMESITE", isProd ? "none" : "lax"),
    domain: str("COOKIE_DOMAIN"),
  },
  mojang: {
    enabled: bool("MOJANG_ENABLED", !isTest),
    timeoutMs: num("MOJANG_TIMEOUT_MS", 5000),
    cacheTtlMs: num("MOJANG_CACHE_TTL_MS", 10 * 60 * 1000),
  },
  // Tests hash with cheap rounds so the suite stays fast; bcrypt hashes carry their own cost factor.
  bcryptRounds: isTest ? 4 : num("BCRYPT_ROUNDS", 12),
  superadmin: {
    username: str("SUPERADMIN_MC_USERNAME"),
    email: str("SUPERADMIN_EMAIL"),
    password: str("SUPERADMIN_PASSWORD"),
  },
});

module.exports = config;
