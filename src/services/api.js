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

// Implement CSRF protection for sensitive operations
let csrfToken = null;

// Function to get a CSRF token from the server
const fetchCsrfToken = async () => {
  try {
    const response = await axios.get(`${baseUrl}/auth/csrf-token`, { withCredentials: true });
    if (response.data && response.data.csrfToken) {
      csrfToken = response.data.csrfToken;
      return csrfToken;
    }
    console.error('Failed to get CSRF token');
    return null;
  } catch (error) {
    console.error('Error fetching CSRF token:', error);
    return null;
  }
};

// Add CSRF token to requests that need it
api.interceptors.request.use(
  async (config) => {
    // List of methods that modify state and require CSRF protection
    const sensitiveOperations = ['/auth/login', '/auth/register', '/auth/logout', '/auth/refresh-token'];
    const isPrivilegedOperation = sensitiveOperations.some(op => config.url?.includes(op));
    const isModifyingMethod = ['post', 'put', 'patch', 'delete'].includes(config.method?.toLowerCase());
    
    // Only add CSRF token for sensitive operations
    if (isModifyingMethod && isPrivilegedOperation) {
      // Get token if we don't have one
      if (!csrfToken) {
        csrfToken = await fetchCsrfToken();
      }
      
      if (csrfToken) {
        config.headers['X-CSRF-Token'] = csrfToken;
      } else {
        console.warn('No CSRF token available for protected operation');
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
  failedQueue.forEach(prom => {
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
        return new Promise(function(resolve, reject) {
          failedQueue.push({resolve, reject});
        })
          .then(() => {
            return api(originalRequest);
          })
          .catch(err => {
            return Promise.reject(err);
          });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        // Call refresh token endpoint
        const res = await api.post('/auth/refresh-token');
        
        if (res.status === 200) {
          // Token refreshed successfully
          processQueue(null);
          return api(originalRequest);
        } else {
          // Handle token refresh failure
          // This might happen if the refresh token is invalid or expired
          // In that case, we should log the user out
          processQueue(new Error('Token refresh failed'));
          window.dispatchEvent(new CustomEvent('auth:sessionExpired'));
          return Promise.reject(error);
        }
      } catch (refreshError) {
        processQueue(refreshError);
        // If refresh token fails, dispatch session expired event
        window.dispatchEvent(new CustomEvent('auth:sessionExpired'));
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

// Authentication services
export const authService = {
  // Login with email and password
  login: async (email, password) => {
    try {
      // Credentials are included automatically because withCredentials: true
      const response = await api.post("/auth/login", { email, password });

      // We no longer store the token in localStorage as it comes in as httpOnly cookie
      // Instead we just store user info for UI purposes
      if (response.data && response.data.user) {
        localStorage.setItem("userInfo", JSON.stringify(response.data.user));
      } else if (response.data) {
        console.warn("Login successful but user data not received:", response.data);
      }
      return response.data;
    } catch (error) {
      localStorage.removeItem("userInfo");
      const errorMessage = error.response?.data?.message || error.message || "Login failed. Please try again.";
      console.error("Login error:", errorMessage);
      throw { message: errorMessage, originalError: error };
    }
  },

  register: async (userData) => {
    try {
      // Auth endpoints are mounted at root in the backend
      const response = await api.post("/auth/register", userData);
      // Only store user info (not tokens) for UI purposes
      if (response.data && response.data.user) {
        localStorage.setItem("userInfo", JSON.stringify(response.data.user));
      }
      return response.data;
    } catch (error) {
      localStorage.removeItem("userInfo");
      const errorMessage = error.response?.data?.message || error.message || "Registration failed. Please try again.";
      console.error("Registration error:", errorMessage);
      throw { message: errorMessage, originalError: error };
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
      // We still need to clean up the user info from localStorage
      localStorage.removeItem("userInfo");
      return res;
    } catch (error) {
      // Even on API error, we should remove the user from localStorage
      localStorage.removeItem("userInfo");
      const errorMessage = error.response?.data?.message || error.message || "Logout failed, but session cleared locally.";
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
      // First check if we have basic user info in localStorage
      const userInfo = localStorage.getItem("userInfo");
      
      // Then verify with the server that the session is still valid
      // This will work because httpOnly cookies are sent automatically
      const response = await api.get("/auth/me");
      
      if (response.data && response.data.user) {
        // Update the stored user info with the latest from the server
        localStorage.setItem("userInfo", JSON.stringify(response.data.user));
        return {
          user: response.data.user,
          isAuthenticated: true
        };
      }
      
      // If server says we're not authenticated, clean up localStorage
      localStorage.removeItem("userInfo");
      return null;
    } catch (error) {
      // If there's an error (like 401 Unauthorized), clean up localStorage
      localStorage.removeItem("userInfo");
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
