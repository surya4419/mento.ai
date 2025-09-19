import axios from 'axios';

// Create axios instance with better error handling
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api',
  timeout: 30000, // 30 second timeout
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for adding auth tokens
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for better error handling
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle specific error cases
    if (error.response) {
      // Server responded with error status
      const { status, data } = error.response;
      
      // Handle API credit exhaustion
      if (status === 402 || status === 429) {
        console.warn('API credits exhausted or rate limited:', data);
        return Promise.reject(new Error('API credits exhausted. Please try again later.'));
      }
      
      // Handle authentication errors
      if (status === 401) {
        console.warn('Authentication error:', data);
        localStorage.removeItem('token');
        return Promise.reject(new Error('Authentication failed. Please log in again.'));
      }
      
      // Handle server errors
      if (status >= 500) {
        console.error('Server error:', data);
        return Promise.reject(new Error('Server error. Please try again later.'));
      }
      
      // Handle other client errors
      const message = data?.message || `Request failed with status ${status}`;
      return Promise.reject(new Error(message));
    } else if (error.request) {
      // Network error
      console.error('Network error:', error.request);
      return Promise.reject(new Error('Network error. Please check your connection.'));
    } else {
      // Other error
      console.error('Request error:', error.message);
      return Promise.reject(new Error(error.message || 'An unexpected error occurred.'));
    }
  }
);

export { api };
