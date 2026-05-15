const { draftEmail, sendEmail } = require("../services/emailService");

const emailAgent = async ({ sponsor, proposal, mode = "DRAFT" }) => {
  if (!sponsor.contactEmail) {
    throw new Error(`No contact email found for ${sponsor.name}`);
  }

  const emailPayload = {
    to: sponsor.contactEmail,
    subject: proposal.emailSubject,
    body: proposal.emailBody,
  };

  if (mode === "SEND") {
    const result = await sendEmail(emailPayload);

    return {
      ...emailPayload,
      type: "OUTREACH",
      status: result.status,
      providerMessageId: result.providerMessageId,
      sentAt: result.sentAt || new Date(),
      message: result.message,
    };
  }

  const result = await draftEmail(emailPayload);

  return {
    ...emailPayload,
    type: "OUTREACH",
    status: result.status,
    providerMessageId: result.providerMessageId,
    sentAt: null,
    message: result.message,
  };
};

module.exports = emailAgent;