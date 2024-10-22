const express = require('express')
const router = express.Router()
const commentController = require('../controller/commentController')
const verifyToken = require("../middleware/jwtToken");

router.get('/', commentController.getComments)
router.post("/addComment", verifyToken, commentController.addComment);


module.exports = router