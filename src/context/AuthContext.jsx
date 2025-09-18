import React, { createContext, useContext, useEffect, useReducer } from "react";
import { authService } from "../services/api";
import { jwtDecode } from "jwt-decode";
import authReducer from "./authReducer";
const AuthContext = createContext();

// Initial state for the auth reducer
const initialState = {
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: true,
  error: null,
};

// AuthProvider component that wraps the entire route
export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);
  // Check if user is already logged in (from localStorage) when app loads
  useEffect(() => {
    checkLoggedIn();
    // Listen for session expired events (from token refresh failures)
    //   const handleSessionExpired = () => {
    //     console.warn("Session expired event received");
    //     dispatch({ type: "SESSION_EXPIRED" });
    //   };

    //   window.addEventListener("auth:sessionExpired", handleSessionExpired);

    //   return () => {
    //     window.removeEventListener("auth:sessionExpired", handleSessionExpired);
    //   };
    // }, []);
    // checkAuthStatus();
    // handleAuthCallback();
  }, []);

  // const checkAuthStatus = async () => {
  //   dispatch({ type: "AUTH_LOADING" });
  //   try {
  //     const response = await authService.checkAuth();
  //     if (response.ok) {
  //       console.log(response);
  //     }
  //   } catch (error) {
  //     console.error("Auth status check failed:", error);
  //   } finally {
  //     dispatch({ type: "AUTH_CHECK_COMPLETE" });
  //   }
  // };

  // const handleAuthCallback = () => {
  //   const urlParams = new URLSearchParams();
  //   const authError = urlParams.get("error");
  //   const authMessage = urlParams.get("message");
  // };

  const checkLoggedIn = async () => {
    dispatch({ type: "LOGIN_REQUEST" });
    try {
      // first check if we have user info in localStorage
      const storedUserInfo = localStorage.getItem("userInfo");
      const storedToken = localStorage.getItem("token");
      if (storedUserInfo && storedToken) {
        // we have stored user data, set authenticated state
        const userData = JSON.parse(storedUserInfo);

        // Log stored user data
        console.log(userData);
        dispatch({ type: "LOGIN_SUCCESS", payload: { user: userData.user } });
        return;
      }
      // if no stored data, verify with the server if the user is authenticated
      // using httpOnly cookies that are automatically include in the request
      const userData = await authService.getCurrentUser();
      // console.log(userData);
      if (userData && userData.isAuthenticated) {
        dispatch({ type: "LOGIN_SUCCESS", payload: { user: userData.user } });
      } else {
        dispatch({ type: "LOGOUT" });
      }
    } catch (error) {
      console.error("Error reading from localStorage", error);
      dispatch({ type: "LOGOUT" });
    }
  };

  // Register a new user
  const register = async (userData) => {
    dispatch({ type: "LOGIN_REQUEST" });
    try {
      // Use the authService which is properly configured with credentials
      const response = await authService.register(userData);
      if (response && response.user) {
        console.log("AuthContext File: Registration successful", response);
        dispatch({
          type: "LOGIN_SUCCESS",
          payload: { user: response.user },
        });
        return response;
      } else {
        throw new Error("Registration failed. no data received");
      }
    } catch (error) {
      console.error("Registration error:", error);
      dispatch({
        type: "LOGIN_FAILURE",
        payload:
          error.response?.data?.error ||
          error.message ||
          "Registration failed. Please try again",
      });
      throw error;
    }
  };

  const login = async (email, password) => {
    dispatch({ type: "LOGIN_REQUEST" });
    try {
      const response = await authService.login(email, password);
      if (response && response.user) {
        dispatch({
          type: "LOGIN_SUCCESS",
          payload: { user: response.user },
        });
        return response;
      } else {
        throw new Error("Login failed - no user data received");
      }
    } catch (error) {
      console.error("Login error:", error);
      dispatch({
        type: "LOGIN_FAILURE",
        payload:
          error.response?.data?.message ||
          "Login failed. Please check your email and password",
      });
      throw error;
    }
  };

  const logout = async () => {
    try {
      // Use the authService which handles localStorage and is properly configured
      await authService.logout();
      // clear local storage
      localStorage.removeItem("userInfo");
      localStorage.removeItem("token");
      dispatch({ type: "LOGOUT" });

      console.log("logout successful");
    } catch (error) {
      console.error("Logout error:", error);
      // Even if there's an error with the API call, the authService will still handle localStorage
      dispatch({ type: "LOGOUT" });
      localStorage.removeItem("user");
      localStorage.removeItem("userInfo");
    }
  };

  const loginWithGoogle = async () => {
    dispatch({ type: "LOGIN_REQUEST" });
    try {
      // This will redirect the user to google's oauth page
      authService.loginWithGoogle();
      // the rest of the auth will be handled when redirected back
      // no need dispatch any action here
      return true;
    } catch (error) {
      console.error("Google login error:", error);
      dispatch({
        type: "LOGIN_FAILURE",
        payload: "Failed to initiate Google login",
      });
      return false;
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
        loginWithGoogle,
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
