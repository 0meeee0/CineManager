const express = require('express');
const router = express.Router()
const reservationController = require('../controller/reservationController')

router.get('/', reservationController.getReservations)
router.post('/add-reservation', reservationController.addReservation)

module.exports = router