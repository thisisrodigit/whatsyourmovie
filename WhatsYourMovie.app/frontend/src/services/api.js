import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth
export const signup = (data) => api.post('/auth/signup', data);
export const login = (data) => api.post('/auth/login', data);

// Movies
export const populateMovies = () => api.post('/movies/populate');
export const populateSampleMovies = () => api.post('/dev/populate-sample');
export const searchMovies = (query) => api.get('/movies/search', { params: { q: query } });
export const getMovies = (page = 1, limit = 20) => api.get('/movies', { params: { page, limit } });
export const getRandomMovies = (limit = 50) => api.get('/movies/random', { params: { limit } });

// Top 10
export const getTop10 = () => api.get('/top10');
export const saveTop10 = (movies) => api.post('/top10', { movies });
export const checkTop10Status = () => api.get('/top10/status');

// Swipes
export const recordSwipe = (movie_id, action) => api.post('/swipes', { movie_id, action });
export const getSwipeHistory = () => api.get('/swipes/history');
export const getSwipeStats = () => api.get('/swipes/stats');

// Recommendations
export const getRecommendations = (limit = 20) => api.get('/recommendations', { params: { limit } });

export default api;
