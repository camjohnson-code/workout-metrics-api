const express = require('express');
const app = express();
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');

app.use(
  cors({
    origin: 'https://workout-metrics.vercel.app'
  })
);
app.use(express.json());
app.set('port', process.env.PORT || 3001);

app.locals = {
  users: [],
  activities: [],
  quote: {},
  hallOfFame: [],
};

app.listen(app.get('port'), () => {
  console.log(
    `Workout Metrics API running on https://workout-metrics.vercel.app:${app.get('port')}`
  );
});

const checkRequiredProperties = (props) => (req, res, next) => {
  const reqPropsList = Object.keys(req.body);
  const hasRequiredProps = props.every((prop) => reqPropsList.includes(prop));

  if (!hasRequiredProps) {
    const missingProps = props.filter((prop) => !reqPropsList.includes(prop));

    return res
      .status(422)
      .send(`The following properties are missing: ${missingProps.join(', ')}`);
  }

  next();
};

// Endpoints
// Get a quote
app.get('/api/v1/quote', (req, res) => {
  return res.status(200).json(app.locals.quote);
});

// Get all users
app.get('/api/v1/users', (req, res) => {
  return res.status(200).json({ users: app.locals.users });
});

// Get user by ID
app.get('/api/v1/users/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const users = app.locals.users;
  const user = users.find((user) => user.id === userId);

  if (!user) return res.status(404).json({ message: 'User not found' });

  return res.status(200).json({ data: user });
});

// Get all activities
app.get('/api/v1/activities', (req, res) => {
  return res.status(200).json({ activities: app.locals.activities });
});

// Get all hall of fame activities
app.get('/api/v1/hallOfFame', (req, res) => {
  return res.status(200).json({ hallOfFame: app.locals.hallOfFame });
});

// Get hall of fame activities by user ID
app.get('/api/v1/hallOfFame/:userId', (req, res) => {
  const userId = parseInt(req.params.userId);
  const hallOfFame = app.locals.hallOfFame;
  const userHallOfFame = hallOfFame.filter(
    (activity) => activity.userId === userId
  );

  return res.status(200).json({ activities: userHallOfFame });
});

// Get all activities or activities for a specific user by ID
app.get('/api/v1/activities/:userId', (req, res) => {
  const userId = parseInt(req.params.userId);
  const activities = app.locals.activities;
  const userActivities = activities.filter(
    (activity) => activity.userId === userId
  );

  return res.status(200).json({ data: userActivities });
});

// Add a user
app.post('/api/v1/users', (req, res) => {
  const newUser = { ...req.body };

  const existingUser = app.locals.users.find(
    (user) => user.id === newUser.id
  );

  if (!existingUser) {
    app.locals.users.push(newUser);
  } else {
    if (existingUser.stravaAccessToken !== newUser.stravaAccessToken) existingUser.stravaAccessToken = newUser.stravaAccessToken;
    else if (existingUser.stravaRefreshToken !== newUser.stravaRefreshToken) existingUser.stravaRefreshToken = newUser.stravaRefreshToken;
    else return res.status(409).json({ message: 'User already exists' });
  }

  const { stravaAccessToken, stravaRefreshToken, ...responseUser } = newUser;
 
  res.status(201).json(responseUser);
});

// Add activities
app.post('/api/v1/activities', (req, res) => {
  const newActivity = { ...req.body };

  const existingActivity = app.locals.activities.find(
    (activity) => activity.id === newActivity.id
  );

  if (!existingActivity) {
    app.locals.activities.push(newActivity);
    res.status(201).json(newActivity);
  }
});

// Add activities to hall of fame
app.post('/api/v1/hallOfFame', (req, res) => {
  const newFavorite = { ...req.body };
  const existingActivity = app.locals.hallOfFame.find(
    (activity) => activity.id === newFavorite.id
  );
  if (!existingActivity) {
    app.locals.hallOfFame.push(newFavorite);
    res.status(201).json(newFavorite);
  }
});

// Add a quote
app.post('/api/v1/quote', (req, res) => {
  const id = uuidv4();
  const date = new Date();
  const newQuote = { id, date, ...req.body };
  app.locals.quote = newQuote;
  return res.status(200).json(app.locals.quote);
});

// Update a user
app.put('/api/v1/users/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const users = app.locals.users;
  const userIndex = users.findIndex((user) => user.id === userId);

  if (userIndex === -1) return res.status(404).json({ message: 'User not found' });

  const updatedUser = { ...users[userIndex], ...req.body };
  users[userIndex] = updatedUser;

  const { stravaAccessToken, stravaRefreshToken, expirationToken, ...responseUser } = updatedUser;

  return res.status(200).json(responseUser);
});

// Delete from hall of fame
app.delete('/api/v1/hallOfFame/:id', (req, res) => {
  const id = Number(req.params.id);
  const index = app.locals.hallOfFame.findIndex(activity => activity.id === id);
  if (index === -1) {
    return res.status(404).json({ error: 'Activity not found' });
  }
  app.locals.hallOfFame.splice(index, 1);
  return res.status(204).send();
});
 