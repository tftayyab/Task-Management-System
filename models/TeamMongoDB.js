const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
  teamName: {
    type: String,
    required: true,
    trim: true
  },
  owner: {
    type: String,
    required: true, // Usually a username or user ID
  },
  shareWith: {
    type: [String], // List of usernames or user IDs the team is shared with
    default: [],
  },
}, {
  timestamps: true, // adds createdAt and updatedAt
});

const Team = mongoose.model('Team', teamSchema);
module.exports = Team;
