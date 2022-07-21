import jwt from "jsonwebtoken";
import { jwtSecret } from '../config.js';

const verifyToken = (req, res, next) => {
  if (!req.headers.authorization) return res.status(400).json({ message: "please submit a bearer token" })

  const token = req.headers.authorization.split(" ")[1].trim();

  if (!token) return res.status(403).send("A token is required for authentication");

  try {
    const decoded = jwt.verify(token, jwtSecret);
    req.user = decoded;

    return next();
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
};

export default verifyToken;