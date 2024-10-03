const express = require('express');
const mongoose = require('mongoose');
const userModel = require('./usermodel'); // Ensure this file exists
const bodyParser = require('body-parser'); // To parse POST request data
const path = require('path');
const app = express();

// Middleware to parse form data (application/x-www-form-urlencoded)
app.use(bodyParser.urlencoded({ extended: true }));

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/PracticeDB', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB', err));

// Serve the HTML form
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html')); // Assuming the form is in index.html
});

// Handle form submission (POST request)
app.post('/create', async (req, res) => {
  const { name, email, username, date, subject } = req.body; // Extract data from the form
  try {
    let createdUser = await userModel.create({
      name: name,
      email: email,
      username: username,
      dateOfBirth: date, // Store the date value
      subject: subject    // Store the selected subject
    });
    console.log('User created: ', createdUser);
    res.send("User created: " + JSON.stringify(createdUser));
  } catch (err) {
    console.error('Error creating user: ', err);
    res.status(500).send('Error creating user');
  }
});


// Start the server
app.listen(3001, () => {
  console.log('Server is running on port 3001');
});
