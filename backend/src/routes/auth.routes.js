"use strict";

const express = require("express");

const controller = require("../controllers/auth.controller");
const { requireAuth } = require("../middleware/auth");
const { validate } = require("../middleware/validate");

const {
  registerSchema,
  loginSchema,
} = require("../validation/auth.validation");

const router = express.Router();

router.post(
  "/register",
  validate(registerSchema),
  controller.register
);

router.post(
  "/login",
  validate(loginSchema),
  controller.login
);

router.post(
  "/refresh",
  controller.refresh
);

router.post(
  "/logout",
  requireAuth,
  controller.logout
);

router.post(
  "/logout-all",
  requireAuth,
  controller.logoutAll
);

router.get(
  "/me",
  requireAuth,
  controller.me
);

module.exports = router;