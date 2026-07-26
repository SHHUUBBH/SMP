"use strict";

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const config = require("../config/env");

const { Schema } = mongoose;

const ROLES = ["player", "admin", "superadmin"];
const STATUSES = ["active", "banned"];

const userSchema = new Schema(
  {
    minecraftUsername: { type: String, required: true, trim: true, maxlength: 16 },
    minecraftUsernameLower: { type: String, required: true, unique: true, lowercase: true, trim: true },
    minecraftUuid: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      set: normalizeUuid,
    },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true, maxlength: 254 },
    passwordHash: { type: String, required: true, select: false },
    role: { type: String, enum: ROLES, default: "player", index: true },
    status: { type: String, enum: STATUSES, default: "active", index: true },
    banReason: { type: String, trim: true },
    bannedAt: { type: Date },
    bannedBy: { type: Schema.Types.ObjectId, ref: "User" },
    mcVerified: { type: Boolean, default: false },
    tokenVersion: { type: Number, default: 0 },
    lastLoginAt: { type: Date },
    lastLoginIp: { type: String },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true, transform: stripSecrets },
    toObject: { virtuals: true, transform: stripSecrets },
  }
);

function normalizeUuid(value) {
  if (typeof value !== "string") return value;
  return value.replace(/-/g, "").trim().toLowerCase();
}

function stripSecrets(_doc, ret) {
  delete ret.passwordHash;
  delete ret.tokenVersion;
  delete ret.__v;
  return ret;
}

userSchema.virtual("avatarUrl").get(function avatarUrl() {
  return `https://mc-heads.net/avatar/${this.minecraftUuid}/64`;
});

/**
 * Write-only convenience setter: `user.password = "plain"` is hashed into passwordHash
 * before validation/save. Callers may also set passwordHash directly.
 */
userSchema.virtual("password").set(function setPassword(plain) {
  this.$locals.pendingPassword = plain;
});

function syncUsernameLower(doc) {
  if (typeof doc.minecraftUsername === "string") {
    doc.minecraftUsernameLower = doc.minecraftUsername.trim().toLowerCase();
  }
}

async function hashPendingPassword(doc) {
  const plain = doc.$locals.pendingPassword;
  if (plain === undefined || plain === null || plain === "") return;
  doc.passwordHash = await bcrypt.hash(String(plain), config.bcryptRounds);
  doc.$locals.pendingPassword = undefined;
}

// Registered on both hooks: pre-validate keeps `required: true` on passwordHash satisfiable,
// pre-save covers saves that skip validation.
userSchema.pre("validate", async function preValidate() {
  syncUsernameLower(this);
  await hashPendingPassword(this);
});

userSchema.pre("save", async function preSave() {
  syncUsernameLower(this);
  await hashPendingPassword(this);
});

userSchema.methods.comparePassword = async function comparePassword(plain) {
  if (!plain || !this.passwordHash) return false;
  return bcrypt.compare(String(plain), this.passwordHash);
};

userSchema.methods.toPublicJSON = function toPublicJSON() {
  return {
    id: String(this._id),
    minecraftUsername: this.minecraftUsername,
    minecraftUuid: this.minecraftUuid,
    avatarUrl: `https://mc-heads.net/avatar/${this.minecraftUuid}/64`,
    email: this.email,
    role: this.role,
    status: this.status,
    mcVerified: this.mcVerified,
    createdAt: this.createdAt,
    lastLoginAt: this.lastLoginAt,
  };
};

userSchema.statics.findByIdentifier = function findByIdentifier(identifier) {
  const value = String(identifier || "").trim().toLowerCase();
  return this.findOne({ $or: [{ minecraftUsernameLower: value }, { email: value }] });
};

userSchema.statics.ROLES = ROLES;
userSchema.statics.STATUSES = STATUSES;

module.exports = mongoose.models.User || mongoose.model("User", userSchema);
