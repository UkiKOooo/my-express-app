const express = require('express');
const cors = require('cors'); 
const app = express();

app.use(cors()); 
app.use(express.json());c
  
onst express = require('express');
const { Pool } = require('pg');
require('dotenv').config();

const app = express();
app.use(express.json());


const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});


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

app.get('/api/v1/tasks/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      'SELECT * FROM tasks WHERE id = $1',
      [id]
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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
