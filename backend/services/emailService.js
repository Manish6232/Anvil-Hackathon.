const draftEmail = async ({ to, subject, body }) => {
  if (!to || !subject || !body) {
    throw new Error("To, subject, and body are required to draft email");
  }

  return {
    status: "DRAFTED",
    providerMessageId: `draft_${Date.now()}`,
    message: "Email drafted successfully in demo mode",
  };
};

const sendEmail = async ({ to, subject, body }) => {
  if (!to || !subject || !body) {
    throw new Error("To, subject, and body are required to send email");
  }

  // Real email provider will be connected later.
  // For now, simulate successful send.
  return {
    status: "SENT",
    providerMessageId: `msg_${Date.now()}`,
    sentAt: new Date(),
    message: "Email sent successfully in simulated mode",
  };
};

module.exports = {
  draftEmail,
  sendEmail,
};