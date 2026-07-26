"use strict";

const paymentService = require("../services/payment.service");

/*
|--------------------------------------------------------------------------
| User
|--------------------------------------------------------------------------
*/

async function submitProof(req, res, next) {
  try {
    const payment = await paymentService.submitProof(
      req.user._id,
      req.params.orderId,
      {
        paymentMethod: req.body.paymentMethod,
        transactionId: req.body.transactionId,
screenshot: req.file
  ? `/uploads/payment-proofs/${req.file.filename}`
  : null,        payerName: req.body.payerName,
        notes: req.body.notes,
      }
    );

    res.status(201).json({
      success: true,
      data: payment,
      message: "Payment proof submitted successfully.",
    });
  } catch (err) {
    next(err);
  }
}

async function getMyPayment(req, res, next) {
  try {
    const payment = await paymentService.getMyPayment(
      req.user._id,
      req.params.orderId
    );

    res.json({
      success: true,
      data: payment,
    });
  } catch (err) {
    next(err);
  }
}

/*
|--------------------------------------------------------------------------
| Admin
|--------------------------------------------------------------------------
*/

async function listPayments(req, res, next) {
  try {
    const payments = await paymentService.listPayments({
      page: req.query.page,
      limit: req.query.limit,
      status: req.query.status,
    });

    res.json({
      success: true,
      ...payments,
    });
  } catch (err) {
    next(err);
  }
}

async function approvePayment(req, res, next) {
  try {
    const payment = await paymentService.approvePayment(
      req.params.id,
      req.user._id
    );

    res.json({
      success: true,
      message: "Payment approved successfully.",
      data: payment,
    });
  } catch (err) {
    next(err);
  }
}

async function rejectPayment(req, res, next) {
  try {
    const payment = await paymentService.rejectPayment(
      req.params.id,
      req.user._id,
      req.body.reason
    );

    res.json({
      success: true,
      message: "Payment rejected successfully.",
      data: payment,
    });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  // User
  submitProof,
  getMyPayment,

  // Admin
  listPayments,
  approvePayment,
  rejectPayment,
};