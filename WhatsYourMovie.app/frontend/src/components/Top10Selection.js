import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { searchMovies, getMovies, saveTop10, getTop10 } from '../services/api';
import './Top10Selection.css';

function Top10Selection() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedMovies, setSelectedMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [existingTop10, setExistingTop10] = useState([]);

  useEffect(() => {
    loadExistingTop10();
  }, []);

  const loadExistingTop10 = async () => {
    try {
      const response = await getTop10();
      if (response.data.length > 0) {
        setExistingTop10(response.data);
        setSelectedMovies(response.data);
      }
    } catch (error) {
      console.error('Error loading top 10:', error);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setLoading(true);
    try {
      const response = await searchMovies(searchQuery);
      setSearchResults(response.data);
    } catch (error) {
      console.error('Search error:', error);
      alert('Failed to search movies');
    } finally {
      setLoading(false);
    }
  };

  const loadPopularMovies = async () => {
    setLoading(true);
    try {
      const response = await getMovies(1, 50);
      setSearchResults(response.data.movies);
    } catch (error) {
      console.error('Error loading movies:', error);
      alert('Failed to load movies');
    } finally {
      setLoading(false);
    }
  };

  const toggleMovie = (movie) => {
    const isSelected = selectedMovies.some(m => m.id === movie.id);
    
    if (isSelected) {
      setSelectedMovies(selectedMovies.filter(m => m.id !== movie.id));
    } else {
      if (selectedMovies.length >= 10) {
        alert('You can only select 10 movies');
        return;
      }
      setSelectedMovies([...selectedMovies, movie]);
    }
  };

  const handleSave = async () => {
    if (selectedMovies.length !== 10) {
      alert('Please select exactly 10 movies');
      return;
    }

    setSaving(true);
    try {
      const movieIds = selectedMovies.map(m => m.id);
      await saveTop10(movieIds);
      alert('Top 10 saved successfully!');
      navigate('/dashboard');
    } catch (error) {
      console.error('Save error:', error);
      alert('Failed to save Top 10');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="top10-container">
      <div className="top10-header">
        <button className="btn btn-secondary" onClick={() => navigate('/dashboard')}>
          ← Back
        </button>
        <div>
          <h1>Select Your Top 10 Movies</h1>
          <p>Choose your 10 favorite movies to help us understand your taste</p>
        </div>
        <button 
          className="btn btn-primary" 
          onClick={handleSave}
          disabled={selectedMovies.length !== 10 || saving}
        >
          {saving ? 'Saving...' : `Save (${selectedMovies.length}/10)`}
        </button>
      </div>

      <div className="selected-movies">
        <h3>Selected Movies ({selectedMovies.length}/10)</h3>
        <div className="selected-grid">
          {selectedMovies.map((movie, index) => (
            <div key={movie.id} className="selected-movie">
              <span className="rank">#{index + 1}</span>
              <img src={movie.poster || 'https://via.placeholder.com/100x150'} alt={movie.title} />
              <div className="movie-info">
                <p className="movie-title">{movie.title}</p>
                <p className="movie-year">{movie.year}</p>
              </div>
              <button 
                className="remove-btn" 
                onClick={() => toggleMovie(movie)}
                title="Remove"
              >
                ✕
              </button>
            </div>
          ))}
          {[...Array(10 - selectedMovies.length)].map((_, i) => (
            <div key={`empty-${i}`} className="empty-slot">
              <span>Empty Slot</span>
            </div>
          ))}
        </div>
      </div>

      <div className="search-section">
        <form onSubmit={handleSearch} className="search-form">
          <input
            type="text"
            placeholder="Search for movies..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
          <button type="submit" className="btn btn-primary" disabled={loading}>
            Search
          </button>
        </form>
        <button className="btn btn-secondary" onClick={loadPopularMovies} disabled={loading}>
          Show Popular Movies
        </button>
      </div>

      {loading && <div className="loading"><div className="spinner"></div></div>}

      <div className="search-results">
        {searchResults.map(movie => (
          <div 
            key={movie.id} 
            className={`movie-card ${selectedMovies.some(m => m.id === movie.id) ? 'selected' : ''}`}
            onClick={() => toggleMovie(movie)}
          >
            {selectedMovies.some(m => m.id === movie.id) && (
              <div className="selected-badge">✓</div>
            )}
            <img src={movie.poster || 'https://via.placeholder.com/200x300'} alt={movie.title} />
            <div className="movie-details">
              <h4>{movie.title}</h4>
              <p className="year">{movie.year}</p>
              <p className="rating">⭐ {movie.rating?.toFixed(1) || 'N/A'}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Top10Selection;

