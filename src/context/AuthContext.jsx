import React, { createContext, useContext, useEffect, useReducer } from "react";
import { authService } from "../services/api";
import { jwtDecode } from "jwt-decode";
import authReducer from "./authReducer";
const AuthContext = createContext();

// Initial state for the auth reducer
const initialState = {
  user: null,
  isAuthenticated: false,
  isLoading: true, // Start with loading true while we check authentication
  error: null,
};

// AuthProvider component that wraps the entire route
export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Check if user is already logged in via server session when app loads
  const checkLoggedIn = async () => {
    dispatch({ type: "LOGIN_REQUEST" }); // Set loading state
    
    try {
      // This will verify with the server if the user is authenticated
      // using httpOnly cookies that are automatically included in the request
      const userData = await authService.getCurrentUser();
      
      if (userData && userData.isAuthenticated) {
        // If the server validates the session, update the state
        dispatch({
          type: "LOGIN_SUCCESS",
          payload: { user: userData.user }
        });
      } else {
        // User is not authenticated
        dispatch({ type: "LOGOUT" });
      }
    } catch (err) {
      console.error("Error checking authentication status:", err);
      dispatch({ type: "LOGOUT" });
    }
  };

  // Register a new user
  const register = async (userData) => {
    dispatch({ type: "LOGIN_REQUEST" });
    try {
      // The register API call will set the httpOnly cookie for us
      const response = await authService.register(userData);
      
      if (response && response.user) {
        dispatch({
          type: "LOGIN_SUCCESS",
          payload: { user: response.user }
        });
        console.log("Registration successful");
        return response;
      } else {
        throw new Error("Registration failed - no user data received");
      }
    } catch (error) {
      console.error("Registration error:", error);
      dispatch({
        type: "LOGIN_FAILURE",
        payload: error.response?.data?.message || 
                 error.message || 
                 "Registration failed. Please try again",
      });
      throw error;
    }
  };

  // console.log(state.error);

  useEffect(() => {
    checkLoggedIn();
    
    // Listen for session expired events (from token refresh failures)
    const handleSessionExpired = () => {
      console.warn('Session expired event received');
      dispatch({ type: "SESSION_EXPIRED" });
    };
    
    window.addEventListener('auth:sessionExpired', handleSessionExpired);
    
    return () => {
      window.removeEventListener('auth:sessionExpired', handleSessionExpired);
    };
  }, []);

  const login = async (email, password) => {
    dispatch({ type: "LOGIN_REQUEST" });
    try {
      // The login API call will set the httpOnly cookie for us
      const response = await authService.login(email, password);
      
      if (response && response.user) {
        dispatch({
          type: "LOGIN_SUCCESS",
          payload: { user: response.user }
        });
        console.log("Login successful");
        return response;
      } else {
        throw new Error("Login failed - no user data received");
      }
    } catch (error) {
      console.error("Login error:", error);
      dispatch({
        type: "LOGIN_FAILURE",
        payload: error.response?.data?.message || "Login failed. Please check your email and password",
      });
      throw error;
    }
  };

  const logout = async () => {
    try {
      // The logout API call will clear the httpOnly cookie for us
      await authService.logout();
      dispatch({ type: "LOGOUT" });
      console.log("Logout successful");
    } catch (error) {
      console.error("Logout error:", error);
      // Even if there's an error with the API call, we should still update the UI
      dispatch({ type: "LOGOUT" });
    }
  };

  const clearError = () => {
    dispatch({ type: "CLEAR_ERROR" });
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        register,
        login,
        logout,
        clearError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};
