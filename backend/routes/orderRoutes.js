// backend/routes/orderRoutes.js
const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const { authMiddleware } = require('../middleware/authMiddleware');

// Place an order (requires authentication)
router.post('/', authMiddleware, async (req, res) => {
  const { cartItems, totalAmount } = req.body;
  try {
    const order = new Order({
      user: req.user.id,
      cartItems,
      totalAmount,
    });

    await order.save();
    res.status(201).json({ message: 'Order placed successfully', order });
  } catch (err) {
    res.status(500).json({ error: 'Something went wrong' });
  }
});

// Fetch order history for a user
router.get('/my-orders', authMiddleware, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: 'Something went wrong' });
  }
});

module.exports = router;
