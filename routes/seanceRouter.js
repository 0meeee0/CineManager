const express = require('express');
const router = express.Router();
const seanceRouter = require("../controller/seanceController");

router.get('/', seanceRouter.getSeances);
router.post('/add-seance', seanceRouter.addSeance);
router.put('/edit-seance/:id', seanceRouter.editSeance);
router.delete('/delete-seance/:id', seanceRouter.deleteSeance);


module.exports = router