"use strict";

const User = require("../models/User");
const AppError = require("../utils/AppError");

const mojang = require("./mojang");
const audit = require("./audit.service");

const {
  signAccessToken,
  issueRefreshToken,
  rotateRefreshToken,
  revokeRefreshToken,
  revokeAllForUser,
} = require("./token.service");

async function register({
  minecraftUsername,
  email,
  password,
  req,
}) {
  const profile = await mojang.resolveUsername(minecraftUsername);

  if (!profile) {
    throw new AppError(
      400,
      "MC_USERNAME_NOT_FOUND",
      "Minecraft username does not exist."
    );
  }

  const usernameExists = await User.findOne({
    minecraftUsernameLower: profile.name.toLowerCase(),
  });

  if (usernameExists) {
    throw new AppError(
      409,
      "USERNAME_TAKEN",
      "Minecraft username already registered."
    );
  }

  const emailExists = await User.findOne({
    email: email.toLowerCase(),
  });

  if (emailExists) {
    throw new AppError(
      409,
      "EMAIL_TAKEN",
      "Email already in use."
    );
  }

  const user = new User({
    minecraftUsername: profile.name,
    minecraftUuid: profile.uuid,
    email: email.toLowerCase(),
    mcVerified: true,
  });

  user.password = password;

  await user.save();

  const accessToken = signAccessToken(user);

  const refresh = await issueRefreshToken({
    userId: user._id,
    req,
  });

  await audit.record({
    actor: user,
    action: "auth.register",
    targetUser: user,
    req,
  });

  return {
    user,
    accessToken,
    refreshToken: refresh.token,
    refreshExpiresAt: refresh.expiresAt,
  };
}

async function login({
  identifier,
  password,
  req,
}) {
  const user = await User.findByIdentifier(identifier)
    .select("+passwordHash");

  if (!user) {
    throw new AppError(
      401,
      "INVALID_CREDENTIALS",
      "Invalid username/email or password."
    );
  }

  if (user.status === "banned") {
    throw new AppError(
      403,
      "ACCOUNT_BANNED",
      user.banReason || "This account has been banned."
    );
  }

  const ok = await user.comparePassword(password);

  if (!ok) {
    throw new AppError(
      401,
      "INVALID_CREDENTIALS",
      "Invalid username/email or password."
    );
  }

  user.lastLoginAt = new Date();
  user.lastLoginIp = req.ip;

  await user.save();

  const accessToken = signAccessToken(user);

  const refresh = await issueRefreshToken({
    userId: user._id,
    req,
  });

  await audit.record({
    actor: user,
    action: "auth.login",
    targetUser: user,
    req,
  });

  return {
    user,
    accessToken,
    refreshToken: refresh.token,
    refreshExpiresAt: refresh.expiresAt,
  };
}

async function refresh({
  refreshToken,
  req,
}) {
  const session = await rotateRefreshToken({
    token: refreshToken,
    req,
  });

  await audit.record({
    actor: session.user,
    action: "auth.refresh",
    targetUser: session.user,
    req,
  });

  return session;
}

async function logout({
  refreshToken,
  user,
  req,
}) {
  await revokeRefreshToken(refreshToken);

  await audit.record({
    actor: user,
    action: "auth.logout",
    targetUser: user,
    req,
  });

  return true;
}

async function logoutAll({
  user,
  req,
}) {
  await revokeAllForUser(user._id);

  user.tokenVersion += 1;
  await user.save();

  await audit.record({
    actor: user,
    action: "auth.logout_all",
    targetUser: user,
    req,
  });

  return true;
}

async function me(user) {
  return user.toPublicJSON();
}

module.exports = {
  register,
  login,
  refresh,
  logout,
  logoutAll,
  me,
};