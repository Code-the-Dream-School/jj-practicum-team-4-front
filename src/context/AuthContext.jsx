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
    checkAuthStatus();
    handleAuthCallback();
  }, []);

  const checkAuthStatus = async () => {
    dispatch({ type: "AUTH_LOADING" });
    try {
      const response = await authService.checkAuth();
      if (response.ok) {
        console.log(response);
      }
    } catch (error) {
      console.error("Auth status check failed:", error);
    } finally {
      dispatch({ type: "AUTH_CHECK_COMPLETE" });
    }
  };

  const handleAuthCallback = () => {
    const urlParams = new URLSearchParams();
    console.log(urlParams.toString());
    const authError = urlParams.get("error");
    const authMessage = urlParams.get("message");
    console.log(authError);
    console.log(authMessage);
  };

  const checkLoggedIn = async () => {
    dispatch({ type: "AUTH_LOADING" });
    try {
      const storedUser = authService.getCurrentUser();

      if (storedUser && storedUser.token) {
        // check if token expired
        try {
          const decodedToken = jwtDecode(storedUser.token);
          console.log(decodedToken);
          const currentTime = Date.now() / 1000;

          // if expired, logout user
          if (decodedToken.exp && decodedToken.exp < currentTime) {
            console.log("token expired, logging out user");
            localStorage.removeItem("user");
            dispatch({ type: "LOGOUT" });
            return;
          }
          //if token is valid, set user as authenticated
          console.log("token is valid, user authenticated", storedUser);
          dispatch({
            type: "LOGIN_SUCCESS",
            payload: { user: storedUser.user, token: decodedToken },
          });
        } catch (tokenError) {
          console.error("invalid token:", tokenError);
          localStorage.removeItem("user");
          dispatch({ type: "LOGIN_FAILURE" });
        }
      } else {
        dispatch({ type: "AUTH_CHECK_COMPLETE" });
      }
    } catch (error) {
      console.error("Error reading from localStorage", error);
      localStorage.removeItem("user");
    }
  };

  // Register a new user
  const register = async (userData) => {
    dispatch({ type: "LOGIN_REQUEST" });
    try {
      console.log("Sending registration data:", userData);
      // Use the authService which is properly configured with credentials
      const res = await authService.register(userData);
      if (res && res.token) {
        console.log("AuthContext File: Registration successful", res);
        dispatch({
          type: "LOGIN_SUCCESS",
          payload: { user: res.user, token: res.token },
        });
        return res;
      } else {
        throw new Error("Registration failed. no token received");
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
      console.log("logging...");
      // Use the authService which is properly configured with credentials
      const response = await authService.login(email, password);
      if (response && response.token) {
        const decodeUserToken = jwtDecode(response.token);
        dispatch({
          type: "LOGIN_SUCCESS",
          payload: { user: response.user, token: decodeUserToken },
        });
        localStorage.setItem("user", JSON.stringify(response));
        console.log("logon successful in authcontext:", response);
        return response;
      } else {
        throw new Error("Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
      dispatch({
        type: "LOGIN_FAILURE",
        payload: "Login failed. Please check your email and password",
      });
      localStorage.removeItem("user");
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
    }
  };

  const loginWithGoogle = async () => {
    dispatch({ type: "LOGIN_REQUEST" });
    try {
      const response = authService.loginWithGoogle();
      dispatch({ type: "LOGIN_SUCCESS" });
      console.log(response);
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
