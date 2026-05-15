const Campaign = require("../models/Campaign");
const Sponsor = require("../models/Sponsor");
const Proposal = require("../models/Proposal");
const EmailLog = require("../models/EmailLog");
const WebhookEvent = require("../models/WebhookEvent");
const AgentRun = require("../models/AgentRun");

/**
 * @desc    Get full campaign report
 * @route   GET /api/reports/campaign/:campaignId
 */
const getCampaignFullReport = async (req, res, next) => {
  try {
    const { campaignId } = req.params;

    const campaign = await Campaign.findById(campaignId);

    if (!campaign) {
      res.status(404);
      throw new Error("Campaign not found");
    }

    const sponsors = await Sponsor.find({ campaignId });
    const proposals = await Proposal.find({ campaignId });
    const emails = await EmailLog.find({ campaignId });
    const webhooks = await WebhookEvent.find({ campaignId });
    const agentRuns = await AgentRun.find({ campaignId }).sort({
      createdAt: -1,
    });

    const sponsorsFound = sponsors.length;
    const proposalsCreated = proposals.length;
    const emailsDrafted = emails.filter((email) => email.status === "DRAFTED").length;
    const emailsSent = emails.filter((email) => email.status === "SENT").length;

    const interestedReplies = sponsors.filter(
      (sponsor) => sponsor.status === "INTERESTED"
    ).length;

    const rejected = sponsors.filter(
      (sponsor) => sponsor.status === "REJECTED"
    ).length;

    const negotiation = sponsors.filter(
      (sponsor) => sponsor.status === "NEGOTIATION"
    ).length;

    const followUpsDue = sponsors.filter(
      (sponsor) => sponsor.status === "FOLLOW_UP_DUE"
    ).length;

    const confirmed = sponsors.filter(
      (sponsor) => sponsor.status === "CONFIRMED"
    ).length;

    const expectedFunding =
      interestedReplies * 10000 + negotiation * 25000 + confirmed * 50000;

    const topSponsors = sponsors
      .sort((a, b) => b.fitScore - a.fitScore)
      .slice(0, 5)
      .map((sponsor) => ({
        id: sponsor._id,
        name: sponsor.name,
        category: sponsor.category,
        fitScore: sponsor.fitScore,
        status: sponsor.status,
        fitReason: sponsor.fitReason,
      }));

    const statusBreakdown = sponsors.reduce((acc, sponsor) => {
      acc[sponsor.status] = (acc[sponsor.status] || 0) + 1;
      return acc;
    }, {});

    const agentSummary = agentRuns.reduce((acc, run) => {
      acc.total += 1;

      if (run.status === "SUCCESS") acc.success += 1;
      if (run.status === "FAILED") acc.failed += 1;
      if (run.status === "RUNNING") acc.running += 1;

      return acc;
    }, {
      total: 0,
      success: 0,
      failed: 0,
      running: 0,
    });

    let nextAction = "Continue monitoring sponsor replies.";

    if (sponsorsFound === 0) {
      nextAction = "Start autonomous campaign workflow.";
    } else if (emailsDrafted > 0 && emailsSent === 0) {
      nextAction = "Review drafted outreach emails and send selected ones.";
    } else if (interestedReplies > 0 || negotiation > 0) {
      nextAction = "Prioritize interested sponsors and schedule calls.";
    } else if (followUpsDue > 0) {
      nextAction = "Send follow-up emails to sponsors marked as follow-up due.";
    }

    res.status(200).json({
      success: true,
      data: {
        campaign: {
          id: campaign._id,
          orgName: campaign.orgName,
          eventName: campaign.eventName,
          status: campaign.status,
          location: campaign.location,
          audienceSize: campaign.audienceSize,
          audienceType: campaign.audienceType,
          fundingGoal: campaign.fundingGoal,
          eventDate: campaign.eventDate,
          strategy: campaign.strategy,
        },

        metrics: {
          sponsorsFound,
          proposalsCreated,
          emailsDrafted,
          emailsSent,
          interestedReplies,
          rejected,
          negotiation,
          confirmed,
          followUpsDue,
          webhookEvents: webhooks.length,
          expectedFunding,
        },

        statusBreakdown,
        topSponsors,
        agentSummary,
        nextAction,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get agent activity timeline
 * @route   GET /api/reports/campaign/:campaignId/agents
 */
const getAgentTimeline = async (req, res, next) => {
  try {
    const { campaignId } = req.params;

    const agentRuns = await AgentRun.find({ campaignId }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      count: agentRuns.length,
      data: agentRuns,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get campaign pipeline summary
 * @route   GET /api/reports/campaign/:campaignId/pipeline
 */
const getPipelineSummary = async (req, res, next) => {
  try {
    const { campaignId } = req.params;

    const sponsors = await Sponsor.find({ campaignId }).sort({
      fitScore: -1,
    });

    const pipeline = {
      DISCOVERED: [],
      RESEARCHING: [],
      CONTACT_FOUND: [],
      FIT_SCORED: [],
      PROPOSAL_GENERATED: [],
      CONTACTED: [],
      REPLIED: [],
      INTERESTED: [],
      NEGOTIATION: [],
      CONFIRMED: [],
      REJECTED: [],
      FOLLOW_UP_DUE: [],
      NO_RESPONSE: [],
    };

    sponsors.forEach((sponsor) => {
      if (!pipeline[sponsor.status]) {
        pipeline[sponsor.status] = [];
      }

      pipeline[sponsor.status].push({
        id: sponsor._id,
        name: sponsor.name,
        category: sponsor.category,
        fitScore: sponsor.fitScore,
        contactEmail: sponsor.contactEmail,
        contactConfidence: sponsor.contactConfidence,
        nextFollowUpAt: sponsor.nextFollowUpAt,
        fitReason: sponsor.fitReason,
      });
    });

    res.status(200).json({
      success: true,
      data: pipeline,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getCampaignFullReport,
  getAgentTimeline,
  getPipelineSummary,
};