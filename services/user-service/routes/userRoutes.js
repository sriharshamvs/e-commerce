const express = require("express");
const db = require("../db");
const authMiddleware = require("../authMiddleware");
const {
  PROFILE_GET_USER_DETAILS_QUERY,
  UPDATE_PROFILE_USER_DETIALS_QUERY,
} = require("../queries");
const { HTTP_STATUS } = require("../constants");

const router = express.Router();

router.use(authMiddleware);

router.get("/profile", async (req, res) => {
  try {
    const requestBody = req.body;
    const email = requestBody.email;
    const result = await db.query(PROFILE_GET_USER_DETAILS_QUERY, [email]);
    const user = result.rows[0];

    if (!user) {
      return res
        .status(HTTP_STATUS.NOT_FOUND.CODE)
        .json({ error: HTTP_STATUS.NOT_FOUND.MESSAGE });
    }
    const userDetails = {
      userID: user.id,
      email: user.email,
      firstname: user.firstname,
      lastname: user.lastname,
    };

    res
      .status(HTTP_STATUS.OK.CODE)
      .json({ message: HTTP_STATUS.OK.MESSAGE, userDetails });
  } catch (error) {
    console.error(error);
    res
      .status(HTTP_STATUS.INTERNAL_SERVER_ERROR.CODE)
      .json({ error: HTTP_STATUS.INTERNAL_SERVER_ERROR.MESSAGE });
  }
});

router.put("/profile", async (req, res) => {
  try {
    const requestBody = req.body;
    const email = requestBody.email;

    const result = await db.query(PROFILE_GET_USER_DETAILS_QUERY, [email]);

    const user = result.rows[0];

    if (!user) {
      return res
        .status(HTTP_STATUS.NOT_FOUND.CODE)
        .json({ error: HTTP_STATUS.NOT_FOUND.MESSAGE });
    }

    const firstname = requestBody.firstname;
    const lastname = requestBody.lastname;
    const address = requestBody.address;
    const mobileNumber = requestBody.mobileNumber;

    await db.query(UPDATE_PROFILE_USER_DETIALS_QUERY, [
      firstname,
      lastname,
      address,
      mobileNumber,
      email,
    ]);
    const update_result = await db.query(PROFILE_GET_USER_DETAILS_QUERY, [
      email,
    ]);
    const update_user = update_result.rows[0];
    const userDetails = {
      userID: update_user.id,
      email: update_user.email,
      firstname: update_user.firstname,
      lastname: update_user.lastname,
      mobileNumber: update_user.mobileNumber,
      email: update_user.email,
    };
    res
      .status(HTTP_STATUS.OK.CODE)
      .json({ message: HTTP_STATUS.OK.MESSAGE, userDetails });
  } catch (error) {
    console.error(error);
    res
      .status(HTTP_STATUS.INTERNAL_SERVER_ERROR.CODE)
      .json({ error: HTTP_STATUS.INTERNAL_SERVER_ERROR.MESSAGE });
  }
});

module.exports = router;
