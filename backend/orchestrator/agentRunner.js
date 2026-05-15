const AgentRun = require("../models/AgentRun");

const runAgent = async ({ campaignId, sponsorId = null, agentName, input, handler }) => {
  const startedAt = new Date();

  const agentRun = await AgentRun.create({
    campaignId,
    sponsorId,
    agentName,
    input,
    status: "RUNNING",
    startedAt,
    traceId: `trace_${agentName}_${Date.now()}`,
  });

  try {
    const output = await handler(input);

    const completedAt = new Date();

    agentRun.output = output;
    agentRun.status = "SUCCESS";
    agentRun.completedAt = completedAt;
    agentRun.durationMs = completedAt - startedAt;

    await agentRun.save();

    return output;
  } catch (error) {
    const completedAt = new Date();

    agentRun.status = "FAILED";
    agentRun.error = error.message;
    agentRun.completedAt = completedAt;
    agentRun.durationMs = completedAt - startedAt;

    await agentRun.save();

    throw error;
  }
};

module.exports = runAgent;