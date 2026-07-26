"use strict";

const Settings = require("../models/Settings");
const AppError = require("../utils/AppError");

/*
|--------------------------------------------------------------------------
| Helpers
|--------------------------------------------------------------------------
*/

async function getSettingsDocument() {
  let settings = await Settings.findOne();

  if (!settings) {
    settings = await Settings.create({});
  }

  return settings;
}

/*
|--------------------------------------------------------------------------
| Public
|--------------------------------------------------------------------------
*/

async function getPublicSettings() {
  const settings = await getSettingsDocument();

  return settings.toPublicJSON();
}

/*
|--------------------------------------------------------------------------
| Admin
|--------------------------------------------------------------------------
*/

async function getSettings() {
  return getSettingsDocument();
}

async function updateSettings(data) {
  const settings = await getSettingsDocument();

  const sections = [
    "general",
    "store",
    "discord",
    "branding",
    "socials",
    "seo",
    "footer",
  ];

  for (const section of sections) {
    if (!data[section]) continue;

    settings[section] = {
      ...settings[section].toObject(),
      ...data[section],
    };
  }

  await settings.save();

  return settings.toPublicJSON();
}

async function resetSettings() {
  const settings = await getSettingsDocument();

  settings.general = undefined;
  settings.store = undefined;
  settings.discord = undefined;
  settings.branding = undefined;
  settings.socials = undefined;
  settings.seo = undefined;
  settings.footer = undefined;

  await settings.save();

  return settings.toPublicJSON();
}

module.exports = {
  getPublicSettings,
  getSettings,
  updateSettings,
  resetSettings,
};