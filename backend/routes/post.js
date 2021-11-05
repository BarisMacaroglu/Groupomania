const express = require('express');
const router = express.Router();
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");

const ctrlPost = require("../controllers/post");

router.post('/new', auth, multer, ctrlPost.newPost);

module.exports = router;