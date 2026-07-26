"use strict";

const mongoose = require("mongoose");

const paymentProofSchema = new mongoose.Schema(
  {
    order: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      required: true,
      index: true,
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    amount: {
      type: Number,
      required: true,
      min: 0,
    },

    currency: {
      type: String,
      default: "INR",
      uppercase: true,
      trim: true,
    },

    paymentMethod: {
      type: String,
      enum: [
        "upi",
        "bank_transfer",
        "other",
      ],
      default: "upi",
    },

    transactionId: {
      type: String,
      required: true,
      trim: true,
      uppercase: true,
    },

    screenshot: {
      type: String,
      required: true,
      trim: true,
    },

    payerName: {
      type: String,
      trim: true,
      default: "",
    },

    notes: {
      type: String,
      trim: true,
      default: "",
      maxlength: 500,
    },

    status: {
      type: String,
      enum: [
        "submitted",
        "verified",
        "rejected",
      ],
      default: "submitted",
      index: true,
    },

    verifiedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    verifiedAt: {
      type: Date,
      default: null,
    },

    rejectionReason: {
      type: String,
      default: null,
      trim: true,
      maxlength: 500,
    },
  },
  {
    timestamps: true,
  }
);

paymentProofSchema.index({
  status: 1,
  createdAt: -1,
});

paymentProofSchema.index({
  transactionId: 1,
});

paymentProofSchema.methods.markVerified = function (adminId) {
  this.status = "verified";
  this.verifiedBy = adminId;
  this.verifiedAt = new Date();
  this.rejectionReason = null;
};

paymentProofSchema.methods.markRejected = function (
  adminId,
  reason
) {
  this.status = "rejected";
  this.verifiedBy = adminId;
  this.verifiedAt = new Date();
  this.rejectionReason = reason || "";
};

paymentProofSchema.methods.toPublicJSON = function () {
  return {
    id: this._id,

    order: this.order,

    user: this.user,

    amount: this.amount,

    currency: this.currency,

    paymentMethod: this.paymentMethod,

    transactionId: this.transactionId,

    screenshot: this.screenshot,

    payerName: this.payerName,

    notes: this.notes,

    status: this.status,

    verifiedBy: this.verifiedBy,

    verifiedAt: this.verifiedAt,

    rejectionReason: this.rejectionReason,

    createdAt: this.createdAt,

    updatedAt: this.updatedAt,
  };
};

module.exports = mongoose.model(
  "PaymentProof",
  paymentProofSchema
);