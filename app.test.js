const request = require('supertest');
const express = require('express');
const { Pool } = require('pg');

// Mock the pg module
jest.mock('pg', () => {
  const mPool = {
    query: jest.fn(),
  };
  return { Pool: jest.fn(() => mPool) };
});

const pool = new Pool();

// Create a simple express app for testing
const app = express();
app.use(express.json());

app.get('/api/v1/tasks', async (req, res) => {
  try {
    const { status } = req.query;
    let query = 'SELECT * FROM tasks';
    let params = [];
    if (status) {
      query += ' WHERE status = $1';
      params.push(status);
    }
    const result = await pool.query(query, params);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/v1/tasks', async (req, res) => {
  try {
    const { title, status } = req.body;
    const result = await pool.query(
      'INSERT INTO tasks (title, status) VALUES ($1, $2) RETURNING *',
      [title, status || 'pending']
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/api/v1/tasks/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, status } = req.body;
    const result = await pool.query(
      'UPDATE tasks SET title = $1, status = $2 WHERE id = $3 RETURNING *',
      [title, status, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/v1/tasks/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      'DELETE FROM tasks WHERE id = $1 RETURNING *',
      [id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.json({ message: 'Task deleted', task: result.rows[0] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ─── Tests ───────────────────────────────────────────────────────────────────

describe('GET /api/v1/tasks', () => {
  test('should return all tasks', async () => {
    pool.query.mockResolvedValueOnce({
      rows: [
        { id: 1, title: 'Buy groceries', status: 'pending' },
        { id: 2, title: 'Do homework', status: 'completed' }
      ]
    });

    const res = await request(app).get('/api/v1/tasks');
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBe(2);
    expect(res.body[0].title).toBe('Buy groceries');
  });

  test('should filter tasks by status', async () => {
    pool.query.mockResolvedValueOnce({
      rows: [{ id: 1, title: 'Buy groceries', status: 'pending' }]
    });

    const res = await request(app).get('/api/v1/tasks?status=pending');
    expect(res.statusCode).toBe(200);
    expect(res.body[0].status).toBe('pending');
  });
});

describe('POST /api/v1/tasks', () => {
  test('should create a new task', async () => {
    pool.query.mockResolvedValueOnce({
      rows: [{ id: 3, title: 'New task', status: 'pending' }]
    });

    const res = await request(app)
      .post('/api/v1/tasks')
      .send({ title: 'New task', status: 'pending' });

    expect(res.statusCode).toBe(201);
    expect(res.body.title).toBe('New task');
    expect(res.body.status).toBe('pending');
  });
});

describe('PUT /api/v1/tasks/:id', () => {
  test('should update an existing task', async () => {
    pool.query.mockResolvedValueOnce({
      rows: [{ id: 1, title: 'Updated task', status: 'completed' }]
    });

    const res = await request(app)
      .put('/api/v1/tasks/1')
      .send({ title: 'Updated task', status: 'completed' });

    expect(res.statusCode).toBe(200);
    expect(res.body.title).toBe('Updated task');
    expect(res.body.status).toBe('completed');
  });

  test('should return 404 if task not found', async () => {
    pool.query.mockResolvedValueOnce({ rows: [] });

    const res = await request(app)
      .put('/api/v1/tasks/999')
      .send({ title: 'Does not exist', status: 'pending' });

    expect(res.statusCode).toBe(404);
  });
});

describe('DELETE /api/v1/tasks/:id', () => {
  test('should delete a task', async () => {
    pool.query.mockResolvedValueOnce({
      rows: [{ id: 1, title: 'Buy groceries', status: 'pending' }]
    });

    const res = await request(app).delete('/api/v1/tasks/1');
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('Task deleted');
  });

  test('should return 404 if task not found', async () => {
    pool.query.mockResolvedValueOnce({ rows: [] });

    const res = await request(app).delete('/api/v1/tasks/999');
    expect(res.statusCode).toBe(404);
  });
});
