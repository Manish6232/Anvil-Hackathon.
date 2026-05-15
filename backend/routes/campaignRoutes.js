const express = require("express");

const {
  createCampaign,
  getCampaigns,
  getCampaignById,
  updateCampaign,
  deleteCampaign,
  startCampaign,
  getCampaignReport,
} = require("../controllers/campaignController");

const router = express.Router();

router.route("/").post(createCampaign).get(getCampaigns);

router.route("/:id").get(getCampaignById).patch(updateCampaign).delete(deleteCampaign);

router.post("/:id/start", startCampaign);

router.get("/:id/report", getCampaignReport);

module.exports = router;