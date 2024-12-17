// backend/routes/paymentRoutes.js
const express = require('express');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const authMiddleware = require('../middleware/authMiddleware');
const Order = require('../models/Order');

// Create a payment intent and save the order after payment success
router.post('/create-payment-intent', authMiddleware, async (req, res) => {
  let { amount, cartItems } = req.body;

  try {
    // Log the received amount
    console.log(`Amount received: ${amount}`);

    // Ensure amount is a whole number (integer) in the smallest currency unit
    amount = Math.round(amount * 100);

    console.log(`Amount in cents: ${amount}`);
    
    // Validate minimum amount ($0.50)
    if (amount < 50) {
      return res.status(400).json({ error: 'Minimum amount for payment is $0.50' });
    }

    // Create a Stripe payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: 'usd',
      payment_method_types: ['card'],
    });

    // Save the order in the database
    const order = new Order({
      user: req.user.id,
      cartItems,
      totalAmount: amount / 100,    // Convert back to dollars for storage
    });

    await order.save();

    res.json({ clientSecret: paymentIntent.client_secret, orderId: order._id });
  } catch (err) {
    console.error('Error:', err);
    res.status(500).json({ error: 'Something went wrong with the payment.' });
  }
});

module.exports = router;