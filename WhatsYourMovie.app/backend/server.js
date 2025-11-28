const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const db = require('./database/db');
const authRoutes = require('./routes/auth');
const moviesRoutes = require('./routes/movies');
const top10Routes = require('./routes/top10');
const swipesRoutes = require('./routes/swipes');
const recommendationsRoutes = require('./routes/recommendations');
const devRoutes = require('./routes/dev');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize database
db.initDatabase();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/movies', moviesRoutes);
app.use('/api/top10', top10Routes);
app.use('/api/swipes', swipesRoutes);
app.use('/api/recommendations', recommendationsRoutes);
app.use('/api/dev', devRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

