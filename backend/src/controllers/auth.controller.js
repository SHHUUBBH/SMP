"use strict";

const authService = require("../services/auth.service");
const config = require("../config/env");
const {
  setAuthCookies,
  clearAuthCookies,
} = require("../utils/cookies");

function getRefreshToken(req) {
  return (
    req.cookies?.[config.cookie.refreshName] ??
    req.body?.refreshToken ??
    null
  );
}

async function register(req, res, next) {
  try {
    const result = await authService.register({
      minecraftUsername: req.body.minecraftUsername,
      email: req.body.email,
      password: req.body.password,
      req,
    });

    setAuthCookies(res, {
      accessToken: result.accessToken,
      refreshToken: result.refreshToken,
      refreshExpiresAt: result.refreshExpiresAt,
    });

    return res.status(201).json({
      success: true,
      message: "Registration successful.",
      user: result.user.toPublicJSON(),
    });
  } catch (error) {
    next(error);
  }
}

async function login(req, res, next) {
  try {
    const result = await authService.login({
      identifier: req.body.identifier,
      password: req.body.password,
      req,
    });

    setAuthCookies(res, {
      accessToken: result.accessToken,
      refreshToken: result.refreshToken,
      refreshExpiresAt: result.refreshExpiresAt,
    });

    return res.json({
      success: true,
      message: "Login successful.",
      user: result.user.toPublicJSON(),
    });
  } catch (error) {
    next(error);
  }
}

async function refresh(req, res, next) {
  try {
    const result = await authService.refresh({
      refreshToken: getRefreshToken(req),
      req,
    });

    setAuthCookies(res, {
      accessToken: result.accessToken,
      refreshToken: result.refreshToken,
      refreshExpiresAt: result.refreshExpiresAt,
    });

    return res.json({
      success: true,
      user: result.user.toPublicJSON(),
    });
  } catch (error) {
    clearAuthCookies(res);
    next(error);
  }
}

async function logout(req, res, next) {
  try {
    await authService.logout({
      refreshToken: getRefreshToken(req),
      user: req.user,
      req,
    });

    clearAuthCookies(res);

    return res.json({
      success: true,
      message: "Logged out successfully.",
    });
  } catch (error) {
    next(error);
  }
}

async function logoutAll(req, res, next) {
  try {
    await authService.logoutAll({
      user: req.user,
      req,
    });

    clearAuthCookies(res);

    return res.json({
      success: true,
      message: "Logged out from all devices.",
    });
  } catch (error) {
    next(error);
  }
}

async function me(req, res, next) {
  try {
    const user = await authService.me(req.user);

    return res.json({
      success: true,
      user,
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  register,
  login,
  refresh,
  logout,
  logoutAll,
  me,
};