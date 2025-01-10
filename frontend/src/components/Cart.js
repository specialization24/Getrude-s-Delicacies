import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Cart.css';

const Cart = ({ cart, clearCart }) => {
  const navigate = useNavigate();

  const handleCheckout = () => {
    navigate('/checkout');
  };

  const calculateTotal = () => cart.reduce((total, item) => total + item.price, 0).toFixed(2);

  return (
    <div className="cart-container">
      <h2>Your Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul>
            {cart.map((item, index) => (
              <li key={index}>
                {item.name} - ${item.price}
              </li>
            ))}
          </ul>
          <div className="cart-summary">
            <h3>Total: ${calculateTotal()}</h3>
            <button onClick={handleCheckout} className="checkout-button">
              Proceed to Checkout
            </button>
            <button onClick={clearCart} className="clear-cart-button">
              Clear Cart
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
