// src/components/AdminRoute.js
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const AdminRoute = () => {
  const token = localStorage.getItem('token');

  // Redirect to login if no token exists
  if (!token) {
    return <Navigate to="/login" />;
  }

  try {
    // Decode the token to check if the user is an admin
    const decoded = JSON.parse(atob(token.split('.')[1]));
    if (!decoded.isAdmin) {
      return <Navigate to="/" />;
    }
  } catch (err) {
    console.error('Error decoding token:', err);
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};

export default AdminRoute;
