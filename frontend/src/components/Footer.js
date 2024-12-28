import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faTwitter, faInstagram } from "@fortawesome/free-brands-svg-icons";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        {/* Contact Section */}
        <div className="footer-section">
          <h4>Contact Us</h4>
          <p>Email: support@getrudesdelicacies.com</p>
          <p>Phone: +123 456 789</p>
        </div>

        {/* Social Media Section */}
        <div className="footer-section">
          <h4>Follow Us</h4>
          <div className="social-links">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faFacebook} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faTwitter} />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faInstagram} />
            </a>
          </div>
        </div>

        {/* Links Section */}
        <div className="footer-section links">
          <a href="/about">About Us</a>
          <a href="/contact">Contact</a>
          <a href="/privacy-policy">Privacy Policy</a>
        </div>

        {/* Copyright Section */}
        <div className="footer-section copyright">
          <p>&copy; {new Date().getFullYear()} Getrude's Delicacies. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
