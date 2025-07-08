const express = require("express");
const Task = require("../models/TaskMongoDB");
const Team = require("../models/TeamMongoDB");
const { validateTasks } = require("../validations/Tasksvalidation");
const validateRequest = require("../middleware/validateRequest");
const isValidObjectId = require("../utils/validateObjectId");
const asyncWrapper = require("../middleware/asyncWrapper");
const verifyToken = require("../middleware/verifyToken");
const { getIO } = require('../socket');

const router = express.Router();
router.use(verifyToken);

// 📌 GET /tasks/:id - Get one task by ID
router.get(
  "/:id",
  asyncWrapper(async (req, res) => {
    const { id } = req.params;
    const username = req.user.username; // ✅ get logged-in user

    if (!isValidObjectId(id)) {
      return res.status(400).json({ message: "Invalid Task ID format" });
    }

    const task = await Task.findById(id);
    if (!task) return res.status(404).json({ message: "Task not found" });

    // ✅ Only allow owner or shared user
    if (task.owner !== username && !task.shareWith.includes(username)) {
      return res.status(403).json({ message: "You are not allowed to view this task" });
    }

    res.json(task);
  })
);


// ✏️ PUT /tasks/:id - Update a task
router.put(
  "/:id",
  validateRequest(validateTasks),
  asyncWrapper(async (req, res) => {
    const { id } = req.params;
    const username = req.user.username;

    if (!isValidObjectId(id)) {
      return res.status(400).json({ message: "Invalid Task ID format" });
    }

    const existingTask = await Task.findById(id);
    if (!existingTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    // ✅ Only owner can update
    if (existingTask.owner !== username) {
      return res.status(403).json({ message: "You are not allowed to update this task" });
    }

    const { teamIds = [] } = req.validatedBody;

    let shareWith = [];
    if (teamIds.length > 0) {
      const teams = await Team.find({ _id: { $in: teamIds } });
      const members = teams.flatMap((team) => team.shareWith || []);
      shareWith = [...new Set(members)].filter((user) => user !== username);
    }

    const updatedTask = await Task.findByIdAndUpdate(
      id,
      {
        ...req.validatedBody,
        teamIds,
        shareWith,
      },
      { new: true }
    );

    res.json({ message: "Task updated", task: updatedTask });
  })
);


// ✅ DELETE /tasks/:id - Only owner can delete
router.delete(
  "/:id",
  asyncWrapper(async (req, res) => {
    const { id } = req.params;
    const username = req.user.username;

    if (!isValidObjectId(id)) {
      return res.status(400).json({ message: "Invalid Task ID format" });
    }

    const task = await Task.findById(id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    if (task.owner !== username) {
      return res.status(403).json({ message: "You are not allowed to delete this task" });
    }

    await Task.findByIdAndDelete(id);
    res.json({ message: "Task deleted", task });
  })
);

// 📤 PUT /tasks/:id/share - Share task with a team
router.put(
  "/:id/share",
  asyncWrapper(async (req, res) => {
    const taskId = req.params.id;
    const { teamName, usernames = [] } = req.body;
    const owner = req.user.username;

    if (!Array.isArray(usernames) || usernames.length > 5) {
      return res.status(400).json({ message: "You can only add up to 5 users" });
    }

    if (!teamName || typeof teamName !== "string") {
      return res.status(400).json({ message: "Team name is required" });
    }

    // 🔄 Upsert team info
    const updatedTeam = await Team.findOneAndUpdate(
      { owner, teamName },
      {
        $set: { owner, teamName },
        $addToSet: { shareWith: { $each: usernames } },
      },
      { upsert: true, new: true }
    );

    const task = await Task.findById(taskId);
    if (task) {
      task.owner = owner;
      task.shareWith = usernames;

      // ✅ Add team ID to teamIds[] if not already present
      if (!task.teamIds) task.teamIds = [];
      const alreadyAdded = task.teamIds.some(
        (id) => id.toString() === updatedTeam._id.toString()
      );
      if (!alreadyAdded) {
        task.teamIds.push(updatedTeam._id);
      }

      await task.save();

      // ✅ Emit notifications
      const io = getIO();

      // 1. Notify all usernames individually
      usernames.forEach((username) => {
        io.to(username).emit("task_created", {
          message: `Task "${task.title}" was shared with you`,
          teamId: updatedTeam._id.toString(),
        });
      });

      // 2. Notify the team room
      io.to(updatedTeam._id.toString()).emit("team_updated", {
        message: `Team "${updatedTeam.teamName}" has been updated`,
        teamId: updatedTeam._id.toString(),
      });
    }

    res.json({ message: "Team shared/updated", team: updatedTeam });
  })
);

module.exports = router;
