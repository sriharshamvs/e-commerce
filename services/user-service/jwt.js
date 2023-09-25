const jwt = require("jsonwebtoken");

const secret = process.env.JWT_SECRET;
const jwt_expires = process.env.JWT_EXPIRES;

const generateToken = (payload) => {
  return jwt.sign(payload, secret, { expiresIn: jwt_expires });
};

module.exports = { generateToken };
