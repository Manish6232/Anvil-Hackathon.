const replyClassifierAgent = async ({ message }) => {
  if (!message) {
    throw new Error("Reply message is required");
  }

  const text = message.toLowerCase();

  let category = "NEEDS_MORE_INFO";
  let confidence = 70;
  let nextAction = "Send a helpful response with event details and sponsorship tiers.";

  if (
    text.includes("interested") ||
    text.includes("sounds good") ||
    text.includes("share details") ||
    text.includes("send details") ||
    text.includes("sponsorship tiers") ||
    text.includes("audience details")
  ) {
    category = "INTERESTED";
    confidence = 90;
    nextAction = "Send sponsorship tiers and audience details.";
  }

  if (
    text.includes("meeting") ||
    text.includes("call") ||
    text.includes("schedule") ||
    text.includes("discuss")
  ) {
    category = "MEETING_REQUESTED";
    confidence = 88;
    nextAction = "Send meeting availability and short agenda.";
  }

  if (
    text.includes("not interested") ||
    text.includes("no thanks") ||
    text.includes("cannot sponsor") ||
    text.includes("not possible") ||
    text.includes("unfortunately")
  ) {
    category = "REJECTED";
    confidence = 92;
    nextAction = "Mark sponsor as rejected and stop follow-up.";
  }

  if (
    text.includes("wrong person") ||
    text.includes("wrong contact") ||
    text.includes("not the right person")
  ) {
    category = "WRONG_CONTACT";
    confidence = 85;
    nextAction = "Ask for correct partnership or marketing contact.";
  }

  if (
    text.includes("later") ||
    text.includes("follow up") ||
    text.includes("next week") ||
    text.includes("after some time")
  ) {
    category = "FOLLOW_UP_DUE";
    confidence = 82;
    nextAction = "Schedule follow-up reminder.";
  }

  return {
    category,
    confidence,
    nextAction,
    summary: `Reply classified as ${category} with ${confidence}% confidence.`,
  };
};

module.exports = replyClassifierAgent;