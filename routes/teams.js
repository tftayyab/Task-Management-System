const express = require("express");
const Team = require("../models/TeamMongoDB");
const Task = require("../models/TaskMongoDB");
const asyncWrapper = require("../middleware/asyncWrapper");
const verifyToken = require("../middleware/verifyToken");
const { getIO } = require('../socket');

const router = express.Router();
router.use(verifyToken);

// POST /teams - Create or update a team
router.post(
  "/",
  asyncWrapper(async (req, res) => {
    const { teamName, usernames = [] } = req.body;
    const owner = req.user.username;

    if (!teamName || typeof teamName !== "string") {
      return res.status(400).json({ message: "Team name is required" });
    }

    if (!Array.isArray(usernames) || usernames.length > 5) {
      return res.status(400).json({ message: "You can only add up to 5 users" });
    }

    const team = await Team.findOneAndUpdate(
      { owner, teamName },
      {
        $set: { owner, teamName },
        $addToSet: { shareWith: { $each: usernames } },
      },
      { upsert: true, new: true }
    );

    const io = getIO();

    usernames.forEach(username => {
      io.to(username).emit('team_added', {
        message: `You've been added to team "${team.teamName}"`,
        teamId: team._id,
      });
    });

    io.to(team._id.toString()).emit('team_updated', {
      message: `Team "${team.teamName}" was updated`,
      teamId: team._id,
    });

    res.status(201).json({ message: "Team created/updated", team });
  })
);

// DELETE /teams/:id - Delete a team (only owner can delete)
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

    await Task.updateMany(
      { teamIds: teamId },
      { $pull: { teamIds: teamId } }
    );

    res.json({ message: "Team deleted successfully" });
  })
);

// PUT /teams/:id - Edit a team (name + members)
router.put(
  "/:id",
  asyncWrapper(async (req, res) => {
    const teamId = req.params.id;
    const { teamName, usernames = [] } = req.body;
    const username = req.user.username;

    if (!teamName || typeof teamName !== "string") {
      return res.status(400).json({ message: "Team name is required" });
    }

    if (!Array.isArray(usernames) || usernames.length > 5) {
      return res.status(400).json({ message: "Max 5 members allowed" });
    }

    const team = await Team.findById(teamId);
    if (!team) {
      return res.status(404).json({ message: "Team not found" });
    }

    if (team.owner !== username) {
      return res.status(403).json({ message: "You cannot edit this team" });
    }

    team.teamName = teamName;
    team.shareWith = usernames;
    await team.save();

    res.json({ message: "Team updated successfully", team });
  })
);

module.exports = router;
