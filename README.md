# Workout Metrics API

This API provides endpoints to manage user profiles and activities for a workout tracking application.

## Getting Started

To get started with the API, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/camjohnson-code/workout-metrics-api.git
   ```
2. Install dependencies:
   ```bash
   cd workout-metrics-api
   npm install
   ```
3. Start the server:
   ```bash
   npm start
   ```
4. The API will be available at `http://localhost:3001`.

## Endpoints

### Get all users
```
GET /api/v1/users
```
Returns a list of all users.

### Get user by ID
```
GET /api/v1/users/:id
```
Returns the user with the specified ID.

### Get all activities
```
GET /api/v1/activities
```
Returns a list of all activities.

### Get activities for a specific user by ID
```
GET /api/v1/activities/:userId
```
Returns activities for the user with the specified ID.

### Add a user
```
POST /api/v1/users
```
Adds a new user.

### Add an activity
```
POST /api/v1/activities
```
Adds a new activity.

## Technologies Used

- Node.js
- Express
- CORS
- uuid (for generating UUIDs)