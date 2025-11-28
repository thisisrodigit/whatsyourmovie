const express = require('express');
const { db } = require('../database/db');
const authenticateToken = require('../middleware/auth');

const router = express.Router();

// Genre mapping (TMDB genre IDs)
const genreMap = {
  28: 'Action',
  12: 'Adventure',
  16: 'Animation',
  35: 'Comedy',
  80: 'Crime',
  99: 'Documentary',
  18: 'Drama',
  10751: 'Family',
  14: 'Fantasy',
  36: 'History',
  27: 'Horror',
  10402: 'Music',
  9648: 'Mystery',
  10749: 'Romance',
  878: 'Science Fiction',
  10770: 'TV Movie',
  53: 'Thriller',
  10752: 'War',
  37: 'Western'
};

// Get personalized recommendations
router.get('/', authenticateToken, (req, res) => {
  try {
    const userId = req.user.id;
    const limit = parseInt(req.query.limit) || 20;

    // Get user's top 10 movies
    const top10 = db.prepare(`
      SELECT m.* FROM user_top10 t
      JOIN movies m ON t.movie_id = m.id
      WHERE t.user_id = ?
      ORDER BY t.rank
    `).all(userId);

    // Get user's liked movies from swipes
    const likedMovies = db.prepare(`
      SELECT m.* FROM swipes s
      JOIN movies m ON s.movie_id = m.id
      WHERE s.user_id = ? AND s.action = 'like'
    `).all(userId);

    // Combine both sources for preference analysis
    const preferredMovies = [...top10, ...likedMovies];

    if (preferredMovies.length === 0) {
      // No preferences yet, return popular movies
      const popular = db.prepare(`
        SELECT * FROM movies
        WHERE id NOT IN (
          SELECT movie_id FROM swipes WHERE user_id = ?
        )
        ORDER BY popularity DESC
        LIMIT ?
      `).all(userId, limit);

      return res.json({ movies: popular, algorithm: 'popular' });
    }

    // Calculate genre preferences
    const genreScores = {};
    preferredMovies.forEach((movie, index) => {
      const genres = movie.genres ? movie.genres.split(',') : [];
      const weight = top10.includes(movie) ? 2 : 1; // Top 10 gets double weight
      
      genres.forEach(genreId => {
        genreScores[genreId] = (genreScores[genreId] || 0) + weight;
      });
    });

    // Get movies not yet swiped
    const allMovies = db.prepare(`
      SELECT * FROM movies
      WHERE id NOT IN (
        SELECT movie_id FROM swipes WHERE user_id = ?
      )
      AND id NOT IN (
        SELECT movie_id FROM user_top10 WHERE user_id = ?
      )
    `).all(userId, userId);

    // Score each movie based on genre preferences
    const scoredMovies = allMovies.map(movie => {
      const genres = movie.genres ? movie.genres.split(',') : [];
      let score = 0;
      
      genres.forEach(genreId => {
        score += (genreScores[genreId] || 0);
      });

      // Add bonus for high ratings
      score += movie.rating * 2;
      
      // Add bonus for popularity
      score += Math.log(movie.popularity + 1) * 0.5;

      return { ...movie, recommendationScore: score };
    });

    // Sort by score and return top recommendations
    scoredMovies.sort((a, b) => b.recommendationScore - a.recommendationScore);
    const recommendations = scoredMovies.slice(0, limit);

    res.json({ 
      movies: recommendations,
      algorithm: 'personalized',
      genrePreferences: Object.entries(genreScores)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
        .map(([id, score]) => ({ genre: genreMap[id] || id, score }))
    });
  } catch (error) {
    console.error('Error generating recommendations:', error);
    res.status(500).json({ error: 'Failed to generate recommendations' });
  }
});

module.exports = router;

