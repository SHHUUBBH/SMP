"use strict";

const { z } = require("zod");

/*
|--------------------------------------------------------------------------
| Update Profile
|--------------------------------------------------------------------------
*/

const updateProfileSchema = z.object({
  minecraftUsername: z
    .string()
    .trim()
    .min(3, "Minecraft username must be at least 3 characters.")
    .max(16, "Minecraft username cannot exceed 16 characters.")
    .regex(
      /^[A-Za-z0-9_]+$/,
      "Minecraft username may only contain letters, numbers, and underscores."
    )
    .optional(),

  email: z
    .string()
    .trim()
    .email("Please provide a valid email address.")
    .optional(),
});

/*
|--------------------------------------------------------------------------
| Change Password
|--------------------------------------------------------------------------
*/

const changePasswordSchema = z.object({
  currentPassword: z
    .string()
    .min(1, "Current password is required."),

  newPassword: z
    .string()
    .min(8, "Password must be at least 8 characters.")
    .max(128, "Password cannot exceed 128 characters."),
});

/*
|--------------------------------------------------------------------------
| Change Email
|--------------------------------------------------------------------------
*/

const changeEmailSchema = z.object({
  email: z
    .string()
    .trim()
    .email("Please provide a valid email address."),
});

/*
|--------------------------------------------------------------------------
| Change Minecraft Username
|--------------------------------------------------------------------------
*/

const changeMinecraftUsernameSchema = z.object({
  minecraftUsername: z
    .string()
    .trim()
    .min(3, "Minecraft username must be at least 3 characters.")
    .max(16, "Minecraft username cannot exceed 16 characters.")
    .regex(
      /^[A-Za-z0-9_]+$/,
      "Minecraft username may only contain letters, numbers, and underscores."
    ),
});

module.exports = {
  updateProfileSchema,
  changePasswordSchema,
  changeEmailSchema,
  changeMinecraftUsernameSchema,
};