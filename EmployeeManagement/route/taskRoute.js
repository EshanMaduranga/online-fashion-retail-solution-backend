// task.route.js

const express = require('express');
const router = express.Router();
const Task = require('../model/taskModel');
const auth = require('../../middleware/auth')

// Route to get all tasks
router.get('/', async (req, res) => {
  try {
    const tasks = await Task.find().populate('assignedTo', 'firstName lastName email');
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Route to create a new task
router.post('/', async (req, res) => {
  const task = new Task({
    title: req.body.title,
    description: req.body.description,
    status: req.body.status || 'Todo', // Default to 'Todo' if status is not provided
    assignedTo: req.body.assignedTo,
  });

  try {
    const newTask = await task.save();
    res.status(201).json(newTask);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Route to update a task
router.put('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const updatedTask = await Task.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedTask) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.json(updatedTask);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Route to delete a task
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deletedTask = await Task.findByIdAndDelete(id);
    if (!deletedTask) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.json({ message: 'Task deleted successfully' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Route to get task by ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const task = await Task.findById(id).populate('assignedTo', 'firstName lastName email');
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.json(task);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;