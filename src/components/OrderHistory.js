// In your React component (OrderHistory.js)
import React, { useEffect, useState } from 'react';
import './OrderHistory.css';

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Function to extract the user ID from the JWT token
  const getUserIdFromToken = () => {
    const token = document.cookie.split(';').find(cookie => cookie.trim().startsWith('token='));
    if (token) {
      const tokenValue = token.split('=')[1];
      const decodedToken = JSON.parse(atob(tokenValue.split('.')[1])); // Decode the token
      console.log("Decoded Token:", decodedToken); // Log the decoded token for inspection
      return decodedToken.id;  // Access 'id' instead of 'user_id'
    }
    return null;
  };
  
  
  
  useEffect(() => {
    const fetchOrders = async () => {
      const userId = getUserIdFromToken();
      if (userId) {
        try {
          const response = await fetch(`http://localhost:5002/api/checkout/order-history?user_id=${userId}`);
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const data = await response.json();
          console.log("Fetched orders:", data); // Log the fetched orders
          setOrders(data);
        } catch (err) {
          console.error("Failed to fetch orders", err);
        } finally {
          setLoading(false);
        }
      } else {
        console.error("No user ID found in token");
        setLoading(false);
      }
    };
  
    fetchOrders();
  }, []);
  
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="order-history">
      <h1>Order History</h1>
      {orders.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Checkout ID</th>
              <th>Sender Name</th>
              <th>Recipient Name</th>
              <th>Collection Time</th>
              <th>Subscription Type</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order.checkout_id}>
                <td>{order.checkout_id}</td>
                <td>{order.sender_firstname} {order.sender_lastname}</td>
                <td>{order.recipient_firstname} {order.recipient_lastname}</td>
                <td>{order.collection_time}</td>
                <td>{order.subscription_type}</td>
                <td>{order.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No orders found</p>
      )}
    </div>
  );
};

export default OrderHistory;
