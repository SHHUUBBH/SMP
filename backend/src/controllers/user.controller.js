"use strict";

const userService = require("../services/user.service");

/*
|--------------------------------------------------------------------------
| Current User
|--------------------------------------------------------------------------
*/

async function getMe(req, res, next) {
  try {
    const user = await userService.getMe(req.user._id);

    res.json({
      success: true,
      data: user,
    });
  } catch (err) {
    next(err);
  }
}

async function updateProfile(req, res, next) {
  try {
    const user = await userService.updateProfile(
      req.user._id,
      req.body
    );

    res.json({
      success: true,
      data: user,
    });
  } catch (err) {
    next(err);
  }
}

async function changePassword(req, res, next) {
  try {
    await userService.changePassword(
      req.user._id,
      req.body.currentPassword,
      req.body.newPassword
    );

    res.json({
      success: true,
      message: "Password changed successfully.",
    });
  } catch (err) {
    next(err);
  }
}

async function deleteMyAccount(req, res, next) {
  try {
    await userService.deleteMyAccount(req.user._id);

    res.json({
      success: true,
      message: "Account deleted successfully.",
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

async function listUsers(req, res, next) {
  try {
    const result = await userService.listUsers({
      page: req.query.page,
      limit: req.query.limit,
      search: req.query.search,
      role: req.query.role,
      status: req.query.status,
    });

    res.json({
      success: true,
      ...result,
    });
  } catch (err) {
    next(err);
  }
}

async function getUser(req, res, next) {
  try {
    const user = await userService.getUser(
      req.params.id
    );

    res.json({
      success: true,
      data: user,
    });
  } catch (err) {
    next(err);
  }
}

async function updateUser(req, res, next) {
  try {
    const user = await userService.updateUser(
      req.params.id,
      req.body
    );

    res.json({
      success: true,
      data: user,
    });
  } catch (err) {
    next(err);
  }
}

async function changeRole(req, res, next) {
  try {
    const user = await userService.changeRole(
      req.params.id,
      req.body.role
    );

    res.json({
      success: true,
      data: user,
    });
  } catch (err) {
    next(err);
  }
}

async function changeStatus(req, res, next) {
  try {
    const user = await userService.changeStatus(
      req.params.id,
      req.body.status,
      req.body.reason
    );

    res.json({
      success: true,
      data: user,
    });
  } catch (err) {
    next(err);
  }
}

async function deleteUser(req, res, next) {
  try {
    await userService.deleteUser(req.params.id);

    res.json({
      success: true,
      message: "User deleted successfully.",
    });
  } catch (err) {
    next(err);
  }
}

async function changeEmail(req, res, next) {
  try {
    const user = await userService.changeEmail(
      req.user._id,
      req.body.email
    );

    res.json({
      success: true,
      data: user,
    });
  } catch (err) {
    next(err);
  }
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