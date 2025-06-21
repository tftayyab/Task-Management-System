const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const User = require("../models/UserMongoDB");

// ✅ GET /auth/refresh-token
router.get("/refresh-token", async (req, res) => {
  const token = req.cookies.refreshToken;
  if (!token) return res.status(401).json({ message: "No refresh token" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);

    // 🔍 Check if token exists in DB
    const user = await User.findById(decoded.userId);
    if (!user || user.refreshToken !== token) {
      return res.status(403).json({ message: "Invalid or mismatched refresh token" });
    }

    // 🔁 Generate new access token
    const newAccessToken = jwt.sign(
      { userId: user._id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "15m" }
    );

    res.status(200).json({ accessToken: newAccessToken });

  } catch (err) {
    return res.status(403).json({ message: "Token expired or invalid" });
  }
});

// ✅ POST /auth/logout
router.post("/logout", async (req, res) => {
  const token = req.cookies.refreshToken;
  if (!token) return res.sendStatus(204); // already logged out

  try {
    const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);

    // 🔍 Clear token from DB if it matches
    const user = await User.findById(decoded.userId);
    if (user && user.refreshToken === token) {
      user.refreshToken = null;
      await user.save();
    }

  } catch (err) {
    // Even if token is invalid, we still clear the cookie
  }

  // ✅ Clear refreshToken cookie
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: false, // true in production
    sameSite: "lax",
  });

  res.status(200).json({ message: "Logged out successfully" });
});

module.exports = router;
