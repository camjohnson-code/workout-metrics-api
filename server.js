const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const Activity = require('./models/activity.model');
const User = require('./models/user.model');
const Quote = require('./models/quote.model');
const HallOfFame = require('./models/hallOfFame.model');
require('dotenv').config(); 

const uri = process.env.MONGODB_URI;

mongoose
  .connect(uri)
  .then(() => {
    console.log('connected to database');
    app.listen(app.get('port'), () => {
      console.log(
        `Workout Metrics API running on localhost:${app.get('port')}`
      );
    });
  })
  .catch(() => {
    console.log('connection failed');
  });

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
  })
);
app.use(express.json());
app.set('port', process.env.PORT || 3001);

// Endpoints
// Get all users
app.get('/api/v1/users', async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get user by ID
app.get('/api/v1/users/:id', async (req, res) => {
  try {
    const user = await User.findOne({ id: req.params.id });
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all activities
app.get('/api/v1/activities', async (req, res) => {
  try {
    const activities = await Activity.find();
    res.status(200).json(activities);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get activities by user ID
app.get('/api/v1/activities/:userId', async (req, res) => {
  const userId = parseInt(req.params.userId);

  try {
    const activities = await Activity.find({ userId: userId });
    res.status(200).json(activities);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// Get all hall of fame activities
app.get('/api/v1/hallOfFame', async (req, res) => {
  try {
    const hallOfFame = await HallOfFame.find();
    res.status(200).json(hallOfFame);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get hall of fame activities by user ID
app.get('/api/v1/hallOfFame/:userId', async (req, res) => {
  const userId = parseInt(req.params.userId);

  try {
    const hallOfFame = await HallOfFame.find({ userId: userId });
    res.status(200).json(hallOfFame);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// Get a quote
app.get('/api/v1/quote', async (req, res) => {
  try {
    const quote = await Quote.find();
    res.status(200).json(quote);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create a user
app.post('/api/v1/users', async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create an activity
app.post('/api/v1/activities', async (req, res) => {
  try {
    const existingActivity = await Activity.findOne({ id: req.body.id });
    if (existingActivity)
      return res.status(400).json({ error: 'Activity already exists' });

    const newActivity = await Activity.create(req.body);
    res.status(201).json(newActivity);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create a hall of fame activity
app.post('/api/v1/hallOfFame', async (req, res) => {
  try {
    const newFavorite = await HallOfFame.create(req.body);
    res.status(201).json(newFavorite);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create a quote
app.post('/api/v1/quote', async (req, res) => {
  try {
    const newQuote = await Quote.create(req.body);
    res.status(201).json(newQuote);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a user
app.put('/api/v1/users/:id', async (req, res) => {
  try {
    const user = await User.findOneAndUpdate({ id: req.params.id }, req.body, {
      new: true,
    });
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete from hall of fame
app.delete('/api/v1/hallOfFame/:id', async (req, res) => {
  try {
    const hallOfFame = await HallOfFame.findOneAndDelete({ id: req.params.id });
    if (!hallOfFame)
      return res.status(404).json({ error: 'Activity not found' });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a user
app.delete('/api/v1/users/:id', async (req, res) => {
  try {
    const user = await User.findOneAndDelete({ id: req.params.id });
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete activities by user Id
app.delete('/api/v1/activities/:userId', async (req, res) => {
  try {
    const activities = await Activity.deleteMany({ userId: req.params.userId });
    if (!activities)
      return res.status(404).json({ error: 'Activities not found' });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
