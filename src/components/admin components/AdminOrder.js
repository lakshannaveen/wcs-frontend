import React, { useEffect, useState } from 'react';
import './AdminOrder.css';

const AdminOrders = () => {
  const [checkouts, setCheckouts] = useState([]);

  useEffect(() => {
    const fetchCheckouts = async () => {
      try {
        const response = await fetch('http://localhost:5002/api/checkout/checkouts');
        const data = await response.json();
        setCheckouts(data); // Set the checkout data to state
      } catch (error) {
        console.error('Error fetching checkouts:', error);
      }
    };

    fetchCheckouts();
  }, []);

  return (
    <div className="admin-orders-container">
      <h1 className="admin-orders-title">Welcome to Admin Orders</h1>

      
      {/* Table to display checkout records */}
      <table className="admin-orders-table">
        <thead>
          <tr>
            <th>Checkout ID</th>
            <th>User ID</th>
            <th>Sender Name</th>
            <th>Recipient Name</th>
            <th>Collection Time</th>
            <th>Price</th>
            <th>Subscription Type</th>
          </tr>
        </thead>
        <tbody>
          {checkouts.length > 0 ? (
            checkouts.map((checkout) => (
              <tr key={checkout.id}>
                <td>{checkout.id}</td>
                <td>{checkout.user_id}</td>
                <td>{checkout.sender_firstname} {checkout.sender_lastname}</td>
                <td>{checkout.recipient_firstname} {checkout.recipient_lastname}</td>
                <td>{checkout.collection_time}</td>
                <td>{checkout.price}</td>
                <td>{checkout.subscription_type || 'N/A'}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7">No orders found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminOrders;
