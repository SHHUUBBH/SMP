"use strict";

const Ticket = require("../models/Ticket");
const User = require("../models/User");
const AppError = require("../utils/AppError");

/*
|--------------------------------------------------------------------------
| User
|--------------------------------------------------------------------------
*/

async function createTicket(userId, data) {
  const user = await User.findById(userId);

  if (!user) {
    throw new AppError(
      404,
      "USER_NOT_FOUND",
      "User not found."
    );
  }

  const ticket = await Ticket.create({
    user: user._id,
    subject: data.subject,
    category: data.category,
    priority: data.priority || "medium",
    messages: [
      {
        author: user._id,
        authorRole: user.role,
        message: data.message,
      },
    ],
  });

  return ticket.toPublicJSON();
}

async function getMyTickets(userId) {
  const tickets = await Ticket.find({
    user: userId,
  }).sort({
    updatedAt: -1,
  });

  return tickets.map((ticket) =>
    ticket.toPublicJSON()
  );
}

async function getTicket(userId, ticketId) {
  const ticket = await Ticket.findOne({
    _id: ticketId,
    user: userId,
  });

  if (!ticket) {
    throw new AppError(
      404,
      "TICKET_NOT_FOUND",
      "Ticket not found."
    );
  }

  return ticket.toPublicJSON();
}

async function replyToTicket(userId, ticketId, message) {
  const user = await User.findById(userId);

  const ticket = await Ticket.findOne({
    _id: ticketId,
    user: userId,
  });

  if (!ticket) {
    throw new AppError(
      404,
      "TICKET_NOT_FOUND",
      "Ticket not found."
    );
  }

  if (ticket.status === "closed") {
    throw new AppError(
      400,
      "TICKET_CLOSED",
      "Ticket has been closed."
    );
  }

  ticket.addReply(
    user._id,
    user.role,
    message
  );

  await ticket.save();

  return ticket.toPublicJSON();
}

/*
|--------------------------------------------------------------------------
| Staff
|--------------------------------------------------------------------------
*/

async function getAllTickets() {
  return Ticket.find()
    .populate("user assignedTo")
    .sort({
      updatedAt: -1,
    });
}

async function assignTicket(ticketId, staffId) {
  const ticket = await Ticket.findById(ticketId);

  if (!ticket) {
    throw new AppError(
      404,
      "TICKET_NOT_FOUND",
      "Ticket not found."
    );
  }

  ticket.assignedTo = staffId;

  await ticket.save();

  return ticket.toPublicJSON();
}

async function updateStatus(ticketId, status) {
  const ticket = await Ticket.findById(ticketId);

  if (!ticket) {
    throw new AppError(
      404,
      "TICKET_NOT_FOUND",
      "Ticket not found."
    );
  }

  ticket.status = status;

  if (status === "closed") {
    ticket.closedAt = new Date();
  }

  await ticket.save();

  return ticket.toPublicJSON();
}

async function staffReply(
  ticketId,
  staffUser,
  message,
  internal = false
) {
  const ticket = await Ticket.findById(ticketId);

  if (!ticket) {
    throw new AppError(
      404,
      "TICKET_NOT_FOUND",
      "Ticket not found."
    );
  }

  ticket.addReply(
    staffUser._id,
    staffUser.role,
    message,
    internal
  );

  await ticket.save();

  return ticket.toPublicJSON();
}

module.exports = {
  // User
  createTicket,
  getMyTickets,
  getTicket,
  replyToTicket,

  // Staff
  getAllTickets,
  assignTicket,
  updateStatus,
  staffReply,
};