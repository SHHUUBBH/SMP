"use strict";

const mongoose = require("mongoose");

const orderItemSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },

    name: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
      min: 0,
    },

    quantity: {
      type: Number,
      required: true,
      min: 1,
    },

    commands: [
      {
        type: String,
        required: true,
      },
    ],
  },
  {
    _id: false,
  }
);

const orderSchema = new mongoose.Schema(
  {
    orderNumber: {
      type: String,
      unique: true,
      required: true,
      index: true,
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    minecraftUsername: {
      type: String,
      required: true,
      trim: true,
    },

    items: {
      type: [orderItemSchema],
      required: true,
      validate: [
        (items) => items.length > 0,
        "Order must contain at least one item.",
      ],
    },

    subtotal: {
      type: Number,
      required: true,
      min: 0,
    },

    discount: {
      type: Number,
      default: 0,
      min: 0,
    },

    total: {
      type: Number,
      required: true,
      min: 0,
    },

    currency: {
      type: String,
      default: "INR",
      uppercase: true,
    },

    paymentProvider: {
      type: String,
      default: null,
    },

    paymentId: {
      type: String,
      default: null,
      index: true,
    },

    paymentStatus: {
      type: String,
      enum: [
        "pending",
        "paid",
        "failed",
        "refunded",
        "cancelled",
      ],
      default: "pending",
      index: true,
    },

    fulfillmentStatus: {
      type: String,
      enum: [
        "pending",
        "processing",
        "completed",
        "failed",
      ],
      default: "pending",
      index: true,
    },

    commandsExecuted: {
      type: Boolean,
      default: false,
    },

    executedAt: {
      type: Date,
      default: null,
    },

    notes: {
      type: String,
      default: "",
      maxlength: 1000,
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

orderSchema.index({ user: 1, createdAt: -1 });

orderSchema.index({
  paymentStatus: 1,
  fulfillmentStatus: 1,
});

orderSchema.index({
  minecraftUsername: 1,
});

/*
|--------------------------------------------------------------------------
| Virtuals
|--------------------------------------------------------------------------
*/

orderSchema.virtual("itemCount").get(function () {
  return this.items.reduce(
    (count, item) => count + item.quantity,
    0
  );
});

/*
|--------------------------------------------------------------------------
| Methods
|--------------------------------------------------------------------------
*/

orderSchema.methods.markPaid = function (paymentId, provider) {
  this.paymentStatus = "paid";
  this.paymentId = paymentId;
  this.paymentProvider = provider;
};

orderSchema.methods.markCompleted = function () {
  this.fulfillmentStatus = "completed";
  this.commandsExecuted = true;
  this.executedAt = new Date();
};

orderSchema.methods.markFailed = function () {
  this.fulfillmentStatus = "failed";
};

orderSchema.methods.toPublicJSON = function () {
  return {
    id: this._id,
    orderNumber: this.orderNumber,
    minecraftUsername: this.minecraftUsername,
    items: this.items,
    subtotal: this.subtotal,
    discount: this.discount,
    total: this.total,
    currency: this.currency,
    paymentStatus: this.paymentStatus,
    fulfillmentStatus: this.fulfillmentStatus,
    itemCount: this.itemCount,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt,
  };
};

/*
|--------------------------------------------------------------------------
| Generate Order Number
|--------------------------------------------------------------------------
*/

orderSchema.pre("validate", function (next) {
  if (!this.orderNumber) {
    this.orderNumber =
      "BS-" +
      Date.now().toString(36).toUpperCase() +
      "-" +
      Math.random()
        .toString(36)
        .substring(2, 6)
        .toUpperCase();
  }

  next();
});

module.exports = mongoose.model("Order", orderSchema);