"use strict";

const ticketService = require("../services/ticket.service");

/*
|--------------------------------------------------------------------------
| User
|--------------------------------------------------------------------------
*/

async function createTicket(req, res, next) {
  try {
    const ticket = await ticketService.createTicket(
      req.user._id,
      req.body
    );

    res.status(201).json({
      success: true,
      data: ticket,
    });
  } catch (err) {
    next(err);
  }
}

async function getMyTickets(req, res, next) {
  try {
    const tickets = await ticketService.getMyTickets(
      req.user._id
    );

    res.json({
      success: true,
      data: tickets,
    });
  } catch (err) {
    next(err);
  }
}

async function getTicket(req, res, next) {
  try {
    const ticket = await ticketService.getTicket(
      req.user._id,
      req.params.id
    );

    res.json({
      success: true,
      data: ticket,
    });
  } catch (err) {
    next(err);
  }
}

async function replyToTicket(req, res, next) {
  try {
    const ticket = await ticketService.replyToTicket(
      req.user._id,
      req.params.id,
      req.body.message
    );

    res.json({
      success: true,
      data: ticket,
    });
  } catch (err) {
    next(err);
  }
}

/*
|--------------------------------------------------------------------------
| Staff
|--------------------------------------------------------------------------
*/

async function getAllTickets(req, res, next) {
  try {
    const tickets = await ticketService.getAllTickets();

    res.json({
      success: true,
      data: tickets,
    });
  } catch (err) {
    next(err);
  }
}

async function assignTicket(req, res, next) {
  try {
    const ticket = await ticketService.assignTicket(
      req.params.id,
      req.body.staffId
    );

    res.json({
      success: true,
      data: ticket,
    });
  } catch (err) {
    next(err);
  }
}

async function updateStatus(req, res, next) {
  try {
    const ticket = await ticketService.updateStatus(
      req.params.id,
      req.body.status
    );

    res.json({
      success: true,
      data: ticket,
    });
  } catch (err) {
    next(err);
  }
}

async function staffReply(req, res, next) {
  try {
    const ticket = await ticketService.staffReply(
      req.params.id,
      req.user,
      req.body.message,
      req.body.internal
    );

    res.json({
      success: true,
      data: ticket,
    });
  } catch (err) {
    next(err);
  }
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