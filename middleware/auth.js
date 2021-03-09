const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.isUser = (req, res, next) => {
  const token = req.header("x-auth-token");

  if (!token) {
    return res.status(401).json({ msg: "No token, permission denied" });
  }

  try {
    const decodeToken = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decodeToken.user;
    next();
  } catch (error) {
    res.status(401).json({ msg: "Invalid token" });
  }
};
