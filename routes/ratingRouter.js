const express = require('express')
const router = express.Router();
const ratingController = require("../controller/ratingController");
const cors = require("cors");

router.post('/add', cors(), ratingController.addRatings)
router.get('/:id', ratingController.getRating)

module.exports = router