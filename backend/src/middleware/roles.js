"use strict";

const AppError = require("../utils/AppError");

const ROLES = ["player", "admin", "superadmin"];

/** Numeric rank of a role; unknown/missing roles rank below every real role. */
function rank(role) {
  const index = ROLES.indexOf(String(role || ""));
  return index === -1 ? -1 : index;
}

/** true only when the actor outranks the target strictly. Equal ranks may not manage each other. */
function canManage(actorRole, targetRole) {
  const actor = rank(actorRole);
  const target = rank(targetRole);
  if (actor === -1 || target === -1) return false;
  return actor > target;
}

/** Gate requiring at least `minRole`; superadmin passes every requireRole check. */
function requireRole(minRole) {
  const required = rank(minRole);
  if (required === -1) throw new Error(`[roles] unknown role: ${minRole}`);

  return function requireRoleMiddleware(req, _res, next) {
    if (!req.user) {
      return next(new AppError(401, "UNAUTHENTICATED", "Authentication required."));
    }
    if (rank(req.user.role) < required) {
      return next(new AppError(403, "FORBIDDEN", "You do not have permission to do that."));
    }
    return next();
  };
}

/** Gate requiring membership in an explicit set of roles (no inheritance). */
function requireExactRole(...roles) {
  const allowed = roles.flat().map(String);

  return function requireExactRoleMiddleware(req, _res, next) {
    if (!req.user) {
      return next(new AppError(401, "UNAUTHENTICATED", "Authentication required."));
    }
    if (!allowed.includes(String(req.user.role))) {
      return next(new AppError(403, "FORBIDDEN", "You do not have permission to do that."));
    }
    return next();
  };
}

module.exports = { ROLES, rank, requireRole, requireExactRole, canManage };
