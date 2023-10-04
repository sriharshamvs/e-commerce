const { verifyToken } = require("./jwt");
const { HTTP_STATUS } = require("./constants");

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers["authorization"];

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(HTTP_STATUS.UNAUTHORIZED.CODE)
      .json({ error: HTTP_STATUS.UNAUTHORIZED.MESSAGE });
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = verifyToken(token);
    req.email = decoded;
    console.log({ decoded });
    next();
  } catch (err) {
    return res
      .status(HTTP_STATUS.UNAUTHORIZED.CODE)
      .json({ error: HTTP_STATUS.UNAUTHORIZED.MESSAGE });
  }
};

module.exports = authMiddleware;
