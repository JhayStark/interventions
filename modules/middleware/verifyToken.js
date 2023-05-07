const jwt = require("jsonwebtoken");

const secretKey = process.env.JWT_SECRET_KEY;


const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: "Unauthorized access" });
  }

  try {
    // Verify and decode the token
    const decoded = jwt.verify(token,secretKey);

    // Attach the decoded user information to the request object
    req.user = decoded;

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    return res.status(401).json({ error: "Invalid token" });
  }
};

module.exports = verifyToken;
