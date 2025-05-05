const express = require('express');
const router = express.Router();
const pool = require('../db');

// GET /api/groups — отримати всі групи з назвою дисципліни
router.get('/', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT g.id, g.name, d.name AS discipline
      FROM Groups g
      LEFT JOIN Disciplines d ON g.discipline_id = d.id
      ORDER BY g.id
    `);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Database error' });
  }
});

// GET /api/groups/:groupName/students — отримати студентів певної групи
router.get('/:groupName/students', async (req, res) => {
  const { groupName } = req.params;
  try {
    const result = await pool.query(
      `SELECT u.full_name, s.record_book_number
       FROM Users u
       JOIN Students s ON u.id = s.user_id
       JOIN StudentGroup sg ON s.id = sg.student_id
       JOIN Groups g ON sg.group_id = g.id
       WHERE g.name = $1
       ORDER BY u.full_name`,
      [groupName]
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Database error' });
  }
});

// GET /api/groups/by-student/:userId — отримати групи, до яких належить студент
router.get('/by-student/:userId', async (req, res) => {
  const { userId } = req.params;
  try {
    const result = await pool.query(
      `SELECT g.name
       FROM Groups g
       JOIN StudentGroup sg ON g.id = sg.group_id
       JOIN Students s ON sg.student_id = s.id
       WHERE s.user_id = $1
       ORDER BY g.name`,
      [userId]
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Database error' });
  }
});

// GET /api/groups/student-count — кількість студентів у кожній групі
router.get('/student-count', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT g.name, COUNT(sg.student_id) AS student_count
      FROM Groups g
      LEFT JOIN StudentGroup sg ON g.id = sg.group_id
      GROUP BY g.name
      ORDER BY student_count DESC
    `);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Database error' });
  }
});

// GET /api/groups/:groupName/discipline — знайти дисципліну для групи
router.get('/:groupName/discipline', async (req, res) => {
  const { groupName } = req.params;
  try {
    const result = await pool.query(
      `SELECT d.name
       FROM Disciplines d
       JOIN Groups g ON d.id = g.discipline_id
       WHERE g.name = $1`,
      [groupName]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Discipline not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Database error' });
  }
});

// GET /api/groups/:groupName/performance — успішність студентів групи
router.get('/:groupName/performance', async (req, res) => {
  const { groupName } = req.params;
  try {
    const result = await pool.query(
      `SELECT u.full_name, d.name AS discipline, act.name AS activity, grd.score
       FROM Users u
       JOIN Students s ON u.id = s.user_id
       JOIN StudentGroup sg ON s.id = sg.student_id
       JOIN Groups g ON sg.group_id = g.id
       JOIN Grades grd ON s.id = grd.student_id
       JOIN Activities act ON grd.activity_id = act.id
       JOIN Disciplines d ON act.discipline_id = d.id
       WHERE g.name = $1
       ORDER BY u.full_name, d.name, act.name`,
      [groupName]
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Database error' });
  }
});

module.exports = router;