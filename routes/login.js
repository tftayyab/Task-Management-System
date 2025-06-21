const express = require("express");
const Task = require("../models/TaskMongoDB");
const User = require("../models/UserMongoDB");
const asyncWrapper = require("../middleware/asyncWrapper");
const bcrypt = require("bcrypt");


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

    // ✅ Now fetch tasks that belong to this user
    const tasks = await Task.find({ username });

    res.status(200).json({
      message: "Login successful",
      user: {
        username: user.username,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName
      },
      tasks // send user's tasks back
    });
  })
);


module.exports = router;
