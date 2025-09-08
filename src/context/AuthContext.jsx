import React, {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { authService } from "../services/api";
import authReducer from "./authReducer";
const AuthContext = createContext();

// initial state for the auth reducer
const initialState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

// Using api service for all API calls

// AuthProvider component that wraps the entire route
export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Check if user is already logged in (from localStorage) when app loads
  const checkLoggedIn = async () => {
    // console.log("checked local storage");
    try {
      const storedUser = localStorage.getItem("user");
      // if (storedUser) {
      const userData = JSON.parse(storedUser);
      setUser(userData);
      setIsAuthenticated(true);
      // console.log("Restored user from localStorage", userData);
      // }
    } catch (err) {
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
      const user = await authService.register(userData);

      dispatch({
        type: "LOGIN_SUCCESS",
        payload: user,
      });

      return user;
    } catch (error) {
      console.error("Registration error:", error);
      dispatch({
        type: "LOGIN_FAILURE",
        payload:
          error.response?.data?.error ||
          "Registration failed. Please try again.",
      });
      throw error;
    }
  };

  useEffect(() => {
    checkLoggedIn();
  }, [user]);

  // const login = (userData) => {
  //   setUser(userData);
  //   setIsAuthenticated(true);
  // };
  // const login = async (email, password) => {
  //   setIsLoading(true);
  //   try {
  //     const res = await login(email, password);
  //     setError(null);
  //   } catch (err) {
  //     console.error(err);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  // const logout = () => {
  //   setUser(null);
  //   setIsAuthenticated(false);
  // };

  return (
    <AuthContext.Provider value={{ user, error, isLoading, register }}>
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
