﻿# Strava-like API

A RESTful API for a Strava-like application that allows users to track their sports activities, follow other users, like activities, and view statistics.

## Features

- User authentication (register, login)
- Activity tracking (create, view)
- Activity likes (like, unlike)
- User following (follow, unfollow)
- Statistics by sport type (distance, duration, average speed)
- Time period filtering for statistics

## Technologies Used

- Node.js
- Express.js
- MySQL
- Sequelize ORM
- JSON Web Tokens (JWT) for authentication

## Prerequisites

- Node.js (v12 or higher)
- MySQL (v5.7 or higher)
- npm or yarn

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/strava-like.git
   cd strava-like
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a MySQL database:
   ```sql
   CREATE DATABASE strava;
   ```

4. Configure environment variables:
   Create a `.env` file in the root directory with the following variables:
   ```
   PORT=3000
   DB_HOST=localhost
   DB_USER=your_mysql_username
   DB_PASSWORD=your_mysql_password
   DB_NAME=strava
   JWT_SECRET=your_jwt_secret
   ```

5. Run database migrations:
   Execute the SQL scripts in the `scripts` directory to create the necessary tables.

6. Start the server:
   ```
   npm start
   ```

## Database Schema

The application uses the following database tables:

- `users`: Stores user information
- `activities`: Stores activity data
- `activity_likes`: Stores activity likes
- `followers`: Stores user follow relationships

## API Endpoints

### Authentication

- `POST /api/v1/register`: Register a new user
- `POST /api/v1/login`: Login and get JWT token

### Activities

- `POST /api/v1/activities`: Create a new activity
- `GET /api/v1/activities`: Get all activities for the authenticated user

### Activity Likes

- `POST /api/v1/activities/:activity_id/like`: Like an activity
- `POST /api/v1/activities/:activity_id/unlike`: Unlike an activity

### Following

- `POST /api/v1/follow/:user_id`: Follow a user
- `POST /api/v1/unfollow/:user_id`: Unfollow a user
- `GET /api/v1/followers`: Get users who follow you
- `GET /api/v1/following`: Get users you follow

### Statistics

- `GET /api/v1/statistics`: Get statistics for each sport type
  - Query parameters:
    - `period`: Filter by time period (`week`, `month`, `3months`, `6months`)

## Authentication

All API endpoints (except register and login) require authentication. Include the JWT token in the Authorization header:

```
Authorization: Bearer your_jwt_token
```

## Example Requests

### Register a new user

```
POST /api/v1/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123",
  "name": "John Doe"
}
```

### Login

```
POST /api/v1/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

### Create an activity

```
POST /api/v1/activities
Content-Type: application/json
Authorization: Bearer your_jwt_token

{
  "type": "running",
  "distance": 5.2,
  "duration": 1800,
  "date": "2023-06-10T10:30:00Z",
  "path": {
    "points": [
      {"lat": 48.8566, "lng": 2.3522},
      {"lat": 48.8567, "lng": 2.3525}
    ]
  }
}
```

### Get statistics

```
GET /api/v1/statistics?period=month
Authorization: Bearer your_jwt_token
```
