const express = require('express');
const router = express.Router();
const pool = require('../db');

// GET /api/disciplines — отримати всі дисципліни
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM Disciplines ORDER BY id');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Database error' });
  }
});

// GET /api/disciplines/with-resource-type/:type — дисципліни з ресурсами певного типу
router.get('/with-resource-type/:type', async (req, res) => {
  const { type } = req.params;
  try {
    const result = await pool.query(
      `SELECT DISTINCT d.name
       FROM Disciplines d
       JOIN Resources r ON d.id = r.discipline_id
       WHERE r.type = $1
       ORDER BY d.name`,
      [type]
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Database error' });
  }
});

module.exports = router;