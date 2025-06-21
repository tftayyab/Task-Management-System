const express = require('express');
const router = express.Router();
const verifyToken = require("../middleware/verifyToken");

router.use(verifyToken); // ✅ Protect all future routes

module.exports = router;
