// src/components/CheckoutForm.js
import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import './CheckoutForm.css';

const CheckoutForm = ({ amount, cartItems, clearCart }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);
    setError(null);
    setSuccess(false);

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        'http://localhost:5000/api/payments/create-payment-intent',
        { amount, cartItems },
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
        toast.error(`Payment failed: ${error.message}`);
      } else if (paymentIntent.status === 'succeeded') {
        setSuccess(true);
        toast.success('Payment successful!');
        clearCart();
        navigate('/order-history');
      }
    } catch (err) {
      setError('Something went wrong');
      toast.error('Something went wrong. Please try again.');
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
