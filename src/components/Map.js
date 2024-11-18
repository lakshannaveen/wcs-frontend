import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';


const wasteBinIcon = new L.Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/929/929430.png', //bin icon url
  iconSize: [30, 30],
});

const Map = ({ location }) => {
  const [coordinates, setCoordinates] = useState([6.0535, 80.221]); // Default location: Galle
  const [selectedPosition, setSelectedPosition] = useState(null);
  const [address, setAddress] = useState(''); // Address of the selected position

  useEffect(() => {
    // Simulate fetching initial coordinates based on location
    const fetchCoordinates = async () => {
      const locations = {
        colombo: [6.9271, 79.8612],
        kandy: [7.2906, 80.6337],
        galle: [6.0535, 80.221],
      };
      setCoordinates(locations[location?.toLowerCase()] || [6.0535, 80.221]); // Default to Galle
    };
    fetchCoordinates();
  }, [location]);

  // Function to fetch address from latitude and longitude using OpenStreetMap Nominatim API
  const fetchAddress = async (lat, lng) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&addressdetails=1`
      );
      const data = await response.json();
      setAddress(data.display_name || 'Address not found');
    } catch (error) {
      console.error('Error fetching address:', error);
      setAddress('Unable to fetch address');
    }
  };

  // Custom hook to capture user clicks on the map
  const LocationSelector = () => {
    useMapEvents({
      click: (event) => {
        const { lat, lng } = event.latlng;
        setSelectedPosition([lat, lng]);
        fetchAddress(lat, lng); // Fetch address when location is selected
        console.log(`Selected position: Latitude ${lat}, Longitude ${lng}`);
      },
    });
    return null;
  };

  return (
    <div>
      <h3>
        {selectedPosition
          ? `Selected Map for: ${address || 'Fetching address...'}`
          : 'Map for: Select a location on the map'}
      </h3>
      <MapContainer
        center={coordinates}
        zoom={10}
        style={{ height: '500px', width: '100%' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <LocationSelector />
        {selectedPosition && (
          <Marker position={selectedPosition} icon={wasteBinIcon}>
            <Popup>
              Selected Location: <br />
              Latitude: {selectedPosition[0]}, <br />
              Longitude: {selectedPosition[1]} <br />
              Address: {address}
            </Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  );
  
};

export default Map;
