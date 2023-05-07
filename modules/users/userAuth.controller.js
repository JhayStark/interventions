const User = require("./users.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require('dotenv');


dotenv.config();

const secretKey = process.env.JWT_SECRET_KEY;
const jwtExpiration = "1h";

const generateToken = (user) => {
  const token = jwt.sign({ id: user._id, email: user.email }, secretKey, {
    expiresIn: jwtExpiration,
  });
  return token;
};

const registerUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user already exists
    const isExist = await User.findOne({ email: email });
    if (isExist) {
      return res.status(400).json({ error: "User already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await User.create({ ...req.body, password: hashedPassword });

    // Generate token
    const token = generateToken(user);

    res.status(201).json({ token });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user exists
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    // Generate token
    const token = generateToken(user);

    res.status(200).json({ token });
  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { registerUser, loginUser };
