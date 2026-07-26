"use strict";

const express = require("express");

const controller = require("../controllers/order.controller");

const { requireAuth } = require("../middleware/auth");
const { requireMinimumRole } = require("../middleware/authorize");
const { validate } = require("../middleware/validate");

const {
  createOrderSchema,
  updatePaymentStatusSchema,
  updateFulfillmentStatusSchema,
} = require("../validation/order.validation");

const router = express.Router();

/*
|--------------------------------------------------------------------------
| User Routes
|--------------------------------------------------------------------------
*/

router.post(
  "/",
  requireAuth,
  validate(createOrderSchema),
  controller.createOrder
);

router.get(
  "/",
  requireAuth,
  controller.getMyOrders
);

router.get(
  "/:id",
  requireAuth,
  controller.getOrder
);

/*
|--------------------------------------------------------------------------
| Admin Routes
|--------------------------------------------------------------------------
*/

router.get(
  "/admin",
  requireAuth,
  requireMinimumRole("admin"),
  controller.getAllOrders
);

router.patch(
  "/:id/payment",
  requireAuth,
  requireMinimumRole("admin"),
  validate(updatePaymentStatusSchema),
  controller.updatePaymentStatus
);

router.patch(
  "/:id/fulfillment",
  requireAuth,
  requireMinimumRole("admin"),
  validate(updateFulfillmentStatusSchema),
  controller.updateFulfillmentStatus
);
module.exports = router;