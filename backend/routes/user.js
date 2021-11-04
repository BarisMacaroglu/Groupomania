const express = require('express');
const router = express.Router();

const multer = require("../middleware/multer-config");

const ctrlUser = require("../controllers/user");

router.post("/signup", ctrlUser.signup);
router.post("/login", ctrlUser.login);
router.get("/logout", ctrlUser.logout);
router.get("/users", ctrlUser.getAllUsers);
router.get("/users/:id", ctrlUser.getOneUser);


module.exports = router;