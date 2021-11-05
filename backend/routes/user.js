const express = require('express');
const router = express.Router();
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");

const ctrlUser = require("../controllers/user");

router.post("/signup", ctrlUser.signup);
router.post("/login", ctrlUser.login);
router.get("/logout", auth, ctrlUser.logout);
router.get("/users", auth, ctrlUser.getAllUsers);
router.get("/users/search", auth, ctrlUser.searchUsers);
router.get("/users/:id", auth, ctrlUser.getOneUser);
router.put("/users/:id/description", auth, ctrlUser.changeDescription);
router.put('/users/:id/picture', auth, multer, ctrlUser.changeProfilePicture);
router.put("/users/:id/password", auth, ctrlUser.changePassword);
router.put("/users/:id/admin", auth, ctrlUser.changeAdmin);
router.delete("/users/:id", auth, ctrlUser.deleteAccount);


module.exports = router;