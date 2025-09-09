import axios from 'axios';

// Use environment variable with proper fallback
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 
  (import.meta.env.MODE === 'development' 
    ? 'http://localhost:3001/api' 
    : 'https://classbooktask.onrender.com/api');

export const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000, // Increase timeout for production
});

// Add request interceptor for better error handling
api.interceptors.request.use((config) => {
  console.log('API Request:', config.method?.toUpperCase(), config.url);
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.status, error.message);
    
    if (error.code === 'ECONNREFUSED') {
      console.error('Backend server is not running or inaccessible');
      alert('Cannot connect to server. Please try again later.');
    }
    
    return Promise.reject(error);
  }
);