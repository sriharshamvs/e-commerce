const express = require("express");
const db = require("../db");
const authMiddleware = require("../authMiddleware");

const router = express.Router();

router.use(authMiddleware);

router.get("/profile", async (req, res) => {
  try {
    console.log("PROF::::: ", req.user);
    console.log("PROFILE:::::", req.body);

    const requestBody = req.body;
    const username = requestBody.username;
    const result = await db.query("SELECT * FROM users WHERE username = $1", [
      username,
    ]);
    const user = result.rows[0];

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
