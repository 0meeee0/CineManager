const express = require("express");
const router = express.Router();
const filmController = require("../controller/filmController")
const isAdmin = require("../middleware/isAdmin");
const verifyToken = require("../middleware/jwtToken");
const cors = require("cors")
const upload = require('../uploadConfig')

router.get("/",cors(), filmController.getFilms)
router.get("/all",cors(), filmController.getAllFilms)
router.get("/three", cors(), filmController.get3Films)
router.get("/searchFilm/:id", cors(), filmController.searchFilm);
router.post("/add-film", cors(), upload, filmController.addFilm);

router.put("/edit-film/:id", cors(), filmController.editFilm);
router.post("/delete-film/:id", cors(), filmController.deleteFilm);
router.get(
  "/deleted-films",
  verifyToken,
  isAdmin,
  filmController.getDeletedFilms
);

module.exports = router;