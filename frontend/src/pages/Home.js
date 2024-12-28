// src/pages/Home.js
import React from 'react';
import Hero from '../components/Hero';
import FeaturedProducts from '../components/FeaturedProducts';
import Testimonials from '../components/Testimonials';

const Home = ({ addToCart }) => {
  return (
    <>
      <Hero />
      <FeaturedProducts addToCart={addToCart} />
      <Testimonials />
    </>
  );
};

export default Home;
