"use strict";

const { z } = require("zod");

/*
|--------------------------------------------------------------------------
| Common
|--------------------------------------------------------------------------
*/

const objectId = z
  .string()
  .trim()
  .regex(/^[a-f\d]{24}$/i, "Invalid MongoDB ObjectId.");

/*
|--------------------------------------------------------------------------
| Ticket ID
|--------------------------------------------------------------------------
*/

const ticketIdSchema = z.object({
  id: objectId,
});

/*
|--------------------------------------------------------------------------
| Create Ticket
|--------------------------------------------------------------------------
*/

const createTicketSchema = z.object({
  subject: z
    .string()
    .trim()
    .min(5, "Subject must be at least 5 characters.")
    .max(100, "Subject cannot exceed 100 characters."),

  category: z.enum([
    "billing",
    "purchase",
    "bug",
    "player-report",
    "appeal",
    "account",
    "other",
  ]),

  priority: z
    .enum([
      "low",
      "medium",
      "high",
    ])
    .default("medium"),

  message: z
    .string()
    .trim()
    .min(10, "Message must be at least 10 characters.")
    .max(5000, "Message cannot exceed 5000 characters."),
});

/*
|--------------------------------------------------------------------------
| User Reply
|--------------------------------------------------------------------------
*/

const replyTicketSchema = z.object({
  message: z
    .string()
    .trim()
    .min(1, "Reply cannot be empty.")
    .max(5000, "Reply cannot exceed 5000 characters."),
});

/*
|--------------------------------------------------------------------------
| Staff Reply
|--------------------------------------------------------------------------
*/

const staffReplySchema = z.object({
  message: z
    .string()
    .trim()
    .min(1, "Reply cannot be empty.")
    .max(5000, "Reply cannot exceed 5000 characters."),

  internal: z
    .boolean()
    .default(false),
});

/*
|--------------------------------------------------------------------------
| Update Ticket Status
|--------------------------------------------------------------------------
*/

const updateTicketStatusSchema = z.object({
  status: z.enum([
    "open",
    "pending",
    "resolved",
    "closed",
  ]),
});

/*
|--------------------------------------------------------------------------
| Update Ticket Priority
|--------------------------------------------------------------------------
*/

const updateTicketPrioritySchema = z.object({
  priority: z.enum([
    "low",
    "medium",
    "high",
  ]),
});

/*
|--------------------------------------------------------------------------
| Assign Ticket
|--------------------------------------------------------------------------
*/

const assignTicketSchema = z.object({
  staffId: objectId,
});

/*
|--------------------------------------------------------------------------
| Close Ticket
|--------------------------------------------------------------------------
*/

const closeTicketSchema = z.object({
  reason: z
    .string()
    .trim()
    .max(500)
    .optional(),
});

module.exports = {
  ticketIdSchema,

  createTicketSchema,
  replyTicketSchema,
  staffReplySchema,

  updateTicketStatusSchema,
  updateTicketPrioritySchema,

  assignTicketSchema,

  closeTicketSchema,
};