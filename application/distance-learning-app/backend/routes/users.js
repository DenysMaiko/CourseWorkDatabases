const express = require('express');
const router = express.Router();
const pool = require('../db');

// GET /api/users — отримати всіх користувачів
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT id, login, full_name, email, role FROM Users ORDER BY id');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Database error' });
  }
});

// GET /api/users/students — отримати всіх студентів
router.get('/students', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT u.id, u.full_name, u.email, s.record_book_number
      FROM Users u
      JOIN Students s ON u.id = s.user_id
      WHERE u.role = 'student'
      ORDER BY u.id
    `);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Database error' });
  }
});

// GET /api/users/lecturers — отримати всіх викладачів
router.get('/lecturers', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT u.id, u.full_name, u.email
      FROM Users u
      JOIN Lecturers l ON u.id = l.user_id
      WHERE u.role = 'lecturer'
      ORDER BY u.id
    `);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Database error' });
  }
});

// GET /api/users/login/:login — знайти користувача за логіном
router.get('/login/:login', async (req, res) => {
  const { login } = req.params;
  try {
    const result = await pool.query(
      `SELECT id, full_name, email, role FROM Users WHERE login = $1`,
      [login]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Database error' });
  }
});

// GET /api/users/email/:email — знайти користувача за email
router.get('/email/:email', async (req, res) => {
  const { email } = req.params;
  try {
    const result = await pool.query(
      `SELECT id, full_name, login, role FROM Users WHERE email = $1`,
      [email]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Database error' });
  }
});

// GET /api/users/groups-disciplines — список студентів, їх груп і дисциплін
router.get('/groups-disciplines', async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT u.full_name AS student_name, g.name AS group_name, d.name AS discipline_name
       FROM Users u
       JOIN Students s ON u.id = s.user_id
       JOIN StudentGroup sg ON s.id = sg.student_id
       JOIN Groups g ON sg.group_id = g.id
       JOIN Disciplines d ON g.discipline_id = d.id
       ORDER BY d.name, g.name, u.full_name`
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Database error' });
  }
});

// GET /api/users/overall-average-score — середній бал кожного студента
router.get('/overall-average-score', async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT u.full_name, AVG(grd.score) AS overall_average_score
       FROM Users u
       JOIN Students s ON u.id = s.user_id
       JOIN Grades grd ON s.id = grd.student_id
       GROUP BY u.full_name
       ORDER BY overall_average_score DESC`
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Database error' });
  }
});

module.exports = router;