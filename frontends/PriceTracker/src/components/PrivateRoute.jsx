import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children, role }) => {
  const token = localStorage.getItem("token");
  const storedUser = JSON.parse(localStorage.getItem("user"));

  if (!token) return <Navigate to="/login" />;

  if (role && storedUser?.role !== role) {
    return <Navigate to="/dashboard" />; // not authorized
  }

  return children;
};

export default PrivateRoute;
