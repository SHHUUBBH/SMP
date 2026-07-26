"use strict";

const config = require("../config/env");
const AppError = require("../utils/AppError");

/** Terminal 404 handler: mounted after every route. */
function notFound(req, _res, next) {
  next(new AppError(404, "NOT_FOUND", `Route ${req.method} ${req.originalUrl} not found.`));
}

function isAppError(err) {
  return err instanceof AppError || (err && err.expose === true && typeof err.code === "string");
}

function fromMongooseValidation(err) {
  const fieldErrors = {};
  for (const [path, detail] of Object.entries(err.errors || {})) {
    fieldErrors[path] = [detail.message];
  }
  return new AppError(422, "VALIDATION_ERROR", "Some fields are invalid.", { fieldErrors });
}

function fromDuplicateKey(err) {
  const field = Object.keys(err.keyPattern || err.keyValue || {})[0] || "field";
  return new AppError(409, "DUPLICATE", `That ${field} is already in use.`, { field });
}

function normalize(err) {
  if (isAppError(err)) return err;

  if (err && err.name === "ValidationError" && err.errors) return fromMongooseValidation(err);
  if (err && (err.code === 11000 || err.code === 11001)) return fromDuplicateKey(err);
  if (err && err.name === "CastError") {
    return new AppError(400, "INVALID_ID", "That identifier is not valid.", { field: err.path });
  }
  if (err && err.name === "TokenExpiredError") {
    return new AppError(401, "TOKEN_EXPIRED", "Your session has expired. Please sign in again.");
  }
  if (err && (err.name === "JsonWebTokenError" || err.name === "NotBeforeError")) {
    return new AppError(401, "INVALID_TOKEN", "Invalid authentication token.");
  }
  if (err && err.type === "entity.parse.failed") {
    return new AppError(400, "VALIDATION_ERROR", "Request body is not valid JSON.");
  }

  return null;
}

/**
 * Single error envelope for the whole API: { error: { code, message, details? } }.
 * Arity MUST stay 4 or Express will treat this as a normal middleware.
 */
function errorHandler(err, req, res, next) {
  if (res.headersSent) return next(err);

  const known = normalize(err);

  if (!known) {
    console.error(`[error] ${req.method} ${req.originalUrl}`, err && err.stack ? err.stack : err);
    const body = { error: { code: "INTERNAL", message: "Something went wrong on our end." } };
    if (!config.isProd && err) body.error.details = { reason: String(err.message || err) };
    return res.status(500).json(body);
  }

  if (!config.isTest && known.status >= 500) {
    console.error(`[error] ${req.method} ${req.originalUrl}`, err && err.stack ? err.stack : err);
  }

  const payload = { code: known.code, message: known.message };
  if (known.details !== undefined) payload.details = known.details;
  return res.status(known.status || 500).json({ error: payload });
}

module.exports = { notFound, errorHandler };
