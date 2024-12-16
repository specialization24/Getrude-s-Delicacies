// src/pages/Checkout.js
import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from '../components/CheckoutForm';

const stripePromise = loadStripe('your_stripe_publishable_key_here');

const Checkout = ({ cart, clearCart }) => {
  const cartTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm amount={cartTotal} cartItems={cart} clearCart={clearCart} />
    </Elements>
  );
};

export default Checkout;
