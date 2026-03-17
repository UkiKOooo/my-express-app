# API Documentation

## Base URL
https://my-express-app-rj65.onrender.com

## Database Schema
Table: tasks
| Column | Type    | Description          |
|--------|---------|----------------------|
| id     | SERIAL  | Primary key          |
| title  | TEXT    | Task title           |
| status | TEXT    | pending / in-progress / completed |

---

## API Endpoints

### 1. GET /api/v1/tasks
Get all tasks. Can filter by status.

**Request:**
GET /api/v1/tasks
GET /api/v1/tasks?status=pending

**Response:**
[
  { "id": 1, "title": "Buy groceries", "status": "pending" }
]

---

### 2. GET /api/v1/tasks/:id
Get a single task by ID.

**Request:**
GET /api/v1/tasks/1

**Response:**
{ "id": 1, "title": "Buy groceries", "status": "pending" }

---

### 3. POST /api/v1/tasks
Create a new task.

**Request Body:**
{ "title": "New task", "status": "pending" }

**Response:**
{ "id": 51, "title": "New task", "status": "pending" }

---

### 4. PUT /api/v1/tasks/:id
Update an existing task.

**Request Body:**
{ "title": "Updated task", "status": "completed" }

**Response:**
{ "id": 1, "title": "Updated task", "status": "completed" }