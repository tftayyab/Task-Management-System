const express = require("express");
const Team = require("../models/TeamMongoDB");
const asyncWrapper = require("../middleware/asyncWrapper");
const verifyToken = require("../middleware/verifyToken");

const router = express.Router();
router.use(verifyToken);

// ✅ POST /teams - Create or update a team
router.post(
  "/",
  asyncWrapper(async (req, res) => {
    const { teamName, usernames = [] } = req.body;
    const owner = req.user.username; // 🔐 Secure: get from token

    // ✅ Validate team name
    if (!teamName || typeof teamName !== "string") {
      return res.status(400).json({ message: "Team name is required" });
    }

    // ✅ Validate members
    if (!Array.isArray(usernames) || usernames.length > 5) {
      return res.status(400).json({ message: "You can only add up to 5 users" });
    }

    // ✅ Create or update team
    const team = await Team.findOneAndUpdate(
      { owner, teamName }, // Unique per user
      {
        $set: { owner, teamName },
        $addToSet: { shareWith: { $each: usernames } },
      },
      { upsert: true, new: true }
    );

    res.status(201).json({ message: "Team created/updated", team });
  })
);

// ✅ DELETE /teams/:id - Delete a team (only owner allowed)
router.delete(
  "/:id",
  asyncWrapper(async (req, res) => {
    const teamId = req.params.id;
    const username = req.user.username;

    const team = await Team.findById(teamId);

    if (!team) {
      return res.status(404).json({ message: "Team not found" });
    }

    if (team.owner !== username) {
      return res.status(403).json({ message: "Only the team owner can delete this team" });
    }

    await Team.findByIdAndDelete(teamId);

    res.json({ message: "Team deleted successfully" });
  })
);


module.exports = router;
