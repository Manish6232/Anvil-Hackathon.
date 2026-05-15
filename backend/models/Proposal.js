const mongoose = require("mongoose");

const sponsorshipTierSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    amount: {
      type: Number,
      required: true,
      min: 0,
    },

    benefits: {
      type: [String],
      default: [],
    },
  },
  { _id: false }
);

const proposalSchema = new mongoose.Schema(
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

    emailSubject: {
      type: String,
      required: true,
      trim: true,
    },

    emailBody: {
      type: String,
      required: true,
    },

    proposalHtml: {
      type: String,
      default: "",
    },

    proposalPdfUrl: {
      type: String,
      default: "",
    },

    sponsorshipTiers: {
      type: [sponsorshipTierSchema],
      default: [],
    },

    status: {
      type: String,
      enum: ["DRAFT", "READY", "SENT", "ARCHIVED"],
      default: "READY",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Proposal", proposalSchema);