import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { checkTop10Status, getSwipeStats, populateMovies, populateSampleMovies } from '../services/api';
import './Dashboard.css';

function Dashboard({ user, onLogout }) {
  const navigate = useNavigate();
  const [hasTop10, setHasTop10] = useState(false);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [populatingMovies, setPopulatingMovies] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [top10Response, statsResponse] = await Promise.all([
        checkTop10Status(),
        getSwipeStats()
      ]);
      
      setHasTop10(top10Response.data.hasTop10);
      setStats(statsResponse.data);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePopulateMovies = async () => {
    setPopulatingMovies(true);
    try {
      await populateMovies();
      alert('Movies database populated successfully!');
    } catch (error) {
      alert('Failed to populate movies. Check if TMDB API key is configured.');
    } finally {
      setPopulatingMovies(false);
    }
  };

  const handlePopulateSampleMovies = async () => {
    setPopulatingMovies(true);
    try {
      await populateSampleMovies();
      alert('Sample movies loaded successfully! (10 classic movies for testing)');
      loadData();
    } catch (error) {
      alert('Failed to load sample movies.');
    } finally {
      setPopulatingMovies(false);
    }
  };

  if (loading) {
    return (
      <div className="dashboard-container">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <div>
          <h1>Welcome, {user.username}! 👋</h1>
          <p>Your personal movie recommendation dashboard</p>
        </div>
        <button className="btn btn-danger" onClick={onLogout}>
          Logout
        </button>
      </div>

      <div className="dashboard-grid">
        <div className="dashboard-card">
          <div className="card-icon">🎯</div>
          <h3>Your Top 10</h3>
          <p>{hasTop10 ? 'You have selected your Top 10 movies!' : 'Select your favorite 10 movies to get started'}</p>
          <button 
            className="btn btn-primary" 
            onClick={() => navigate('/top10')}
          >
            {hasTop10 ? 'View Top 10' : 'Select Top 10'}
          </button>
        </div>

        <div className="dashboard-card">
          <div className="card-icon">👆</div>
          <h3>Swipe Movies</h3>
          <p>Swipe right to like, left to dislike. Help us learn your taste!</p>
          <div className="stats">
            <div className="stat">
              <span className="stat-value">{stats?.likes || 0}</span>
              <span className="stat-label">Likes</span>
            </div>
            <div className="stat">
              <span className="stat-value">{stats?.dislikes || 0}</span>
              <span className="stat-label">Dislikes</span>
            </div>
          </div>
          <button 
            className="btn btn-primary" 
            onClick={() => navigate('/swipe')}
            disabled={!hasTop10}
          >
            Start Swiping
          </button>
          {!hasTop10 && <small className="hint">Complete your Top 10 first</small>}
        </div>

        <div className="dashboard-card">
          <div className="card-icon">✨</div>
          <h3>Recommendations</h3>
          <p>Get personalized movie recommendations based on your preferences</p>
          <button 
            className="btn btn-primary" 
            onClick={() => navigate('/recommendations')}
            disabled={!hasTop10}
          >
            View Recommendations
          </button>
          {!hasTop10 && <small className="hint">Complete your Top 10 first</small>}
        </div>

        <div className="dashboard-card admin-card">
          <div className="card-icon">🎬</div>
          <h3>Setup</h3>
          <p>Populate the movie database from TMDB or use sample data</p>
          <button 
            className="btn btn-secondary" 
            onClick={handlePopulateMovies}
            disabled={populatingMovies}
            style={{ marginBottom: '8px' }}
          >
            {populatingMovies ? 'Populating...' : 'Populate from TMDB'}
          </button>
          <button 
            className="btn btn-secondary" 
            onClick={handlePopulateSampleMovies}
            disabled={populatingMovies}
          >
            {populatingMovies ? 'Loading...' : 'Use Sample Movies'}
          </button>
          <small className="hint">TMDB requires API key, Sample is instant</small>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

