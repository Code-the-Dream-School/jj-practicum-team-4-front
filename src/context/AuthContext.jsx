import React, {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";

const AuthContext = createContext();

// initial state for the auth reducer
// const initialState = {
//   user: null,
//   isAuthenticated: false,
//   isLoading: false,
//   error: null,
// };

// Using api service for all API calls

// AuthProvider component that wraps the entire route
export const AuthProvider = ({ children }) => {
  // const [state, dispatch] = useReducer(authReducer, initialState);
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  // Check if user is already logged in (from localStorage) when app loads
  const checkLoggedIn = async () => {
    try {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        const user = JSON.parse(storedUser);
      }
    } catch (err) {}
  };
  useEffect(() => {
    checkLoggedIn();
  }, []);

  const login = (userData) => {
    setUser(userData);
    setIsAuthenticated(true);
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, login, logout, isLoading }}
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
