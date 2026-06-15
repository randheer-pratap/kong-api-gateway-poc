const jwt = require("jsonwebtoken");
const config = require("../config/jwt.config");

exports.login = async (username) => {
  return jwt.sign(
    {
      userId: 101,
      role: "admin",
      username,
    },
    config.secret,
    {
      expiresIn: config.expiresIn,
    },
  );
};
