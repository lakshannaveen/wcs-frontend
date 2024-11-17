import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const Map = ({ location }) => {
  const [coordinates, setCoordinates] = useState([6.0535, 80.221]); // Default location: Galle

  useEffect(() => {
    // Mock geocoding based on the location
    const fetchCoordinates = async () => {
      // Add geocoding API call here if needed (e.g., Google Maps API, OpenCage, etc.)
      const locations = {
        colombo: [6.9271, 79.8612],
        kandy: [7.2906, 80.6337],
        galle: [6.0535, 80.221],
      };
      setCoordinates(locations[location.toLowerCase()] || [6.0535, 80.221]); // Default to Galle
    };
    fetchCoordinates();
  }, [location]);

  return (
    <MapContainer
      center={coordinates}
      zoom={10}
      style={{ height: '500px', width: '100%' }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={coordinates}>
        <Popup>You searched for: {location}</Popup>
      </Marker>
    </MapContainer>
  );
};

export default Map;
