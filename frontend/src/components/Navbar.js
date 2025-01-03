import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import "./Navbar.css";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("token");
  const token = localStorage.getItem("token")

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
    closeMenu();
  };

  const isAdmin = token ? JSON.parse(atob(token.split(".")[1])).isAdmin : false;

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
        <NavLink to="/" onClick={closeMenu} className={({ isActive }) => (isActive ? "active-link navbar-item" : "navbar-item")}>
          Home
        </NavLink>
        {isAdmin && (
          <NavLink to="/admin" className="navbar-item">
            Admin Dashboard
          </NavLink>
        )}
        {isLoggedIn ? (
          <>
            <NavLink to="/cart" onClick={closeMenu} className={({ isActive }) => (isActive ? "active-link navbar-item" : "navbar-item")}>
              <FaShoppingCart size={20} /> {/* Cart Icon */}
            </NavLink>
            <NavLink
              to="/order-history" onClick={closeMenu}
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
            <NavLink to="/login" onClick={closeMenu} className={({ isActive }) => (isActive ? "active-link navbar-item" : "navbar-item")}>
              Login
            </NavLink>
            <NavLink to="/signup" onClick={closeMenu} className={({ isActive }) => (isActive ? "active-link navbar-item" : "navbar-item")}>
              Signup
            </NavLink>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
