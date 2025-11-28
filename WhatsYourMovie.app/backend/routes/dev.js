const express = require('express');
const fs = require('fs');
const path = require('path');
const { db } = require('../database/db');
const authenticateToken = require('../middleware/auth');

const router = express.Router();

// Populate with sample movies (for testing without TMDB API)
router.post('/populate-sample', authenticateToken, (req, res) => {
  try {
    // Check if movies already exist
    const existingMovies = db.prepare('SELECT COUNT(*) as count FROM movies').get();
    if (existingMovies.count > 0) {
      return res.json({ message: 'Movies already populated', count: existingMovies.count });
    }

    // Read sample movies
    const sampleMoviesPath = path.join(__dirname, '../database/sampleMovies.json');
    const sampleMovies = JSON.parse(fs.readFileSync(sampleMoviesPath, 'utf8'));

    // Insert movies
    const insert = db.prepare(`
      INSERT OR IGNORE INTO movies (id, title, year, genres, poster, description, rating, popularity, vote_count)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    const insertMany = db.transaction((movies) => {
      for (const movie of movies) {
        insert.run(
          movie.id,
          movie.title,
          movie.year,
          movie.genres,
          movie.poster,
          movie.description,
          movie.rating,
          movie.popularity,
          movie.vote_count
        );
      }
    });

    insertMany(sampleMovies);

    console.log(`✅ Populated ${sampleMovies.length} sample movies`);
    res.json({ message: 'Sample movies populated successfully', count: sampleMovies.length });
  } catch (error) {
    console.error('Error populating sample movies:', error);
    res.status(500).json({ error: 'Failed to populate sample movies' });
  }
});

module.exports = router;

