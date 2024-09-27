const express = require("express");
const router = express.Router();
const filmController = require("../controller/filmController")

router.get("/", filmController.getFilms)
router.post("/add-film", filmController.addFilm)
router.post("/edit-film/:id", filmController.editFilm)
router.get("/delete-film/:id", filmController.deleteFilm);
router.get("/deleted-films", filmController.getDeletedFilms)

module.exports = router;