"use strict";

const mongoose = require("mongoose");

const settingsSchema = new mongoose.Schema(
  {
    general: {
      serverName: {
        type: String,
        default: "Blood Steal SMP",
        trim: true,
      },

      serverDescription: {
        type: String,
        default: "",
        trim: true,
      },

      serverIp: {
        type: String,
        default: "",
        trim: true,
      },

      serverVersion: {
        type: String,
        default: "1.21.x",
        trim: true,
      },

      maintenanceMode: {
        type: Boolean,
        default: false,
      },

      maintenanceMessage: {
        type: String,
        default: "",
        trim: true,
      },
    },

    store: {
      enabled: {
        type: Boolean,
        default: true,
      },

      currency: {
        type: String,
        default: "INR",
        uppercase: true,
      },

      upiId: {
        type: String,
        default: "",
        trim: true,
      },

      qrCode: {
        type: String,
        default: "",
        trim: true,
      },

      paymentInstructions: {
        type: String,
        default:
          "Pay using any UPI app and upload your payment screenshot along with the transaction ID.",
      },
    },

    discord: {
      invite: {
        type: String,
        default: "",
        trim: true,
      },

      supportChannel: {
        type: String,
        default: "",
        trim: true,
      },

      ticketChannel: {
        type: String,
        default: "",
        trim: true,
      },
    },

    branding: {
      logo: {
        type: String,
        default: "",
        trim: true,
      },

      favicon: {
        type: String,
        default: "",
        trim: true,
      },

      heroImage: {
        type: String,
        default: "",
        trim: true,
      },

      primaryColor: {
        type: String,
        default: "#dc2626",
      },

      secondaryColor: {
        type: String,
        default: "#111827",
      },
    },

    socials: {
      youtube: {
        type: String,
        default: "",
        trim: true,
      },

      discord: {
        type: String,
        default: "",
        trim: true,
      },

      instagram: {
        type: String,
        default: "",
        trim: true,
      },

      github: {
        type: String,
        default: "",
        trim: true,
      },

      twitter: {
        type: String,
        default: "",
        trim: true,
      },
    },

    seo: {
      title: {
        type: String,
        default: "Blood Steal SMP",
      },

      description: {
        type: String,
        default: "",
      },

      keywords: {
        type: [String],
        default: [],
      },
    },

    footer: {
      copyright: {
        type: String,
        default: "",
      },

      termsUrl: {
        type: String,
        default: "",
      },

      privacyUrl: {
        type: String,
        default: "",
      },
    },
  },
  {
    timestamps: true,
  }
);

settingsSchema.methods.toPublicJSON = function () {
  return {
    general: this.general,
    store: this.store,
    discord: this.discord,
    branding: this.branding,
    socials: this.socials,
    seo: this.seo,
    footer: this.footer,
  };
};

module.exports = mongoose.model(
  "Settings",
  settingsSchema
);