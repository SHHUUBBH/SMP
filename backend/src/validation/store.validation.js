"use strict";

const { z } = require("zod");

/*
|--------------------------------------------------------------------------
| Product ID
|--------------------------------------------------------------------------
*/

const productIdSchema = z.object({
  id: z.string().trim().min(1, "Product ID is required."),
});

/*
|--------------------------------------------------------------------------
| Category ID
|--------------------------------------------------------------------------
*/

const categoryIdSchema = z.object({
  id: z.string().trim().min(1, "Category ID is required."),
});

/*
|--------------------------------------------------------------------------
| Create Product
|--------------------------------------------------------------------------
*/

const createProductSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, "Product name must be at least 3 characters.")
    .max(100, "Product name cannot exceed 100 characters."),

  description: z
    .string()
    .trim()
    .max(5000, "Description cannot exceed 5000 characters.")
    .optional(),

  price: z
    .number({
      required_error: "Price is required.",
      invalid_type_error: "Price must be a number.",
    })
    .nonnegative("Price cannot be negative."),

  category: z
    .string()
    .trim()
    .min(1, "Category is required."),

  image: z
    .string()
    .trim()
    .url("Image must be a valid URL.")
    .optional(),

  commands: z
    .array(
      z.string().trim().min(1)
    )
    .default([]),

  stock: z
    .number()
    .int()
    .nonnegative()
    .default(-1),

  featured: z
    .boolean()
    .default(false),

  active: z
    .boolean()
    .default(true),
});

/*
|--------------------------------------------------------------------------
| Update Product
|--------------------------------------------------------------------------
*/

const updateProductSchema = createProductSchema.partial();

/*
|--------------------------------------------------------------------------
| Create Category
|--------------------------------------------------------------------------
*/

const createCategorySchema = z.object({
  name: z
    .string()
    .trim()
    .min(2)
    .max(50),

  slug: z
    .string()
    .trim()
    .regex(
      /^[a-z0-9-]+$/,
      "Slug may only contain lowercase letters, numbers and hyphens."
    ),

  description: z
    .string()
    .trim()
    .max(500)
    .optional(),

  active: z
    .boolean()
    .default(true),
});

/*
|--------------------------------------------------------------------------
| Update Category
|--------------------------------------------------------------------------
*/

const updateCategorySchema =
  createCategorySchema.partial();

module.exports = {
  productIdSchema,
  categoryIdSchema,
  createProductSchema,
  updateProductSchema,
  createCategorySchema,
  updateCategorySchema,
};