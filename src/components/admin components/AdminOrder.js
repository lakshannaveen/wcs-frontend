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

  // Function to filter checkouts by subscription type
  const filterCheckoutsByType = (type) => {
    return checkouts.filter((checkout) => checkout.subscription_type === type);
  };

  // Format selected dates or days to be shown in the table
  const formatSelectedDates = (selectedDates) => {
    if (selectedDates && selectedDates.length > 0) {
      return selectedDates.map(date => {
        const formattedDate = new Date(date);
        return formattedDate.toISOString().split('T')[0]; // Extracts only the date part (YYYY-MM-DD)
      }).join(', '); // Join dates with commas
    }
    return 'N/A'; // Show N/A if no dates are selected
  };
  
  const formatSelectedDays = (selectedDays) => {
    if (selectedDays && selectedDays.length > 0) {
      return selectedDays.join(', '); // Join days with commas
    }
    return 'N/A'; // Show N/A if no days are selected
  };

  // Function to get background color based on collection time
  const getRowBackgroundColor = (collectionTime) => {
    if (collectionTime) {
      const time = collectionTime.toLowerCase();
      if (time.includes('morning')) {
        return '#d4edda';  // Light green for morning
      }
      if (time.includes('afternoon')) {
        return '#f8d7da';  // Light maroon for afternoon
      }
      if (time.includes('evening')) {
        return '#fff3cd';  // Light orange for evening
      }
    }
    return 'transparent';  // Default if no time found
  };

  // Function to render a table for a specific subscription type
  const renderSubscriptionTable = (type) => {
    const filteredCheckouts = filterCheckoutsByType(type);
    if (filteredCheckouts.length === 0) return null;

    return (
      <div key={type}>
        <h2>{type.charAt(0).toUpperCase() + type.slice(1)} Orders</h2>
        <table className="admin-orders-table">
          <thead>
            <tr>
              <th>Checkout ID</th>
              <th>User ID</th>
              <th>Sender Name</th>
              <th>Recipient Name</th>
              <th>Collection Time</th>
              {type === 'monthly' && <th>Selected Dates</th>} {/* Show Selected Dates for Monthly */}
              {type === 'weekly' && <th>Selected Days</th>} {/* Show Selected Days for Weekly */}
              <th>Actions</th>
              <th>Location</th>
            </tr>
          </thead>
          <tbody>
            {filteredCheckouts.map((checkout) => (
              <tr key={checkout.id} style={{ backgroundColor: getRowBackgroundColor(checkout.collection_time) }}>
                <td>{checkout.id}</td>
                <td>{checkout.user_id}</td>
                <td>{checkout.sender_firstname} {checkout.sender_lastname}</td>
                <td>{checkout.recipient_firstname} {checkout.recipient_lastname}</td>
                <td>{checkout.collection_time}</td>
                {type === 'monthly' && <td>{formatSelectedDates(checkout.selected_dates)}</td>} {/* Show Selected Dates for Monthly */}
                {type === 'weekly' && <td>{formatSelectedDays(checkout.selected_days)}</td>} {/* Show Selected Days for Weekly */}
                <td>
                  <button onClick={() => cancelOrder(checkout.id)} className="cancel-btn">Cancel Order</button>
                </td>
                <td>
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
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="admin-orders-container">
      <h1 className="admin-orders-title">Welcome to Admin Orders</h1>

      {/* Show the separate color-coded indicators for morning, afternoon, and evening */}
      <div className="time-indicator-section">
        <div className="time-indicator">
          <span className="indicator" style={{ backgroundColor: '#d4edda' }}></span>
          <span>Morning (9AM-12PM)</span>
        </div>
        <div className="time-indicator">
          <span className="indicator" style={{ backgroundColor: '#f8d7da' }}></span>
          <span>Afternoon (12PM-3PM)</span>
        </div>
        <div className="time-indicator">
          <span className="indicator" style={{ backgroundColor: '#fff3cd' }}></span>
          <span>Evening (3PM-6PM)</span>
        </div>
      </div>

      {/* Render separate tables for each subscription type */}
      {renderSubscriptionTable('daily')}
      {renderSubscriptionTable('weekly')}
      {renderSubscriptionTable('monthly')}
      {renderSubscriptionTable('one-time')}
    </div>
  );
};

export default AdminOrders;
