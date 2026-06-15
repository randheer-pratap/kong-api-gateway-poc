const authService = require("../services/auth.service");

exports.login = async (req, res) => {
  const { username } = req.body;

  const token = await authService.login(username);

  res.json({ token });
};
