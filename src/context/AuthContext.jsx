import React, { createContext, useContext, useReducer, useEffect } from 'react';
import authReducer from './authReducer';
import api, { authService } from '../services/api';

// Create the auth context
const AuthContext = createContext();

// Initial state for the auth reducer
const initialState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null
};

// Using api service for all API calls

// AuthProvider component that wraps the application
export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Check if user is already logged in (from localStorage) when app loads
  useEffect(() => {
    const checkLoggedIn = async () => {
      try {
        const storedUser = localStorage.getItem('user');
        
        if (storedUser) {
          const user = JSON.parse(storedUser);
          
          // Optionally verify token with backend
          dispatch({ 
            type: 'LOGIN_SUCCESS', 
            payload: user 
          });
        }
      } catch (error) {
        // If there's an error (like invalid JSON in localStorage), clear it
        localStorage.removeItem('user');
        dispatch({ 
          type: 'LOGOUT' 
        });
      }
    };

    checkLoggedIn();
  }, []);

  // Login with email and password
  const login = async (email, password) => {
    dispatch({ type: 'LOGIN_REQUEST' });
    
    try {
      // Use the authService which is properly configured with credentials
      const user = await authService.login(email, password);
      
      dispatch({ 
        type: 'LOGIN_SUCCESS', 
        payload: user 
      });
      
      return user;
    } catch (error) {
      dispatch({ 
        type: 'LOGIN_FAILURE', 
        payload: error.response?.data?.error || 'Login failed. Please check your credentials.'
      });
      throw error;
    }
  };

  // Google OAuth login - redirects to Google Auth
  const loginWithGoogle = () => {
    // Use the authService which handles the Google OAuth URL
    authService.loginWithGoogle();
  };

  // Logout function
  const logout = async () => {
    try {
      // Use the authService which handles localStorage and is properly configured
      await authService.logout();
      
      dispatch({ type: 'LOGOUT' });
    } catch (error) {
      console.error('Logout error:', error);
      // Even if there's an error with the API call, the authService will still handle localStorage
      dispatch({ type: 'LOGOUT' });
    }
  };

  // Register a new user
  const register = async (userData) => {
    dispatch({ type: 'LOGIN_REQUEST' });
    
    try {
      console.log('Sending registration data:', userData);
      // Use the authService which is properly configured with credentials
      const user = await authService.register(userData);
      
      dispatch({ 
        type: 'LOGIN_SUCCESS', 
        payload: user 
      });
      
      return user;
    } catch (error) {
      console.error('Registration error:', error);
      dispatch({ 
        type: 'LOGIN_FAILURE', 
        payload: error.response?.data?.error || 'Registration failed. Please try again.'
      });
      throw error;
    }
  };

  // Provide auth state and functions to all components
  return (
    <AuthContext.Provider value={{
      ...state,
      login,
      loginWithGoogle,
      logout,
      register
    }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
