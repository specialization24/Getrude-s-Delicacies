// src/components/CheckoutForm.js
import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';
import './CheckoutForm.css';

const CheckoutForm = ({ amount }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        'http://localhost:5000/api/payments/create-payment-intent',
        { amount },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const clientSecret = response.data.clientSecret;

      const cardElement = elements.getElement(CardElement);

      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
        },
      });

      if (error) {
        setError(`Payment failed: ${error.message}`);
      } else if (paymentIntent.status === 'succeeded') {
        setSuccess(true);
      }
    } catch (err) {
      setError('Something went wrong');
    }

    setProcessing(false);
  };

  return (
    <div className="checkout-form">
      <h2>Complete Payment</h2>
      <form onSubmit={handleSubmit}>
        <CardElement />
        <button type="submit" disabled={!stripe || processing || success}>
          {processing ? 'Processing...' : 'Pay'}
        </button>
      </form>
      {error && <p className="error">{error}</p>}
      {success && <p className="success">Payment successful!</p>}
    </div>
  );
};

export default CheckoutForm;
