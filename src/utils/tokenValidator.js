/**
 * Utilities to validate JWT token payload structure
 */

/**
 * Validates that a decoded JWT token has all required fields
 * @param {Object} decodedToken - The decoded JWT token
 * @returns {Object} - Validation result with isValid flag and error message
 */
export const validateTokenPayload = (decodedToken) => {
  // Required fields that must be present in a valid JWT
  const requiredFields = ['exp', 'iat', 'sub'];
  const missingFields = [];

  // Check for missing required fields
  requiredFields.forEach(field => {
    if (!decodedToken || decodedToken[field] === undefined) {
      missingFields.push(field);
    }
  });

  if (missingFields.length > 0) {
    return {
      isValid: false,
      error: `Invalid token: missing fields: ${missingFields.join(', ')}`
    };
  }

  // Check if token has expired
  const currentTime = Math.floor(Date.now() / 1000);
  if (decodedToken.exp && decodedToken.exp < currentTime) {
    return {
      isValid: false,
      error: 'Token has expired'
    };
  }

  // Token is valid
  return {
    isValid: true,
    error: null
  };
};

/**
 * Validates token claims for specific roles or permissions
 * @param {Object} decodedToken - The decoded JWT token
 * @param {Array} requiredRoles - Array of roles that grant access
 * @returns {boolean} - Whether the token has the required roles
 */
export const validateTokenRoles = (decodedToken, requiredRoles = []) => {
  // If no specific roles required, return true
  if (!requiredRoles || requiredRoles.length === 0) {
    return true;
  }

  // Check if token has roles field
  if (!decodedToken || !decodedToken.roles || !Array.isArray(decodedToken.roles)) {
    return false;
  }

  // Check if any required role matches
  return requiredRoles.some(role => decodedToken.roles.includes(role));
};
