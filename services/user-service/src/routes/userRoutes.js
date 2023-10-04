const express = require("express");
const {
  getUserProfile,
  updateUserProfile,
} = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();
router.use(authMiddleware);

router.get("/profile", getUserProfile);
router.put("/profile", updateUserProfile);

module.exports = router;
