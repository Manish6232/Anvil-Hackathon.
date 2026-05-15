const mongoose = require("mongoose");

const webhookEventSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      required: true,
      enum: [
        "EMAIL_REPLY",
        "SPONSOR_INTEREST",
        "FOLLOWUP_DUE",
        "DEMO_REPLY",
        "MEETING_REQUESTED",
        "SPONSOR_REJECTED",
      ],
    },

    campaignId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Campaign",
      default: null,
    },

    sponsorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Sponsor",
      default: null,
    },

    payload: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },

    processed: {
      type: Boolean,
      default: false,
    },

    result: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },

    error: {
      type: String,
      default: "",
    },

    receivedAt: {
      type: Date,
      default: Date.now,
    },

    processedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("WebhookEvent", webhookEventSchema);