// backend/routes/paymentRoutes.js
const express = require('express');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const authMiddleware = require('../middleware/authMiddleware');
const Order = require('../models/Order');

// Create a payment intent and save the order after payment success
router.post('/create-payment-intent', authMiddleware, async (req, res) => {
  const { amount, cartItems } = req.body;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, // Stripe expects the amount in cents
      currency: 'usd',
      payment_method_types: ['card'],
    });

    // Save the order in the database
    const order = new Order({
      user: req.user.id,
      cartItems,
      totalAmount: amount,
    });

    await order.save();

    res.json({ clientSecret: paymentIntent.client_secret, orderId: order._id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Something went wrong with the payment.' });
  }
});

module.exports = router;