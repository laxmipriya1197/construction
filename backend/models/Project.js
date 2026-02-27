const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  title: String,
  description: String,
  image: String,
  location: String,
  category: {
    type: String,
    enum: ["Residential", "Commercial"],
    default: "Residential"
  },
  status: {
    type: String,
    enum: ["Completed", "Ongoing"],
    default: "Completed"
  },
  area: String,
  floors: Number,
  bedrooms: Number,
  constructionYear: Number
});

module.exports = mongoose.model("Project", projectSchema);
