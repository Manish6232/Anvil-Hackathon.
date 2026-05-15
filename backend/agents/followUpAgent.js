const followUpAgent = async ({ sponsor, campaign, classification, originalMessage }) => {
  if (!sponsor || !campaign || !classification) {
    throw new Error("Sponsor, campaign, and classification are required");
  }

  let subject = `Re: Sponsorship Opportunity - ${campaign.eventName}`;
  let body = "";

  if (classification.category === "INTERESTED") {
    body = `Dear ${sponsor.name} Team,

Thank you for your interest in supporting ${campaign.eventName}.

Here are the key event details:

Event: ${campaign.eventName}
Organization: ${campaign.orgName}
Location: ${campaign.location}
Audience Size: ${campaign.audienceSize}+
Audience Type: ${campaign.audienceType}
Funding Goal: ₹${campaign.fundingGoal}

Suggested sponsorship tiers:

${campaign.strategy.sponsorshipTiers
  .map(
    (tier) =>
      `${tier.name} - ₹${tier.amount}\nBenefits: ${tier.benefits.join(", ")}`
  )
  .join("\n\n")}

We would be happy to customize the package based on your brand goals.

Regards,
${campaign.orgName}
FundForge AI Outreach Team`;
  } else if (classification.category === "MEETING_REQUESTED") {
    body = `Dear ${sponsor.name} Team,

Thank you for your response.

We would be happy to schedule a short meeting to discuss collaboration for ${campaign.eventName}.

Suggested agenda:
1. Event overview
2. Audience and brand visibility
3. Sponsorship tiers
4. Custom collaboration options

Please share a convenient time, and we will coordinate accordingly.

Regards,
${campaign.orgName}
FundForge AI Outreach Team`;
  } else if (classification.category === "WRONG_CONTACT") {
    body = `Dear ${sponsor.name} Team,

Thank you for letting us know.

Could you please connect us with the right person or team handling partnerships, sponsorships, or campus collaborations?

Regards,
${campaign.orgName}
FundForge AI Outreach Team`;
  } else if (classification.category === "FOLLOW_UP_DUE") {
    body = `Dear ${sponsor.name} Team,

Thank you for your response.

We will follow up at a more convenient time regarding the sponsorship opportunity for ${campaign.eventName}.

Regards,
${campaign.orgName}
FundForge AI Outreach Team`;
  } else if (classification.category === "REJECTED") {
    body = `Dear ${sponsor.name} Team,

Thank you for your response.

We understand and appreciate you taking the time to consider our sponsorship request for ${campaign.eventName}.

Regards,
${campaign.orgName}`;
  } else {
    body = `Dear ${sponsor.name} Team,

Thank you for your response.

Sharing a few more details about ${campaign.eventName}:

The event is organized by ${campaign.orgName} in ${campaign.location} for ${campaign.audienceSize}+ ${campaign.audienceType}.

We are looking for support around:
${campaign.needs.map((need) => `- ${need}`).join("\n")}

Please let us know what additional information would help your team evaluate this opportunity.

Regards,
${campaign.orgName}
FundForge AI Outreach Team`;
  }

  return {
    subject,
    body,
    type:
      classification.category === "MEETING_REQUESTED"
        ? "MEETING"
        : classification.category === "INTERESTED"
        ? "INFO_REQUEST"
        : "FOLLOW_UP",
    status: "DRAFTED",
    recommendedAction: classification.nextAction,
  };
};

module.exports = followUpAgent;