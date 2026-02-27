const express = require("express");
const router = express.Router();
const {
  addRequirement,
  getAllRequirements,
  getRequirementById,
  getUserRequirements,
  updateRequirement,
  deleteRequirement
} = require("../controllers/requirementController");

router.post("/", addRequirement);
router.get("/", getAllRequirements);
router.get("/:id", getRequirementById);
router.get("/user/:userId", getUserRequirements);
router.put("/:id", updateRequirement);
router.delete("/:id", deleteRequirement);

module.exports = router;
