// src/components/Hero.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Hero.css';

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1>Welcome to Getrude's Delicacies</h1>
        <p>Delicious snacks and light meals delivered to your door.</p>
        <Link to="/products" className="hero-button">
          Shop Now
        </Link>
      </div>
    </section>
  );
};

export default Hero;
