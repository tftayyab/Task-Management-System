const express = require("express");
const jwt = require("jsonwebtoken");
const cors = require("cors");

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

// Secret key to verify JWT
require("dotenv").config();
const JWT_SECRET = process.env.JWT_SECRET;

// Protected route
app.get("/verify-token", (req, res) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Token missing or malformed" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    res.status(200).json({ message: "Token is valid", user: decoded });
  } catch (err) {
    res.status(401).json({ message: "Invalid or expired token" });
  }
});

app.listen(PORT, () => {
  console.log(`✅ JWT Test Server running at http://localhost:${PORT}`);
});
