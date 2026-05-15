const express = require("express");

const {
  draftEmailForSponsor,
  sendEmailForSponsor,
  getEmailsByCampaign,
  getEmailsBySponsor,
} = require("../controllers/emailController");

const router = express.Router();

router.post("/sponsor/:sponsorId/draft", draftEmailForSponsor);

router.post("/sponsor/:sponsorId/send", sendEmailForSponsor);

router.get("/campaign/:campaignId", getEmailsByCampaign);

router.get("/sponsor/:sponsorId", getEmailsBySponsor);

module.exports = router;