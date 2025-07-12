const express = require("express");
const Task = require("../models/TaskMongoDB");
const Team = require("../models/TeamMongoDB");
const { validateTasks } = require("../validations/Tasksvalidation");
const validateRequest = require("../middleware/validateRequest");
const asyncWrapper = require("../middleware/asyncWrapper");
const verifyToken = require("../middleware/verifyToken");
const { getIO } = require('../socket');

const router = express.Router();
router.use(verifyToken);

// ✅ POST /tasks - Create a new task
router.post(
  "/",
  validateRequest(validateTasks),
  asyncWrapper(async (req, res) => {
    const owner = req.user.username;
    const { teamIds = [], createdAt } = req.validatedBody;
    const io = getIO();

    let shareWith = [];

    if (teamIds.length > 0) {
      const teams = await Team.find({ _id: { $in: teamIds } });
      const members = teams.flatMap(team => team.shareWith || []);
      shareWith = [...new Set(members)].filter(username => username !== owner);
    }

    const task = new Task({
      ...req.validatedBody,
      owner,
      teamIds,
      shareWith,
      ...(createdAt ? { createdAt } : {}), // ✅ only set manually if provided
    });

    await task.save();

    // ✅ Notify team rooms
    teamIds.forEach(teamId => {
      io.to(teamId.toString()).emit('task_created', {
        message: `New task "${task.title}" added to your team`,
        teamId,
      });
    });

    // ✅ Notify shared users
    shareWith.forEach(username => {
      io.to(username).emit('task_created', {
        message: `A new task "${task.title}" was shared with you`,
        teamId: teamIds[0],
      });
    });

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

// ✅ GET /tasks/shared - Tasks linked to shared teams
router.get(
  "/shared",
  asyncWrapper(async (req, res) => {
    const currentUser = req.user.username;

    const teams = await Team.find({
      $or: [{ owner: currentUser }, { shareWith: currentUser }],
      shareWith: { $exists: true, $not: { $size: 0 } },
    });

    const teamIds = teams.map(t => t._id);

    const tasks = await Task.find({ teamIds: { $in: teamIds } });

    res.json({ teams, tasks });
  })
);

module.exports = router;
