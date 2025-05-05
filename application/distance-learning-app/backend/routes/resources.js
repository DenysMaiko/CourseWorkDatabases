const express = require('express');
const router = express.Router();
const pool = require('../db');

// GET /api/resources — отримати всі ресурси з назвою дисципліни
router.get('/', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT r.id, r.name, r.type, d.name AS discipline
      FROM Resources r
      LEFT JOIN Disciplines d ON r.discipline_id = d.id
      ORDER BY r.id
    `);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Database error' });
  }
});

// GET /api/resources/by-discipline/:disciplineName — ресурси певної дисципліни
router.get('/by-discipline/:disciplineName', async (req, res) => {
  const { disciplineName } = req.params;
  try {
    const result = await pool.query(
      `SELECT r.name, r.type
       FROM Resources r
       JOIN Disciplines d ON r.discipline_id = d.id
       WHERE d.name = $1
       ORDER BY r.name`,
      [disciplineName]
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Database error' });
  }
});

module.exports = router;