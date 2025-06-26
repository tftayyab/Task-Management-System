const express = require("express");
const router = express.Router();

const User = require("../models/UserMongoDB");
const { validateUsers } = require("../validations/Usersvalidation");
const validateRequest = require("../middleware/validateRequest");
const asyncWrapper = require("../middleware/asyncWrapper");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken"); 

// POST /user data
router.post(
  "/",
  validateRequest(validateUsers),
  asyncWrapper(async (req, res) => {
    const { password, ...rest } = req.validatedBody;

    //  Check if username or email already exists
    const existingUser = await User.findOne({
      $or: [{ email: rest.email }, { username: rest.username }]
    });

    if (existingUser) {
      return res.status(409).json({ message: "Email or Username already exists" });
    }

    //  Hash password
    const hashedPassword = await bcrypt.hash(password, 10); // 10 salt rounds

    //  Create and save user
    const user = new User({
      ...rest,
      password: hashedPassword,
    });

    //  Create tokens
    const payload = { userId: user._id, username: user.username };
    const accessToken = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "15m" });
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: "7d" });

    //  Store refresh token in user model
    user.refreshToken = refreshToken;
    await user.save();

    // Set refreshToken in HTTP-only cookie
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false, // Set to true in production
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    // Respond with user (no password) and accessToken
    res.status(201).json({
      message: "User created",
      accessToken,
      user: { ...rest }
    });
  })
);

module.exports = router;
