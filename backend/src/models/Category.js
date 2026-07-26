"use strict";

const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 50,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      maxlength: 60,
    },

    description: {
      type: String,
      trim: true,
      maxlength: 500,
      default: "",
    },

    icon: {
      type: String,
      trim: true,
      default: "",
    },

    image: {
      type: String,
      trim: true,
      default: "",
    },

    sortOrder: {
      type: Number,
      default: 0,
      index: true,
    },

    active: {
      type: Boolean,
      default: true,
      index: true,
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

categorySchema.index({ slug: 1 }, { unique: true });
categorySchema.index({ active: 1, sortOrder: 1 });

/*
|--------------------------------------------------------------------------
| JSON
|--------------------------------------------------------------------------
*/

categorySchema.methods.toJSON = function () {
  const obj = this.toObject();

  return {
    id: obj._id,
    name: obj.name,
    slug: obj.slug,
    description: obj.description,
    icon: obj.icon,
    image: obj.image,
    sortOrder: obj.sortOrder,
    active: obj.active,
    createdAt: obj.createdAt,
    updatedAt: obj.updatedAt,
  };
};

module.exports = mongoose.model("Category", categorySchema);