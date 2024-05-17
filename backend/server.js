// backend/server.js
const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(bodyParser.json());
app.use(cors());

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

// API endpoint för offerter
app.get('/api/offerter', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM offerter');
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching offerter:', error);
    res.status(500).send('Server error');
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
