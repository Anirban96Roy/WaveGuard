import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user || !allowedRoles.includes(user.role)) {
    // Redirect to login if user is not logged in or doesn't have the correct role
    return <Navigate to="/login" replace />;
  }

  // Render the child components if authentication and role check pass
  return children;
};

export default ProtectedRoute;
