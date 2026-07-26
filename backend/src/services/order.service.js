"use strict";

const Product = require("../models/Product");
const Order = require("../models/Order");
const User = require("../models/User");
const AppError = require("../utils/AppError");

/*
|--------------------------------------------------------------------------
| Orders
|--------------------------------------------------------------------------
*/

async function createOrder(userId, data) {
  const user = await User.findById(userId);

  if (!user) {
    throw new AppError(
      404,
      "USER_NOT_FOUND",
      "User not found."
    );
  }

  const items = [];
  let subtotal = 0;

  for (const requestItem of data.products) {
    const product = await Product.findById(requestItem.productId);

    if (!product || !product.active) {
      throw new AppError(
        404,
        "PRODUCT_NOT_FOUND",
        "One or more products no longer exist."
      );
    }

    if (!product.isInStock()) {
      throw new AppError(
        400,
        "OUT_OF_STOCK",
        `${product.name} is out of stock.`
      );
    }

    const price = product.effectivePrice;

    subtotal += price * requestItem.quantity;

    items.push({
      product: product._id,
      name: product.name,
      price,
      quantity: requestItem.quantity,
      commands: [...product.commands],
    });
  }

  const discount = 0;
  const total = subtotal - discount;

  const order = await Order.create({
    user: user._id,
    minecraftUsername: user.minecraftUsername,
    items,
    subtotal,
    discount,
    total,
    notes: data.notes || "",
  });

  return order.toPublicJSON();
}

/*
|--------------------------------------------------------------------------
| User Orders
|--------------------------------------------------------------------------
*/

async function getMyOrders(userId) {
  const orders = await Order.find({
    user: userId,
  })
    .sort({ createdAt: -1 });

  return orders.map((order) =>
    order.toPublicJSON()
  );
}

async function getOrder(userId, orderId) {
  const order = await Order.findOne({
    _id: orderId,
    user: userId,
  });

  if (!order) {
    throw new AppError(
      404,
      "ORDER_NOT_FOUND",
      "Order not found."
    );
  }

  return order.toPublicJSON();
}

/*
|--------------------------------------------------------------------------
| Admin
|--------------------------------------------------------------------------
*/

async function getAllOrders() {
  return Order.find()
    .populate("user")
    .sort({ createdAt: -1 });
}

async function updatePaymentStatus(
  orderId,
  paymentStatus
) {
  const order = await Order.findById(orderId);

  if (!order) {
    throw new AppError(
      404,
      "ORDER_NOT_FOUND",
      "Order not found."
    );
  }

  order.paymentStatus = paymentStatus;

  await order.save();

  return order.toPublicJSON();
}

async function updateFulfillmentStatus(
  orderId,
  fulfillmentStatus
) {
  const order = await Order.findById(orderId);

  if (!order) {
    throw new AppError(
      404,
      "ORDER_NOT_FOUND",
      "Order not found."
    );
  }

  order.fulfillmentStatus = fulfillmentStatus;

  if (
    fulfillmentStatus === "completed"
  ) {
    order.commandsExecuted = true;
    order.executedAt = new Date();
  }

  await order.save();

  return order.toPublicJSON();
}

module.exports = {
  createOrder,

  getMyOrders,
  getOrder,

  getAllOrders,

  updatePaymentStatus,
  updateFulfillmentStatus,
};