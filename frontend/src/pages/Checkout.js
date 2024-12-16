// src/pages/Checkout.js
import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from '../components/CheckoutForm';

const stripePromise = loadStripe('your_stripe_publishable_key_here');

const Checkout = ({ cartTotal }) => {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm amount={cartTotal} />
    </Elements>
  );
};

export default Checkout;
