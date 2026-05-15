const express = require("express");

const {
  handleDemoReply,
  getWebhooksByCampaign,
  getAllWebhooks,
} = require("../controllers/webhookController");

const router = express.Router();

router.post("/demo-reply", handleDemoReply);

router.get("/", getAllWebhooks);

router.get("/campaign/:campaignId", getWebhooksByCampaign);

module.exports = router;