const fitScoringAgent = async ({ sponsor, campaign }) => {
  let score = 60;
  const reasons = [];

  const sponsorText = `${sponsor.name} ${sponsor.category} ${sponsor.location}`.toLowerCase();
  const campaignText = `${campaign.audienceType} ${campaign.description} ${campaign.needs.join(
    " "
  )}`.toLowerCase();

  if (
    sponsorText.includes("coding") ||
    sponsorText.includes("edtech") ||
    sponsorText.includes("developer")
  ) {
    score += 20;
    reasons.push("Strong match with student developer and tech audience.");
  }

  if (
    sponsorText.includes("cafe") ||
    sponsorText.includes("coffee") ||
    campaignText.includes("food")
  ) {
    score += 12;
    reasons.push("Can support food or refreshment sponsorship needs.");
  }

  if (
    sponsor.location &&
    campaign.location &&
    sponsor.location.toLowerCase().includes(campaign.location.toLowerCase())
  ) {
    score += 10;
    reasons.push("Location match improves sponsorship relevance.");
  }

  if (
    sponsorText.includes("startup") ||
    sponsorText.includes("fintech") ||
    sponsorText.includes("saas")
  ) {
    score += 10;
    reasons.push("Relevant to entrepreneurship and startup-focused audience.");
  }

  if (sponsor.contactConfidence === "HIGH") {
    score += 5;
    reasons.push("High-confidence contact available.");
  }

  if (sponsor.contactConfidence === "LOW") {
    score -= 5;
    reasons.push("Contact confidence is low, needs manual verification.");
  }

  score = Math.max(0, Math.min(score, 100));

  return {
    fitScore: score,
    fitReason:
      reasons.length > 0
        ? reasons.join(" ")
        : "General sponsorship fit based on campaign context.",
  };
};

module.exports = fitScoringAgent;