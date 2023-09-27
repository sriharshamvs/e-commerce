const jwt = require("jsonwebtoken");

const secret = process.env.JWT_SECRET;

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers["authorization"];

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Access denied, no token provided." });
  }

  const token = authHeader.split(" ")[1];

  jwt.verify(token, secret, { algorithms: ["HS256"] }, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: "Access denied, invalid token." });
    }
    req.user = decoded;
    next();
  });
};

module.exports = authMiddleware;
