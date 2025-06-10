const express = require("express");
const Task = require("../models/Task");
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
router.get(
  "/",
  asyncWrapper(async (req, res) => {
    const tasks = await Task.find();
    res.json(tasks);
  })
);

// GET /tasks/:id
router.get(
  "/:id",
  asyncWrapper(async (req, res) => {
    if (!isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: "Invalid Task ID format" });
    }

    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.json(task);
  })
);

// PUT /tasks/:id
router.put(
  "/:id",
  validateRequest(validateTasks),
  asyncWrapper(async (req, res) => {
    if (!isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: "Invalid Task ID format" });
    }

    const task = await Task.findByIdAndUpdate(req.params.id, req.validatedBody, {
      new: true,
    });
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.json({ message: "Task updated", task });
  })
);

// DELETE /tasks/:id
router.delete(
  "/:id",
  asyncWrapper(async (req, res) => {
    if (!isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: "Invalid Task ID format" });
    }

    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.json({ message: "Task deleted", task });
  })
);

module.exports = router;
