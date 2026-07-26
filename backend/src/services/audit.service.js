"use strict";

const AuditLog = require("../models/AuditLog");

function toId(value) {
  if (!value) return null;
  if (typeof value === "object" && value._id) return value._id;
  return value;
}

function clientIp(req) {
  if (!req) return undefined;
  const forwarded = req.headers?.["x-forwarded-for"];
  if (typeof forwarded === "string" && forwarded.length) return forwarded.split(",")[0].trim();
  return req.ip || req.socket?.remoteAddress || undefined;
}

/**
 * Fire-and-forget audit trail write. Auditing must never break the request it describes,
 * so every failure is logged and swallowed.
 */
async function record({ actor, action, targetUser, meta, req } = {}) {
  try {
    if (!action) return null;
    return await AuditLog.create({
      actor: toId(actor),
      actorRole: (actor && actor.role) || (actor ? undefined : "system"),
      action,
      targetUser: toId(targetUser),
      meta,
      ip: clientIp(req),
    });
  } catch (err) {
    console.error(`[audit] failed to record "${action}":`, err.message);
    return null;
  }
}

module.exports = { record };
