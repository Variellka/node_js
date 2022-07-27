const http = require("http");
const port = 3000;

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

const server = http.createServer((req, res) => {
  res.writeHead(200, {
    "Content-type": "application/json",
  });
  if (req.url === "/products" && req.method === "GET") {
    return res.end(JSON.stringify(products));
  } else if (req.url === "/products" && req.method === "POST") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
      products.push(JSON.parse(body));
    });
    req.on("end", () => {
      return res.end(JSON.stringify(products));
    });
  } else return res.end(req.url);
});

server.listen(port, (err) => {
  if (err) {
    return console.log("something bad happened", err);
  }
  console.log(`server is listening on ${port}`);
});
