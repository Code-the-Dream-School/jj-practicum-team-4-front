import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";
import { authService } from "../services/api";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

function ProtectedRoute() {
  const { isAuthenticated, isLoading } = useAuth();
  const [validatingToken, setValidatingToken] = useState(false);
  const [validationError, setValidationError] = useState(null);
  
  // Extra validation to ensure token is still valid on protected routes
  useEffect(() => {
    if (isAuthenticated && !isLoading) {
      // Verify token validity with backend on route access
      const validateToken = async () => {
        setValidatingToken(true);
        try {
          await authService.checkAuth();
          setValidatingToken(false);
        } catch (error) {
          console.error("Token validation failed:", error);
          setValidationError("Your session is invalid or expired. Please login again.");
          setValidatingToken(false);
          // Will redirect to login on next render
        }
      };
      
      validateToken();
    }
  }, [isAuthenticated, isLoading]);

  // Show loading while authentication state is being determined
  if (isLoading || validatingToken) {
    return (
      <Box 
        sx={{ 
          display: 'flex', 
          flexDirection: 'column',
          justifyContent: 'center', 
          alignItems: 'center', 
          height: '100vh' 
        }}
      >
        <CircularProgress size={50} />
        <Typography variant="h6" sx={{ mt: 2 }}>
          Verifying your session...
        </Typography>
      </Box>
    );
  }
  
  // If token validation failed, or user is not authenticated, redirect to sign-in
  if (!isAuthenticated || validationError) {
    return <Navigate to="/sign-in" state={{ message: validationError }} replace />;
  }
  
  // User is authenticated and token is validated
  return <Outlet />;
}

export default ProtectedRoute;
