import React, { useState, useEffect } from 'react';
import axios from 'axios';
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

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('/api/products');
      setProducts(response.data.products);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/products', newProduct, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      console.log('Product added:', response.data);
      setNewProduct({ name: '', description: '', price: '', imageUrl: '', category: '' });
      fetchProducts();
    } catch (error) {
      console.error('Error adding product:', error.response?.data || error.message);
    }
  };

  const handleDeleteProduct = async (id) => {
    try {
      await axios.delete(`/api/products/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      fetchProducts();
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  return (
    <div className="admin-dashboard">
      <h2>Admin Dashboard</h2>

      {/* Add Product Form */}
      <form onSubmit={handleAddProduct}>
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
        <button type="submit">Add Product</button>
      </form>

      {/* Product List */}
      <div className="product-list">
        {products.map((product) => (
          <div key={product._id} className="product-item">
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p>${product.price}</p>
            <button onClick={() => handleDeleteProduct(product._id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
