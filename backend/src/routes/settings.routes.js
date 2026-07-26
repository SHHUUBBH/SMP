"use strict";

const express = require("express");

const controller = require("../controllers/settings.controller");

const { requireAuth } = require("../middleware/auth");
const { requireMinimumRole } = require("../middleware/authorize");
const { validate } = require("../middleware/validate");

const {
  updateSettingsSchema,
} = require("../validation/settings.validation");

const router = express.Router();

/*
|--------------------------------------------------------------------------
| Public
|--------------------------------------------------------------------------
*/

router.get(
  "/",
  controller.getPublicSettings
);

/*
|--------------------------------------------------------------------------
| Admin
|--------------------------------------------------------------------------
*/

router.get(
  "/admin",
  requireAuth,
  requireMinimumRole("admin"),
  controller.getSettings
);

router.patch(
  "/",
  requireAuth,
  requireMinimumRole("admin"),
  validate(updateSettingsSchema),
  controller.updateSettings
);

router.post(
  "/reset",
  requireAuth,
  requireMinimumRole("owner"),
  controller.resetSettings
);

module.exports = router;