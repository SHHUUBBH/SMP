"use strict";

const mongoose = require("mongoose");

const { Schema } = mongoose;

const auditLogSchema = new Schema(
  {
    actor: { type: Schema.Types.ObjectId, ref: "User", default: null },
    actorRole: { type: String },
    action: { type: String, required: true, index: true },
    targetUser: { type: Schema.Types.ObjectId, ref: "User", default: null },
    meta: { type: Schema.Types.Mixed },
    ip: { type: String },
    createdAt: { type: Date, default: Date.now, index: true },
  },
  { timestamps: false, versionKey: false }
);

module.exports = mongoose.models.AuditLog || mongoose.model("AuditLog", auditLogSchema);
