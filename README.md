# My Express App

A simple REST API built with Node.js, Express, and PostgreSQL.

## Setup Instructions

1. Clone the repository
   git clone https://github.com/UkiKOooo/my-express-app.git

2. Install dependencies
   npm install

3. Create a .env file and add your database URL
   DATABASE_URL=your_postgresql_url_here

4. Initialize the database
   node init_db.js

5. Start the server
   node app.js

## API Endpoints

- GET    /api/v1/tasks           - Get all tasks (filter by ?status=pending)
- POST   /api/v1/tasks           - Create a new task
- PUT    /api/v1/tasks/:id       - Update an existing task

## Live API

https://my-express-app-rj65.onrender.com