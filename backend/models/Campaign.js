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

const campaignSchema = new mongoose.Schema(
  {
    orgName: {
      type: String,
      required: [true, "Organization name is required"],
      trim: true,
    },

    eventName: {
      type: String,
      required: [true, "Event name is required"],
      trim: true,
    },

    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
    },

    location: {
      type: String,
      required: [true, "Location is required"],
      trim: true,
    },

    audienceSize: {
      type: Number,
      required: [true, "Audience size is required"],
      min: [1, "Audience size must be at least 1"],
    },

    audienceType: {
      type: String,
      required: [true, "Audience type is required"],
      trim: true,
    },

    fundingGoal: {
      type: Number,
      required: [true, "Funding goal is required"],
      min: [0, "Funding goal cannot be negative"],
    },

    needs: {
      type: [String],
      default: [],
    },

    eventDate: {
      type: Date,
      required: [true, "Event date is required"],
    },

    status: {
      type: String,
      enum: [
        "DRAFT",
        "PLANNING",
        "DISCOVERING_SPONSORS",
        "GENERATING_PROPOSALS",
        "OUTREACH_RUNNING",
        "WAITING_FOR_REPLIES",
        "COMPLETED",
        "FAILED",
      ],
      default: "DRAFT",
    },

    strategy: {
      sponsorCategories: {
        type: [String],
        default: [],
      },

      outreachGoal: {
        type: Number,
        default: 0,
      },

      expectedPositiveReplies: {
        type: String,
        default: "",
      },

      sponsorshipTiers: {
        type: [sponsorshipTierSchema],
        default: [],
      },

      notes: {
        type: String,
        default: "",
      },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Campaign", campaignSchema);