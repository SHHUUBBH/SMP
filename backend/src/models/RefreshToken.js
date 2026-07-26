"use strict";

const mongoose = require("mongoose");

const { Schema } = mongoose;

const refreshTokenSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
    tokenHash: { type: String, required: true, unique: true },
    family: { type: String, required: true, index: true },
    // TTL index: Mongo drops the document once expiresAt passes.
    expiresAt: { type: Date, required: true, index: { expires: 0 } },
    revokedAt: { type: Date, default: null },
    replacedByHash: { type: String, default: null },
    userAgent: { type: String },
    ip: { type: String },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

refreshTokenSchema.index({ user: 1, revokedAt: 1, expiresAt: 1 });

module.exports = mongoose.models.RefreshToken || mongoose.model("RefreshToken", refreshTokenSchema);
