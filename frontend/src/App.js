// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import Login from './pages/Login';
import Signup from './pages/Signup';
import OrderHistory from './pages/OrderHistory';
import PrivateRoute from './components/PrivateRoute';

function App() {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<ProductList addToCart={addToCart} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/cart"
          element={
            <PrivateRoute>
              <Cart cart={cart} />
            </PrivateRoute>
          }
        />
        <Route
          path="/order-history"
          element={
            <PrivateRoute>
              <OrderHistory />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;

