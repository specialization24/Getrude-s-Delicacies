import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("token");

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      {/* Brand Name */}
      <a href="/" className="navbar-brand">
        Getrude's Delicacies
      </a>

      {/* Hamburger Button */}
      <button className="navbar-toggle" onClick={toggleMenu} aria-label="Toggle menu">
        ☰
      </button>

      {/* Menu Links */}
      <div className={`navbar-menu ${isMenuOpen ? "active" : ""}`}>
        <NavLink to="/" className={({ isActive }) => (isActive ? "active-link navbar-item" : "navbar-item")}>
          Home
        </NavLink>
        {isLoggedIn ? (
          <>
            <NavLink to="/cart" className={({ isActive }) => (isActive ? "active-link navbar-item" : "navbar-item")}>
              Cart
            </NavLink>
            <NavLink
              to="/order-history"
              className={({ isActive }) => (isActive ? "active-link navbar-item" : "navbar-item")}
            >
              Order History
            </NavLink>
            <button onClick={handleLogout} className="logout-button navbar-item">
              Logout
            </button>
          </>
        ) : (
          <>
            <NavLink to="/login" className={({ isActive }) => (isActive ? "active-link navbar-item" : "navbar-item")}>
              Login
            </NavLink>
            <NavLink to="/signup" className={({ isActive }) => (isActive ? "active-link navbar-item" : "navbar-item")}>
              Signup
            </NavLink>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
