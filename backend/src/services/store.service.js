"use strict";

const Category = require("../models/Category");
const Product = require("../models/Product");
const AppError = require("../utils/AppError");

/*
|--------------------------------------------------------------------------
| Categories
|--------------------------------------------------------------------------
*/

async function getCategories() {
  return Category.find({ active: true })
    .sort({ sortOrder: 1, name: 1 })
    .lean();
}

async function getCategory(slug) {
  const category = await Category.findOne({
    slug,
    active: true,
  }).lean();

  if (!category) {
    throw new AppError(
      404,
      "CATEGORY_NOT_FOUND",
      "Category not found."
    );
  }

  return category;
}

/*
|--------------------------------------------------------------------------
| Products
|--------------------------------------------------------------------------
*/

async function getProducts(options = {}) {
  const {
    category,
    featured,
    search,
    page = 1,
    limit = 12,
    sort = "-createdAt",
  } = options;

  const filter = {
    active: true,
  };

  if (category) {
    const cat = await Category.findOne({
      slug: category,
      active: true,
    });

    if (!cat) {
      throw new AppError(
        404,
        "CATEGORY_NOT_FOUND",
        "Category not found."
      );
    }

    filter.category = cat._id;
  }

  if (featured !== undefined) {
    filter.featured = featured === true || featured === "true";
  }

  if (search) {
    filter.$text = {
      $search: search,
    };
  }

  const skip = (Number(page) - 1) * Number(limit);

  const [products, total] = await Promise.all([
    Product.find(filter)
      .populate("category")
      .sort(sort)
      .skip(skip)
      .limit(Number(limit)),
    Product.countDocuments(filter),
  ]);

  return {
    items: products.map((p) => p.toPublicJSON()),
    pagination: {
      page: Number(page),
      limit: Number(limit),
      total,
      pages: Math.ceil(total / Number(limit)),
    },
  };
}

async function getProduct(slug) {
  const product = await Product.findOne({
    slug,
    active: true,
  }).populate("category");

  if (!product) {
    throw new AppError(
      404,
      "PRODUCT_NOT_FOUND",
      "Product not found."
    );
  }

  return product.toPublicJSON();
}

/*
|--------------------------------------------------------------------------
| Admin
|--------------------------------------------------------------------------
*/

async function createCategory(data) {
  return Category.create(data);
}

async function updateCategory(id, data) {
  const category = await Category.findById(id);

  if (!category) {
    throw new AppError(
      404,
      "CATEGORY_NOT_FOUND",
      "Category not found."
    );
  }

  Object.assign(category, data);

  await category.save();

  return category;
}

async function createProduct(data) {
  const product = await Product.create(data);

  return product.toPublicJSON();
}

async function updateProduct(id, data) {
  const product = await Product.findById(id);

  if (!product) {
    throw new AppError(
      404,
      "PRODUCT_NOT_FOUND",
      "Product not found."
    );
  }

  Object.assign(product, data);

  await product.save();

  return product.toPublicJSON();
}

async function deleteProduct(id) {
  const product = await Product.findById(id);

  if (!product) {
    throw new AppError(
      404,
      "PRODUCT_NOT_FOUND",
      "Product not found."
    );
  }

  await product.deleteOne();
}

module.exports = {
  getCategories,
  getCategory,

  getProducts,
  getProduct,

  createCategory,
  updateCategory,

  createProduct,
  updateProduct,
  deleteProduct,
};