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
});
db.on("connected", () => {
  console.log("Connected successfully");
});

//get отрабатывает даже если нет продуктов, но если есть ошибка - не отрабатывает вообще никак
app.get("/products", async (req, res) => {
  const products = await Product.find({});
  console.log(products);
  try {
    res.send(products);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.listen(3000, function () {
  console.log(`server started on PORT ${PORT}`);
});
