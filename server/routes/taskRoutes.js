import express from "express";
import Task from "../models/Task.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// GET all tasks
router.get("/", protect, async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.user.id }).sort({ createdAt: -1 });
    if (!Array.isArray(tasks)) {
      return res.status(500).json({ message: "Tasks are not in an array format" });
    }
    res.json(tasks);
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({ message: "Failed to fetch tasks" });
  }
});


// POST new task
router.post("/", protect, async (req, res) => {
  const task = await Task.create({
    userId: req.user.id,
    title: req.body.title,
  });
  res.status(201).json(task);
});

// PUT update task
router.put("/:id", protect, async (req, res) => {
  const task = await Task.findOneAndUpdate(
    { _id: req.params.id, userId: req.user.id },
    { $set: req.body },
    { new: true }
  );
  res.json(task);
});

// DELETE task
router.delete("/:id", protect, async (req, res) => {
  await Task.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
  res.json({ message: "Task deleted" });
});

export default router;