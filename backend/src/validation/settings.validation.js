"use strict";

const { z } = require("zod");

const colorRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;

const urlOrEmpty = z
  .string()
  .trim()
  .refine(
    (value) =>
      value === "" ||
      /^https?:\/\/.+/i.test(value),
    {
      message: "Must be a valid URL.",
    }
  );

const generalSchema = z.object({
  serverName: z
    .string()
    .trim()
    .min(1)
    .max(100)
    .optional(),

  serverDescription: z
    .string()
    .trim()
    .max(500)
    .optional(),

  serverIp: z
    .string()
    .trim()
    .max(100)
    .optional(),

  serverVersion: z
    .string()
    .trim()
    .max(50)
    .optional(),

  maintenanceMode: z
    .boolean()
    .optional(),

  maintenanceMessage: z
    .string()
    .trim()
    .max(500)
    .optional(),
});

const storeSchema = z.object({
  enabled: z.boolean().optional(),

  currency: z
    .string()
    .trim()
    .max(10)
    .optional(),

  upiId: z
    .string()
    .trim()
    .max(100)
    .optional(),

  qrCode: urlOrEmpty.optional(),

  paymentInstructions: z
    .string()
    .trim()
    .max(1000)
    .optional(),
});

const discordSchema = z.object({
  invite: urlOrEmpty.optional(),

  supportChannel: z
    .string()
    .trim()
    .max(100)
    .optional(),

  ticketChannel: z
    .string()
    .trim()
    .max(100)
    .optional(),
});

const brandingSchema = z.object({
  logo: urlOrEmpty.optional(),

  favicon: urlOrEmpty.optional(),

  heroImage: urlOrEmpty.optional(),

  primaryColor: z
    .string()
    .regex(colorRegex)
    .optional(),

  secondaryColor: z
    .string()
    .regex(colorRegex)
    .optional(),
});

const socialsSchema = z.object({
  youtube: urlOrEmpty.optional(),
  discord: urlOrEmpty.optional(),
  instagram: urlOrEmpty.optional(),
  github: urlOrEmpty.optional(),
  twitter: urlOrEmpty.optional(),
});

const seoSchema = z.object({
  title: z
    .string()
    .trim()
    .max(100)
    .optional(),

  description: z
    .string()
    .trim()
    .max(500)
    .optional(),

  keywords: z
    .array(z.string().trim())
    .optional(),
});

const footerSchema = z.object({
  copyright: z
    .string()
    .trim()
    .max(200)
    .optional(),

  termsUrl: urlOrEmpty.optional(),

  privacyUrl: urlOrEmpty.optional(),
});

const updateSettingsSchema = z.object({
  general: generalSchema.optional(),
  store: storeSchema.optional(),
  discord: discordSchema.optional(),
  branding: brandingSchema.optional(),
  socials: socialsSchema.optional(),
  seo: seoSchema.optional(),
  footer: footerSchema.optional(),
});

module.exports = {
  updateSettingsSchema,
};