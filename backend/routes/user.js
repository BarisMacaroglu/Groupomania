const express = require('express');
const router = express.Router();

const multer = require("../middleware/multer-config");

const ctrlUser = require("../controllers/user");

router.post("/signup", ctrlUser.signup);
router.post("/login", ctrlUser.login);
router.get("/logout", ctrlUser.logout);
router.get("/users", ctrlUser.getAllUsers);
router.get("/users/search", ctrlUser.searchUsers);
router.get("/users/:id", ctrlUser.getOneUser);
router.put("/users/:id/description", ctrlUser.changeDescription);
router.put('/users/:id/picture', multer, userCtrl.changeProfilePicture);
router.put("/users/:id/password", ctrlUser.changePassword);
router.put("/users/:id/admin", ctrlUser.changeAdmin);


module.exports = router;