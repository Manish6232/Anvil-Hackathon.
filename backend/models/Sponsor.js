const mongoose = require("mongoose");

const sponsorSchema = new mongoose.Schema(
  {
    campaignId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Campaign",
      required: true,
    },

    name: {
      type: String,
      required: [true, "Sponsor name is required"],
      trim: true,
    },

    website: {
      type: String,
      trim: true,
      default: "",
    },

    category: {
      type: String,
      trim: true,
      default: "",
    },

    location: {
      type: String,
      trim: true,
      default: "",
    },

    fitScore: {
      type: Number,
      min: 0,
      max: 100,
      default: 0,
    },

    fitReason: {
      type: String,
      trim: true,
      default: "",
    },

    contactEmail: {
      type: String,
      trim: true,
      lowercase: true,
      default: "",
    },

    contactPage: {
      type: String,
      trim: true,
      default: "",
    },

    contactConfidence: {
      type: String,
      enum: ["LOW", "MEDIUM", "HIGH", "UNKNOWN"],
      default: "UNKNOWN",
    },

    status: {
      type: String,
      enum: [
        "DISCOVERED",
        "RESEARCHING",
        "CONTACT_FOUND",
        "FIT_SCORED",
        "PROPOSAL_GENERATED",
        "CONTACTED",
        "REPLIED",
        "INTERESTED",
        "NEGOTIATION",
        "CONFIRMED",
        "REJECTED",
        "FOLLOW_UP_DUE",
        "NO_RESPONSE",
      ],
      default: "DISCOVERED",
    },

    lastContactedAt: {
      type: Date,
      default: null,
    },

    nextFollowUpAt: {
      type: Date,
      default: null,
    },

    notes: {
      type: String,
      default: "",
    },

    sourceUrl: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Sponsor", sponsorSchema);