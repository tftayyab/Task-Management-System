const express = require("express");
const Task = require("../models/TaskMongoDB");
const User = require("../models/UserMongoDB");
const asyncWrapper = require("../middleware/asyncWrapper");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken"); // ✅ new

const router = express.Router();

// POST /login
router.post(
  "/",
  asyncWrapper(async (req, res) => {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    // ✅ 1. Generate Tokens
    const payload = { userId: user._id, username: user.username };
    const accessToken = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "15m" });
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: "7d" });

    // ✅ 2. Optional: Save refresh token in DB (recommended for logout support)
    user.refreshToken = refreshToken;
    await user.save();

    // ✅ 3. Set refreshToken in HTTP-only cookie
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false, // true in production with https
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    // ✅ 4. Fetch tasks as before
    const tasks = await Task.find({ username });

    // ✅ 5. Send response with access token and tasks
    res.status(200).json({
      message: "Login successful",
      accessToken, // frontend saves this
      user: {
        username: user.username,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      },
      tasks,
    });
  })
);

module.exports = router;
