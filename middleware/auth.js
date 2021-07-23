const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function (req, res, next) {
  const token = req.header("x-auth-token");
  if (!token) {
    return res.status(401).json({ msg: "Brak tokenu, autoryzacja przerwana!" });
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.jwtSecret || config.get("jwtSecret")
    );
    req.user = decoded.user;
    next();
  } catch (error) {
    res.status(401).json({ msg: "Token jest nieprawidłowy!" });
  }
};
