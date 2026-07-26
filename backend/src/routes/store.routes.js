"use strict";

const express = require("express");

const controller = require("../controllers/store.controller");

const { requireAuth } = require("../middleware/auth");
const { requireMinimumRole } = require("../middleware/authorize");
const { validate } = require("../middleware/validate");

const {
  createCategorySchema,
  updateCategorySchema,
  createProductSchema,
  updateProductSchema,
} = require("../validation/store.validation");

const router = express.Router();

/*
|--------------------------------------------------------------------------
| Public Store
|--------------------------------------------------------------------------
*/

router.get("/categories", controller.getCategories);

router.get("/categories/:slug", controller.getCategory);

router.get("/products", controller.getProducts);

router.get("/products/:slug", controller.getProduct);

/*
|--------------------------------------------------------------------------
| Admin Categories
|--------------------------------------------------------------------------
*/

router.post(
  "/categories",
  requireAuth,
  requireMinimumRole("admin"),
  validate(createCategorySchema),
  controller.createCategory
);

router.patch(
  "/categories/:id",
  requireAuth,
  requireMinimumRole("admin"),
  validate(updateCategorySchema),
  controller.updateCategory
);

/*
|--------------------------------------------------------------------------
| Admin Products
|--------------------------------------------------------------------------
*/

router.post(
  "/products",
  requireAuth,
  requireMinimumRole("admin"),
  validate(createProductSchema),
  controller.createProduct
);

router.patch(
  "/products/:id",
  requireAuth,
  requireMinimumRole("admin"),
  validate(updateProductSchema),
  controller.updateProduct
);

router.delete(
  "/products/:id",
  requireAuth,
  requireMinimumRole("admin"),
  controller.deleteProduct
);

module.exports = router;