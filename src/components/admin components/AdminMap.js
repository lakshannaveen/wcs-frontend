import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import './AdminMap.css';

// Custom icon for order locations
const orderIcon = new L.Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/929/929430.png', // Replace with a suitable icon
  iconSize: [30, 30],
});

const AdminMap = () => {
  const [orders, setOrders] = useState([]); // Store order locations

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await fetch('https://your-backend-url.com/api/orders'); // Replace with your backend API
      const data = await response.json();
      setOrders(data.orders); // Assuming API response has an "orders" array
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  return (
    <div className="admin-map-container">
      <h3>Order Locations</h3>

      <MapContainer center={[7.8731, 80.7718]} zoom={7} className="admin-map">
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        
        {orders.map((order, index) => (
          <Marker key={index} position={[order.latitude, order.longitude]} icon={orderIcon}>
            <Popup>
              <strong>Order ID:</strong> {order.id} <br />
              <strong>Location:</strong> {order.latitude}, {order.longitude}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default AdminMap;