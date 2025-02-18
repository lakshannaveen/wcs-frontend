import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import './AdminMap.css';

const icons = {
  'one-time': new L.DivIcon({
    className: 'circle-icon blue',  
    iconSize: [30, 30],
  }),
  'daily': new L.DivIcon({
    className: 'circle-icon orange',  
    iconSize: [30, 30],
  }),
  'weekly': new L.DivIcon({
    className: 'circle-icon green',  
    iconSize: [30, 30],
  }),
  'monthly': new L.DivIcon({
    className: 'circle-icon purple',  
    iconSize: [30, 30],
  }),
};

const defaultIcon = new L.DivIcon({
  className: 'circle-icon blue',  
  iconSize: [30, 30],
});

const AdminMap = () => {
  const [checkouts, setCheckouts] = useState([]);
  const [subscriptionCounts, setSubscriptionCounts] = useState({
    'one-time': 0,
    daily: 0,
    weekly: 0,
    monthly: 0,
  });
  const [collectedStatus, setCollectedStatus] = useState({});
  const [showCollected, setShowCollected] = useState(false);  // Show collected markers by default

  useEffect(() => {
    fetchCheckouts();
  }, []);

  const fetchCheckouts = async () => {
    try {
      const response = await fetch('http://localhost:5002/api/checkout/checkouts');
      const data = await response.json();

      const counts = {
        'one-time': 0,
        daily: 0,
        weekly: 0,
        monthly: 0,
      };

      data.forEach((checkout) => {
        const subscriptionType = checkout.subscription_type?.trim();
        if (counts[subscriptionType] !== undefined) {
          counts[subscriptionType]++;
        }
      });

      setCheckouts(data);
      setSubscriptionCounts(counts);
      setCollectedStatus(data.reduce((acc, curr) => {
        acc[curr.checkout_id] = curr.collected || false;
        return acc;
      }, {}));
    } catch (error) {
      console.error('Error fetching checkouts:', error);
    }
  };

  const handleCollectedChange = async (checkoutId, collected) => {
    try {
      const response = await fetch(`http://localhost:5002/api/checkout/${checkoutId}/collected`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ collected }),
      });

      const result = await response.json();

      if (response.ok) {
        setCollectedStatus((prevState) => ({
          ...prevState,
          [checkoutId]: collected,
        }));
      } else {
        console.error(result.message);
      }
    } catch (error) {
      console.error('Error updating collected status:', error);
    }
  };

  // Toggle visibility of collected markers
  const toggleCollectedVisibility = () => {
    setShowCollected((prevState) => !prevState);
  };

  return (
    <div className="admin-map-container">
      <h3 className="map-title">Orders Locations</h3>

              <div className="legend">
          <ul>
            <li><span className="legend-icon blue"></span> One-Time ({subscriptionCounts['one-time']})</li>
            <li><span className="legend-icon orange"></span> Daily ({subscriptionCounts.daily})</li>
            <li><span className="legend-icon green"></span> Weekly ({subscriptionCounts.weekly})</li>
            <li><span className="legend-icon purple"></span> Monthly ({subscriptionCounts.monthly})</li>
          </ul>
          <div className="time-legend">
            <ul>
              <li>Morning (9 AM - 12 PM)</li>
              <li>Afternoon (12 PM - 3 PM)</li>
              <li>Evening (3 PM - 6 PM)</li>
            </ul>
          </div>
        </div>



      <MapContainer center={[7.8731, 80.7718]} zoom={7} className="admin-map">
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {checkouts.map((checkout) => {
          const icon = icons[checkout.subscription_type] || defaultIcon;

          // Only render the collected markers if showCollected is true
          if (showCollected || !collectedStatus[checkout.checkout_id]) {
            return (
              <Marker key={checkout.checkout_id} position={[checkout.latitude, checkout.longitude]} icon={icon}>
                <Popup>
                  <table className="popup-table">
                    <tbody>
                      <tr>
                        <td><strong>Checkout ID:</strong></td>
                        <td>{checkout.checkout_id}</td>
                      </tr>
                      <tr>
                        <td><strong>Sender:</strong></td>
                        <td>{checkout.sender_firstname} {checkout.sender_lastname}</td>
                      </tr>
                      <tr>
                        <td><strong>Recipient:</strong></td>
                        <td>{checkout.recipient_firstname} {checkout.recipient_lastname}</td>
                      </tr>
                      <tr>
                        <td><strong>Collection Time:</strong></td>
                        <td>{checkout.collection_time}</td>
                      </tr>
                      <tr>
                        <td><strong>Subscription Type:</strong></td>
                        <td>{checkout.subscription_type}</td>
                      </tr>
                      {checkout.subscription_type !== 'one-time' && (
                          <tr>
                            <td><strong>Expire Date:</strong></td>
                            <td>{checkout.expire_date ? new Date(checkout.expire_date).toLocaleDateString('en-GB') : 'N/A'}</td>
                          </tr>
                        )}
                      <tr>
                        <td><strong>House No:</strong></td>
                        <td>{checkout.house_number}</td>
                      </tr>
                      <tr>
                        <td><strong>Street Name:</strong></td>
                        <td>{checkout.street_name}</td>
                      </tr>
                      <tr>
                        <td><strong>Collected:</strong></td>
                        <td>
                          <input
                            type="checkbox"
                            checked={collectedStatus[checkout.checkout_id] || false}
                            onChange={(e) => handleCollectedChange(checkout.checkout_id, e.target.checked)}
                          />
                        </td>
                      </tr>
                      <tr>
                        <td colSpan="2" className="popup-footer">
                          <a
                            href={`https://www.google.com/maps?q=${checkout.latitude},${checkout.longitude}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="view-google-map-btn"
                          >
                            View Location
                          </a>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </Popup>
              </Marker>
            );
          }
          return null;  // Don't render collected markers if they should be hidden
        })}
      </MapContainer>

      <button onClick={toggleCollectedVisibility} className="toggle-collected-btn">
        {showCollected ? 'Hide Collected orders' : 'Unhide Collected orders'}
      </button>
    </div>
  );
};

export default AdminMap;
