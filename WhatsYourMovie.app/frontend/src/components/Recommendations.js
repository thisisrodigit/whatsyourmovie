import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getRecommendations } from '../services/api';
import './Recommendations.css';

function Recommendations() {
  const navigate = useNavigate();
  const [recommendations, setRecommendations] = useState([]);
  const [genrePreferences, setGenrePreferences] = useState([]);
  const [algorithm, setAlgorithm] = useState('');
  const [loading, setLoading] = useState(true);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    loadRecommendations();
  }, []);

  const loadRecommendations = async () => {
    setLoading(true);
    try {
      const response = await getRecommendations(40);
      setRecommendations(response.data.movies);
      setGenrePreferences(response.data.genrePreferences || []);
      setAlgorithm(response.data.algorithm);
    } catch (error) {
      console.error('Error loading recommendations:', error);
      alert('Failed to load recommendations');
    } finally {
      setLoading(false);
    }
  };

  const openMovieModal = (movie) => {
    setSelectedMovie(movie);
  };

  const closeMovieModal = () => {
    setSelectedMovie(null);
  };

  if (loading) {
    return (
      <div className="recommendations-container">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="recommendations-container">
      <div className="recommendations-header">
        <button className="btn btn-secondary" onClick={() => navigate('/dashboard')}>
          ← Back
        </button>
        <div>
          <h1>Your Recommendations ✨</h1>
          <p>Personalized picks based on your taste</p>
        </div>
        <button className="btn btn-primary" onClick={loadRecommendations}>
          Refresh
        </button>
      </div>

      {algorithm === 'personalized' && genrePreferences.length > 0 && (
        <div className="preferences-card">
          <h3>Your Genre Preferences</h3>
          <div className="genre-tags">
            {genrePreferences.map((pref, index) => (
              <div key={index} className="genre-tag">
                {pref.genre} <span className="genre-score">{pref.score}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="recommendations-grid">
        {recommendations.map((movie) => (
          <div 
            key={movie.id} 
            className="recommendation-card"
            onClick={() => openMovieModal(movie)}
          >
            <div className="movie-poster">
              <img src={movie.poster || 'https://via.placeholder.com/300x450'} alt={movie.title} />
              {movie.recommendationScore && (
                <div className="score-badge">
                  {Math.round(movie.recommendationScore)}
                </div>
              )}
            </div>
            <div className="movie-content">
              <h4>{movie.title}</h4>
              <p className="movie-year">{movie.year}</p>
              <p className="movie-rating">⭐ {movie.rating?.toFixed(1) || 'N/A'}</p>
            </div>
          </div>
        ))}
      </div>

      {recommendations.length === 0 && (
        <div className="no-recommendations">
          <h2>No recommendations yet</h2>
          <p>Start swiping movies to get personalized recommendations!</p>
          <button className="btn btn-primary" onClick={() => navigate('/swipe')}>
            Start Swiping
          </button>
        </div>
      )}

      {selectedMovie && (
        <div className="modal-overlay" onClick={closeMovieModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeMovieModal}>✕</button>
            <div className="modal-movie">
              <img src={selectedMovie.poster || 'https://via.placeholder.com/300x450'} alt={selectedMovie.title} />
              <div className="modal-info">
                <h2>{selectedMovie.title}</h2>
                <p className="modal-year">{selectedMovie.year}</p>
                <p className="modal-rating">⭐ {selectedMovie.rating?.toFixed(1) || 'N/A'} / 10</p>
                <p className="modal-description">{selectedMovie.description || 'No description available.'}</p>
                <div className="modal-actions">
                  <button className="btn btn-primary" onClick={() => {
                    navigate('/swipe');
                    closeMovieModal();
                  }}>
                    Swipe More Movies
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Recommendations;

