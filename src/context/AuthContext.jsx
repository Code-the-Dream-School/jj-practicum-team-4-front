import React, { createContext, useContext, useEffect, useState } from "react";
import { authService } from "../services/api";
import { jwtDecode } from "jwt-decode";
const AuthContext = createContext();

// Using api service for all API calls

// AuthProvider component that wraps the entire route
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Check if user is already logged in (from localStorage) when app loads
  const checkLoggedIn = async () => {
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
            setUser(null);
            setIsAuthenticated(false);
            setError(null);
            return;
          }

          //if token is valid, set user as authenticated
          console.log("token is valid, user authenticated", storedUser);
          setUser(storedUser);
          setIsAuthenticated(true);
          setError(null);
        } catch (tokenError) {
          console.error("invalid token:", tokenError);
          localStorage.removeItem("user");
          setUser(null);
          setIsAuthenticated(false);
          setError(null);
        }
      }
    } catch (err) {
      console.error("Error reading from localStorage", error);
      localStorage.removeItem("user");
    }
  };

  // Register a new user
  const register = async (userData) => {
    // dispatch({ type: "LOGIN_REQUEST" });
    setIsLoading(true);
    setError(null);
    try {
      console.log("Sending registration data:", userData);
      // Use the authService which is properly configured with credentials
      const newUserData = await authService.register(userData);

      console.log("AuthContext File: Registration successful", newUserData);
      setUser({ token: newUserData.token, user: newUserData.user });
      setIsAuthenticated(true);
      setError(null);
      return newUserData;
    } catch (error) {
      console.error("Registration error:", error);
      setError("Login failed", error);
      setIsAuthenticated(false);
      setUser(null);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkLoggedIn();
  }, []);

  const login = async (email, password) => {
    setIsLoading(true);
    setError(null);

    try {
      console.log("logging...");
      // Use the authService which is properly configured with credentials
      const response = await authService.login(email, password);
      const decodeUserToken = jwtDecode(response.token);
      setUser({ user: response.user, token: decodeUserToken });
      setIsAuthenticated(true);
      localStorage.setItem("user", JSON.stringify(response));
      console.log("logon successful in authcontext:", response);
      return response;
    } catch (error) {
      console.error("Login error:", error);
      setError(error.message);
      setUser(null);
      setIsAuthenticated(false);
      localStorage.removeItem("user");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);

    try {
      // Use the authService which handles localStorage and is properly configured
      await authService.logout();

      setUser(null);
      setIsAuthenticated(false);
      setError(null);

      // clear local storage
      localStorage.removeItem("user");
      console.log("logout successful");
    } catch (error) {
      console.error("Logout error:", error);
      // Even if there's an error with the API call, the authService will still handle localStorage
      setUser(null);
      setIsAuthenticated(false);
      localStorage.removeItem("user");
    } finally {
      setIsLoading(false);
    }
  };

  const clearError = () => {
    setError(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        error,
        isAuthenticated,
        isLoading,
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
