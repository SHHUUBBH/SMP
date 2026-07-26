"use strict";

const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 100,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    shortDescription: {
      type: String,
      trim: true,
      maxlength: 250,
      default: "",
    },

    description: {
      type: String,
      trim: true,
      maxlength: 5000,
      default: "",
    },

    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
      index: true,
    },

    price: {
      type: Number,
      required: true,
      min: 0,
    },

    salePrice: {
      type: Number,
      min: 0,
      default: null,
    },

    currency: {
      type: String,
      default: "INR",
      uppercase: true,
      maxlength: 3,
    },

    images: [
      {
        type: String,
        trim: true,
      },
    ],

    commands: [
      {
        type: String,
        required: true,
        trim: true,
      },
    ],

    stock: {
      type: Number,
      default: -1, // -1 = Unlimited
    },

    featured: {
      type: Boolean,
      default: false,
      index: true,
    },

    active: {
      type: Boolean,
      default: true,
      index: true,
    },

    sortOrder: {
      type: Number,
      default: 0,
    },

    metadata: {
      type: Map,
      of: mongoose.Schema.Types.Mixed,
      default: {},
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

/*
|--------------------------------------------------------------------------
| Indexes
|--------------------------------------------------------------------------
*/

productSchema.index({ slug: 1 }, { unique: true });

productSchema.index({
  category: 1,
  active: 1,
});

productSchema.index({
  featured: 1,
  active: 1,
});

productSchema.index({
  name: "text",
  description: "text",
});

/*
|--------------------------------------------------------------------------
| Virtuals
|--------------------------------------------------------------------------
*/

productSchema.virtual("effectivePrice").get(function () {
  if (
    this.salePrice !== null &&
    this.salePrice >= 0 &&
    this.salePrice < this.price
  ) {
    return this.salePrice;
  }

  return this.price;
});

/*
|--------------------------------------------------------------------------
| Methods
|--------------------------------------------------------------------------
*/

productSchema.methods.isInStock = function () {
  return this.stock === -1 || this.stock > 0;
};

productSchema.methods.toPublicJSON = function () {
  return {
    id: this._id,
    name: this.name,
    slug: this.slug,
    shortDescription: this.shortDescription,
    description: this.description,
    category: this.category,
    price: this.price,
    salePrice: this.salePrice,
    effectivePrice: this.effectivePrice,
    currency: this.currency,
    images: this.images,
    featured: this.featured,
    active: this.active,
    stock: this.stock,
    inStock: this.isInStock(),
    createdAt: this.createdAt,
    updatedAt: this.updatedAt,
  };
};

module.exports = mongoose.model("Product", productSchema);