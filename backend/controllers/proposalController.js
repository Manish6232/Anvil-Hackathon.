const Proposal = require("../models/Proposal");
const Sponsor = require("../models/Sponsor");
const Campaign = require("../models/Campaign");
const proposalAgent = require("../agents/proposalAgent");

/**
 * @desc    Generate proposal for sponsor
 * @route   POST /api/proposals/sponsor/:sponsorId/generate
 */
const generateProposalForSponsor = async (req, res, next) => {
  try {
    const sponsor = await Sponsor.findById(req.params.sponsorId);

    if (!sponsor) {
      res.status(404);
      throw new Error("Sponsor not found");
    }

    const campaign = await Campaign.findById(sponsor.campaignId);

    if (!campaign) {
      res.status(404);
      throw new Error("Campaign not found");
    }

    const generatedProposal = await proposalAgent({
      campaign: campaign.toObject(),
      sponsor: sponsor.toObject(),
    });

    const proposal = await Proposal.create({
      campaignId: campaign._id,
      sponsorId: sponsor._id,
      ...generatedProposal,
    });

    sponsor.status = "PROPOSAL_GENERATED";
    await sponsor.save();

    res.status(201).json({
      success: true,
      message: "Proposal generated successfully",
      data: proposal,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get proposals by campaign
 * @route   GET /api/proposals/campaign/:campaignId
 */
const getProposalsByCampaign = async (req, res, next) => {
  try {
    const proposals = await Proposal.find({
      campaignId: req.params.campaignId,
    })
      .populate("sponsorId", "name category fitScore status")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: proposals.length,
      data: proposals,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get proposal by sponsor
 * @route   GET /api/proposals/sponsor/:sponsorId
 */
const getProposalBySponsor = async (req, res, next) => {
  try {
    const proposal = await Proposal.findOne({
      sponsorId: req.params.sponsorId,
    })
      .populate("campaignId", "orgName eventName fundingGoal")
      .populate("sponsorId", "name website category fitScore status");

    if (!proposal) {
      res.status(404);
      throw new Error("Proposal not found for this sponsor");
    }

    res.status(200).json({
      success: true,
      data: proposal,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get single proposal
 * @route   GET /api/proposals/:id
 */
const getProposalById = async (req, res, next) => {
  try {
    const proposal = await Proposal.findById(req.params.id)
      .populate("campaignId")
      .populate("sponsorId");

    if (!proposal) {
      res.status(404);
      throw new Error("Proposal not found");
    }

    res.status(200).json({
      success: true,
      data: proposal,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Delete proposal
 * @route   DELETE /api/proposals/:id
 */
const deleteProposal = async (req, res, next) => {
  try {
    const proposal = await Proposal.findById(req.params.id);

    if (!proposal) {
      res.status(404);
      throw new Error("Proposal not found");
    }

    await proposal.deleteOne();

    res.status(200).json({
      success: true,
      message: "Proposal deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  generateProposalForSponsor,
  getProposalsByCampaign,
  getProposalBySponsor,
  getProposalById,
  deleteProposal,
};