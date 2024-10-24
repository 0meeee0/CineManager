require("dotenv").config()
const express = require("express");
const router = express.Router();
const User = require("../model/Users");
const verifyToken = require("../middleware/jwtToken");
const userController = require("../controller/userController")
const cors = require('cors')

router.get("/", (req, res) => {
  res.send("Welcome to CineManager");
});

router.post("/api/auth/register",cors() , verifyToken, userController.register);
router.get("/api/users",cors() , verifyToken, userController.getUsers);
router.post("/api/auth/login", userController.login);
router.post("/api/auth/logout", verifyToken, userController.logout);
router.post("/api/auth/forget");
router.post("/api/auth/reset");

module.exports = router;
