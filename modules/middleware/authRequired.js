const jwt = require("jsonwebtoken");
const dotenv = require('dotenv');
dotenv.config();

const secretKey = process.env.JWT_SECRET_KEY; 


exports.authRequired = (req, res, next) => {
  const authorization = req.headers.authorization;

  if (!authorization) {
    return res.status(401).json({ err: "Please log in to use the platform" });
  }

  const token = authorization.split(" ")[1];

  if (!token) {
    return res.status(401).json({ err: "Please log in to use the platform" });
  }

  try {
    const user = jwt.verify(token, secretKey);
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ err: "Invalid authorization token" });
  }
};
