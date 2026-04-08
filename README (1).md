# Task Manager - Frontend

A simple web application that allows users to view, add, and edit tasks. Built with plain HTML, CSS, and JavaScript, connected to a live REST API backend.

## Table of Contents

- [Overview](#overview)
- [Installation](#installation)
- [Usage](#usage)
- [API Integration](#api-integration)
- [Contributing](#contributing)
- [License](#license)

## Overview

This frontend was built as part of a full-stack web development project. It connects to a Node.js/Express backend API to perform CRUD operations on a PostgreSQL database.

- **Framework:** Plain HTML, CSS, JavaScript (no framework)
- **Purpose:** Manage tasks (view, add, update)
- **Deployed at:** https://ukikoooo.github.io/cmps262-web/

## Installation

### Prerequisites

No installation required. This is a static website — just open the HTML files in a browser.

If you want to run it locally:

```bash
git clone https://github.com/UkiKOooo/cmps262-web.git
cd cmps262-web
```

Then open `index.html` in your browser.

## Usage

The app has 4 pages:

- **Home** (`index.html`) — Welcome page with navigation links
- **View Tasks** (`view.html`) — Displays all tasks from the database in a table
- **Add Task** (`add.html`) — Form to add a new task; shows a confirmation popup on success
- **Edit Task** (`edit.html`) — Select a task from a dropdown, update the title or status

Each page has a navigation bar to move between pages.

## API Integration

The frontend connects to the backend API hosted on Render:

**Base URL:** `https://my-express-app-rj65.onrender.com`

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/tasks` | Get all tasks |
| POST | `/api/v1/tasks` | Add a new task |
| PUT | `/api/v1/tasks/:id` | Update an existing task |

Example fetch call used in the project:

```javascript
fetch('https://my-express-app-rj65.onrender.com/api/v1/tasks', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ title: 'Buy groceries', status: 'pending' })
})
```

## Contributing

1. Fork the repository
2. Create a new branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m 'Add some feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.
