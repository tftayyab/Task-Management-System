const express = require("express");
const Task = require("../models/TaskMongoDB");
const Team = require("../models/TeamMongoDB");
const { validateTasks } = require("../validations/Tasksvalidation");
const validateRequest = require("../middleware/validateRequest");
const asyncWrapper = require("../middleware/asyncWrapper");
const verifyToken = require("../middleware/verifyToken");

const router = express.Router();
router.use(verifyToken);

// ✅ POST /tasks - Create a new task with authenticated user as owner
router.post(
  "/",
  validateRequest(validateTasks),
  asyncWrapper(async (req, res) => {
    const owner = req.user.username;
    const { teamId } = req.body; // ✅ Receive from frontend

    const task = new Task({
      ...req.validatedBody,
      owner,
      teamId: teamId || null, // ✅ Save team ID if provided
    });

    await task.save();
    res.status(201).json({ message: "Task created", task });
  })
);

// ✅ GET /tasks - Get tasks owned by or shared with the logged-in user
router.get(
  "/",
  asyncWrapper(async (req, res) => {
    const username = req.user.username;

    const ownerTasks = await Task.find({ owner: username });
    const sharedTasks = await Task.find({ shareWith: username });

    // 🔄 Optional: remove duplicates if a task is both owned and shared (rare case)
    const allTasks = [...ownerTasks];

    sharedTasks.forEach(sharedTask => {
      if (!ownerTasks.find(t => t._id.toString() === sharedTask._id.toString())) {
        allTasks.push(sharedTask);
      }
    });

    res.json(allTasks);
  })
);

// ✅ GET /tasks/shared - Get tasks from teams where user is owner or shared with
router.get(
  "/shared",
  asyncWrapper(async (req, res) => {
    const currentUser = req.user.username;

    const teams = await Team.find({
      $or: [{ owner: currentUser }, { shareWith: currentUser }],
      shareWith: { $exists: true, $not: { $size: 0 } },
    });

    const teamIds = teams.map(t => t._id);

    const tasks = await Task.find({ teamId: { $in: teamIds } });

    res.json({ teams, tasks });
  })
);

module.exports = router;
