const express = require("express");
const mongoose = require("mongoose");
const Product = require("./db/product-model");
require("dotenv").config();

const app = express();
const PORT = 3000;

mongoose.connect(process.env.DATABASE_URL, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

let db = mongoose.connection;
db.on("error", (error) => {
  console.error("error in MongoDb connection: " + error);
  mongoose.disconnect();
});
db.on("connected", () => {
  console.log("MongoDB connected successfully");
});
db.on("disconnected", () => {
  console.log("MongoDB disconnected");
});

app.get("/products", async (req, res) => {
  if (db.readyState !== 1) {
    res.send("something went wrong...");
  }
  const products = await Product.find({});
  res.send(products);
});

app.listen(3000, function () {
  console.log(`server started on PORT ${PORT}`);
});
