"use strict";

const { z } = require("zod");

/*
|--------------------------------------------------------------------------
| User ID
|--------------------------------------------------------------------------
*/

const userIdSchema = z.object({
  id: z
    .string()
    .trim()
    .min(1, "User ID is required."),
});

/*
|--------------------------------------------------------------------------
| Ban User
|--------------------------------------------------------------------------
*/

const banUserSchema = z.object({
  reason: z
    .string()
    .trim()
    .min(3, "Ban reason must be at least 3 characters.")
    .max(500, "Ban reason cannot exceed 500 characters."),
});

/*
|--------------------------------------------------------------------------
| Unban User
|--------------------------------------------------------------------------
*/

const unbanUserSchema = z.object({
  reason: z
    .string()
    .trim()
    .max(500)
    .optional(),
});

/*
|--------------------------------------------------------------------------
| Change Role
|--------------------------------------------------------------------------
*/

const changeRoleSchema = z.object({
  role: z.enum([
    "user",
    "helper",
    "moderator",
    "admin",
    "owner",
  ]),
});

/*
|--------------------------------------------------------------------------
| Change Status
|--------------------------------------------------------------------------
*/

const changeStatusSchema = z.object({
  status: z.enum([
    "active",
    "suspended",
    "banned",
    "deleted",
  ]),
});

module.exports = {
  userIdSchema,
  banUserSchema,
  unbanUserSchema,
  changeRoleSchema,
  changeStatusSchema,
};