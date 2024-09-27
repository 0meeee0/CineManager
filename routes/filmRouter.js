const express = require("express");
const router = express.Router();
const filmController = require("../controller/filmController")
const verifyToken = require("../middleware/jwtToken");

router.use(verifyToken);
router.get("/", filmController.getFilms)
router.post("/add-film", filmController.addFilm)
router.put("/edit-film/:id", filmController.editFilm)
router.get("/delete-film/:id", filmController.deleteFilm);
router.get("/deleted-films", filmController.getDeletedFilms)

module.exports = router;