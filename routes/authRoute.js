const express = require('express')
const {createUser, loginUser, handleRefreshToken, logout, getAllUser, getUser, deleteUser, updateUser} = require("../controllers/userController");
const {authMiddleware, isAdmin} = require('../middlewares/authMiddleware');

const router = express.Router()

router.post("/login", loginUser);
router.get("/all-users", getAllUser);
router.get("/refresh", handleRefreshToken);


router.get("/:id", authMiddleware, isAdmin, getUser);
router.delete("/:id", deleteUser);

router.get("/logout", logout);

module.exports = router;