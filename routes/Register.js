const express = require("express");
const router = express.Router(); // ✅ You need this line!

const User = require("../models/UserMongoDB");
const { validateUsers } = require("../validations/Usersvalidation");
const validateRequest = require("../middleware/validateRequest");
const asyncWrapper = require("../middleware/asyncWrapper");
const bcrypt = require("bcrypt");

// POST /user data
router.post(
  "/",
  validateRequest(validateUsers),
  asyncWrapper(async (req, res) => {
    const { password, ...rest } = req.validatedBody;

    // 🔍 Check if username or email already exists
    const existingUser = await User.findOne({
      $or: [{ email: rest.email }, { username: rest.username }]
    });

    if (existingUser) {
      return res.status(409).json({ message: "Email or Username already exists" });
    }

    // 🔐 Hash password
    const hashedPassword = await bcrypt.hash(password, 10); // 10 salt rounds

    // 📝 Create and save user
    const user = new User({
      ...rest,
      password: hashedPassword,
    });

    await user.save();

    // ✅ Respond without sending password
    res.status(201).json({ message: "User created", user: { ...rest } });
  })
);

module.exports = router;
