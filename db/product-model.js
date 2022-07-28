const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  displayName: String,
  categoryId: ObjectId,
  createdAt: Date,
  totalRating: Number,
  price: Number,
});

module.exports = mongoose.model("Product", productSchema);
