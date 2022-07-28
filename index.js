const express = require("express");
const mongoose = require("mongoose");
const Product = require("./db/product-model");

const app = express();
const PORT = 3000;

app.get("/products", function (req, res) {
  Product.find({}, function (err, products) {
    if (err) return console.log(err);
    res.send(products);
  });
});

const start = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://xenia:12345@cluster0.yfrsc6h.mongodb.net/?retryWrites=true&w=majority",
      { useUnifiedTopology: true, useNewUrlParser: true }
    );
    app.listen(PORT, () => console.log(`server started on PORT ${PORT}`));
  } catch (e) {
    console.log(e);
  }
};

start();
