import axios from "axios";

const baseUrl = import.meta.env.VITE_API_URL;
// note: not used, but could be used with GET with params
const getData = async (url, data, config = {}) => {
  try {
    let res = await axios.get(url, data, {
      ...config,
      withCredentials: true,
    });

    // let data = await res.data;
    // return data;
    return res.data;
  } catch (error) {
    console.log(error, `error - getData in ${url} route`);
    throw error;
  }
};

const getAllData = async (url) => {
  try {
    const token = localStorage.getItem("token");

    let res = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    let data = await res.data;
    return data;
  } catch (error) {
    console.log(error, `error - getAllData in ${url} route`);
    throw error;
  }
};

const postData = async (url, data, config = {}) => {
  try {
    const res = await axios.post(url, data, {
      ...config,
      withCredentials: true,
    });
    return res.data;
  } catch (error) {
    console.log(error, `error - postData in ${url} route`);
    throw error;
  }
};

const patchData = async (url, data, config = {}) => {
  try {
    let res = await axios.patch(url, data, {
      ...config,
      withCredentials: true,
    });
    return res.data;
  } catch (error) {
    console.log(error, `error - patchData in ${url} route`);
    throw error;
  }
};

const putData = async (url, data, config = {}) => {
  try {
    const res = await axios.put(url, data, {
      ...config,
      withCredentials: true,
    });
    return res.data;
  } catch (error) {
    console.log(error, `error - putData in ${url} route`);
    throw error;
  }
};

const deleteData = async (url, config = {}) => {
  try {
    const res = await axios.delete(url, {
      ...config,
      withCredentials: true,
    });
    return res.data;
  } catch (error) {
    console.log(error, `error - deleteData in ${url} route`);
    throw error;
  }
};

const isEmpty = (value) => {
  return (
    value === null ||
    value === undefined ||
    (typeof value === "string" && value.trim() === "")
  );
};

/**
 * Utilities to validate JWT token payload structure
 */

/**
 * Validates that a decoded JWT token has all required fields
 * @param {Object} decodedToken - The decoded JWT token
 * @returns {Object} - Validation result with isValid flag and error message
 */
const validateTokenPayload = (decodedToken) => {
  // Required fields that must be present in a valid JWT
  const requiredFields = ["exp", "iat", "sub"];
  const missingFields = [];

  // Check for missing required fields
  requiredFields.forEach((field) => {
    if (!decodedToken || decodedToken[field] === undefined) {
      missingFields.push(field);
    }
  });

  if (missingFields.length > 0) {
    return {
      isValid: false,
      error: `Invalid token: missing fields: ${missingFields.join(", ")}`,
    };
  }

  // Check if token has expired
  const currentTime = Math.floor(Date.now() / 1000);
  if (decodedToken.exp && decodedToken.exp < currentTime) {
    return {
      isValid: false,
      error: "Token has expired",
    };
  }

  // Token is valid
  return {
    isValid: true,
    error: null,
  };
};

/**
 * Validates token claims for specific roles or permissions
 * @param {Object} decodedToken - The decoded JWT token
 * @param {Array} requiredRoles - Array of roles that grant access
 * @returns {boolean} - Whether the token has the required roles
 */
const validateTokenRoles = (decodedToken, requiredRoles = []) => {
  // If no specific roles required, return true
  if (!requiredRoles || requiredRoles.length === 0) {
    return true;
  }

  // Check if token has roles field
  if (
    !decodedToken ||
    !decodedToken.roles ||
    !Array.isArray(decodedToken.roles)
  ) {
    return false;
  }

  // Check if any required role matches
  return requiredRoles.some((role) => decodedToken.roles.includes(role));
};

export {
  getData,
  getAllData,
  postData,
  patchData,
  putData,
  deleteData,
  isEmpty,
  validateTokenPayload,
  validateTokenRoles,
};
