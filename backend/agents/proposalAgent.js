const proposalAgent = async ({ campaign, sponsor }) => {
  const tiers = campaign.strategy?.sponsorshipTiers || [
    {
      name: "Bronze",
      amount: 5000,
      benefits: ["Logo on poster", "Social media mention"],
    },
    {
      name: "Silver",
      amount: 10000,
      benefits: ["Logo on poster", "Instagram post", "Certificate branding"],
    },
    {
      name: "Gold",
      amount: 25000,
      benefits: ["Premium branding", "Event mention", "Stall space"],
    },
  ];

  const emailSubject = `Sponsorship Opportunity: ${campaign.eventName} x ${sponsor.name}`;

  const emailBody = `Dear ${sponsor.name} Team,

Warm greetings from ${campaign.orgName}.

We are organizing "${campaign.eventName}" in ${campaign.location}, bringing together ${campaign.audienceSize}+ ${campaign.audienceType}. The event focuses on entrepreneurship, learning, networking, and real-world exposure for students.

We believe ${sponsor.name} would be a strong sponsor fit because ${sponsor.fitReason || "your brand aligns well with our audience and event goals"}.

We are currently seeking support for:
${campaign.needs.map((need) => `- ${need}`).join("\n")}

Our funding goal is ₹${campaign.fundingGoal}. We have prepared flexible sponsorship tiers so your team can choose the level of visibility and engagement that works best.

We would love to explore a collaboration with ${sponsor.name} for this event.

Looking forward to hearing from you.

Regards,
${campaign.orgName}
FundForge AI Outreach Team`;

  const proposalHtml = `
    <html>
      <body style="font-family: Arial, sans-serif; padding: 24px; color: #111827;">
        <h1>${campaign.eventName}</h1>
        <h2>Sponsorship Proposal for ${sponsor.name}</h2>

        <p><strong>Organization:</strong> ${campaign.orgName}</p>
        <p><strong>Location:</strong> ${campaign.location}</p>
        <p><strong>Audience:</strong> ${campaign.audienceSize}+ ${campaign.audienceType}</p>
        <p><strong>Funding Goal:</strong> ₹${campaign.fundingGoal}</p>

        <h3>Why ${sponsor.name}?</h3>
        <p>${sponsor.fitReason || "Strong alignment with the campaign audience and goals."}</p>

        <h3>Support Needed</h3>
        <ul>
          ${campaign.needs.map((need) => `<li>${need}</li>`).join("")}
        </ul>

        <h3>Sponsorship Tiers</h3>
        ${tiers
          .map(
            (tier) => `
              <div style="border:1px solid #ddd; padding:16px; margin-bottom:12px; border-radius:10px;">
                <h4>${tier.name} — ₹${tier.amount}</h4>
                <ul>
                  ${tier.benefits.map((benefit) => `<li>${benefit}</li>`).join("")}
                </ul>
              </div>
            `
          )
          .join("")}

        <h3>Next Step</h3>
        <p>We would be happy to schedule a short discussion and customize the sponsorship package for ${sponsor.name}.</p>
      </body>
    </html>
  `;

  return {
    emailSubject,
    emailBody,
    proposalHtml,
    sponsorshipTiers: tiers,
    status: "READY",
  };
};

module.exports = proposalAgent;