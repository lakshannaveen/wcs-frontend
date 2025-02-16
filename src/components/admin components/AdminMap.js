import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import './AdminMap.css';

// Custom icon for checkout locations
const checkoutIcon = new L.Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/684/684908.png',
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
      setCheckouts(data);
    } catch (error) {
      console.error('Error fetching checkouts:', error);
    }
  };

  return (
    <div className="admin-map-container">
      <h3 className="map-title">Checkout Locations</h3>

      <MapContainer center={[7.8731, 80.7718]} zoom={7} className="admin-map">
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {checkouts.map((checkout, index) => (
          <Marker key={index} position={[checkout.latitude, checkout.longitude]} icon={checkoutIcon}>
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
                    <td colSpan="2">
                      <a
                        href={`https://www.google.com/maps?q=${checkout.latitude},${checkout.longitude}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="view-google-map-btn"
                      >
                        View on Google Maps
                      </a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default AdminMap;
