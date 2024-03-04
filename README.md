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

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/quote` | Returns a quote |
| GET | `/api/v1/users` | Returns a list of all users |
| GET | `/api/v1/users/:id` | Returns the user with the specified ID |
| GET | `/api/v1/activities` | Returns a list of all activities |
| GET | `/api/v1/activities/:userId` | Returns activities for the user with the specified ID |
| GET | `/api/v1/hallOfFame` | Returns all hall of fame activities |
| GET | `/api/v1/hallOfFame/:userId` | Returns hall of fame activities by user ID |
| POST | `/api/v1/users` | Adds a new user |
| POST | `/api/v1/activities` | Adds a new activity |
| POST | `/api/v1/hallOfFame` | Adds activities to hall of fame |
| POST | `/api/v1/quote` | Adds a quote |
| PUT | `/api/v1/users/:id` | Updates a user |
| DELETE | `/api/v1/hallOfFame/:id` | Deletes from hall of fame |

## Technologies Used

- Node.js
- Express
- CORS
- uuid (for generating UUIDs)
