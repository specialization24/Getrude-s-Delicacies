// src/components/Navbar.js
import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const isLoggedIn = localStorage.getItem('token');

  return (
    <nav>
      <h1>Getrude's Delicacies</h1>
      <div>
        {/* Use NavLink for active link highlighting */}
        <NavLink to="/" className={({ isActive }) => (isActive ? 'active-link' : '')} >Home</NavLink>
        
        {isLoggedIn ? (
          <>
            <NavLink to="/cart" className={({ isActive }) => (isActive ? 'active-link' : '')} >Cart</NavLink>
            <button onClick={handleLogout} className="logout-button">
              Logout
            </button>
          </>
        ) : (
          <>
            <NavLink to="/login" className={({ isActive }) => (isActive ? 'active-link' : '')} >Login</NavLink>
            <NavLink to="/signup" className={({ isActive }) => (isActive ? 'active-link' : '')} >Signup</NavLink>
            <NavLink to="/order-history" className={({ isActive }) => (isActive ? 'active-link' : '')} >Order History</NavLink>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

