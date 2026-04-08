# Task Manager - Backend API

A REST API built with Node.js, Express, and PostgreSQL. Supports creating, reading, and updating tasks stored in a cloud database.

## Table of Contents

- [Overview](#overview)
- [Installation](#installation)
- [API Documentation](#api-documentation)
- [Database Setup](#database-setup)
- [Authentication & Security](#authentication--security)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

## Overview

- **Tech Stack:** Node.js, Express.js, PostgreSQL
- **Purpose:** Provide a REST API for the Task Manager frontend
- **Live API:** https://my-express-app-rj65.onrender.com

## Installation

### Prerequisites

- Node.js v18+
- PostgreSQL database (or use a cloud database like Render PostgreSQL)

### Steps

```bash
git clone https://github.com/UkiKOooo/my-express-app.git
cd my-express-app
npm install
```

Create a `.env` file in the root folder:

```bash
DATABASE_URL=your_postgresql_connection_url_here
```

Initialize the database:

```bash
node init_db.js
```

Start the server:

```bash
node app.js
```

The API will run at `http://localhost:3000`.

## API Documentation

### GET /api/v1/tasks

Returns all tasks. Optionally filter by status.

**Request:**
```
GET /api/v1/tasks
GET /api/v1/tasks?status=pending
```

**Response:**
```json
[
  { "id": 1, "title": "Buy groceries", "status": "pending" },
  { "id": 2, "title": "Do homework", "status": "completed" }
]
```

---

### GET /api/v1/tasks/:id

Returns a single task by ID.

**Request:**
```
GET /api/v1/tasks/1
```

**Response:**
```json
{ "id": 1, "title": "Buy groceries", "status": "pending" }
```

---

### POST /api/v1/tasks

Creates a new task.

**Request Body:**
```json
{ "title": "New task", "status": "pending" }
```

**Response:**
```json
{ "id": 51, "title": "New task", "status": "pending" }
```

---

### PUT /api/v1/tasks/:id

Updates an existing task.

**Request Body:**
```json
{ "title": "Updated task", "status": "completed" }
```

**Response:**
```json
{ "id": 1, "title": "Updated task", "status": "completed" }
```

## Database Setup

This project uses PostgreSQL. The database has one table:

**Table: tasks**

| Column | Type | Description |
|--------|------|-------------|
| id | SERIAL | Primary key (auto-increment) |
| title | TEXT | Task title |
| status | TEXT | pending / in-progress / completed |

To initialize the table, run:

```bash
node init_db.js
```

## Authentication & Security

This API currently does not use authentication. All endpoints are publicly accessible. For production use, it is recommended to add JWT-based authentication.

## Deployment

This API is deployed on **Render**.

To deploy your own version:

1. Push your code to GitHub
2. Go to [render.com](https://render.com) and create a new Web Service
3. Connect your GitHub repository
4. Set the environment variable `DATABASE_URL` in Render's dashboard
5. Set the start command to `node app.js`

## Contributing

1. Fork the repository
2. Create a new branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m 'Add some feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.
