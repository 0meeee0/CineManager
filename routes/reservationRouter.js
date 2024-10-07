const express = require('express');
const router = express.Router()
const reservationController = require('../controller/reservationController')
const verifyToken = require("../middleware/jwtToken");
const isAdmin = require("../middleware/isAdmin");

router.get("/", verifyToken, isAdmin, reservationController.getReservations);
router.post("/add-reservation",verifyToken,isAdmin,reservationController.addReservation);

module.exports = router;
