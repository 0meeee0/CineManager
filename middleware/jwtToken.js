require('dotenv').config()
const jwt = require('jsonwebtoken')

const tokenBlacklist = new Set();
const verifyToken = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];
  console.log("Token:", token);
  if (!token) {
    return res
      .status(401)
      .json({ message: "Access Denied. No token provided." });
  }

    if (tokenBlacklist.has(token)) {
      return res.status(401).json({ message: "Access Denied. Invalid token." });
    }
    
  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Verified:", verified); 
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).json({ message: "Invalid token." });
  }
};

module.exports = verifyToken;
