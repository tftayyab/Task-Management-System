const express = require("express");
const Joi = require("joi");
const Task = require("../models/Task");

const router = express.Router();

// Joi validation schema
const taskSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  status: Joi.string().valid("Pending", "In Progress", "Completed").required(),
  dueDate: Joi.date().required()
});

// Route: /tasks/
router.route("/")
  .post(async (req, res) => {
    // Validate request body
    const { error } = taskSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    try {
      // Create and save task
      const task = new Task(req.body);
      await task.save();
      res.status(201).json({ message: "Task created", task });
    } catch (err) {
      res.status(500).json({ message: "Server error", error: err.message });
    }
  })
  .get(async (req, res) => {
    try {
      const tasks = await Task.find();
      res.json(tasks);
    } catch (err) {
      res.status(500).json({ message: "Error fetching tasks", error: err.message });
    }
  });

// Route: /tasks/:id
router.route("/:id")
  .get(async (req, res) => {
    try {
      const task = await Task.findById(req.params.id);
      if (!task) return res.status(404).json({ message: "Task not found" });
      res.json(task);
    } catch (err) {
      res.status(500).json({ message: "Error retrieving task", error: err.message });
    }
  })
  .put(async (req, res) => {
    const { error } = taskSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    try {
      const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!task) return res.status(404).json({ message: "Task not found" });
      res.json({ message: "Task updated", task });
    } catch (err) {
      res.status(500).json({ message: "Error updating task", error: err.message });
    }
  })
  .delete(async (req, res) => {
    try {
      const task = await Task.findByIdAndDelete(req.params.id);
      if (!task) return res.status(404).json({ message: "Task not found" });
      res.json({ message: "Task deleted", task });
    } catch (err) {
      res.status(500).json({ message: "Error deleting task", error: err.message });
    }
  });

module.exports = router;
