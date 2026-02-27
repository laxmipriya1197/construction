const mongoose = require("mongoose");

const requirementSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  siteMeasurement: String,
  houseType: {
    type: String,
    enum: ["1BHK", "2BHK", "3BHK"]
  },
  budget: String,
  familyCount: Number,
  hobbies: String,
  interiorStyle: {
    type: String,
    enum: ["Modern", "Traditional", "Minimal", "Luxury"]
  },
  siteVisitNeeded: {
    type: Boolean,
    default: false
  },
  waterTankLiters: Number,
  status: {
    type: String,
    enum: ["pending", "confirmed"],
    default: "pending"
  }
});

module.exports = mongoose.model("Requirement", requirementSchema);
