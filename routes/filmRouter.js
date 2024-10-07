const express = require("express");
const router = express.Router();
const filmController = require("../controller/filmController")
const isAdmin = require("../middleware/isAdmin");
const verifyToken = require("../middleware/jwtToken");

router.use(verifyToken);
router.get("/", filmController.getFilms)
router.post("/add-film", verifyToken, isAdmin, filmController.addFilm);
router.put("/edit-film/:id", verifyToken, isAdmin, filmController.editFilm);
router.get("/delete-film/:id", verifyToken, isAdmin, filmController.deleteFilm);
router.get(
  "/deleted-films",
  verifyToken,
  isAdmin,
  filmController.getDeletedFilms
);

module.exports = router;