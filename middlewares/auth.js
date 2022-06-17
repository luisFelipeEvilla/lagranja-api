const jwt = require("jsonwebtoken");
const { jwtSecret } = require('../config');

const verifyToken = (req, res, next) => {
    if (!token) {
        return res.status(400).json({message: "please submit a token"})
    }
    const token = req.headers.authorization.split(" ")[1].trim();
    if (!token) {
      res.status(403).send("A token is required for authentication");
    }
    try {
      const decoded = jwt.verify(token, jwtSecret);
      req.user = decoded;
    } catch (err) {
      res.status(401).send("Invalid Token");
    }

    return next();
  };

module.exports = verifyToken;