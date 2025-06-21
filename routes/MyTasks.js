const express = require("express");
const Task = require("../models/TaskMongoDB");
const Joi = require('joi');
const { validateTasks } = require("../validations/Tasksvalidation");
const validateRequest = require("../middleware/validateRequest");
const isValidObjectId = require("../utils/validateObjectId");
const asyncWrapper = require("../middleware/asyncWrapper");

const router = express.Router();

// POST /tasks
router.post(
  "/",
  validateRequest(validateTasks),
  asyncWrapper(async (req, res) => {
    const task = new Task(req.validatedBody);
    await task.save();
    res.status(201).json({ message: "Task created", task });
  })
);

// GET /tasks
router.get("/", asyncWrapper(async (req, res) => {
  const username = req.query.username;

  if (!username) {
    return res.status(400).json({ message: "Username required in query" });
  }

  const tasks = await Task.find({ username }); // ✅ only fetch tasks for that user
  res.json(tasks);
}));


module.exports = router;
