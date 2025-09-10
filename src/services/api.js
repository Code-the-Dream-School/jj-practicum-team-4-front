import axios from "axios";

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
  // const logMethod = success ? console.log : console.error;
  // logMethod(
  //   `🔄 API ${type.toUpperCase()} | ${endpoint} | Success: ${success}`,
  //   logData,
  //   safeData
  // );

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

// Add a request interceptor to include auth token if it exists
api.interceptors.request.use(
  (config) => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    if (user && user.token) {
      config.headers["Authorization"] = `Bearer ${user.token}`;
      // logApiCall("request", config.url, {}, true);
    }
    return config;
  },
  (error) => {
    // logApiCall("request", error.config?.url, {}, false, error);
    console.log(error);
    return Promise.reject(error);
  }
);

// Add a response interceptor for logging
api.interceptors.response.use(
  (response) => {
    // logApiCall("response", response.config.url, {}, true);
    return response;
  },
  (error) => {
    // logApiCall("response", error.config?.url, {}, false, error);
    return Promise.reject(error);
  }
);

// Authentication services
export const authService = {
  // Login with email and password
  login: async (email, password) => {
    try {
      // logApiCall("call", "/auth/login", { email });
      // Ensure we're using absolute URL with the proper auth endpoint
      const response = await api.post("/auth/login", { email, password });

      if (response.data && response.data.token) {
        // Store user data and token in localStorage
        localStorage.setItem("user", JSON.stringify(response.data));
        // logApiCall("success", "/auth/login", { email });
      } else if (response.data) {
        // If we get a response but no token, log it clearly
        console.warn("Login successful but no token received:", response.data);
        localStorage.setItem("user", JSON.stringify(response.data));
        // logApiCall("partial", "/auth/login", { email });
      }
      return response.data;
    } catch (error) {
      // logApiCall("error", "/auth/login", { email }, false, error);
      throw error;
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
      localStorage.removeItem("user");
      return res;
    } catch (error) {
      localStorage.removeItem("user");
      throw error;
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
  getCurrentUser: () => {
    try {
      const user = localStorage.getItem("user");
      if (user) {
        return JSON.parse(user);
      }
      return null;
    } catch (error) {
      logApiCall("error", "getCurrentUser", {}, false, error);
      return null;
    }
  },

  // Get the authorization token
  getToken: () => {
    try {
      const user = localStorage.getItem("user");
      if (user) {
        const userData = JSON.parse(user);
        return userData.token;
      }
      return null;
    } catch (error) {
      logApiCall("error", "getToken", {}, false, error);
      return null;
    }
  },
};

export default api;
