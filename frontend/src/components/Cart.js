// src/components/Cart.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Cart.css';

const Cart = ({ cart, clearCart }) => {
  const navigate = useNavigate();

  const handleCheckout = () => {
    navigate('/checkout');
  }

  return (
    <div className="page-container">
      <div className="content">
        <h2>Your Cart</h2>
        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <div>
            <ul>
              {cart.map((item, index) => (
                <li key={index}>
                  {item.name} - ${item.price}
                </li>
              ))}
            </ul>
            <button onClick={handleCheckout} className="checkout-button">
              Proceed to Checkout
            </button>
            <button onClick={clearCart} style={{ marginLeft: '1rem' }}>
              Clear Cart
            </button>
          </div>
        )}
      </div>
    </div>
  )
};

export default Cart;