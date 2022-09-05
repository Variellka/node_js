import express from "express";
import mongoose from "mongoose";
import { ProductModel } from "./db/product-model";
require("dotenv").config();

const app = express();
const PORT = 3000;

const base_URL: string = process.env.DATABASE_URL || "";
mongoose.connect(base_URL);

let db = mongoose.connection;
db.on("error", (error: string) => {
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
  const products = await ProductModel.find({});
  res.send(products);
});

app.listen(3000, function () {
  console.log(`server started on PORT ${PORT}`);
});
