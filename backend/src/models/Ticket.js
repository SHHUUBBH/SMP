"use strict";

const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    authorRole: {
      type: String,
      enum: [
        "user",
        "helper",
        "moderator",
        "admin",
        "owner",
      ],
      required: true,
    },

    message: {
      type: String,
      required: true,
      trim: true,
      maxlength: 5000,
    },

    internal: {
      type: Boolean,
      default: false,
    },

    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    _id: false,
  }
);

const ticketSchema = new mongoose.Schema(
  {
    ticketNumber: {
      type: String,
      unique: true,
      index: true,
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    subject: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },

    category: {
      type: String,
      enum: [
        "billing",
        "purchase",
        "bug",
        "player-report",
        "appeal",
        "account",
        "other",
      ],
      default: "other",
    },

    priority: {
      type: String,
      enum: [
        "low",
        "medium",
        "high",
      ],
      default: "medium",
      index: true,
    },

    status: {
      type: String,
      enum: [
        "open",
        "pending",
        "resolved",
        "closed",
      ],
      default: "open",
      index: true,
    },

    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
      index: true,
    },

    messages: {
      type: [messageSchema],
      default: [],
    },

    lastReplyAt: {
      type: Date,
      default: Date.now,
    },

    closedAt: {
      type: Date,
      default: null,
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

ticketSchema.index({
  user: 1,
  status: 1,
});

ticketSchema.index({
  assignedTo: 1,
  status: 1,
});

ticketSchema.index({
  category: 1,
  priority: 1,
});

/*
|--------------------------------------------------------------------------
| Methods
|--------------------------------------------------------------------------
*/

ticketSchema.methods.addReply = function (
  author,
  authorRole,
  message,
  internal = false
) {
  this.messages.push({
    author,
    authorRole,
    message,
    internal,
  });

  this.lastReplyAt = new Date();

  if (this.status === "resolved") {
    this.status = "pending";
  }
};

ticketSchema.methods.close = function () {
  this.status = "closed";
  this.closedAt = new Date();
};

ticketSchema.methods.reopen = function () {
  this.status = "open";
  this.closedAt = null;
};

ticketSchema.methods.toPublicJSON = function () {
  return {
    id: this._id,
    ticketNumber: this.ticketNumber,
    subject: this.subject,
    category: this.category,
    priority: this.priority,
    status: this.status,
    assignedTo: this.assignedTo,
    messages: this.messages.filter((m) => !m.internal),
    lastReplyAt: this.lastReplyAt,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt,
  };
};

/*
|--------------------------------------------------------------------------
| Generate Ticket Number
|--------------------------------------------------------------------------
*/

ticketSchema.pre("validate", function (next) {
  if (!this.ticketNumber) {
    this.ticketNumber =
      "TKT-" +
      Date.now().toString(36).toUpperCase() +
      "-" +
      Math.random()
        .toString(36)
        .substring(2, 6)
        .toUpperCase();
  }

  next();
});

module.exports = mongoose.model("Ticket", ticketSchema);