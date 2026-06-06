// src/components/ProtectedRoute.jsx
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ allowedRoles }) => {
  const { user } = useAuth();
console.log(user);

  // 1. Not logged in? Kick to login screen.
  if (!user) {
    return <Navigate to="/" replace />;
  }

  // 2. Logged in, but wrong role? Kick to dashboard.
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    // Optional: You could redirect to a dedicated "403 Unauthorized" page here
    return <Navigate to="/dashboard" replace />;
  }

  // 3. Authorized! Render the page.
  return <Outlet />;
};

export default ProtectedRoute;