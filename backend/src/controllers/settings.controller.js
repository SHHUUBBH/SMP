"use strict";

const settingsService = require("../services/settings.service");

/*
|--------------------------------------------------------------------------
| Public
|--------------------------------------------------------------------------
*/

async function getPublicSettings(req, res, next) {
  try {
    const settings = await settingsService.getPublicSettings();

    res.json({
      success: true,
      data: settings,
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

async function getSettings(req, res, next) {
  try {
    const settings = await settingsService.getSettings();

    res.json({
      success: true,
      data: settings,
    });
  } catch (err) {
    next(err);
  }
}

async function updateSettings(req, res, next) {
  try {
    const settings = await settingsService.updateSettings(
      req.body
    );

    res.json({
      success: true,
      message: "Settings updated successfully.",
      data: settings,
    });
  } catch (err) {
    next(err);
  }
}

async function resetSettings(req, res, next) {
  try {
    const settings = await settingsService.resetSettings();

    res.json({
      success: true,
      message: "Settings reset successfully.",
      data: settings,
    });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  // Public
  getPublicSettings,

  // Admin
  getSettings,
  updateSettings,
  resetSettings,
};