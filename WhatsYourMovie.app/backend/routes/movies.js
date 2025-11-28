const express = require('express');
const axios = require('axios');
const { db } = require('../database/db');
const authenticateToken = require('../middleware/auth');

const router = express.Router();

// Fetch and populate movies from TMDB
router.post('/populate', authenticateToken, async (req, res) => {
  try {
    // Check if movies already exist
    const existingMovies = db.prepare('SELECT COUNT(*) as count FROM movies').get();
    if (existingMovies.count > 0) {
      return res.json({ message: 'Movies already populated', count: existingMovies.count });
    }

    console.log('Fetching movies from TMDB...');
    const movies = [];
    
    // Fetch popular movies from multiple pages
    for (let page = 1; page <= 5; page++) {
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/movie/popular`, {
          params: {
            api_key: process.env.TMDB_API_KEY,
            page: page,
            language: 'en-US'
          }
        });
        
        movies.push(...response.data.results);
      } catch (error) {
        console.error(`Error fetching page ${page}:`, error.message);
      }
    }

    // Insert movies into database
    const insert = db.prepare(`
      INSERT OR IGNORE INTO movies (id, title, year, genres, poster, description, rating, popularity, vote_count)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    const insertMany = db.transaction((movies) => {
      for (const movie of movies) {
        const year = movie.release_date ? new Date(movie.release_date).getFullYear() : null;
        const poster = movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : null;
        
        insert.run(
          movie.id,
          movie.title,
          year,
          movie.genre_ids ? movie.genre_ids.join(',') : '',
          poster,
          movie.overview || '',
          movie.vote_average || 0,
          movie.popularity || 0,
          movie.vote_count || 0
        );
      }
    });

    insertMany(movies);

    console.log(`✅ Populated ${movies.length} movies`);
    res.json({ message: 'Movies populated successfully', count: movies.length });
  } catch (error) {
    console.error('Error populating movies:', error);
    res.status(500).json({ error: 'Failed to populate movies' });
  }
});

// Search movies
router.get('/search', authenticateToken, (req, res) => {
  try {
    const { q } = req.query;
    
    if (!q) {
      return res.status(400).json({ error: 'Search query required' });
    }

    const movies = db.prepare(`
      SELECT * FROM movies 
      WHERE title LIKE ? 
      ORDER BY popularity DESC 
      LIMIT 50
    `).all(`%${q}%`);

    res.json(movies);
  } catch (error) {
    console.error('Search error:', error);
    res.status(500).json({ error: 'Search failed' });
  }
});

// Get all movies (paginated)
router.get('/', authenticateToken, (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const offset = (page - 1) * limit;

    const movies = db.prepare(`
      SELECT * FROM movies 
      ORDER BY popularity DESC 
      LIMIT ? OFFSET ?
    `).all(limit, offset);

    const total = db.prepare('SELECT COUNT(*) as count FROM movies').get();

    res.json({
      movies,
      pagination: {
        page,
        limit,
        total: total.count,
        pages: Math.ceil(total.count / limit)
      }
    });
  } catch (error) {
    console.error('Error fetching movies:', error);
    res.status(500).json({ error: 'Failed to fetch movies' });
  }
});

// Get random movies for swiping
router.get('/random', authenticateToken, (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 50;
    const userId = req.user.id;

    // Get movies that user hasn't swiped yet
    const movies = db.prepare(`
      SELECT m.* FROM movies m
      WHERE m.id NOT IN (
        SELECT movie_id FROM swipes WHERE user_id = ?
      )
      ORDER BY RANDOM()
      LIMIT ?
    `).all(userId, limit);

    res.json(movies);
  } catch (error) {
    console.error('Error fetching random movies:', error);
    res.status(500).json({ error: 'Failed to fetch movies' });
  }
});

module.exports = router;

