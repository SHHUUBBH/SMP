"use strict";

const orderService = require("../services/order.service");

/*
|--------------------------------------------------------------------------
| User
|--------------------------------------------------------------------------
*/

async function createOrder(req, res, next) {
  try {
    const order = await orderService.createOrder(
      req.user._id,
      req.body
    );

    res.status(201).json({
      success: true,
      data: order,
    });
  } catch (err) {
    next(err);
  }
}

async function getMyOrders(req, res, next) {
  try {
    const orders = await orderService.getMyOrders(
      req.user._id
    );

    res.json({
      success: true,
      data: orders,
    });
  } catch (err) {
    next(err);
  }
}

async function getOrder(req, res, next) {
  try {
    const order = await orderService.getOrder(
      req.user._id,
      req.params.id
    );

    res.json({
      success: true,
      data: order,
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

async function getAllOrders(req, res, next) {
  try {
    const orders = await orderService.getAllOrders();

    res.json({
      success: true,
      data: orders,
    });
  } catch (err) {
    next(err);
  }
}

async function updatePaymentStatus(req, res, next) {
  try {
    const order =
      await orderService.updatePaymentStatus(
        req.params.id,
        req.body.paymentStatus
      );

    res.json({
      success: true,
      data: order,
    });
  } catch (err) {
    next(err);
  }
}

async function updateFulfillmentStatus(
  req,
  res,
  next
) {
  try {
    const order =
      await orderService.updateFulfillmentStatus(
        req.params.id,
        req.body.fulfillmentStatus
      );

    res.json({
      success: true,
      data: order,
    });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  // User
  createOrder,
  getMyOrders,
  getOrder,

  // Admin
  getAllOrders,
  updatePaymentStatus,
  updateFulfillmentStatus,
};