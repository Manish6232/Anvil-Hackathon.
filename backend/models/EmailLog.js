const mongoose = require("mongoose");

const emailLogSchema = new mongoose.Schema(
  {
    campaignId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Campaign",
      required: true,
    },

    sponsorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Sponsor",
      required: true,
    },

    proposalId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Proposal",
      default: null,
    },

    to: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },

    from: {
      type: String,
      trim: true,
      lowercase: true,
      default: "fundforge@example.com",
    },

    subject: {
      type: String,
      required: true,
      trim: true,
    },

    body: {
      type: String,
      required: true,
    },

    type: {
      type: String,
      enum: ["OUTREACH", "FOLLOW_UP", "REPLY", "INFO_REQUEST", "MEETING"],
      default: "OUTREACH",
    },

    status: {
      type: String,
      enum: ["DRAFTED", "SENT", "FAILED", "REPLIED"],
      default: "DRAFTED",
    },

    providerMessageId: {
      type: String,
      default: "",
    },

    error: {
      type: String,
      default: "",
    },

    sentAt: {
      type: Date,
      default: null,
    },

    replyReceivedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("EmailLog", emailLogSchema);