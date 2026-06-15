const express = require("express");

const authRoutes = require("./routes/auth.routes");

const app = express();

app.use(express.json());

app.use("/auth", authRoutes);

app.listen(3003, () => {
  console.log("Auth service is running on port 3003");
});
