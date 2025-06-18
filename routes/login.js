const express = require("express");
const Task = require("../models/TaskMongoDB");
const Joi = require('joi');
const { validateTasks } = require("../validations/Tasksvalidation");
const validateRequest = require("../middleware/validateRequest");
const isValidObjectId = require("../utils/validateObjectId");
const asyncWrapper = require("../middleware/asyncWrapper");

const router = express.Router();
/*
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
router.get(
  "/",
  asyncWrapper(async (req, res) => {
    const tasks = await Task.find();
    res.json(tasks);
  })
);
*/
module.exports = router;
