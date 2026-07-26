"use strict";

const PaymentProof = require("../models/PaymentProof");
const Order = require("../models/Order");
const AppError = require("../utils/AppError");

/*
|--------------------------------------------------------------------------
| User
|--------------------------------------------------------------------------
*/

async function submitProof(userId, orderId, data) {
  const order = await Order.findById(orderId);

  if (!order) {
    throw new AppError(
      404,
      "ORDER_NOT_FOUND",
      "Order not found."
    );
  }

  if (String(order.user) !== String(userId)) {
    throw new AppError(
      403,
      "FORBIDDEN",
      "You cannot submit proof for this order."
    );
  }

  const existing = await PaymentProof.findOne({
    order: orderId,
    status: {
      $in: ["submitted", "verified"],
    },
  });

  if (existing) {
    throw new AppError(
      409,
      "PAYMENT_ALREADY_SUBMITTED",
      "Payment proof has already been submitted."
    );
  }

  const payment = await PaymentProof.create({
    order: order._id,
    user: userId,

    amount: order.total,
    currency: order.currency,

    paymentMethod: data.paymentMethod,
    transactionId: data.transactionId,
    screenshot: data.screenshot,
    payerName: data.payerName,
    notes: data.notes,
  });

  order.paymentStatus = "submitted";
  await order.save();

  return payment.toPublicJSON();
}

async function getMyPayment(userId, orderId) {
  const payment = await PaymentProof.findOne({
    order: orderId,
    user: userId,
    })
    .populate("order")
    .populate("verifiedBy", "minecraftUsername");

  if (!payment) {
    throw new AppError(
      404,
      "PAYMENT_NOT_FOUND",
      "Payment proof not found."
    );
  }

  return payment.toPublicJSON();
}

/*
|--------------------------------------------------------------------------
| Admin
|--------------------------------------------------------------------------
*/

async function listPayments({
  page = 1,
  limit = 20,
  status,
}) {
  const filter = {};

  if (status) {
    filter.status = status;
  }

  const skip =
    (Number(page) - 1) * Number(limit);

  const [payments, total] =
    await Promise.all([
      PaymentProof.find(filter)
        .populate(
          "user",
          "minecraftUsername email"
        )
        .populate("order")
        .populate(
          "verifiedBy",
          "minecraftUsername"
        )
        .sort({
          createdAt: -1,
        })
        .skip(skip)
        .limit(Number(limit)),

      PaymentProof.countDocuments(filter),
    ]);

  return {
    items: payments.map((p) =>
      p.toPublicJSON()
    ),

    pagination: {
      page: Number(page),
      limit: Number(limit),
      total,
      pages: Math.ceil(
        total / Number(limit)
      ),
    },
  };
}

async function approvePayment(
  paymentId,
  adminId
) {
  const payment =
    await PaymentProof.findById(paymentId);

  if (!payment) {
    throw new AppError(
      404,
      "PAYMENT_NOT_FOUND",
      "Payment proof not found."
    );
  }

  if (payment.status === "verified") {
    throw new AppError(
      409,
      "PAYMENT_ALREADY_VERIFIED",
      "Payment has already been verified."
    );
  }

  payment.markVerified(adminId);
  await payment.save();

  const order = await Order.findById(
    payment.order
  );

  order.paymentStatus = "paid";
  await order.save();

  return payment.toPublicJSON();
}

async function rejectPayment(
  paymentId,
  adminId,
  reason
) {
  const payment =
    await PaymentProof.findById(paymentId);

  if (!payment) {
    throw new AppError(
      404,
      "PAYMENT_NOT_FOUND",
      "Payment proof not found."
    );
  }

  payment.markRejected(
    adminId,
    reason
  );

  await payment.save();

  const order = await Order.findById(
    payment.order
  );

  order.paymentStatus = "failed";
  await order.save();

  return payment.toPublicJSON();
}

module.exports = {
  submitProof,
  getMyPayment,

  listPayments,
  approvePayment,
  rejectPayment,
};