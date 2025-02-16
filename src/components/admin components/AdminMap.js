import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import './AdminMap.css';

// Custom circle icons
const icons = {
  'one_time': new L.DivIcon({
    className: 'circle-icon blue',  // Blue Circle for one-time
    iconSize: [30, 30],
  }),
  'daily': new L.DivIcon({
    className: 'circle-icon orange',  // Orange Circle for daily
    iconSize: [30, 30],
  }),
  'weekly': new L.DivIcon({
    className: 'circle-icon green',  // Green Circle for weekly
    iconSize: [30, 30],
  }),
  'monthly': new L.DivIcon({
    className: 'circle-icon purple',  // Purple Circle for monthly
    iconSize: [30, 30],
  }),
};

// Default icon in case the subscription type doesn't match
const defaultIcon = new L.DivIcon({
  className: 'circle-icon blue',  // Default Blue Circle
  iconSize: [30, 30],
});

const AdminMap = () => {
  const [checkouts, setCheckouts] = useState([]);

  useEffect(() => {
    fetchCheckouts();
  }, []);

  const fetchCheckouts = async () => {
    try {
      const response = await fetch('http://localhost:5002/api/checkout/checkouts');
      const data = await response.json();

      // Log the data to check for subscription types
      data.forEach((checkout) => {
        console.log(checkout.subscription_type);  // Log subscription type to verify
      });

      setCheckouts(data);
    } catch (error) {
      console.error('Error fetching checkouts:', error);
    }
  };

  return (
    <div className="admin-map-container">
      <h3 className="map-title">Checkout Locations</h3>

      {/* Legend to display color code for subscription types */}
      <div className="legend">
        <ul>
          <li><span className="legend-icon blue"></span> One-Time</li>
          <li><span className="legend-icon orange"></span> Daily</li>
          <li><span className="legend-icon green"></span> Weekly</li>
          <li><span className="legend-icon purple"></span> Monthly</li>
        </ul>
      </div>

      <MapContainer center={[7.8731, 80.7718]} zoom={7} className="admin-map">
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {checkouts.map((checkout, index) => {
          // Get the correct icon based on subscription type, or use default if not found
          const icon = icons[checkout.subscription_type] || defaultIcon;

          return (
            <Marker key={index} position={[checkout.latitude, checkout.longitude]} icon={icon}>
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
                    <tr>
                      <td><strong>Expire Date:</strong></td>
                      <td>{checkout.expire_date ? new Date(checkout.expire_date).toLocaleDateString('en-GB') : 'N/A'}</td>
                    </tr>
                    <tr>
                      <td><strong>House No:</strong></td>
                      <td>{checkout.house_number}</td>
                    </tr>
                    <tr>
                      <td><strong>Street Name:</strong></td>
                      <td>{checkout.street_name}</td>
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
        })}
      </MapContainer>
    </div>
  );
};

export default AdminMap;
