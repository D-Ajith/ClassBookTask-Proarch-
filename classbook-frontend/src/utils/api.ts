// import axios from 'axios';

// // Use environment variable with proper fallback
// const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 
//   (import.meta.env.MODE === 'development' 
//     ? 'http://localhost:3001/api' 
//     : 'https://classbooktask.onrender.com/api');

// export const api = axios.create({
//   baseURL: API_BASE_URL,
//   timeout: 15000, // Increase timeout for production
// });

// // Add request interceptor for better error handling
// api.interceptors.request.use((config) => {
//   console.log('API Request:', config.method?.toUpperCase(), config.url);
//   const token = localStorage.getItem('accessToken');
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

// // Add response interceptor for error handling
// api.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     console.error('API Error:', error.response?.status, error.message);
    
//     if (error.code === 'ECONNREFUSED') {
//       console.error('Backend server is not running or inaccessible');
//       alert('Cannot connect to server. Please try again later.');
//     }
    
//     return Promise.reject(error);
//   }
// );


import axios from 'axios';

// ✅ Explicitly set API base URL
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  (import.meta.env.MODE === 'development'
    ? 'http://localhost:3001/api' // local backend
    : 'https://classbooktask-proarch.onrender.com/api'); // Render backend

console.log('🔗 Using API Base URL:', API_BASE_URL);

export const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 20000, // 20s timeout to avoid false "timeout" errors
});

// ✅ Request interceptor (attach token if available)
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  console.log(`📡 [Request] ${config.method?.toUpperCase()} ${config.baseURL}${config.url}`);
  return config;
});

// ✅ Response interceptor (better error handling)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // Server responded with a status code outside 2xx
      console.error(`❌ [Response Error] ${error.response.status}:`, error.response.data);
    } else if (error.request) {
      // No response received
      console.error('❌ [Network Error] No response received from server');
    } else {
      // Other errors
      console.error('❌ [Axios Error]', error.message);
    }

    return Promise.reject(error);
  }
);
