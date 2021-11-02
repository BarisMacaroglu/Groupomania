const express = require('express');
const router = express.Router();

const ctrlUser = require("../controllers/user");

router.post("/signup", ctrlUser.signup);
router.post("/login", ctrlUser.login);
router.get("/logout", ctrlUser.logout);


module.exports = router;