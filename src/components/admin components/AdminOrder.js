import React, { useEffect, useState } from 'react';
import './AdminOrder.css';

const AdminOrders = () => {
  const [checkouts, setCheckouts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredCheckout, setFilteredCheckout] = useState(null);
  
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
  
  const cancelOrder = async (orderId) => {
    const confirmCancel = window.confirm("Are you sure you want to cancel this order?");
    if (!confirmCancel) return;
  
    try {
      const response = await fetch(`http://localhost:5002/api/checkout/cancel/${orderId}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setCheckouts(checkouts.filter(checkout => checkout.checkout_id !== orderId));
        alert('Order canceled successfully');
      } else {
        alert('Error canceling order');
      }
    } catch (error) {
      console.error('Error canceling order:', error);
      alert('Error canceling order');
    }
  };
  const handleSearch = () => {
    if (searchQuery.trim() === '') {
      setFilteredCheckout(null);
      return;
    }
    
    const result = checkouts.find((checkout) => checkout.checkout_id.toString() === searchQuery.trim());
    setFilteredCheckout(result || null);
  };

  
  const openLocationInMap = (latitude, longitude) => {
    const googleMapUrl = `https://www.google.com/maps?q=${latitude},${longitude}`;
    window.open(googleMapUrl, '_blank');
  };
  
  const filterCheckoutsByType = (type) => {
    return checkouts.filter((checkout) => checkout.subscription_type === type);
  };
  
  const formatSelectedDates = (selectedDates) => {
    if (selectedDates && selectedDates.length > 0) {
      return selectedDates.map(date => {
        const formattedDate = new Date(date);
        return formattedDate.toISOString().split('T')[0];
      }).join(', ');
    }
    return 'N/A';
  };
  
  const formatSelectedDays = (selectedDays) => {
    if (selectedDays && selectedDays.length > 0) {
      return selectedDays.join(', ');
    }
    return 'N/A';
  };
  
  const getRowBackgroundColor = (collectionTime) => {
    if (collectionTime) {
      const time = collectionTime.toLowerCase();
      if (time.includes('morning')) {
        return '#d4edda';
      }
      if (time.includes('afternoon')) {
        return '#f8d7da';
      }
      if (time.includes('evening')) {
        return '#fff3cd';
      }
    }
    return 'transparent';
  };
  
  const renderSubscriptionTable = (type) => {
    const filteredCheckouts = filterCheckoutsByType(type);

    // Filter out expired subscriptions
    const activeCheckouts = filteredCheckouts.filter((checkout) => {
      if (type !== 'one-time' && checkout.expire_date) {
        const currentDate = new Date();
        const expirationDate = new Date(checkout.expire_date);
        return expirationDate >= currentDate; // Only include active subscriptions
      }
      return true; // Include 'one-time' subscriptions regardless of the expiration date
    });

    if (activeCheckouts.length === 0) return null;

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
              {type === 'monthly' && <th>Selected Dates</th>}
              {type === 'weekly' && <th>Selected Days</th>}
              {type !== 'one-time' && <th>Expiration Date</th>} {/* Only show for non 'one-time' subscriptions */}
              <th>Actions</th>
              <th>Location</th>
            </tr>
          </thead>
          <tbody>
            {activeCheckouts.map((checkout) => (
              <tr key={checkout.checkout_id} style={{ backgroundColor: getRowBackgroundColor(checkout.collection_time) }}>
                <td>{checkout.checkout_id}</td>
                <td>{checkout.user_id}</td>
                <td>{checkout.sender_firstname} {checkout.sender_lastname}</td>
                <td>{checkout.recipient_firstname} {checkout.recipient_lastname}</td>
                <td>{checkout.collection_time}</td>
                {type === 'monthly' && <td>{formatSelectedDates(checkout.selected_dates)}</td>}
                {type === 'weekly' && <td>{formatSelectedDays(checkout.selected_days)}</td>}
                {type !== 'one-time' && <td>{checkout.expire_date ? new Date(checkout.expire_date).toLocaleDateString() : 'N/A'}</td>}
                <td>
                  <button onClick={() => cancelOrder(checkout.checkout_id)} className="cancel-btn">Cancel Order</button>
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
      <div className="search-bar">
        <input
          type="text"
          placeholder="Enter Checkout ID"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button className="search" onClick={handleSearch}>Search</button>
      </div>
  
      {filteredCheckout ? (
        <div>
          <h2>Search Order Details</h2>
          <table className="admin-orders-table">
            <thead>
              <tr>
                <th>Checkout ID</th>
                <th>User ID</th>
                <th>Sender Name</th>
                <th>Recipient Name</th>
                <th>Collection Time</th>
                <th>Subscription Type</th>
                <th>Expiration Date</th>
                <th>Actions</th>
                <th>Location</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{filteredCheckout.checkout_id}</td>
                <td>{filteredCheckout.user_id}</td>
                <td>{filteredCheckout.sender_firstname} {filteredCheckout.sender_lastname}</td>
                <td>{filteredCheckout.recipient_firstname} {filteredCheckout.recipient_lastname}</td>
                <td>{filteredCheckout.collection_time}</td>
                <td>{filteredCheckout.subscription_type}</td>
                <td>{filteredCheckout.expire_date ? new Date(filteredCheckout.expire_date).toLocaleDateString() : 'N/A'}</td>
                <td>
                  <button onClick={() => cancelOrder(filteredCheckout.checkout_id)} className="cancel-btn">Cancel Order</button>
                </td>
                <td>
                  {filteredCheckout.latitude && filteredCheckout.longitude && (
                    <button 
                      onClick={() => openLocationInMap(filteredCheckout.latitude, filteredCheckout.longitude)} 
                      className="location-btn"
                    >
                      View Location
                    </button>
                  )}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      ) : (
        searchQuery && <p className="not-found-message">No order found with this Checkout ID.</p>
      )}
  
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
  
      {renderSubscriptionTable('daily')}
      {renderSubscriptionTable('weekly')}
      {renderSubscriptionTable('monthly')}
      {renderSubscriptionTable('one-time')}
    </div>
  );
  
};

export default AdminOrders;
