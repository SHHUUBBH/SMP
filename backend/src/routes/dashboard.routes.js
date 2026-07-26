"use strict";

const express = require("express");

const controller = require("../controllers/dashboard.controller");

const { requireAuth } = require("../middleware/auth");
const { requireMinimumRole } = require("../middleware/authorize");

const router = express.Router();

/*
|--------------------------------------------------------------------------
| Admin Dashboard
|--------------------------------------------------------------------------
*/

router.get(
  "/",
  requireAuth,
  requireMinimumRole("admin"),
  controller.getDashboard
);

module.exports = router;