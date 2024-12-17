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
        <NavLink to="/" activeClassName="active-link">Home</NavLink>
        
        {isLoggedIn ? (
          <>
            <NavLink to="/cart" activeClassName="active-link">Cart</NavLink>
            <button onClick={handleLogout} className="logout-button">
              Logout
            </button>
          </>
        ) : (
          <>
            <NavLink to="/login" activeClassName="active-link">Login</NavLink>
            <NavLink to="/signup" activeClassName="active-link">Signup</NavLink>
            <NavLink to="/order-history" activeClassName="active-link">Order History</NavLink>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

