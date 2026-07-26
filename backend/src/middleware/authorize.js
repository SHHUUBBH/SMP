"use strict";

const AppError = require("../utils/AppError");

/*
|--------------------------------------------------------------------------
| Role Hierarchy
|--------------------------------------------------------------------------
*/

const ROLE_LEVELS = {
  user: 0,
  helper: 1,
  moderator: 2,
  admin: 3,
  owner: 4,
};

/*
|--------------------------------------------------------------------------
| Require Role
|--------------------------------------------------------------------------
*/

function requireRole(...roles) {
  return (req, res, next) => {
    if (!req.user) {
      return next(
        new AppError(
          401,
          "UNAUTHORIZED",
          "Authentication required."
        )
      );
    }

    if (!roles.includes(req.user.role)) {
      return next(
        new AppError(
          403,
          "FORBIDDEN",
          "You do not have permission to perform this action."
        )
      );
    }

    next();
  };
}

/*
|--------------------------------------------------------------------------
| Minimum Role
|--------------------------------------------------------------------------
*/

function requireMinimumRole(role) {
  return (req, res, next) => {
    if (!req.user) {
      return next(
        new AppError(
          401,
          "UNAUTHORIZED",
          "Authentication required."
        )
      );
    }

    const current =
      ROLE_LEVELS[req.user.role] ?? -1;

    const required =
      ROLE_LEVELS[role] ?? 999;

    if (current < required) {
      return next(
        new AppError(
          403,
          "FORBIDDEN",
          "Insufficient permissions."
        )
      );
    }

    next();
  };
}

/*
|--------------------------------------------------------------------------
| Owner Only
|--------------------------------------------------------------------------
*/

function requireOwner(req, res, next) {
  if (!req.user) {
    return next(
      new AppError(
        401,
        "UNAUTHORIZED",
        "Authentication required."
      )
    );
  }

  if (req.user.role !== "owner") {
    return next(
      new AppError(
        403,
        "OWNER_ONLY",
        "Only the server owner can perform this action."
      )
    );
  }

  next();
}

/*
|--------------------------------------------------------------------------
| Self or Staff
|--------------------------------------------------------------------------
*/

function requireSelfOrStaff(param = "id") {
  return (req, res, next) => {
    if (!req.user) {
      return next(
        new AppError(
          401,
          "UNAUTHORIZED",
          "Authentication required."
        )
      );
    }

    const isSelf =
      String(req.user._id) ===
      String(req.params[param]);

    const isStaff =
      ROLE_LEVELS[req.user.role] >=
      ROLE_LEVELS.moderator;

    if (!isSelf && !isStaff) {
      return next(
        new AppError(
          403,
          "FORBIDDEN",
          "You do not have permission."
        )
      );
    }

    next();
  };
}

module.exports = {
  requireRole,
  requireMinimumRole,
  requireOwner,
  requireSelfOrStaff,
};