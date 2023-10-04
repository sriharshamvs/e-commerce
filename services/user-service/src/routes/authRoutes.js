const express = require("express");
const {
  validateUserCreation,
  validateUserLogin,
} = require("../validators/userValidator");
const { register, login, refresh } = require("../controllers/authController");

const router = express.Router();

router.post("/register", validateUserCreation, register);
router.post("/login", validateUserLogin, login);
router.post("/refresh", refresh);

module.exports = router;
