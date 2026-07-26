"use strict";

const dashboardService = require("../services/dashboard.service");

async function getDashboard(req, res, next) {
  try {
    const dashboard = await dashboardService.getDashboard();

    res.json({
      success: true,
      data: dashboard,
    });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getDashboard,
};