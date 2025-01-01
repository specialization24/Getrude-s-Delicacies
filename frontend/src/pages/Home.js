// src/pages/Home.js
import React from 'react';
import Hero from '../components/Hero';
import Testimonials from '../components/Testimonials';
import SlideShowSection from '../components/SlideShowSection';

const Home = ({ addToCart }) => {
  
  return (
    <>
      <Hero />
      <Testimonials />
      <SlideShowSection />
    </>
  );
};

export default Home;
