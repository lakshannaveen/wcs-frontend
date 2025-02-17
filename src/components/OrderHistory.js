import React, { useEffect, useState } from 'react';
import './OrderHistory.css';

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [orderToCancel, setOrderToCancel] = useState(null);

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

  const handleCancelClick = (order) => {
    setOrderToCancel(order);
    setShowConfirmation(true);
  };

  const cancelOrder = async () => {
    if (orderToCancel) {
      const confirmCancel = window.confirm("You will not receive your money back if the order has been collected at least once.");

      if (!confirmCancel) return;
      
      try {
        const response = await fetch(`http://localhost:5002/api/checkout/cancel/${orderToCancel.checkout_id}`, {
          method: 'DELETE',
        });
        if (response.ok) {
          setOrders(orders.filter(order => order.checkout_id !== orderToCancel.checkout_id)); 
          alert('Order canceled successfully');
        } else {
          alert('Error canceling order');
        }
      } catch (error) {
        console.error('Error canceling order:', error);
        alert('Error canceling order');
      }
    }
    setShowConfirmation(false);
    setOrderToCancel(null);
  };
  

  const cancelCancellation = () => {
    setShowConfirmation(false);
    setOrderToCancel(null);
  };

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
              <th>Selected Date</th>
              <th>Selected Days</th>
              <th>House Number</th>
              <th>Street Name</th>
              <th>Action</th>
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
                <td>{order.selected_dates && order.selected_dates.length > 0 ? order.selected_dates[0] : 'N/A'}</td> 
                <td>{order.selected_days ? order.selected_days.join(', ') : 'N/A'}</td>
                <td>{order.house_number}</td>
                <td>{order.street_name}</td>
                <td>
                  <button
                    className="cancel-btn"
                    onClick={() => handleCancelClick(order)}
                  >
                    Cancel
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No orders found</p>
      )}

      {showConfirmation && (
        <div className="confirmation-overlay">
          <div className="confirmation-box">
            <p>Are you sure you want to cancel this order?</p>
            <button className="confirm-btn" onClick={cancelOrder}>Yes</button>
            <button className="no-btn" onClick={cancelCancellation}>No</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderHistory;
