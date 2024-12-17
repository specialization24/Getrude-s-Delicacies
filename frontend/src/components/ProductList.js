// src/components/ProductList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from './ProductCard';
import './ProductList.css';

const ProductList = ({ addToCart }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/products');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return loading ? (
    <p>Loading products...</p> // Show loading message while products are being fetched
  ) : (
    <div className="product-grid">
      {products.map(product => (
        <ProductCard key={product._id} product={product} addToCart={addToCart} />
      ))}
    </div>
  );

};

export default ProductList;
