const express = require("express");

const products = [
  {
    displayName: "Cyberpank 2077",
    price: "60$",
  },
  {
    displayName: "SpongeBob SquarePants: Battle for Bikini Bottom – Rehydrated",
    price: "40$",
  },
  {
    displayName: "God Of War",
    price: "50$",
  },
];

const app = express();
const port = 3000;

app.get("/products", function (req, res) {
  res.send(JSON.stringify(products));
});

app.listen(port, (err) => {
  if (err) {
    return console.log("something bad happened", err);
  }
  console.log(`server is listening on ${port}`);
});
