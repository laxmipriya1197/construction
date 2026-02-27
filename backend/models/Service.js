const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema({
  name: String,
  description: String,
  icon: String,
  image: String
});

module.exports = mongoose.model("Service", serviceSchema);
