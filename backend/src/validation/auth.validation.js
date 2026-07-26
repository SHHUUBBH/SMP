"use strict";

const { z } = require("zod");

/*
|--------------------------------------------------------------------------
| Register
|--------------------------------------------------------------------------
*/

const registerSchema = z.object({
  minecraftUsername: z
    .string()
    .trim()
    .min(3, "Minecraft username must be at least 3 characters.")
    .max(16, "Minecraft username cannot exceed 16 characters.")
    .regex(
      /^[A-Za-z0-9_]+$/,
      "Minecraft username may only contain letters, numbers, and underscores."
    ),

  email: z
    .string()
    .trim()
    .email("Please provide a valid email address."),

  password: z
    .string()
    .min(8, "Password must be at least 8 characters.")
    .max(128, "Password cannot exceed 128 characters."),
});

/*
|--------------------------------------------------------------------------
| Login
|--------------------------------------------------------------------------
*/

const loginSchema = z.object({
  identifier: z
    .string()
    .trim()
    .min(1, "Username or email is required."),

  password: z
    .string()
    .min(1, "Password is required."),
});

module.exports = {
  registerSchema,
  loginSchema,
};