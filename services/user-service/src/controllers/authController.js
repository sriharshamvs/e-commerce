const bcrypt = require("bcrypt");
const db = require("../config/db");
const { generateTokens, verifyToken } = require("../services/jwtService");
const { REGISTER_QUERY, LOGIN_USERNAME_QUERY } = require("../utils/queries");
const { HTTP_STATUS } = require("../constants");

const register = async (req, res) => {
  try {
    const { email, firstname, lastname, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    await db.query(REGISTER_QUERY, [
      email,
      firstname,
      lastname,
      hashedPassword,
    ]);
    res
      .status(HTTP_STATUS.CREATED.CODE)
      .json({ message: HTTP_STATUS.CREATED.MESSAGE });
  } catch (error) {
    console.error(error);
    res
      .status(HTTP_STATUS.INTERNAL_SERVER_ERROR.CODE)
      .json({ error: HTTP_STATUS.INTERNAL_SERVER_ERROR.MESSAGE });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await db.query(LOGIN_USERNAME_QUERY, [email]);
    const user = result.rows[0];

    if (!user) {
      return res
        .status(HTTP_STATUS.BAD_REQUEST.CODE)
        .json({ error: HTTP_STATUS.BAD_REQUEST.MESSAGE });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res
        .status(HTTP_STATUS.BAD_REQUEST.CODE)
        .json({ error: HTTP_STATUS.BAD_REQUEST.MESSAGE });
    }

    const { accessToken, refreshToken } = generateTokens({ email });
    res.json({ message: "Login successful", accessToken, refreshToken });
  } catch (error) {
    console.error(error);
    res
      .status(HTTP_STATUS.INTERNAL_SERVER_ERROR.CODE)
      .json({ error: HTTP_STATUS.INTERNAL_SERVER_ERROR.MESSAGE });
  }
};

const refresh = (req, res) => {
  const refreshToken = req.body.refreshToken;

  if (!refreshToken) {
    return res
      .status(HTTP_STATUS.BAD_REQUEST.CODE)
      .json({ error: HTTP_STATUS.BAD_REQUEST.MESSAGE });
  }

  try {
    const decoded = verifyToken(refreshToken, true);
    const { accessToken, refreshToken: newRefreshToken } = generateTokens({
      email: decoded.email,
    });
    res.json({ accessToken, refreshToken: newRefreshToken });
  } catch (error) {
    res
      .status(HTTP_STATUS.UNAUTHORIZED.CODE)
      .json({ error: HTTP_STATUS.UNAUTHORIZED.MESSAGE });
  }
};

module.exports = {
  register,
  login,
  refresh,
};
