import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import './AdminMap.css';

// Custom icon for checkout locations
const checkoutIcon = new L.Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/684/684908.png', // Replace with a suitable icon
  iconSize: [30, 30],
});

const AdminMap = () => {
  const [checkouts, setCheckouts] = useState([]); // Store checkout locations

  useEffect(() => {
    fetchCheckouts();
  }, []);

  const fetchCheckouts = async () => {
    try {
        const response = await fetch('http://localhost:5002/api/checkout/checkouts');
        // Replace with your backend API
      const data = await response.json();
      setCheckouts(data); // Assuming API response is an array of checkout records
    } catch (error) {
      console.error('Error fetching checkouts:', error);
    }
  };

  return (
    <div className="admin-map-container">
      <h3>Checkout Locations</h3>

      <MapContainer center={[7.8731, 80.7718]} zoom={7} className="admin-map">
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {checkouts.map((checkout, index) => (
          <Marker key={index} position={[checkout.latitude, checkout.longitude]} icon={checkoutIcon}>
            <Popup>
              <strong>Checkout ID:</strong> {checkout.checkout_id} <br />
              <strong>Sender:</strong> {checkout.sender_firstname} {checkout.sender_lastname} <br />
              <strong>Recipient:</strong> {checkout.recipient_firstname} {checkout.recipient_lastname} <br />
              <strong>Collection Time:</strong> {checkout.collection_time} <br />
              <strong>Subscription Type:</strong> {checkout.subscription_type} <br />
              <strong>Expire Date:</strong> {checkout.expire_date || 'N/A'}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default AdminMap;
