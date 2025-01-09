import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ClipLoader } from 'react-spinners';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    price: '',
    imageUrl: '',
    category: '',
  });
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [editing, setEditing] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchProducts();
  }, [page]);

  const fetchProducts = async () => {
    setFetching(true);
    try {
      const response = await axios.get('http://localhost:5000/api/products', {
        params: { page, limit: 8 },
      });
      setProducts(response.data.products);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setFetching(false);
    }
  };

  const handleAddOrUpdateProduct = async (e) => {
    e.preventDefault();
    if (!newProduct.name || !newProduct.price || !newProduct.category) {
      alert('Please fill in all required fields.');
      return;
    }
    setLoading(true);
    try {
      if (editing) {
        // Update existing product
        await axios.put(`http://localhost:5000/api/products/${newProduct._id}`, newProduct, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        alert('Product updated successfully!');
      } else {
        // Add new product
        await axios.post('http://localhost:5000/api/products', newProduct, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        alert('Product added successfully!');
      }
      setNewProduct({ name: '', description: '', price: '', imageUrl: '', category: '' });
      setEditing(false);
      fetchProducts();
    } catch (error) {
      console.error('Error:', error.response ? error.response.data : error.message);
      alert('Failed to save product. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleEditProduct = (id) => {
    const product = products.find((p) => p._id === id);
    setNewProduct(product);
    setEditing(true);
  };

  const handleDeleteProduct = async (id) => {
    setLoading(true);
    try {
      await axios.delete(`http://localhost:5000/api/products/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      alert('Product deleted successfully!');
      fetchProducts();
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('Failed to delete product.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-dashboard">
      <h2>Admin Dashboard</h2>

      {/* Add or Edit Product Form */}
      <form onSubmit={handleAddOrUpdateProduct}>
        <input
          type="text"
          placeholder="Name"
          value={newProduct.name}
          onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
        />
        <textarea
          placeholder="Description"
          value={newProduct.description}
          onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
        />
        <input
          type="number"
          placeholder="Price"
          value={newProduct.price}
          onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
        />
        <input
          type="text"
          placeholder="Image URL"
          value={newProduct.imageUrl}
          onChange={(e) => setNewProduct({ ...newProduct, imageUrl: e.target.value })}
        />
        <select
          value={newProduct.category}
          onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
        >
          <option value="">Select Category</option>
          <option value="Snacks">Snacks</option>
          <option value="Drinks">Drinks</option>
          <option value="Light Meals">Light Meals</option>
          <option value="Desserts">Desserts</option>
        </select>
        <button type="submit" disabled={loading}>
          {loading ? (editing ? 'Updating...' : 'Adding...') : editing ? 'Update Product' : 'Add Product'}
        </button>
      </form>

      {/* Product List */}
      {fetching ? (
        <div className="loader-container">
          <ClipLoader color="#3498db" size={50} />
        </div>
      ) : (
        <div className="product-list">
          {products.map((product) => (
            <div key={product._id} className="product-item">
              <img src={product.imageUrl} alt={product.name} className="product-image" />
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <p>${product.price}</p>
              <div className="action-buttons">
                <button onClick={() => handleEditProduct(product._id)}>Edit</button>
                <button onClick={() => handleDeleteProduct(product._id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="pagination">
          <button onClick={() => setPage(page - 1)} disabled={page === 1}>
            Previous
          </button>
          <span>
            Page {page} of {totalPages}
          </span>
          <button onClick={() => setPage(page + 1)} disabled={page === totalPages}>
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
