const express = require("express");

const app = express();

app.get("/users", (req, res) => {
  res.json({
    service: "user-service",
    users: ["John", "Alice"],
  });
});

app.listen(3001, "0.0.0.0", () => {
  console.log("User Service running");
});
