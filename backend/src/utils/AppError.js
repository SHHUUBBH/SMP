"use strict";

/**
 * Operational error carrying an HTTP status and a stable machine-readable code.
 * Anything thrown that is an AppError is safe to surface to the client verbatim.
 */
class AppError extends Error {
  constructor(status, code, message, details) {
    super(message || code || "Error");
    this.name = "AppError";
    this.status = status || 500;
    this.code = code || "INTERNAL";
    this.details = details;
    this.expose = true;
    Error.captureStackTrace?.(this, AppError);
  }
}

module.exports = AppError;
