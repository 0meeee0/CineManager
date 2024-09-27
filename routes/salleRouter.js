const express = require('express');
const router = express.Router()
const salleController = require('../controller/salleController')

router.get('/', salleController.getSalles)
router.post('/add-salle',salleController.addSalle)
router.delete('/delete-salle/:id',salleController.deleteSalle)
router.put('/edit-salle/:id',salleController.editSalle)

module.exports = router