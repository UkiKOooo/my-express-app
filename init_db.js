const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

async function createTable() {
  try {
    
    await pool.query(`
      CREATE TABLE IF NOT EXISTS tasks (
        id SERIAL PRIMARY KEY,
        title TEXT NOT NULL,
        status TEXT DEFAULT 'pending'
      );
    `);
    console.log("SUCCESS: Table 'tasks' has been created!");
  } catch (err) {
    console.error("ERROR: Could not create table:", err);
  } finally {
    await pool.end();
  }
}

createTable();