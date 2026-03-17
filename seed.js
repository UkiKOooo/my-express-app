const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

const tasks = [
  { title: 'Buy groceries', status: 'pending' },
  { title: 'Do laundry', status: 'completed' },
  { title: 'Clean the house', status: 'pending' },
  { title: 'Pay bills', status: 'completed' },
  { title: 'Call the doctor', status: 'pending' },
  { title: 'Fix the bike', status: 'in-progress' },
  { title: 'Read a book', status: 'completed' },
  { title: 'Write journal', status: 'pending' },
  { title: 'Go for a run', status: 'completed' },
  { title: 'Cook dinner', status: 'pending' },
  { title: 'Send email to boss', status: 'completed' },
  { title: 'Study for exam', status: 'in-progress' },
  { title: 'Water the plants', status: 'pending' },
  { title: 'Take out trash', status: 'completed' },
  { title: 'Wash the car', status: 'pending' },
  { title: 'Book flight tickets', status: 'completed' },
  { title: 'Renew passport', status: 'pending' },
  { title: 'Update resume', status: 'in-progress' },
  { title: 'Buy birthday gift', status: 'pending' },
  { title: 'Schedule dentist appointment', status: 'completed' },
  { title: 'Organize desk', status: 'pending' },
  { title: 'Back up computer', status: 'completed' },
  { title: 'Learn guitar', status: 'in-progress' },
  { title: 'Plan vacation', status: 'pending' },
  { title: 'Fix leaky faucet', status: 'completed' },
  { title: 'Paint bedroom', status: 'pending' },
  { title: 'Buy new shoes', status: 'completed' },
  { title: 'Return library books', status: 'pending' },
  { title: 'Meal prep for the week', status: 'in-progress' },
  { title: 'Cancel unused subscriptions', status: 'completed' },
  { title: 'Clean the fridge', status: 'pending' },
  { title: 'Charge all devices', status: 'completed' },
  { title: 'Reply to messages', status: 'pending' },
  { title: 'Print documents', status: 'completed' },
  { title: 'Buy coffee beans', status: 'pending' },
  { title: 'Finish online course', status: 'in-progress' },
  { title: 'Call mom', status: 'completed' },
  { title: 'Fix broken chair', status: 'pending' },
  { title: 'Donate old clothes', status: 'completed' },
  { title: 'Buy vitamins', status: 'pending' },
  { title: 'Set up new phone', status: 'completed' },
  { title: 'Review budget', status: 'in-progress' },
  { title: 'Clean windows', status: 'pending' },
  { title: 'Buy new headphones', status: 'completed' },
  { title: 'Watch tutorial videos', status: 'in-progress' },
  { title: 'Sort recycling', status: 'pending' },
  { title: 'Submit tax return', status: 'completed' },
  { title: 'Buy pet food', status: 'pending' },
  { title: 'Fix garden fence', status: 'in-progress' },
  { title: 'Finish homework', status: 'completed' }
];

async function seedData() {
  try {
    for (const task of tasks) {
      await pool.query(
        'INSERT INTO tasks (title, status) VALUES ($1, $2)',
        [task.title, task.status]
      );
    }
    console.log('SUCCESS: 50 tasks have been added!');
  } catch (err) {
    console.error('ERROR:', err);
  } finally {
    await pool.end();
  }
}

seedData();