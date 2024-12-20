// src/pages/Home.js
import React from 'react';
import Hero from '../components/Hero';
import ProductList from '../components/ProductList';

const Home = ({ addToCart }) => {
  return (
    <>
      <Hero />
      <div className="container">
        <h2>Our Products</h2>
        <ProductList addToCart={addToCart} />
      </div>
    </>
  );
};

export default Home;
