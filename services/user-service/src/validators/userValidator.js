const { body, validationResult } = require("express-validator");
const { HTTP_STATUS } = require("../constants");
require("dotenv").config();

const validateUserCreation = [
  body("email").isEmail().withMessage("Must be a valid email address"),
  body("firstname").notEmpty().withMessage("First name is required"),
  body("lastname").notEmpty().withMessage("Last name is required"),
  body("password")
    .isLength({ min: process.env.MIN_PASSWOR_LENGTH })
    .withMessage("Password must be at least 6 characters long"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(HTTP_STATUS.BAD_REQUEST.CODE)
        .json({ errors: errors.array() });
    }
    next();
  },
];

const validateUserLogin = [
  body("email").isEmail().withMessage("Must be a valid email address"),
  body("password").notEmpty().withMessage("Password is required"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(HTTP_STATUS.BAD_REQUEST.CODE)
        .json({ errors: errors.array() });
    }
    next();
  },
];

module.exports = {
  validateUserCreation,
  validateUserLogin,
};
