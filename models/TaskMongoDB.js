const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true, // so every task is linked to a user
  },
  title: {
    type: String,
    required: true
  },
  description: String,
  status: {
    type: String,
    enum: ['Pending', 'In Progress', 'Completed'],
    default: 'Pending'
  },
  dueDate: Date
});

const Task = mongoose.model('Task', taskSchema);
module.exports = Task;
