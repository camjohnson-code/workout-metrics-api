# Workout Metrics API

This API provides endpoints to manage user profiles and activities for a workout tracking application.

## Introduction

The Workout Metrics API allows users to manage user profiles, activities, quotes, and hall of fame entries for a workout tracking application. It provides a RESTful interface for interacting with the data, allowing users to create, read, update, and delete resources.

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

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/users` | Returns a list of all users |
| GET | `/api/v1/users/:id` | Returns the user with the specified ID |
| GET | `/api/v1/activities` | Returns a list of all activities |
| GET | `/api/v1/activities/:userId` | Returns activities for the user with the specified ID |
| GET | `/api/v1/hallOfFame` | Returns all hall of fame activities |
| GET | `/api/v1/hallOfFame/:userId` | Returns hall of fame activities by user ID |
| GET | `/api/v1/quote` | Returns an array of quotes |
| GET | `/api/v1/quote/:id` | Returns a quote by ID |
| POST | `/api/v1/users` | Adds a new user |
| POST | `/api/v1/activities` | Adds a new activity |
| POST | `/api/v1/hallOfFame` | Adds activities to hall of fame |
| POST | `/api/v1/quote` | Adds a quote |
| PUT | `/api/v1/users/:id` | Updates a user |
| PUT | `/api/v1/quote/:id` | Updates a quote |
| DELETE | `/api/v1/hallOfFame/:id` | Deletes an activity from hall of fame |
| DELETE | `/api/v1/users/:id` | Deletes a user |
| DELETE | `/api/v1/quote/:id` | Deletes a quote |
| DELETE | `/api/v1/users/:userId/activities` | Deletes activities by user ID |
| DELETE | `/api/v1/activities/:id` | Deletes an activity by ID |



## Technologies Used

- Node.js
- Express
- CORS
- Mongoose
