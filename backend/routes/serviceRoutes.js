const express = require("express");
const router = express.Router();

const {
  addService,
  getServices,
  getServiceById,
  updateService,
  deleteService
} = require("../controllers/serviceController");

router.post("/", addService);


router.get("/", getServices);
router.get("/:id", getServiceById);
router.put("/:id", updateService);
router.delete("/:id", deleteService);

module.exports = router;
