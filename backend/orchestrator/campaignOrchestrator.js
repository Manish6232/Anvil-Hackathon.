const Campaign = require("../models/Campaign");
const Sponsor = require("../models/Sponsor");
const Proposal = require("../models/Proposal");
const EmailLog = require("../models/EmailLog");

const runAgent = require("./agentRunner");

const plannerAgent = require("../agents/plannerAgent");
const sponsorDiscoveryAgent = require("../agents/sponsorDiscoveryAgent");
const fitScoringAgent = require("../agents/fitScoringAgent");
const proposalAgent = require("../agents/proposalAgent");
const emailAgent = require("../agents/emailAgent");

const startCampaignWorkflow = async (campaignId) => {
  const campaign = await Campaign.findById(campaignId);

  if (!campaign) {
    throw new Error("Campaign not found");
  }

  campaign.status = "PLANNING";
  await campaign.save();

  const strategy = await runAgent({
    campaignId: campaign._id,
    agentName: "Planner Agent",
    input: campaign.toObject(),
    handler: plannerAgent,
  });

  campaign.strategy = strategy;
  campaign.status = "DISCOVERING_SPONSORS";
  await campaign.save();

  const discoveredSponsors = await runAgent({
    campaignId: campaign._id,
    agentName: "Sponsor Discovery Agent",
    input: campaign.toObject(),
    handler: sponsorDiscoveryAgent,
  });

  const savedSponsors = [];
  const savedProposals = [];
  const savedEmails = [];

  for (const sponsor of discoveredSponsors) {
    const scoreResult = await runAgent({
      campaignId: campaign._id,
      agentName: "Fit Scoring Agent",
      input: {
        sponsor,
        campaign: campaign.toObject(),
      },
      handler: fitScoringAgent,
    });

    const savedSponsor = await Sponsor.create({
      campaignId: campaign._id,
      name: sponsor.name,
      website: sponsor.website,
      category: sponsor.category,
      location: sponsor.location,
      contactEmail: sponsor.contactEmail,
      contactConfidence: sponsor.contactConfidence || "UNKNOWN",
      sourceUrl: sponsor.sourceUrl,
      fitScore: scoreResult.fitScore,
      fitReason: scoreResult.fitReason,
      status: "FIT_SCORED",
    });

    savedSponsors.push(savedSponsor);

    const generatedProposal = await runAgent({
      campaignId: campaign._id,
      sponsorId: savedSponsor._id,
      agentName: "Proposal Agent",
      input: {
        campaign: campaign.toObject(),
        sponsor: savedSponsor.toObject(),
      },
      handler: proposalAgent,
    });

    const savedProposal = await Proposal.create({
      campaignId: campaign._id,
      sponsorId: savedSponsor._id,
      emailSubject: generatedProposal.emailSubject,
      emailBody: generatedProposal.emailBody,
      proposalHtml: generatedProposal.proposalHtml,
      sponsorshipTiers: generatedProposal.sponsorshipTiers,
      status: generatedProposal.status || "READY",
    });

    savedProposals.push(savedProposal);

    const draftedEmail = await runAgent({
      campaignId: campaign._id,
      sponsorId: savedSponsor._id,
      agentName: "Email Outreach Agent",
      input: {
        sponsor: savedSponsor.toObject(),
        proposal: savedProposal.toObject(),
        mode: "DRAFT",
      },
      handler: emailAgent,
    });

    const savedEmail = await EmailLog.create({
      campaignId: campaign._id,
      sponsorId: savedSponsor._id,
      proposalId: savedProposal._id,
      to: draftedEmail.to,
      subject: draftedEmail.subject,
      body: draftedEmail.body,
      type: draftedEmail.type,
      status: draftedEmail.status,
      providerMessageId: draftedEmail.providerMessageId,
      sentAt: draftedEmail.sentAt,
    });

    savedEmails.push(savedEmail);

    savedSponsor.status = "PROPOSAL_GENERATED";
    await savedSponsor.save();
  }

  campaign.status = "OUTREACH_RUNNING";
  await campaign.save();

  return {
    campaign,
    strategy,
    sponsorsCreated: savedSponsors.length,
    proposalsCreated: savedProposals.length,
    emailsDrafted: savedEmails.length,
    sponsors: savedSponsors,
    proposals: savedProposals,
    emails: savedEmails,
  };
};

module.exports = {
  startCampaignWorkflow,
};