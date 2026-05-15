const express = require("express");

const {
  generateProposalForSponsor,
  getProposalsByCampaign,
  getProposalBySponsor,
  getProposalById,
  deleteProposal,
} = require("../controllers/proposalController");

const router = express.Router();

router.post("/sponsor/:sponsorId/generate", generateProposalForSponsor);

router.get("/campaign/:campaignId", getProposalsByCampaign);

router.get("/sponsor/:sponsorId", getProposalBySponsor);

router.route("/:id").get(getProposalById).delete(deleteProposal);

module.exports = router;