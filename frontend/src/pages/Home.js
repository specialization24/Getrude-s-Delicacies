// src/pages/Home.js
import React from 'react';
import Hero from '../components/Hero';
import Testimonials from '../components/Testimonials';

const Home = ({ addToCart }) => {
  
  return (
    <>
      <Hero />
      <Testimonials />
    </>
  );
};

export default Home;
