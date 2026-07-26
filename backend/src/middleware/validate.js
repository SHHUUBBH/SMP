"use strict";

const AppError = require("../utils/AppError");

/**
 * Express 5 defines `req.query` as a getter-only accessor, so a plain assignment throws.
 * Fall back to redefining the property on the request instance.
 */
function assign(req, source, value) {
  try {
    req[source] = value;
    if (req[source] === value) return;
  } catch {
    // fall through to defineProperty
  }
  Object.defineProperty(req, source, {
    value,
    writable: true,
    enumerable: true,
    configurable: true,
  });
}

function flattenIssues(issues) {
  const fieldErrors = {};
  const formErrors = [];
  for (const issue of issues || []) {
    const path = (issue.path || []).map(String).join(".");
    if (!path) {
      formErrors.push(issue.message);
      continue;
    }
    if (!fieldErrors[path]) fieldErrors[path] = [];
    fieldErrors[path].push(issue.message);
  }
  return { fieldErrors, formErrors };
}

/**
 * Validates req[source] against a zod schema. On success req[source] becomes the parsed
 * (coerced, defaulted, stripped) data; on failure a 422 VALIDATION_ERROR is forwarded.
 */
function validate(schema, source = "body") {
  return function validateMiddleware(req, _res, next) {
    const input = req[source] === undefined ? {} : req[source];
    const result = schema.safeParse(input);

    if (!result.success) {
      const { fieldErrors, formErrors } = flattenIssues(result.error?.issues);
      const details = { fieldErrors };
      if (formErrors.length) details.formErrors = formErrors;
      return next(new AppError(422, "VALIDATION_ERROR", "Some fields are invalid.", details));
    }

    assign(req, source, result.data);
    return next();
  };
}

module.exports = { validate };
