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

// Create a logging function to track API calls with enhanced error details
const logApiCall = (
  type,
  endpoint,
  data = {},
  success = true,
  error = null
) => {
  const timestamp = new Date().toISOString();
  const logData = {
    timestamp,
    type,
    endpoint,
    success,
  };

  // Add detailed error information if available
  if (!success && error) {
    logData.error = {
      message: error.message || "Unknown error",
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data,
    };

    // Log CORS errors specifically
    if (error.message === "Network Error") {
      console.error("==== CORS ERROR DETECTED ====");
      console.error(`Failed request to: ${endpoint}`);
      console.error(
        "This may be a CORS issue. Check that your backend CORS configuration allows:"
      );
      console.error(`- Origin: ${window.location.origin}`);
      console.error("- Methods: The request method being used");
      console.error("- Headers: Including Authorization and Content-Type");
      console.error("==== END CORS ERROR INFO ====");
    }
  }

  // Don't log sensitive data like passwords
  const safeData = { ...data };
  if (safeData.password) safeData.password = "********";

  // Use appropriate console method based on success/failure
  const logMethod = success ? console.log : console.error;
  logMethod(
    `🔄 API ${type.toUpperCase()} | ${endpoint} | Success: ${success}`,
    logData,
    safeData
  );

  // Store recent errors in localStorage for debugging (up to 10)
  if (!success) {
    try {
      const storedErrors = JSON.parse(
        localStorage.getItem("api_errors") || "[]"
      );
      storedErrors.unshift({
        ...logData,
        timestamp,
        url: endpoint,
      });

      // Keep only the 10 most recent errors
      if (storedErrors.length > 10) {
        storedErrors.length = 10;
      }

      localStorage.setItem("api_errors", JSON.stringify(storedErrors));
    } catch (e) {
      console.error("Error storing API error in localStorage", e);
    }
  }
};

// Implement CSRF protection for sensitive operations
let csrfToken = null;

// Function to get a CSRF token from the server
const fetchCsrfToken = async () => {
  try {
    const response = await axios.get(`${baseUrl}/auth/csrf-token`, {
      withCredentials: true,
    });
    if (response.data && response.data.csrfToken) {
      csrfToken = response.data.csrfToken;
      return csrfToken;
    }
    console.error("Failed to get CSRF token");
    return null;
  } catch (error) {
    console.error("Error fetching CSRF token:", error);
    return null;
  }
};

// Add CSRF token to requests that need it
api.interceptors.request.use(
  async (config) => {
    // List of methods that modify state and require CSRF protection
    const sensitiveOperations = [
      "/auth/login",
      "/auth/register",
      "/auth/logout",
      "/auth/refresh",
    ];
    const isPrivilegedOperation = sensitiveOperations.some((op) =>
      config.url?.includes(op)
    );
    const isModifyingMethod = ["post", "put", "patch", "delete"].includes(
      config.method?.toLowerCase()
    );

    // Only add CSRF token for sensitive operations
    if (isModifyingMethod && isPrivilegedOperation) {
      // Get token if we don't have one
      if (!csrfToken) {
        csrfToken = await fetchCsrfToken();
      }

      if (csrfToken) {
        config.headers["X-CSRF-Token"] = csrfToken;
      } else {
        console.warn("No CSRF token available for protected operation");
      }
    }
    return config;
  },
  (error) => {
    console.log("Request error:", error);
    return Promise.reject(error);
  }
);

// Add a response interceptor for handling token refresh
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve();
    }
  });

  failedQueue = [];
};

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // If the error is 401 and we haven't already tried to refresh
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        // If we're already refreshing, wait for the refresh to complete
        return new Promise(function (resolve, reject) {
          failedQueue.push({ resolve, reject });
        })
          .then(() => {
            return api(originalRequest);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        // Call refresh token endpoint
        const res = await api.post("/auth/refresh");

        if (res.status === 200) {
          // Token refreshed successfully
          processQueue(null);
          return api(originalRequest);
        } else {
          // Handle token refresh failure
          // This might happen if the refresh token is invalid or expired
          // In that case, we should log the user out
          processQueue(new Error("Token refresh failed"));
          window.dispatchEvent(new CustomEvent("auth:sessionExpired"));
          return Promise.reject(error);
        }
      } catch (refreshError) {
        processQueue(refreshError);
        // If refresh token fails, dispatch session expired event
        window.dispatchEvent(new CustomEvent("auth:sessionExpired"));
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

// Add a request interceptor to include auth token if it exists
// api.interceptors.request.use(
//   (config) => {
//     const user = JSON.parse(localStorage.getItem("user") || "{}");
//     if (user && user.token) {
//       config.headers["Authorization"] = `Bearer ${user.token}`;
//       // logApiCall("request", config.url, {}, true);
//     }
//     return config;
//   },
//   (error) => {
//     // logApiCall("request", error.config?.url, {}, false, error);
//     console.log(error);
//     return Promise.reject(error);
//   }
// );

// Add a response interceptor for logging
// api.interceptors.response.use(
//   (response) => {
//     // logApiCall("response", response.config.url, {}, true);
//     return response;
//   },
//   (error) => {
//     // logApiCall("response", error.config?.url, {}, false, error);
//     return Promise.reject(error);
//   }
// );

// Authentication services
export const authService = {
  // Login with email and password
  login: async (email, password) => {
    try {
      // Ensure we're using absolute URL with the proper auth endpoint
      const response = await api.post("/auth/login", { email, password });
      if (response.data && response.data.user) {
        const decodeToken = jwtDecode(response.data.token);
        const userData = {
          userId: decodeToken.userId,
          email: decodeToken.email,
          firstName: decodeToken.firstName,
          lastName: decodeToken.lastName,
          fullName: decodeToken.fullName,
          admin: decodeToken.admin,
        };
        // Store user data and token in localStorage
        localStorage.setItem("userInfo", JSON.stringify(userData));
        localStorage.setItem("loginTimestamp", Date.now().toString());
      } else if (response.data) {
        // If we get a response but no token, log it clearly
        console.warn("Login successful but no token received:", response.data);
      }
      return response.data;
    } catch (error) {
      localStorage.removeItem("userInfo");
      localStorage.removeItem("loginTimeStamp");

      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Login failed. Please try again.";
      console.error("Login error:", errorMessage);
      throw { message: errorMessage, originalError: error };
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

  // Google OAuth login (redirects to backend Google auth route)
  loginWithGoogle: () => {
    const googleAuthUrl =
      import.meta.env.VITE_GOOGLE_AUTH_URL ||
      `${api.defaults.baseURL}/auth/google`;
    logApiCall("redirect", googleAuthUrl);
    window.location.href = googleAuthUrl;
  },

  // Logout user
  logout: async () => {
    try {
      const res = await api.get("/auth/logout");
      localStorage.removeItem("userInfo");
      localStorage.removeItem("loginTimeStamp");
      return res;
    } catch (error) {
      localStorage.removeItem("userInfo");
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
      logApiCall("call", "/auth/protected");
      const response = await api.get("/auth/protected");
      logApiCall("success", "/auth/protected");
      return response.data;
    } catch (error) {
      logApiCall("error", "/auth/protected", {}, false, error);
      throw error;
    }
  },

  // Get the current user from localStorage
  getCurrentUser: async () => {
    try {
      const userInfo = localStorage.getItem("userInfo");
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
      localStorage.removeItem("userInfo");
      localStorage.removeItem("loginTimeStamp");
      return null;
    } catch (error) {
      localStorage.removeItem("userInfo");
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
