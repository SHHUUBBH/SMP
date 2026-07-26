"use strict";

const express = require("express");

const controller = require("../controllers/payment.controller");

const { requireAuth } = require("../middleware/auth");
const { requireMinimumRole } = require("../middleware/authorize");
const { validate } = require("../middleware/validate");

const {
  submitPaymentProofSchema,
  rejectPaymentSchema,
} = require("../validation/payment.validation");

const router = express.Router();
const upload = require("../middleware/upload");

/*
|--------------------------------------------------------------------------
| User
|--------------------------------------------------------------------------
*/

router.post(
  "/:orderId/proof",
  requireAuth,
  upload.single("screenshot"),
  controller.submitProof
);

router.get(
  "/:orderId",
  requireAuth,
  controller.getMyPayment
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
  controller.listPayments
);

router.patch(
  "/:id/approve",
  requireAuth,
  requireMinimumRole("admin"),
  controller.approvePayment
);

router.patch(
  "/:id/reject",
  requireAuth,
  requireMinimumRole("admin"),
  validate(rejectPaymentSchema),
  controller.rejectPayment
);

module.exports = router;