const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
const path = require('path');

// Load environment variables from .env file if present

const app = express();
const port = process.env.PORT || 8080;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

// Database connection
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
});

// Test DB connection on startup
pool.connect((err, client, release) => {
  if (err) {
    console.error('Error acquiring client', err.stack);
  } else {
    console.log('Database connected successfully');
    release();
  }
});

// Health Check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK' });
});

// Check-in Endpoint
app.post('/api/checkin', async (req, res) => {
  const { name, email } = req.body;

  if (!name || name.trim() === '') {
    return res.status(400).json({ error: 'Name is required' });
  }

  if (!email || !email.includes('@')) {
    return res.status(400).json({ error: 'Valid email is required' });
  }

  try {
    const query = 'INSERT INTO checkins (name, email, checkin_time) VALUES ($1, $2, NOW()) RETURNING *';
    const values = [name, email];
    const result = await pool.query(query, values);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error executing query', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get Check-ins Endpoint
app.get('/api/checkins', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM checkins ORDER BY checkin_time DESC');
    res.json(result.rows);
  } catch (err) {
    console.error('Error executing query', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
