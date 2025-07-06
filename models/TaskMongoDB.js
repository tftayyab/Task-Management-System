const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  owner: { type: String, required: true },
  title: { type: String, required: true },
  description: String,
  status: {
    type: String,
    enum: ['Pending', 'In Progress', 'Completed'],
    default: 'Pending',
  },
  dueDate: Date,
  shareWith: {
    type: [String],
    default: [],
  },
  teamId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Team',
    default: null,
  },
});

const Task = mongoose.model('Task', taskSchema);
module.exports = Task;
