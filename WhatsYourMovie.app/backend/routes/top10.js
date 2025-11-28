const express = require('express');
const { db } = require('../database/db');
const authenticateToken = require('../middleware/auth');

const router = express.Router();

// Get user's top 10
router.get('/', authenticateToken, (req, res) => {
  try {
    const userId = req.user.id;

    const top10 = db.prepare(`
      SELECT t.rank, m.* 
      FROM user_top10 t
      JOIN movies m ON t.movie_id = m.id
      WHERE t.user_id = ?
      ORDER BY t.rank
    `).all(userId);

    res.json(top10);
  } catch (error) {
    console.error('Error fetching top 10:', error);
    res.status(500).json({ error: 'Failed to fetch top 10' });
  }
});

// Save user's top 10
router.post('/', authenticateToken, (req, res) => {
  try {
    const userId = req.user.id;
    const { movies } = req.body; // Array of movie IDs in order

    if (!Array.isArray(movies) || movies.length !== 10) {
      return res.status(400).json({ error: 'Must provide exactly 10 movies' });
    }

    // Delete existing top 10
    db.prepare('DELETE FROM user_top10 WHERE user_id = ?').run(userId);

    // Insert new top 10
    const insert = db.prepare(`
      INSERT INTO user_top10 (user_id, movie_id, rank)
      VALUES (?, ?, ?)
    `);

    const insertMany = db.transaction((movies) => {
      movies.forEach((movieId, index) => {
        insert.run(userId, movieId, index + 1);
      });
    });

    insertMany(movies);

    res.json({ message: 'Top 10 saved successfully' });
  } catch (error) {
    console.error('Error saving top 10:', error);
    res.status(500).json({ error: 'Failed to save top 10' });
  }
});

// Check if user has top 10
router.get('/status', authenticateToken, (req, res) => {
  try {
    const userId = req.user.id;
    const count = db.prepare('SELECT COUNT(*) as count FROM user_top10 WHERE user_id = ?').get(userId);
    
    res.json({ hasTop10: count.count === 10 });
  } catch (error) {
    console.error('Error checking top 10 status:', error);
    res.status(500).json({ error: 'Failed to check status' });
  }
});

module.exports = router;

