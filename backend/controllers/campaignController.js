const Campaign = require("../models/Campaign");
const { startCampaignWorkflow } = require("../orchestrator/campaignOrchestrator");

/**
 * @desc    Create new campaign
 * @route   POST /api/campaigns
 * @access  Public
 */
const createCampaign = async (req, res, next) => {
  try {
    const {
      orgName,
      eventName,
      description,
      location,
      audienceSize,
      audienceType,
      fundingGoal,
      needs,
      eventDate,
    } = req.body;

    if (
      !orgName ||
      !eventName ||
      !description ||
      !location ||
      !audienceSize ||
      !audienceType ||
      fundingGoal === undefined ||
      !eventDate
    ) {
      res.status(400);
      throw new Error("Please provide all required campaign fields");
    }

    const campaign = await Campaign.create({
      orgName,
      eventName,
      description,
      location,
      audienceSize,
      audienceType,
      fundingGoal,
      needs: Array.isArray(needs) ? needs : [],
      eventDate,
    });

    res.status(201).json({
      success: true,
      message: "Campaign created successfully",
      data: campaign,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get all campaigns
 * @route   GET /api/campaigns
 * @access  Public
 */
const getCampaigns = async (req, res, next) => {
  try {
    const campaigns = await Campaign.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: campaigns.length,
      data: campaigns,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get single campaign by id
 * @route   GET /api/campaigns/:id
 * @access  Public
 */
const getCampaignById = async (req, res, next) => {
  try {
    const campaign = await Campaign.findById(req.params.id);

    if (!campaign) {
      res.status(404);
      throw new Error("Campaign not found");
    }

    res.status(200).json({
      success: true,
      data: campaign,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update campaign
 * @route   PATCH /api/campaigns/:id
 * @access  Public
 */
const updateCampaign = async (req, res, next) => {
  try {
    const campaign = await Campaign.findById(req.params.id);

    if (!campaign) {
      res.status(404);
      throw new Error("Campaign not found");
    }

    const updatedCampaign = await Campaign.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json({
      success: true,
      message: "Campaign updated successfully",
      data: updatedCampaign,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Delete campaign
 * @route   DELETE /api/campaigns/:id
 * @access  Public
 */
const deleteCampaign = async (req, res, next) => {
  try {
    const campaign = await Campaign.findById(req.params.id);

    if (!campaign) {
      res.status(404);
      throw new Error("Campaign not found");
    }

    await campaign.deleteOne();

    res.status(200).json({
      success: true,
      message: "Campaign deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Start autonomous campaign workflow
 * @route   POST /api/campaigns/:id/start
 * @access  Public
 */
const startCampaign = async (req, res, next) => {
  try {
    const result = await startCampaignWorkflow(req.params.id);

    res.status(200).json({
      success: true,
      message: "Autonomous campaign workflow started successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get campaign report
 * @route   GET /api/campaigns/:id/report
 * @access  Public
 */
const getCampaignReport = async (req, res, next) => {
  try {
    const campaign = await Campaign.findById(req.params.id);

    if (!campaign) {
      res.status(404);
      throw new Error("Campaign not found");
    }

    const report = {
      campaignId: campaign._id,
      orgName: campaign.orgName,
      eventName: campaign.eventName,
      status: campaign.status,
      fundingGoal: campaign.fundingGoal,
      sponsorsFound: 0,
      emailsSent: 0,
      interestedReplies: 0,
      rejected: 0,
      followUpsDue: 0,
      expectedFunding: 0,
      nextAction:
        campaign.status === "PLANNING"
          ? "Run sponsor discovery agent"
          : "Start campaign workflow",
      strategy: campaign.strategy,
    };

    res.status(200).json({
      success: true,
      data: report,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createCampaign,
  getCampaigns,
  getCampaignById,
  updateCampaign,
  deleteCampaign,
  startCampaign,
  getCampaignReport,
};