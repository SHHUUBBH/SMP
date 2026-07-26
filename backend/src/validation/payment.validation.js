"use strict";

const { z } = require("zod");

const objectId = z.object({
  id: z
    .string()
    .regex(/^[0-9a-fA-F]{24}$/, "Invalid ID."),
});

const orderIdSchema = z.object({
  orderId: z
    .string()
    .regex(/^[0-9a-fA-F]{24}$/, "Invalid order ID."),
});

const submitPaymentProofSchema = z.object({
  paymentMethod: z.enum([
    "upi",
    "bank_transfer",
    "other",
  ]),

  transactionId: z
    .string()
    .trim()
    .min(3)
    .max(100),

  screenshot: z
    .string()
    .trim()
    .min(1)
    .max(500),

  payerName: z
    .string()
    .trim()
    .max(100)
    .optional()
    .default(""),

  notes: z
    .string()
    .trim()
    .max(500)
    .optional()
    .default(""),
});

const approvePaymentSchema = z.object({});

const rejectPaymentSchema = z.object({
  reason: z
    .string()
    .trim()
    .min(3)
    .max(500),
});

module.exports = {
  objectId,
  orderIdSchema,
  submitPaymentProofSchema,
  approvePaymentSchema,
  rejectPaymentSchema,
};