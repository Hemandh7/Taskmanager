const Task = require('../models/Task');

// CRUD operations for tasks
const taskController = {
  getAllTasks: async (req, res, next) => {
    try {
      const tasks = await Task.find();
      res.json(tasks);
    } catch (error) {
      next(error);
    }
  },

  createTask: async (req, res, next) => {
    try {
      const { title, description } = req.body;
      const task = new Task({ title, description });
      await task.save();
      res.status(201).json(task);
    } catch (error) {
      next(error);
    }
  },

  updateTask: async (req, res, next) => {
    try {
      const { id } = req.params;
      const { title, description } = req.body;
      const updatedTask = await Task.findByIdAndUpdate(id, { title, description }, { new: true });
      res.json(updatedTask);
    } catch (error) {
      next(error);
    }
  },

  deleteTask: async (req, res, next) => {
    try {
      const { id } = req.params;
      await Task.findByIdAndDelete(id);
      res.status(204).end();
    } catch (error) {
      next(error);
    }
  }
};

module.exports = taskController;
