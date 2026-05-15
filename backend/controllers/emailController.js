const EmailLog = require("../models/EmailLog");
const Sponsor = require("../models/Sponsor");
const Proposal = require("../models/Proposal");
const emailAgent = require("../agents/emailAgent");

/**
 * @desc    Draft outreach email for sponsor
 * @route   POST /api/emails/sponsor/:sponsorId/draft
 */
const draftEmailForSponsor = async (req, res, next) => {
  try {
    const sponsor = await Sponsor.findById(req.params.sponsorId);

    if (!sponsor) {
      res.status(404);
      throw new Error("Sponsor not found");
    }

    const proposal = await Proposal.findOne({ sponsorId: sponsor._id });

    if (!proposal) {
      res.status(404);
      throw new Error("Proposal not found for this sponsor");
    }

    const draftedEmail = await emailAgent({
      sponsor: sponsor.toObject(),
      proposal: proposal.toObject(),
      mode: "DRAFT",
    });

    const emailLog = await EmailLog.create({
      campaignId: sponsor.campaignId,
      sponsorId: sponsor._id,
      proposalId: proposal._id,
      to: draftedEmail.to,
      subject: draftedEmail.subject,
      body: draftedEmail.body,
      type: draftedEmail.type,
      status: draftedEmail.status,
      providerMessageId: draftedEmail.providerMessageId,
    });

    res.status(201).json({
      success: true,
      message: "Email drafted successfully",
      data: emailLog,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Simulate sending email for sponsor
 * @route   POST /api/emails/sponsor/:sponsorId/send
 */
const sendEmailForSponsor = async (req, res, next) => {
  try {
    const sponsor = await Sponsor.findById(req.params.sponsorId);

    if (!sponsor) {
      res.status(404);
      throw new Error("Sponsor not found");
    }

    const proposal = await Proposal.findOne({ sponsorId: sponsor._id });

    if (!proposal) {
      res.status(404);
      throw new Error("Proposal not found for this sponsor");
    }

    const sentEmail = await emailAgent({
      sponsor: sponsor.toObject(),
      proposal: proposal.toObject(),
      mode: "SEND",
    });

    const emailLog = await EmailLog.create({
      campaignId: sponsor.campaignId,
      sponsorId: sponsor._id,
      proposalId: proposal._id,
      to: sentEmail.to,
      subject: sentEmail.subject,
      body: sentEmail.body,
      type: sentEmail.type,
      status: sentEmail.status,
      providerMessageId: sentEmail.providerMessageId,
      sentAt: sentEmail.sentAt,
    });

    sponsor.status = "CONTACTED";
    sponsor.lastContactedAt = new Date();

    const followUpDate = new Date();
    followUpDate.setDate(followUpDate.getDate() + 2);
    sponsor.nextFollowUpAt = followUpDate;

    await sponsor.save();

    proposal.status = "SENT";
    await proposal.save();

    res.status(201).json({
      success: true,
      message: "Email sent successfully",
      data: emailLog,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get email logs by campaign
 * @route   GET /api/emails/campaign/:campaignId
 */
const getEmailsByCampaign = async (req, res, next) => {
  try {
    const emails = await EmailLog.find({
      campaignId: req.params.campaignId,
    })
      .populate("sponsorId", "name category status fitScore")
      .populate("proposalId", "emailSubject status")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: emails.length,
      data: emails,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get email logs by sponsor
 * @route   GET /api/emails/sponsor/:sponsorId
 */
const getEmailsBySponsor = async (req, res, next) => {
  try {
    const emails = await EmailLog.find({
      sponsorId: req.params.sponsorId,
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: emails.length,
      data: emails,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  draftEmailForSponsor,
  sendEmailForSponsor,
  getEmailsByCampaign,
  getEmailsBySponsor,
};