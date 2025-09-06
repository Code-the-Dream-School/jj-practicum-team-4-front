import React, { createContext, useContext, useReducer, useEffect } from 'react';
import authReducer from './authReducer';
import api, { authService } from '../services/api';
import { jwtDecode } from 'jwt-decode';

// Create the auth context
const AuthContext = createContext();

// Initial state for the auth reducer
const initialState = {
  user: null,
  token: null,
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
        const storedUserData = authService.getCurrentUser();
        
        if (storedUserData && storedUserData.token) {
          // Check if token is expired
          try {
            const decodedToken = jwtDecode(storedUserData.token);
            const currentTime = Date.now() / 1000;
            
            // If token is expired, log out user
            if (decodedToken.exp && decodedToken.exp < currentTime) {
              console.log('Token expired, logging out user');
              localStorage.removeItem('user');
              dispatch({ type: 'LOGOUT' });
              return;
            }
            
            // If token is valid, set user as authenticated
            console.log('Token valid, user authenticated');
            dispatch({ 
              type: 'LOGIN_SUCCESS', 
              payload: {
                user: storedUserData.user,
                token: storedUserData.token
              }
            });
            
            // Verify token with backend to ensure it's still valid
            try {
              await authService.checkAuth();
              console.log('Token verified with backend');
            } catch (error) {
              console.error('Token verification failed:', error);
              // If token verification fails, don't log out user yet as the token might still be valid
              // This prevents unnecessary logouts when backend is temporarily unavailable
            }
          } catch (tokenError) {
            console.error('Invalid token:', tokenError);
            localStorage.removeItem('user');
            dispatch({ type: 'LOGOUT' });
          }
        }
      } catch (error) {
        console.error('Error checking login status:', error);
        localStorage.removeItem('user');
        dispatch({ type: 'LOGOUT' });
      }
    };

    checkLoggedIn();
  }, []);

  // Login with email and password
  const login = async (email, password) => {
    dispatch({ type: 'LOGIN_REQUEST' });
    
    try {
      // Use the authService which is properly configured with credentials
      const response = await authService.login(email, password);
      
      if (response && response.token) {
        console.log('Login successful, token received');
        
        dispatch({ 
          type: 'LOGIN_SUCCESS', 
          payload: {
            user: response.user,
            token: response.token
          }
        });
        
        return response;
      } else {
        throw new Error('Login failed: No token received');
      }
    } catch (error) {
      console.error('Login error:', error);
      dispatch({ 
        type: 'LOGIN_FAILURE', 
        payload: error.response?.data?.message || error.response?.data?.error || error.message || 'Login failed. Please check your credentials.'
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
      console.log('Sending registration data:', {...userData, password: '******'});
      // Use the authService which is properly configured with credentials
      const response = await authService.register(userData);
      
      if (response && response.token) {
        console.log('Registration successful, token received');
        
        dispatch({ 
          type: 'LOGIN_SUCCESS', 
          payload: {
            user: response.user,
            token: response.token
          }
        });
        
        return response;
      } else {
        throw new Error('Registration failed: No token received');
      }
    } catch (error) {
      console.error('Registration error:', error);
      dispatch({ 
        type: 'LOGIN_FAILURE', 
        payload: error.response?.data?.message || error.response?.data?.error || error.message || 'Registration failed. Please try again.'
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
