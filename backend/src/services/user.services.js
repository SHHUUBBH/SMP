"use strict";

const bcrypt = require("bcrypt");

const User = require("../models/User");
const AuditLog = require("../models/AuditLog");
const AppError = require("../utils/AppError");
const config = require("../config/env");

/*
|--------------------------------------------------------------------------
| Current User
|--------------------------------------------------------------------------
*/

async function getMe(userId) {
  const user = await User.findById(userId);

  if (!user) {
    throw new AppError(
      404,
      "USER_NOT_FOUND",
      "User not found."
    );
  }

  return user.toPublicJSON();
}

async function updateProfile(userId, data) {
  const user = await User.findById(userId);

  if (!user) {
    throw new AppError(
      404,
      "USER_NOT_FOUND",
      "User not found."
    );
  }

  if (
    data.minecraftUsername &&
    data.minecraftUsername !== user.minecraftUsername
  ) {
    const exists = await User.findOne({
      minecraftUsernameLower:
        data.minecraftUsername.toLowerCase(),
      _id: { $ne: userId },
    });

    if (exists) {
      throw new AppError(
        409,
        "USERNAME_EXISTS",
        "Minecraft username already exists."
      );
    }

    user.minecraftUsername = data.minecraftUsername;
    user.minecraftUsernameLower =
      data.minecraftUsername.toLowerCase();
  }

  if (data.email && data.email !== user.email) {
    const exists = await User.findOne({
      email: data.email.toLowerCase(),
      _id: { $ne: userId },
    });

    if (exists) {
      throw new AppError(
        409,
        "EMAIL_EXISTS",
        "Email already exists."
      );
    }

    user.email = data.email.toLowerCase();
  }

  await user.save();

  return user.toPublicJSON();
}

async function changePassword(
  userId,
  currentPassword,
  newPassword
) {
  const user = await User.findById(userId);

  if (!user) {
    throw new AppError(
      404,
      "USER_NOT_FOUND",
      "User not found."
    );
  }

  const valid = await user.comparePassword(
    currentPassword
  );

  if (!valid) {
    throw new AppError(
      401,
      "INVALID_PASSWORD",
      "Current password is incorrect."
    );
  }

  user.password = newPassword;
  user.tokenVersion += 1;

  await user.save();

  return {
    success: true,
  };
}

async function deleteMyAccount(userId) {
  const user = await User.findById(userId);

  if (!user) {
    throw new AppError(
      404,
      "USER_NOT_FOUND",
      "User not found."
    );
  }

  user.status = "deleted";
  user.tokenVersion += 1;

  await user.save();

  return {
    success: true,
  };
}

/*
|--------------------------------------------------------------------------
| Admin
|--------------------------------------------------------------------------
*/

async function listUsers({
  page = 1,
  limit = 20,
  search = "",
  role,
  status,
}) {
  const filter = {};

  if (search) {
    filter.$or = [
      {
        minecraftUsername: {
          $regex: search,
          $options: "i",
        },
      },
      {
        email: {
          $regex: search,
          $options: "i",
        },
      },
    ];
  }

  if (role) {
    filter.role = role;
  }

  if (status) {
    filter.status = status;
  }

  const skip =
    (Number(page) - 1) * Number(limit);

  const [users, total] = await Promise.all([
    User.find(filter)
      .sort({
        createdAt: -1,
      })
      .skip(skip)
      .limit(Number(limit)),
    User.countDocuments(filter),
  ]);

  return {
    items: users.map((u) =>
      u.toPublicJSON()
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

async function getUser(id) {
  const user = await User.findById(id);

  if (!user) {
    throw new AppError(
      404,
      "USER_NOT_FOUND",
      "User not found."
    );
  }

  return user.toPublicJSON();
}

async function updateUser(id, data) {
  const user = await User.findById(id);

  if (!user) {
    throw new AppError(
      404,
      "USER_NOT_FOUND",
      "User not found."
    );
  }

  Object.assign(user, data);

  await user.save();

  return user.toPublicJSON();
}

async function changeRole(id, role) {
  const user = await User.findById(id);

  if (!user) {
    throw new AppError(
      404,
      "USER_NOT_FOUND",
      "User not found."
    );
  }

  user.role = role;

  await user.save();

  return user.toPublicJSON();
}

async function changeStatus(
  id,
  status,
  reason = null
) {
  const user = await User.findById(id);

  if (!user) {
    throw new AppError(
      404,
      "USER_NOT_FOUND",
      "User not found."
    );
  }

  user.status = status;

  if (status === "banned") {
    user.bannedAt = new Date();
    user.banReason = reason;
  } else {
    user.bannedAt = null;
    user.banReason = null;
  }

  await user.save();

  return user.toPublicJSON();
}

async function deleteUser(id) {
  const user = await User.findById(id);

  if (!user) {
    throw new AppError(
      404,
      "USER_NOT_FOUND",
      "User not found."
    );
  }

  user.status = "deleted";
  user.tokenVersion += 1;

  await user.save();

  return {
    success: true,
  };
}

async function changeEmail(userId, email) {
  const user = await User.findById(userId);

  if (!user) {
    throw new AppError(
      404,
      "USER_NOT_FOUND",
      "User not found."
    );
  }

  const normalizedEmail = email.trim().toLowerCase();

  if (normalizedEmail === user.email) {
    return user.toPublicJSON();
  }

  const exists = await User.findOne({
    email: normalizedEmail,
    _id: { $ne: userId },
  });

  if (exists) {
    throw new AppError(
      409,
      "EMAIL_EXISTS",
      "Email already exists."
    );
  }

  user.email = normalizedEmail;

  // If your project supports email verification,
  // uncomment the next line.
  // user.emailVerified = false;

  await user.save();

  return user.toPublicJSON();
}

module.exports = {
  // Current User
  getMe,
  updateProfile,
  changePassword,
  changeEmail,
  deleteMyAccount,

  // Admin
  listUsers,
  getUser,
  updateUser,
  changeRole,
  changeStatus,
  deleteUser,
};