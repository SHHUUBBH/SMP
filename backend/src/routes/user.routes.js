"use strict";

const express = require("express");

const controller = require("../controllers/user.controller");

const { requireAuth } = require("../middleware/auth");
const { requireMinimumRole } = require("../middleware/authorize");
const { validate } = require("../middleware/validate");

const {
  updateProfileSchema,
  changePasswordSchema,
  changeEmailSchema,
} = require("../validation/user.validation");

const {
  changeRoleSchema,
  changeStatusSchema,
} = require("../validation/admin.validation");

const router = express.Router();

/*
|--------------------------------------------------------------------------
| Current User
|--------------------------------------------------------------------------
*/

router.get(
  "/me",
  requireAuth,
  controller.getMe
);

router.patch(
  "/me",
  requireAuth,
  validate(updateProfileSchema),
  controller.updateProfile
);

router.patch(
  "/password",
  requireAuth,
  validate(changePasswordSchema),
  controller.changePassword
);

router.patch(
  "/email",
  requireAuth,
  validate(changeEmailSchema),
  controller.changeEmail
);
router.delete(
  "/me",
  requireAuth,
  controller.deleteMyAccount
);

/*
|--------------------------------------------------------------------------
| Admin
|--------------------------------------------------------------------------
*/

router.get(
  "/",
  requireAuth,
  requireMinimumRole("admin"),
  controller.listUsers
);

router.get(
  "/:id",
  requireAuth,
  requireMinimumRole("admin"),
  controller.getUser
);

router.patch(
  "/:id",
  requireAuth,
  requireMinimumRole("admin"),
  controller.updateUser
);

router.patch(
  "/:id/role",
  requireAuth,
  requireMinimumRole("owner"),
  validate(changeRoleSchema),
  controller.changeRole
);

router.patch(
  "/:id/status",
  requireAuth,
  requireMinimumRole("admin"),
  validate(changeStatusSchema),
  controller.changeStatus
);

router.delete(
  "/:id",
  requireAuth,
  requireMinimumRole("owner"),
  controller.deleteUser
);

module.exports = router;