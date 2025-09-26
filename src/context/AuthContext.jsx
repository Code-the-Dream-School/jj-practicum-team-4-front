import React, { createContext, useContext, useEffect, useReducer } from "react";
import { authService } from "../services/api";
// import { jwtDecode } from "jwt-decode";
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

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);
  useEffect(() => {
    checkLoggedIn();
  }, []);

  const checkLoggedIn = async () => {
    dispatch({ type: "LOGIN_REQUEST" });
    try {
      const storedUserInfo = authService.getStoredUser();
      const storedToken = authService.getStoredToken();
      if (storedUserInfo && storedToken) {
        try {
          await authService.verifyToken();

          const userData = await authService.getCurrentUser();
          dispatch({
            type: "LOGIN_SUCCESS",
            payload: { user: userData, token: storedToken },
          });
          return;
        } catch (error) {
          authService.clearAuthData();
        }
      }

      dispatch({ type: "LOGOUT" });
    } catch (error) {
      console.error("Error reading from localStorage", error);
      dispatch({ type: "LOGOUT" });
    }
  };

  const login = async (email, password) => {
    dispatch({ type: "LOGIN_REQUEST" });
    try {
      const response = await authService.login(email, password);
      if (response && response.user) {
        dispatch({
          type: "LOGIN_SUCCESS",
          payload: { user: response.user, token: response.token },
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

  const register = async (userData) => {
    dispatch({ type: "LOGIN_REQUEST" });
    try {
      const response = await authService.register(userData);
      if (response && response.user) {
        console.log("AuthContext File: Registration successful", response);
        dispatch({
          type: "LOGIN_SUCCESS",
          payload: { user: response.user, token: response.token },
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

  const logout = async () => {
    try {
      await authService.logout();
      localStorage.removeItem("userInfo");
      localStorage.removeItem("token");
      dispatch({ type: "LOGOUT" });

      console.log("logout successful");
    } catch (error) {
      console.error("Logout error:", error);
      dispatch({ type: "LOGOUT" });
      localStorage.removeItem("user");
      localStorage.removeItem("userInfo");
    }
  };

  const loginWithGoogle = () => {
    dispatch({ type: "LOGIN_REQUEST" });
    authService.loginWithGoogle();
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
