const express = require("express");
const Task = require("../models/TaskMongoDB");
const { validateTasks } = require("../validations/Tasksvalidation");
const validateRequest = require("../middleware/validateRequest");
const isValidObjectId = require("../utils/validateObjectId");
const asyncWrapper = require("../middleware/asyncWrapper");
const verifyToken = require("../middleware/verifyToken");

const router = express.Router();
router.use(verifyToken); 

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
