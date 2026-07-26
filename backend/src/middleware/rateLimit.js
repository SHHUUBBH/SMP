"use strict";

const rateLimit = require("express-rate-limit");
const config = require("../config/env");
const AppError = require("../utils/AppError");

const MINUTE = 60 * 1000;

function passThrough(_req, _res, next) {
  next();
}

/**
 * Rate limiters funnel their rejection through next() so clients always see the
 * standard { error: { code, message } } envelope instead of express-rate-limit's text body.
 */
function make({ windowMs, limit, message }) {
  if (config.isTest) return passThrough;

  return rateLimit({
    windowMs,
    limit,
    standardHeaders: "draft-7",
    legacyHeaders: false,
    handler(_req, _res, next) {
      next(new AppError(429, "RATE_LIMITED", message));
    },
  });
}

const loginLimiter = make({
  windowMs: 15 * MINUTE,
  limit: 10,
  message: "Too many sign-in attempts. Try again in a few minutes.",
});

const registerLimiter = make({
  windowMs: 60 * MINUTE,
  limit: 5,
  message: "Too many accounts created from this address. Try again later.",
});

const refreshLimiter = make({
  windowMs: 15 * MINUTE,
  limit: 60,
  message: "Too many session refreshes. Slow down and try again shortly.",
});

const apiLimiter = make({
  windowMs: 15 * MINUTE,
  limit: 300,
  message: "Too many requests. Slow down and try again shortly.",
});

module.exports = { loginLimiter, registerLimiter, refreshLimiter, apiLimiter };
