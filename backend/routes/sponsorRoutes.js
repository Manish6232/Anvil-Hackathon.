const express = require("express");

const {
  createSponsor,
  getSponsors,
  getSponsorsByCampaign,
  getSponsorById,
  updateSponsor,
  updateSponsorStatus,
  deleteSponsor,
} = require("../controllers/sponsorController");

const router = express.Router();

router.route("/").post(createSponsor).get(getSponsors);

router.get("/campaign/:campaignId", getSponsorsByCampaign);

router
  .route("/:id")
  .get(getSponsorById)
  .patch(updateSponsor)
  .delete(deleteSponsor);

router.patch("/:id/status", updateSponsorStatus);

module.exports = router;