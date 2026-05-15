const Sponsor = require("../models/Sponsor");
const Campaign = require("../models/Campaign");

/**
 * @desc    Create sponsor manually
 * @route   POST /api/sponsors
 */
const createSponsor = async (req, res, next) => {
  try {
    const {
      campaignId,
      name,
      website,
      category,
      location,
      fitScore,
      fitReason,
      contactEmail,
      contactPage,
      contactConfidence,
      status,
      notes,
      sourceUrl,
    } = req.body;

    if (!campaignId || !name) {
      res.status(400);
      throw new Error("Campaign ID and sponsor name are required");
    }

    const campaign = await Campaign.findById(campaignId);

    if (!campaign) {
      res.status(404);
      throw new Error("Campaign not found");
    }

    const sponsor = await Sponsor.create({
      campaignId,
      name,
      website,
      category,
      location,
      fitScore,
      fitReason,
      contactEmail,
      contactPage,
      contactConfidence,
      status,
      notes,
      sourceUrl,
    });

    res.status(201).json({
      success: true,
      message: "Sponsor created successfully",
      data: sponsor,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get all sponsors
 * @route   GET /api/sponsors
 */
const getSponsors = async (req, res, next) => {
  try {
    const sponsors = await Sponsor.find()
      .populate("campaignId", "orgName eventName fundingGoal")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: sponsors.length,
      data: sponsors,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get sponsors by campaign
 * @route   GET /api/sponsors/campaign/:campaignId
 */
const getSponsorsByCampaign = async (req, res, next) => {
  try {
    const { campaignId } = req.params;

    const campaign = await Campaign.findById(campaignId);

    if (!campaign) {
      res.status(404);
      throw new Error("Campaign not found");
    }

    const sponsors = await Sponsor.find({ campaignId }).sort({
      fitScore: -1,
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      count: sponsors.length,
      data: sponsors,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get single sponsor
 * @route   GET /api/sponsors/:id
 */
const getSponsorById = async (req, res, next) => {
  try {
    const sponsor = await Sponsor.findById(req.params.id).populate(
      "campaignId",
      "orgName eventName audienceSize fundingGoal"
    );

    if (!sponsor) {
      res.status(404);
      throw new Error("Sponsor not found");
    }

    res.status(200).json({
      success: true,
      data: sponsor,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update sponsor
 * @route   PATCH /api/sponsors/:id
 */
const updateSponsor = async (req, res, next) => {
  try {
    const sponsor = await Sponsor.findById(req.params.id);

    if (!sponsor) {
      res.status(404);
      throw new Error("Sponsor not found");
    }

    const updatedSponsor = await Sponsor.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json({
      success: true,
      message: "Sponsor updated successfully",
      data: updatedSponsor,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update sponsor status
 * @route   PATCH /api/sponsors/:id/status
 */
const updateSponsorStatus = async (req, res, next) => {
  try {
    const { status } = req.body;

    if (!status) {
      res.status(400);
      throw new Error("Status is required");
    }

    const sponsor = await Sponsor.findById(req.params.id);

    if (!sponsor) {
      res.status(404);
      throw new Error("Sponsor not found");
    }

    sponsor.status = status;
    await sponsor.save();

    res.status(200).json({
      success: true,
      message: "Sponsor status updated successfully",
      data: sponsor,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Delete sponsor
 * @route   DELETE /api/sponsors/:id
 */
const deleteSponsor = async (req, res, next) => {
  try {
    const sponsor = await Sponsor.findById(req.params.id);

    if (!sponsor) {
      res.status(404);
      throw new Error("Sponsor not found");
    }

    await sponsor.deleteOne();

    res.status(200).json({
      success: true,
      message: "Sponsor deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createSponsor,
  getSponsors,
  getSponsorsByCampaign,
  getSponsorById,
  updateSponsor,
  updateSponsorStatus,
  deleteSponsor,
};