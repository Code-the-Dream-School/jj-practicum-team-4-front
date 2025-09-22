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
      // if (config.url === "/auth/protected") {
      // config.headers.token = token;
      // } else {
      config.headers.Authorization = `Bearer ${token}`;
      // }
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
      if (window.location.pathname !== "/sign-in") {
        window.location.href = "/sign-in";
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

  verifyToken: async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found");
      }

      const response = await api.get("/auth/protected");
      return response.data; // Returns {message: "...", first_name: "..."}
    } catch (error) {
      if (error.response?.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        throw new Error("Token expired or invalid");
      }

      console.error("Token verification error:", error);
      throw new Error("Token verification failed");
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

  getCurrentUser: async () => {
    try {
      const response = await api.get("/auth/user");
      console.log(response.data.user);
      if (response.data.user) {
        // Update stored user data with latest info
        localStorage.setItem("user", JSON.stringify(response.data.user));
        return response.data.user;
      } else {
        throw new Error("No user data received");
      }
    } catch (error) {
      if (error.response?.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        throw new Error("Authentication required");
      }

      console.error("Get current user error:", error);
      throw new Error("Failed to fetch user data");
    }
  },

  refreshToken: async (refreshToken) => {
    try {
      const response = await api.post("/auth/refresh", { refreshToken });

      if (response.data?.token) {
        localStorage.setItem("token", response.data.token);
        return response.data;
      } else {
        throw new Error("No new token received");
      }
    } catch (error) {
      if (error.response?.status === 401 || error.response?.status === 400) {
        // Refresh token is invalid/expired
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        throw new Error("Session expired - please login again");
      }

      console.error("Token refresh error:", error);
      throw new Error("Token refresh failed");
    }
  },

  updateUserAdmin: async (userId, isAdmin) => {
    try {
      const response = await api.patch(`/auth/user/${userId}`, {
        is_admin: isAdmin,
      });

      return response.data; // Returns updated user object
    } catch (error) {
      let errorMessage;
      if (error.response?.status === 401) {
        errorMessage = "Authentication required";
      } else if (error.response?.status === 403) {
        errorMessage = "Admin access required";
      } else if (error.response?.status === 404) {
        errorMessage = "User not found";
      } else {
        errorMessage =
          error.response?.data?.message ||
          error.message ||
          "Failed to update user";
      }

      console.error("Update user admin error:", errorMessage);
      throw new Error(errorMessage);
    }
  },
  // Get stored user data
  getStoredUser: () => {
    try {
      const user = localStorage.getItem("user");
      return user ? JSON.parse(user) : null;
    } catch (error) {
      console.error("Error parsing stored user data:", error);
      localStorage.removeItem("user");
      return null;
    }
  },

  // Get stored token
  getStoredToken: () => {
    return localStorage.getItem("token");
  },

  // Clear all auth data
  clearAuthData: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  },
};

export default api;
