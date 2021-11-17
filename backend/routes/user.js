const express = require('express');
const router = express.Router();
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");
const validateInput = require("../middleware/validate-inputs");

const ctrlUser = require("../controllers/user");

router.post("/signup", validateInput.signup, ctrlUser.signup);
router.post("/login", validateInput.login, ctrlUser.login);
router.get("/logout", auth, ctrlUser.logout);
router.get('/currentuser', auth, ctrlUser.getCurrentUser);
router.get("/users", auth, ctrlUser.getAllUsers);
router.get("/users/search", auth, validateInput.searchUser, ctrlUser.searchUsers);
router.get("/users/:id", auth, ctrlUser.getOneUser);
router.put("/users/:id/description", auth, validateInput.description, ctrlUser.changeDescription);
router.put('/users/:id/picture', auth, multer, ctrlUser.changeProfilePicture);
router.put("/users/:id/password", auth, validateInput.changePassword, ctrlUser.changePassword);
router.put("/users/:id/admin", auth, ctrlUser.changeAdmin);
router.delete("/users/:id", auth, ctrlUser.deleteAccount);


module.exports = router;