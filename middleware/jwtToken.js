require("dotenv").config();
const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authHeader = req.header("Authorization");
  if (!authHeader) {
    return res
      .status(401)
      .json({ message: "Access Denied. No token provided." });
  }

  const token = authHeader.split(" ")[1];
  console.log("Extracted Token:", token);

  if (!token) {
    return res
      .status(401)
      .json({ message: "Access Denied. No token provided." });
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Token Verified:", verified);
    req.user = verified;
    next();
  } catch (err) {
    console.error("JWT Verification Error:", err.message);
    return res
      .status(400)
      .json({ message: "Invalid token.", error: err.message });
  }
};

module.exports = verifyToken;
