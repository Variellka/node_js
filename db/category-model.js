const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  displayName: String,
  createdAt: Date,
});

module.exports = mongoose.model("Category", categorySchema);
