const express = require("express");
const mongoose = require("mongoose");
const Product = require("./db/product-model");
require("dotenv").config();

const app = express();
const PORT = 3000;

app.get("/products", function (req, res) {
  Product.find({}, function (err, products) {
    if (err) return console.log(err);
    res.send(products);
  });
});

mongoose.connect(
  process.env.DATABASE_URL,
  {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  },
  function (err) {
    if (err) return console.log(err);
    app.listen(3000, function () {
      console.log(`server started on PORT ${PORT}`);
    });
  }
);
