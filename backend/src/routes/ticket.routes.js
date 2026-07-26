"use strict";

const express = require("express");

const controller = require("../controllers/ticket.controller");

const { requireAuth } = require("../middleware/auth");
const { requireMinimumRole } = require("../middleware/authorize");
const { validate } = require("../middleware/validate");

const {
  createTicketSchema,
  replyTicketSchema,
  staffReplySchema,
  updateTicketStatusSchema,
  assignTicketSchema,
} = require("../validation/ticket.validation");

const router = express.Router();

/*
|--------------------------------------------------------------------------
| User Routes
|--------------------------------------------------------------------------
*/

router.post(
  "/",
  requireAuth,
  validate(createTicketSchema),
  controller.createTicket
);

router.get(
  "/",
  requireAuth,
  controller.getMyTickets
);

router.get(
  "/:id",
  requireAuth,
  controller.getTicket
);

router.post(
  "/:id/reply",
  requireAuth,
  validate(replyTicketSchema),
  controller.replyToTicket
);

/*
|--------------------------------------------------------------------------
| Staff Routes
|--------------------------------------------------------------------------
*/

router.get(
  "/admin",
  requireAuth,
  requireMinimumRole("moderator"),
  controller.getAllTickets
);

router.patch(
  "/:id/status",
  requireAuth,
  requireMinimumRole("moderator"),
  validate(updateTicketStatusSchema),
  controller.updateStatus
);

router.patch(
  "/:id/assign",
  requireAuth,
  requireMinimumRole("moderator"),
  validate(assignTicketSchema),
  controller.assignTicket
);

router.post(
  "/:id/staff-reply",
  requireAuth,
  requireMinimumRole("moderator"),
  validate(staffReplySchema),
  controller.staffReply
);

module.exports = router;