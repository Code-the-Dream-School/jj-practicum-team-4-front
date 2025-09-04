import axios from 'axios';

// Create axios instance with default config
const api = axios.create({
  // Use relative URLs so Vite can proxy the requests
  baseURL: '/',
  withCredentials: true, // Set back to true now that we're using a proxy
  headers: {
    'Content-Type': 'application/json'
  },
});

// Add a request interceptor to include auth token if it exists
api.interceptors.request.use(
  (config) => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (user && user.token) {
      config.headers['Authorization'] = `Bearer ${user.token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Authentication services
export const authService = {
  // Login with email and password
  login: async (email, password) => {
    try {
      // Auth endpoints are mounted at root in the backend
      const response = await api.post('/login', { email, password });
      if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data));
      }
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Register new user
  register: async (userData) => {
    try {
      // Auth endpoints are mounted at root in the backend
      const response = await api.post('/register', userData);
      if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data));
      }
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Google OAuth login (redirects to backend Google auth route)
  loginWithGoogle: () => {
    window.location.href = import.meta.env.VITE_GOOGLE_AUTH_URL || `${api.defaults.baseURL}/auth/google`;
  },

  // Logout user
  logout: async () => {
    try {
      await api.get('/logout');
      localStorage.removeItem('user');
    } catch (error) {
      console.error('Logout error:', error);
      localStorage.removeItem('user');
      throw error;
    }
  },

  // Check if user is authenticated (can be used to validate session/token)
  checkAuth: async () => {
    try {
      const response = await api.get('/protected');
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};

export default api;
