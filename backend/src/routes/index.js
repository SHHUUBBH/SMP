"use strict";

const express = require("express");

const authRoutes = require("./auth.routes");
const userRoutes = require("./user.routes");
const storeRoutes = require("./store.routes");
const orderRoutes = require("./order.routes");
const ticketRoutes = require("./ticket.routes");
const dashboardRoutes = require("./dashboard.routes");
const paymentRoutes = require("./payment.routes");
const settingsRoutes = require("./settings.routes");

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/store", storeRoutes);
router.use("/orders", orderRoutes);
router.use("/tickets", ticketRoutes);
router.use("/admin/dashboard", dashboardRoutes);
router.use("/payments", paymentRoutes);
router.use("/settings", settingsRoutes);

module.exports = router;