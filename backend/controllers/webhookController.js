const WebhookEvent = require("../models/WebhookEvent");
const Sponsor = require("../models/Sponsor");
const Campaign = require("../models/Campaign");
const EmailLog = require("../models/EmailLog");

const replyClassifierAgent = require("../agents/replyClassifierAgent");
const followUpAgent = require("../agents/followUpAgent");

/**
 * @desc    Demo webhook for sponsor replies
 * @route   POST /api/webhooks/demo-reply
 */
const handleDemoReply = async (req, res, next) => {
  try {
    const { sponsorId, message } = req.body;

    if (!sponsorId || !message) {
      res.status(400);
      throw new Error("sponsorId and message are required");
    }

    const sponsor = await Sponsor.findById(sponsorId);

    if (!sponsor) {
      res.status(404);
      throw new Error("Sponsor not found");
    }

    const campaign = await Campaign.findById(sponsor.campaignId);

    if (!campaign) {
      res.status(404);
      throw new Error("Campaign not found");
    }

    const webhookEvent = await WebhookEvent.create({
      type: "DEMO_REPLY",
      campaignId: campaign._id,
      sponsorId: sponsor._id,
      payload: {
        message,
      },
      processed: false,
    });

    const classification = await replyClassifierAgent({ message });

    let newSponsorStatus = "REPLIED";

    if (classification.category === "INTERESTED") {
      newSponsorStatus = "INTERESTED";
    } else if (classification.category === "MEETING_REQUESTED") {
      newSponsorStatus = "NEGOTIATION";
    } else if (classification.category === "REJECTED") {
      newSponsorStatus = "REJECTED";
    } else if (classification.category === "FOLLOW_UP_DUE") {
      newSponsorStatus = "FOLLOW_UP_DUE";
    } else if (classification.category === "WRONG_CONTACT") {
      newSponsorStatus = "REPLIED";
    }

    sponsor.status = newSponsorStatus;

    if (classification.category === "FOLLOW_UP_DUE") {
      const nextFollowUp = new Date();
      nextFollowUp.setDate(nextFollowUp.getDate() + 3);
      sponsor.nextFollowUpAt = nextFollowUp;
    }

    await sponsor.save();

    const followUpDraft = await followUpAgent({
      sponsor: sponsor.toObject(),
      campaign: campaign.toObject(),
      classification,
      originalMessage: message,
    });

    const emailLog = await EmailLog.create({
      campaignId: campaign._id,
      sponsorId: sponsor._id,
      to: sponsor.contactEmail || "unknown@example.com",
      subject: followUpDraft.subject,
      body: followUpDraft.body,
      type: followUpDraft.type,
      status: "DRAFTED",
      providerMessageId: `reply_draft_${Date.now()}`,
      replyReceivedAt: new Date(),
    });

    webhookEvent.processed = true;
    webhookEvent.processedAt = new Date();
    webhookEvent.result = {
      classification,
      sponsorStatus: sponsor.status,
      followUpEmailId: emailLog._id,
    };

    await webhookEvent.save();

    res.status(200).json({
      success: true,
      message: "Webhook reply processed successfully",
      data: {
        webhookEvent,
        sponsor,
        classification,
        followUpDraft: emailLog,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get webhooks by campaign
 * @route   GET /api/webhooks/campaign/:campaignId
 */
const getWebhooksByCampaign = async (req, res, next) => {
  try {
    const events = await WebhookEvent.find({
      campaignId: req.params.campaignId,
    })
      .populate("sponsorId", "name status fitScore")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: events.length,
      data: events,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get all webhook events
 * @route   GET /api/webhooks
 */
const getAllWebhooks = async (req, res, next) => {
  try {
    const events = await WebhookEvent.find()
      .populate("campaignId", "orgName eventName")
      .populate("sponsorId", "name status")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: events.length,
      data: events,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  handleDemoReply,
  getWebhooksByCampaign,
  getAllWebhooks,
};