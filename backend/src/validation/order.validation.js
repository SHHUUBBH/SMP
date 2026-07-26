"use strict";

const { z } = require("zod");

/*
|--------------------------------------------------------------------------
| Common
|--------------------------------------------------------------------------
*/

const objectId = z
  .string()
  .trim()
  .regex(/^[a-f\d]{24}$/i, "Invalid MongoDB ObjectId.");

/*
|--------------------------------------------------------------------------
| Create Order
|--------------------------------------------------------------------------
*/

const createOrderSchema = z.object({
  products: z
    .array(
      z.object({
        productId: objectId,

        quantity: z
          .number({
            required_error: "Quantity is required.",
            invalid_type_error: "Quantity must be a number.",
          })
          .int()
          .min(1, "Quantity must be at least 1."),
      })
    )
    .min(1, "At least one product is required."),

  couponCode: z
    .string()
    .trim()
    .max(50)
    .optional(),

  notes: z
    .string()
    .trim()
    .max(500)
    .optional(),
});

/*
|--------------------------------------------------------------------------
| Order ID
|--------------------------------------------------------------------------
*/

const orderIdSchema = z.object({
  id: objectId,
});

/*
|--------------------------------------------------------------------------
| Verify Payment
|--------------------------------------------------------------------------
*/

const verifyPaymentSchema = z.object({
  orderId: objectId,

  paymentId: z
    .string()
    .trim()
    .min(1, "Payment ID is required."),

  provider: z
    .string()
    .trim()
    .optional(),
});

/*
|--------------------------------------------------------------------------
| Cancel Order
|--------------------------------------------------------------------------
*/

const cancelOrderSchema = z.object({
  reason: z
    .string()
    .trim()
    .max(500)
    .optional(),
});

/*
|--------------------------------------------------------------------------
| Update Payment Status
|--------------------------------------------------------------------------
*/

const updatePaymentStatusSchema = z.object({
  paymentStatus: z.enum([
    "pending",
    "paid",
    "failed",
    "cancelled",
    "refunded",
  ]),
});

/*
|--------------------------------------------------------------------------
| Update Fulfillment Status
|--------------------------------------------------------------------------
*/

const updateFulfillmentStatusSchema = z.object({
  fulfillmentStatus: z.enum([
    "pending",
    "processing",
    "completed",
    "failed",
  ]),
});

module.exports = {
  createOrderSchema,
  orderIdSchema,
  verifyPaymentSchema,
  cancelOrderSchema,
  updatePaymentStatusSchema,
  updateFulfillmentStatusSchema,
};