const plannerAgent = async (campaign) => {
  const sponsorCategories = [
    "EdTech companies",
    "Coding platforms",
    "Local cafes",
    "Coworking spaces",
    "Startup communities",
    "Banks / fintech brands",
    "Printing vendors",
  ];

  const sponsorshipTiers = [
    {
      name: "Bronze",
      amount: 5000,
      benefits: [
        "Logo on event poster",
        "Instagram story mention",
        "Certificate branding",
      ],
    },
    {
      name: "Silver",
      amount: 10000,
      benefits: [
        "Logo on event poster",
        "Instagram post mention",
        "Certificate branding",
        "Sponsor mention during event",
      ],
    },
    {
      name: "Gold",
      amount: 25000,
      benefits: [
        "Premium logo placement",
        "Dedicated social media post",
        "Sponsor mention during event",
        "Stall space at venue",
      ],
    },
    {
      name: "Title Sponsor",
      amount: 50000,
      benefits: [
        "Title sponsor branding",
        "Premium logo placement",
        "Speaking slot",
        "Stall space at venue",
        "Dedicated appreciation post",
      ],
    },
  ];

  return {
    sponsorCategories,
    outreachGoal: 20,
    expectedPositiveReplies: "3-5",
    sponsorshipTiers,
    notes: `Strategy generated for ${campaign.eventName}. Focus on sponsors connected to ${campaign.audienceType} in ${campaign.location}.`,
  };
};

module.exports = plannerAgent;