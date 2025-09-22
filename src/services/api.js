import axios from "axios";
import { jwtDecode } from "jwt-decode";

const baseUrl = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: baseUrl,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to add JWT token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      // Note: /auth/protected uses 'token' header, others use 'Authorization'
      if (config.url === "/auth/protected") {
        config.headers.token = token;
      } else {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    console.error("Request interceptor error:", error);
    return Promise.reject(error);
  }
);
// Response interceptor to handle token expiration
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid - clear storage
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      // Optional: redirect to login if not already there
      if (window.location.pathname !== "/login") {
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

// Authentication services
export const authService = {
  // Google OAuth login (redirects to backend Google auth route)
  loginWithGoogle: () => {
    console.log("Redirecting to Google OAuth");
    window.location.href = `${baseUrl}/auth/google`;
  },

  handleGoogleCallback: async () => {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get("code");
      const state = urlParams.get("state");

      if (!code) {
        throw new Error("No authorization code received from Google");
      }

      // Let the backend handle the callback processing
      const response = await api.get(
        `/auth/google/callback?code=${code}&state=${state || ""}`
      );
      if (response.data?.token && response.data?.user) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        return response.data;
      }
    } catch (error) {
      console.error("Google callback error:", error);
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Google authentication failed";
      throw new Error(errorMessage);
    }
  },

  // Login with email and password
  login: async (email, password) => {
    try {
      // Ensure we're using absolute URL with the proper auth endpoint
      const response = await api.post("/auth/login", { email, password });
      if (response.data?.token && response.data?.user) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        return response.data;
      } else {
        throw new Error("Login failed - invalid response");
      }
    } catch (error) {
      // Clear any existing data on failure
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      let errorMessage;
      if (error.response?.status === 401) {
        errorMessage = "Invalid email or password";
      } else if (error.response?.status === 400) {
        errorMessage = "Please provide both email and password";
      } else {
        errorMessage =
          error.response?.data?.message || error.message || "Login failed";
      }

      console.error("Login error:", errorMessage);
      throw new Error(errorMessage);
    }
  },

  register: async (userData) => {
    try {
      // Auth endpoints are mounted at root in the backend
      const response = await api.post("/auth/register", userData);
      if (response.data) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Logout user
  logout: async () => {
    try {
      const res = await api.get("/auth/logout");
      localStorage.removeItem("user");
      localStorage.removeItem("loginTimeStamp");
      return res;
    } catch (error) {
      localStorage.removeItem("user");
      localStorage.removeItem("loginTimeStamp");
      const errorMessage =
        error.response?.data?.message || error.message || "Logout failed";
      console.error("Logout error:", errorMessage);
      throw { message: errorMessage, originalError: error };
    }
  },

  // Check if user is authenticated (can be used to validate session/token)
  checkAuth: async () => {
    try {
      const response = await api.get("/auth/protected");
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get the current user from localStorage
  getCurrentUser: async () => {
    try {
      const userInfo = localStorage.getItem("user");
      const loginTimestamp = localStorage.getItem("loginTimestamp");
      // const response = await api.get("/auth/user");
      if (userInfo) {
        const now = Date.now();
        const loginTime = parseInt(loginTimestamp || "0");
        const isRecent = now - loginTime < 24 * 60 * 60 * 1000;

        if (isRecent) {
          return {
            isAuthenticated: true,
            user: JSON.parse(userInfo),
          };
        }
      }
      localStorage.removeItem("user");
      localStorage.removeItem("loginTimeStamp");
      return null;
    } catch (error) {
      localStorage.removeItem("user");
      localStorage.removeItem("loginTimeStamp");
      return null;
    }
  },

  // Get the authorization token
  // We no longer need to get tokens directly since they're stored in httpOnly cookies
  isAuthenticated: async () => {
    try {
      const response = await api.get("/auth/me");
      return response.status === 200;
    } catch (error) {
      return false;
    }
  },
};

export default api;
