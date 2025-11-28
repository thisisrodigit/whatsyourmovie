import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { getRandomMovies, recordSwipe, checkTop10Status } from '../services/api';
import './SwipeInterface.css';

function SwipeInterface() {
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [swipeDirection, setSwipeDirection] = useState(null);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ likes: 0, dislikes: 0 });
  const cardRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    checkSetup();
  }, []);

  const checkSetup = async () => {
    try {
      const response = await checkTop10Status();
      if (!response.data.hasTop10) {
        alert('Please select your Top 10 movies first!');
        navigate('/top10');
        return;
      }
      loadMovies();
    } catch (error) {
      console.error('Error checking setup:', error);
    }
  };

  const loadMovies = async () => {
    setLoading(true);
    try {
      const response = await getRandomMovies(50);
      setMovies(response.data);
      setCurrentIndex(0);
    } catch (error) {
      console.error('Error loading movies:', error);
      alert('Failed to load movies');
    } finally {
      setLoading(false);
    }
  };

  const handleSwipe = async (direction) => {
    if (currentIndex >= movies.length) return;

    const movie = movies[currentIndex];
    setSwipeDirection(direction);

    try {
      await recordSwipe(movie.id, direction);
      setStats(prev => ({
        ...prev,
        [direction === 'like' ? 'likes' : 'dislikes']: prev[direction === 'like' ? 'likes' : 'dislikes'] + 1
      }));

      setTimeout(() => {
        setCurrentIndex(prev => prev + 1);
        setSwipeDirection(null);
        setDragOffset({ x: 0, y: 0 });

        // Load more movies if running low
        if (currentIndex >= movies.length - 5) {
          loadMovies();
        }
      }, 300);
    } catch (error) {
      console.error('Error recording swipe:', error);
      setSwipeDirection(null);
    }
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    
    const deltaX = e.clientX - dragStart.x;
    const deltaY = e.clientY - dragStart.y;
    setDragOffset({ x: deltaX, y: deltaY });
  };

  const handleMouseUp = () => {
    if (!isDragging) return;
    setIsDragging(false);

    // Determine if swipe threshold was met
    if (Math.abs(dragOffset.x) > 100) {
      handleSwipe(dragOffset.x > 0 ? 'like' : 'dislike');
    } else {
      setDragOffset({ x: 0, y: 0 });
    }
  };

  const handleTouchStart = (e) => {
    setIsDragging(true);
    setDragStart({ x: e.touches[0].clientX, y: e.touches[0].clientY });
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    
    const deltaX = e.touches[0].clientX - dragStart.x;
    const deltaY = e.touches[0].clientY - dragStart.y;
    setDragOffset({ x: deltaX, y: deltaY });
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);

    if (Math.abs(dragOffset.x) > 100) {
      handleSwipe(dragOffset.x > 0 ? 'like' : 'dislike');
    } else {
      setDragOffset({ x: 0, y: 0 });
    }
  };

  if (loading && movies.length === 0) {
    return (
      <div className="swipe-container">
        <div className="spinner"></div>
      </div>
    );
  }

  const currentMovie = movies[currentIndex];

  return (
    <div className="swipe-container">
      <div className="swipe-header">
        <button className="btn btn-secondary" onClick={() => navigate('/dashboard')}>
          ← Back
        </button>
        <div className="swipe-stats">
          <div className="stat-item">
            <span className="stat-icon">❤️</span>
            <span className="stat-count">{stats.likes}</span>
          </div>
          <div className="stat-item">
            <span className="stat-icon">💔</span>
            <span className="stat-count">{stats.dislikes}</span>
          </div>
        </div>
      </div>

      <div className="swipe-content">
        {currentMovie ? (
          <>
            <div 
              ref={cardRef}
              className={`swipe-card ${swipeDirection ? `swipe-${swipeDirection}` : ''}`}
              style={{
                transform: `translate(${dragOffset.x}px, ${dragOffset.y}px) rotate(${dragOffset.x * 0.1}deg)`,
                transition: isDragging ? 'none' : 'all 0.3s ease'
              }}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              <div className={`swipe-indicator ${dragOffset.x > 50 ? 'like' : ''} ${dragOffset.x < -50 ? 'dislike' : ''}`}>
                {dragOffset.x > 50 && <span className="like-badge">LIKE ❤️</span>}
                {dragOffset.x < -50 && <span className="dislike-badge">NOPE 💔</span>}
              </div>

              <div className="card-image">
                <img src={currentMovie.poster || 'https://via.placeholder.com/400x600'} alt={currentMovie.title} />
              </div>
              
              <div className="card-info">
                <h2>{currentMovie.title}</h2>
                <p className="year">{currentMovie.year}</p>
                <div className="rating-row">
                  <span className="rating">⭐ {currentMovie.rating?.toFixed(1) || 'N/A'}</span>
                </div>
                <p className="description">{currentMovie.description || 'No description available.'}</p>
              </div>
            </div>

            <div className="swipe-actions">
              <button 
                className="swipe-btn dislike-btn" 
                onClick={() => handleSwipe('dislike')}
              >
                ✕
              </button>
              <button 
                className="swipe-btn like-btn" 
                onClick={() => handleSwipe('like')}
              >
                ❤
              </button>
            </div>
          </>
        ) : (
          <div className="no-more-movies">
            <h2>🎉 No more movies!</h2>
            <p>You've swiped through all available movies.</p>
            <button className="btn btn-primary" onClick={loadMovies}>
              Load More
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default SwipeInterface;

