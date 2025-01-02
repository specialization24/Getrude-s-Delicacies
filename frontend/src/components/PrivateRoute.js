// src/components/PrivateRoute.js
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token'); // Checks if user is logged in
  const location = useLocation(); // Gets current location

  // If there's no token, redirect to the login page
  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return children;
};

export default PrivateRoute;
