const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  username: String,
  dateOfBirth: Date,  // New field for date
  subject: String     // New field for subject
});

const User = mongoose.model('User', userSchema);

module.exports = User;
