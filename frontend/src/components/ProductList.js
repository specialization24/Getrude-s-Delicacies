import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from './ProductCard';
import './ProductList.css';
import debounce from 'lodash.debounce';
import { ClipLoader } from 'react-spinners';

const ProductList = ({ addToCart }) => {
  const [products, setProducts] = useState([]);
  const [categories] = useState(['All', 'Snacks', 'Drinks', 'Light Meals', 'Desserts']);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch products function
  const fetchProducts = async (category, search) => {
    setLoading(true);
    setError(null); // Reset error before fetching
    try {
      const response = await axios.get('/api/products', {
        params: {
          category: category === 'All' ? '' : category,
          search,
        },
      });
      setProducts(response.data);
    } catch (error) {
      setError('Failed to load products. Please try again later.');
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Debounce the fetchProducts function directly within useEffect
    const debouncedFetchProducts = debounce(() => {
      fetchProducts(selectedCategory, searchTerm);
    }, 500);

    debouncedFetchProducts();

    // Cleanup function to cancel the debounced call if the component unmounts or dependencies change
    return () => debouncedFetchProducts.cancel();
  }, [selectedCategory, searchTerm]);

  return (
    <div className="page-container">
      <div className="product-list-container">
        <h2>Products</h2>
        <div className="controls">
          <div className="category-filter">
            <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        {loading ? (
          <div className="loader-container">
            <ClipLoader color="'3498db" size={50} />
          </div>
        ) : error ? (
          <p>{error}</p>
        ) : (
          <div className="product-grid">
            {products.length > 0 ? (
              products.map((product) => (
                <ProductCard key={product._id} product={product} addToCart={addToCart} />
              ))
            ) : (
              <p>No products found matching "{searchTerm}" in the "{selectedCategory}" category.</p>
            )}
          </div>
        )}
      </div>
      </div>
  );
};

export default ProductList;
