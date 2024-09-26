const express = require("express");
const router = express.Router();
const filmController = require("../controller/filmController")

router.get("/", filmController.getFilms)
router.post("/add-film", filmController.addFilm)

module.exports = router;