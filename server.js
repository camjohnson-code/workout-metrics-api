const express = require('express');
const app = express();
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');

app.use(
  cors({
    origin: 'http://localhost:3000',
  })
);
app.use(express.json());
app.set('port', process.env.PORT || 3001);

app.locals = {
  users: [],
  activities: [],
};

app.listen(app.get('port'), () => {
  console.log(
    `Workout Metrics API running on http://localhost:${app.get('port')}`
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

// Get all activities or activities for a specific user by ID
app.get('/api/v1/activities/:userId', (req, res) => {
  const userId = parseInt(req.params.userId);
  const activities = app.locals.activities;
  const userActivities = activities.filter(
    (activity) => activity.athlete.id === userId
  );

  return res.status(200).json({ data: userActivities });
});

// Add a user
app.post(
  '/api/v1/users',
  checkRequiredProperties([
    'firstname',
    'lastname',
    'city',
    'state',
    'profile_medium',
    'id',
  ]),
  (req, res) => {
    const newUser = { ...req.body };
    if (!app.locals.users.find((user) => user.id === newUser.id))
      app.locals.users.push(newUser);

    res.status(201).json(newUser);
  }
);

// Add activities
app.post('/api/v1/activities', (req, res) => {
  const id = uuidv4();
  const newActivity = { id, ...req.body };
  app.locals.activities.push(newActivity);
  res.status(201).json(newActivity);
});
