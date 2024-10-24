const express = require('express')
const router = express.Router()
const commentController = require('../controller/commentController')
const verifyToken = require("../middleware/jwtToken");
const cors = require("cors");

router.get('/', cors(), commentController.getComments)
router.post("/addComment",verifyToken, cors(), commentController.addComment);
router.get("/:film_id", cors(), commentController.getCommentsByFilmId);


module.exports = router