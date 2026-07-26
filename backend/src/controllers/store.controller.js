"use strict";

const storeService = require("../services/store.service");

/*
|--------------------------------------------------------------------------
| Public
|--------------------------------------------------------------------------
*/

async function getCategories(req, res, next) {
  try {
    const categories = await storeService.getCategories();

    res.json({
      success: true,
      data: categories,
    });
  } catch (err) {
    next(err);
  }
}

async function getCategory(req, res, next) {
  try {
    const category = await storeService.getCategory(
      req.params.slug
    );

    res.json({
      success: true,
      data: category,
    });
  } catch (err) {
    next(err);
  }
}

async function getProducts(req, res, next) {
  try {
    const result = await storeService.getProducts({
      category: req.query.category,
      featured: req.query.featured,
      search: req.query.search,
      page: req.query.page,
      limit: req.query.limit,
      sort: req.query.sort,
    });

    res.json({
      success: true,
      ...result,
    });
  } catch (err) {
    next(err);
  }
}

async function getProduct(req, res, next) {
  try {
    const product = await storeService.getProduct(
      req.params.slug
    );

    res.json({
      success: true,
      data: product,
    });
  } catch (err) {
    next(err);
  }
}

/*
|--------------------------------------------------------------------------
| Admin Categories
|--------------------------------------------------------------------------
*/

async function createCategory(req, res, next) {
  try {
    const category = await storeService.createCategory(
      req.body
    );

    res.status(201).json({
      success: true,
      data: category,
    });
  } catch (err) {
    next(err);
  }
}

async function updateCategory(req, res, next) {
  try {
    const category = await storeService.updateCategory(
      req.params.id,
      req.body
    );

    res.json({
      success: true,
      data: category,
    });
  } catch (err) {
    next(err);
  }
}

/*
|--------------------------------------------------------------------------
| Admin Products
|--------------------------------------------------------------------------
*/

async function createProduct(req, res, next) {
  try {
    const product = await storeService.createProduct(
      req.body
    );

    res.status(201).json({
      success: true,
      data: product,
    });
  } catch (err) {
    next(err);
  }
}

async function updateProduct(req, res, next) {
  try {
    const product = await storeService.updateProduct(
      req.params.id,
      req.body
    );

    res.json({
      success: true,
      data: product,
    });
  } catch (err) {
    next(err);
  }
}

async function deleteProduct(req, res, next) {
  try {
    await storeService.deleteProduct(req.params.id);

    res.json({
      success: true,
      message: "Product deleted successfully.",
    });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  // Public
  getCategories,
  getCategory,
  getProducts,
  getProduct,

  // Categories
  createCategory,
  updateCategory,

  // Products
  createProduct,
  updateProduct,
  deleteProduct,
};