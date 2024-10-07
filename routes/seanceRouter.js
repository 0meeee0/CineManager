const express = require('express');
const router = express.Router();
const seanceRouter = require("../controller/seanceController");
const isAdmin = require("../middleware/isAdmin");
const verifyToken = require("../middleware/jwtToken");

router.get('/', seanceRouter.getSeances);
router.post("/add-seance", verifyToken, isAdmin, seanceRouter.addSeance);
router.put("/edit-seance/:id", verifyToken, isAdmin, seanceRouter.editSeance);
router.delete(
  "/delete-seance/:id",
  verifyToken,
  isAdmin,
  seanceRouter.deleteSeance
);


module.exports = router