const express = require('express');
const router = express.Router();
const pool = require('../db');

// GET /api/grades — отримати всі оцінки з іменами студентів та назвами активностей
router.get('/', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        g.id,
        u.full_name AS student,
        a.name AS activity,
        g.score,
        g.date
      FROM Grades g
      LEFT JOIN Students s ON g.student_id = s.id
      LEFT JOIN Users u ON s.user_id = u.id
      LEFT JOIN Activities a ON g.activity_id = a.id
      ORDER BY g.id
    `);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Database error' });
  }
});

// GET /api/grades/by-student/:userId — всі оцінки конкретного студента
router.get('/by-student/:userId', async (req, res) => {
  const { userId } = req.params;
  try {
    const result = await pool.query(
      `SELECT d.name AS discipline_name, act.name AS activity_name, act.type, 
              grd.score, grd.date
       FROM Grades grd
       JOIN Activities act ON grd.activity_id = act.id
       JOIN Disciplines d ON act.discipline_id = d.id
       JOIN Students s ON grd.student_id = s.id
       WHERE s.user_id = $1
       ORDER BY grd.date DESC`,
      [userId]
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Database error' });
  }
});

// GET /api/grades/by-activity/:activityName — всі оцінки для конкретної активності
router.get('/by-activity/:activityName', async (req, res) => {
  const { activityName } = req.params;
  try {
    const result = await pool.query(
      `SELECT u.full_name, s.record_book_number, grd.score, grd.date
       FROM Grades grd
       JOIN Students s ON grd.student_id = s.id
       JOIN Users u ON s.user_id = u.id
       JOIN Activities act ON grd.activity_id = act.id
       WHERE act.name = $1
       ORDER BY u.full_name`,
      [activityName]
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Database error' });
  }
});

// GET /api/grades/average?userId=10&discipline=Алгоритми%20та%20структури%20даних
router.get('/average', async (req, res) => {
  const { userId, discipline } = req.query;
  try {
    const result = await pool.query(
      `SELECT AVG(grd.score) AS average_score
       FROM Grades grd
       JOIN Activities act ON grd.activity_id = act.id
       JOIN Disciplines d ON act.discipline_id = d.id
       JOIN Students s ON grd.student_id = s.id
       WHERE s.user_id = $1 AND d.name = $2`,
      [userId, discipline]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Database error' });
  }
});

// GET /api/grades/high-score?activity=Назва&score=90
router.get('/high-score', async (req, res) => {
  const { activity, score } = req.query;
  try {
    const result = await pool.query(
      `SELECT u.full_name, grd.score
       FROM Users u
       JOIN Students s ON u.id = s.user_id
       JOIN Grades grd ON s.id = grd.student_id
       JOIN Activities act ON grd.activity_id = act.id
       WHERE act.name = $1 AND grd.score > $2
       ORDER BY grd.score DESC`,
      [activity, score]
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Database error' });
  }
});

module.exports = router;