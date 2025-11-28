const express = require('express');
const { db } = require('../database/db');
const authenticateToken = require('../middleware/auth');

const router = express.Router();

// Record a swipe
router.post('/', authenticateToken, (req, res) => {
  try {
    const userId = req.user.id;
    const { movie_id, action } = req.body;

    if (!movie_id || !action || !['like', 'dislike'].includes(action)) {
      return res.status(400).json({ error: 'Invalid swipe data' });
    }

    // Insert or replace swipe
    db.prepare(`
      INSERT OR REPLACE INTO swipes (user_id, movie_id, action)
      VALUES (?, ?, ?)
    `).run(userId, movie_id, action);

    res.json({ message: 'Swipe recorded successfully' });
  } catch (error) {
    console.error('Error recording swipe:', error);
    res.status(500).json({ error: 'Failed to record swipe' });
  }
});

// Get user's swipe history
router.get('/history', authenticateToken, (req, res) => {
  try {
    const userId = req.user.id;

    const swipes = db.prepare(`
      SELECT s.action, s.created_at, m.*
      FROM swipes s
      JOIN movies m ON s.movie_id = m.id
      WHERE s.user_id = ?
      ORDER BY s.created_at DESC
    `).all(userId);

    res.json(swipes);
  } catch (error) {
    console.error('Error fetching swipe history:', error);
    res.status(500).json({ error: 'Failed to fetch swipe history' });
  }
});

// Get swipe stats
router.get('/stats', authenticateToken, (req, res) => {
  try {
    const userId = req.user.id;

    const stats = db.prepare(`
      SELECT 
        COUNT(*) as total,
        SUM(CASE WHEN action = 'like' THEN 1 ELSE 0 END) as likes,
        SUM(CASE WHEN action = 'dislike' THEN 1 ELSE 0 END) as dislikes
      FROM swipes
      WHERE user_id = ?
    `).get(userId);

    res.json(stats);
  } catch (error) {
    console.error('Error fetching stats:', error);
    res.status(500).json({ error: 'Failed to fetch stats' });
  }
});

module.exports = router;

