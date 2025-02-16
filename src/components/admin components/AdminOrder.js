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

  const cancelOrder = async (id) => {
    try {
      const response = await fetch(`http://localhost:5002/api/checkout/cancel/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        // Filter out the canceled order from the state
        setCheckouts(checkouts.filter(checkout => checkout.id !== id));
        alert('Order canceled successfully');
      } else {
        alert('Error canceling order');
      }
    } catch (error) {
      console.error('Error canceling order:', error);
      alert('Error canceling order');
    }
  };

  const openLocationInMap = (latitude, longitude) => {
    // Construct Google Maps URL to open the location
    const googleMapUrl = `https://www.google.com/maps?q=${latitude},${longitude}`;
    window.open(googleMapUrl, '_blank'); // Open Google Maps in a new tab
  };

  return (
    <div className="admin-orders-container">
      <h1 className="admin-orders-title">Welcome to Admin Orders</h1>

      {/* Table to display checkout records */}
      <table className="admin-orders-table">
        <thead>
          <tr>
            <th>Checkout ID</th>
            <th>User ID</th>
            <th>Sender Email</th> {/* Updated to show Sender Email */}
            <th>Sender Name</th>
            <th>Recipient Name</th>
            <th>Collection Time</th>
            <th>Subscription Type</th>
            <th>Actions</th> {/* Actions column */}
            <th>Location</th> {/* New column for location button */}
          </tr>
        </thead>
        <tbody>
          {checkouts.length > 0 ? (
            checkouts.map((checkout) => (
              <tr key={checkout.id}>
                <td>{checkout.id}</td>
                <td>{checkout.user_id}</td>
                <td>{checkout.sender_email}</td> {/* Display Sender Email */}
                <td>{checkout.sender_firstname} {checkout.sender_lastname}</td>
                <td>{checkout.recipient_firstname} {checkout.recipient_lastname}</td>
                <td>{checkout.collection_time}</td>
                <td>{checkout.subscription_type || 'N/A'}</td>
                <td>
                  <button onClick={() => cancelOrder(checkout.id)} className="cancel-btn">Cancel Order</button>
                </td>
                <td>
                  {/* Location button to open Google Maps */}
                  {checkout.latitude && checkout.longitude && (
                    <button 
                      onClick={() => openLocationInMap(checkout.latitude, checkout.longitude)} 
                      className="location-btn"
                    >
                      View Location
                    </button>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="9">No orders found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminOrders;
