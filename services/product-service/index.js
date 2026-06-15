const express = require("express");

const app = express();

app.get("/products", (req, res) => {
  res.json({
    service: "product-service",
    products: ["Laptop", "Phone"],
  });
});

app.listen(3002, "0.0.0.0", () => {
  console.log("Product Service running");
});
