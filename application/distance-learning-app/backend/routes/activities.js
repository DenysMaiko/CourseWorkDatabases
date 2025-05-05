const express = require('express');
const router = express.Router();
const pool = require('../db');

// GET /api/activities — отримати всі активності з назвою дисципліни
router.get('/', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT a.id, a.name, a.type, a.start_date, a.end_date, a.evaluation_method, d.name AS discipline
      FROM Activities a
      LEFT JOIN Disciplines d ON a.discipline_id = d.id
      ORDER BY a.id
    `);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Database error' });
  }
});

// GET /api/activities/by-discipline/:disciplineName — активності певної дисципліни
router.get('/by-discipline/:disciplineName', async (req, res) => {
  const { disciplineName } = req.params;
  try {
    const result = await pool.query(
      `SELECT a.name, a.type, a.start_date, a.end_date, a.evaluation_method
       FROM Activities a
       JOIN Disciplines d ON a.discipline_id = d.id
       WHERE d.name = $1
       ORDER BY a.start_date`,
      [disciplineName]
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Database error' });
  }
});

// GET /api/activities/by-date?start=YYYY-MM-DD&end=YYYY-MM-DD
router.get('/by-date', async (req, res) => {
  const { start, end } = req.query;
  try {
    const result = await pool.query(
      `SELECT a.name, d.name AS discipline_name, a.start_date, a.end_date
       FROM Activities a
       JOIN Disciplines d ON a.discipline_id = d.id
       WHERE a.start_date >= $1 AND a.end_date <= $2
       ORDER BY a.start_date`,
      [start, end]
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Database error' });
  }
});

module.exports = router;