const express = require('express');
const router = express.Router()
const salleController = require('../controller/salleController')
const isAdmin = require('../middleware/isAdmin' );
const verifyToken = require("../middleware/jwtToken");

router.get("/",verifyToken, isAdmin,salleController.getSalles);
router.post("/add-salle", verifyToken, isAdmin,salleController.addSalle);
router.delete('/delete-salle/:id',verifyToken, isAdmin,salleController.deleteSalle)
router.put("/edit-salle/:id", verifyToken, isAdmin, salleController.editSalle);

module.exports = router