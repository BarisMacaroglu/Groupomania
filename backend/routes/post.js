const express = require('express');
const router = express.Router();
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");
const validateInput = require("../middleware/validate-inputs");

const ctrlPost = require("../controllers/post");

router.post('/new', auth, multer, validateInput.postContent, ctrlPost.newPost);
router.get('/', auth, ctrlPost.getAllPosts);
router.get('/:id', auth, ctrlPost.getOnePost);
router.delete('/:id', auth, ctrlPost.deletePost);

module.exports = router;