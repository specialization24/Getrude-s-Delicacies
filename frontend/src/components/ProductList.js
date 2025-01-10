import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from './ProductCard';
import './ProductList.css';
import debounce from 'lodash.debounce';
import { ClipLoader } from 'react-spinners';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProductList = ({ addToCart }) => {
  const [products, setProducts] = useState([]);
  const [categories] = useState(['All', 'Snacks', 'Drinks', 'Light Meals', 'Desserts']);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchProducts = async (category, search, page = 1) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get('/api/products', {
        params: {
          category: category === 'All' ? '' : category,
          search,
          page,
          limit: 8,
        },
      });
      setProducts(response.data.products);
      setTotalPages(response.data.totalPages);
      setCurrentPage(response.data.currentPage);
    } catch (error) {
      setError('Failed to load products. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const debouncedFetchProducts = debounce(() => {
      fetchProducts(selectedCategory, searchTerm, currentPage);
    }, 500);

    debouncedFetchProducts();

    return () => debouncedFetchProducts.cancel();
  }, [selectedCategory, searchTerm, currentPage]);

  const handleAddToCart = (product) => {
    addToCart(product);
    toast.success(`${product.name} added to cart!`);
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

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
          <p className="error-message">{error}</p>
        ) : (
          <>
            <div className="product-grid">
              {products.length > 0 ? (
                products.map((product) => (
                  <ProductCard key={product._id} product={product} addToCart={() => handleAddToCart(product)} />
                ))
              ) : (
                <p>No products found matching "{searchTerm}" in the "{selectedCategory}" category.</p>
              )}
            </div>
            {products.length > 0 && (
              <div className="pagination">
                <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
                  Previous
                </button>
                <span>
                  Page {currentPage} of {totalPages}
                </span>
                <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ProductList;
