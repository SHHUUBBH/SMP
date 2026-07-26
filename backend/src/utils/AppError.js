"use strict";

/**
 * Standard application error.
 *
 * Every operational error in the API should throw AppError so the global
 * error handler can return a consistent response.
 */
class AppError extends Error {
  /**
   * @param {number} status HTTP status code
   * @param {string} code Machine-readable error code
   * @param {string} message Human-readable message
   * @param {object} [details] Optional extra error details
   */
  constructor(status, code, message, details) {
    super(message);

    Error.captureStackTrace?.(this, this.constructor);

    this.name = "AppError";
    this.status = Number(status) || 500;
    this.code = code || "INTERNAL";
    this.details = details;
    this.expose = this.status < 500;
  }

  toJSON() {
    const error = {
      code: this.code,
      message: this.message,
    };

    if (this.details !== undefined) {
      error.details = this.details;
    }

    return { error };
  }
}

module.exports = AppError;