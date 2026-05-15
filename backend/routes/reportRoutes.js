const express = require("express");

const {
  getCampaignFullReport,
  getAgentTimeline,
  getPipelineSummary,
} = require("../controllers/reportController");

const router = express.Router();

router.get("/campaign/:campaignId", getCampaignFullReport);

router.get("/campaign/:campaignId/agents", getAgentTimeline);

router.get("/campaign/:campaignId/pipeline", getPipelineSummary);

module.exports = router;