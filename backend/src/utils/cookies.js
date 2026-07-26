"use strict";

const config = require("../config/env");

const DURATION = { s: 1000, m: 60 * 1000, h: 60 * 60 * 1000, d: 24 * 60 * 60 * 1000 };

/** "15m" | "900s" | "1h" | "7d" | "900" (seconds) -> milliseconds. */
function ttlToMs(ttl, fallbackMs) {
  if (typeof ttl === "number" && Number.isFinite(ttl)) return ttl * 1000;
  const match = /^(\d+)\s*([smhd])?$/i.exec(String(ttl || "").trim());
  if (!match) return fallbackMs;
  const unit = (match[2] || "s").toLowerCase();
  return Number(match[1]) * DURATION[unit];
}

function baseOptions() {
  const options = {
    httpOnly: true,
    secure: config.cookie.secure,
    sameSite: config.cookie.sameSite,
  };
  if (config.cookie.domain) options.domain = config.cookie.domain;
  return options;
}

function accessOptions() {
  return { ...baseOptions(), path: "/" };
}

function refreshOptions() {
  return { ...baseOptions(), path: config.cookie.refreshPath };
}

function setAuthCookies(res, { accessToken, refreshToken, refreshExpiresAt } = {}) {
  if (accessToken) {
    res.cookie(config.cookie.accessName, accessToken, {
      ...accessOptions(),
      maxAge: ttlToMs(config.jwt.accessTtl, 15 * DURATION.m),
    });
  }
  if (refreshToken) {
    const expires = refreshExpiresAt
      ? new Date(refreshExpiresAt)
      : new Date(Date.now() + config.jwt.refreshTtlDays * DURATION.d);
    res.cookie(config.cookie.refreshName, refreshToken, { ...refreshOptions(), expires });
  }
  return res;
}

function clearAuthCookies(res) {
  res.clearCookie(config.cookie.accessName, accessOptions());
  res.clearCookie(config.cookie.refreshName, refreshOptions());
  return res;
}

module.exports = { setAuthCookies, clearAuthCookies };
