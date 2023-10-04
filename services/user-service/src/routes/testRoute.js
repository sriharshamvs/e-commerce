const express = require("express");
const { HTTP_STATUS } = require("../constants");

const router = express.Router();

router.get("/ping", (req, res) => {
  res.status(HTTP_STATUS.OK.CODE).json({ message: HTTP_STATUS.OK.MESSAGE });
});

module.exports = router;
