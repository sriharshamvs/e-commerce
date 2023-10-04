const jwt = require("jsonwebtoken");

const generateTokens = (payload) => {
  const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_TOKEN_SECRET, {
    expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRES,
  });
  const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_TOKEN_SECRET, {
    expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRES,
  });
  return { accessToken, refreshToken };
};

const verifyToken = (token, isRefreshToken = false) => {
  const usedSecret = isRefreshToken
    ? process.env.JWT_REFRESH_TOKEN_SECRET
    : process.env.JWT_ACCESS_TOKEN_SECRET;
  return jwt.verify(token, usedSecret, { algorithms: ["HS256"] });
};

module.exports = { generateTokens, verifyToken };
