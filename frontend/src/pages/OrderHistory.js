// src/pages/OrderHistory.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './OrderHistory.css';

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/api/orders/my-orders', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setOrders(response.data);
      } catch (err) {
        setError('Failed to fetch order history.');
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="page-container">
      <div className="content">
        <h2>Your Order History</h2>
        {error && <p className="error">{error}</p>}
        {orders.length === 0 ? (
          <p>No orders found.</p>
        ) : (
          <ul>
            {orders.map((order) => (
              <li key={order._id}>
                <h3>Order ID: {order._id}</h3>
                <p>Total Amount: ${order.totalAmount.toFixed(2)}</p>
                <p>Date: {new Date(order.createdAt).toLocaleDateString()}</p>
                <ul>
                  {order.cartItems.map((item, index) => (
                    <li key={index}>
                      {item.name} - ${item.price} x {item.quantity}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default OrderHistory;
