import React from "react";
import { useAuth } from "../context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoute() {
  const { user, isAuthenticated, logout, isLoading } = useAuth();
  if (isLoading) {
    return <div>Loading...</div>;
  }
  return isAuthenticated ? <Outlet /> : <Navigate to="/sign-in" />;
}

export default ProtectedRoute;
