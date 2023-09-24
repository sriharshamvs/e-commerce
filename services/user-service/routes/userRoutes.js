const express = require("express");
const pool = require("../db");

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;
    const newUser = await pool.query(
      "INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *",
      [username, password]
    );
    res.status(201).json(newUser.rows[0]);
  } catch (err) {
    res.status(400).json(err.message);
  }
});

module.exports = router;
