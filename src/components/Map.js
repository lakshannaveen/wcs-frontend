import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useNavigate } from 'react-router-dom'; 
import './Map.css'; 

const wasteBinIcon = new L.Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/929/929430.png', // Bin icon URL
  iconSize: [30, 30],
});

const Map = ({ location }) => {
  const [coordinates, setCoordinates] = useState([6.0535, 80.221]); // Default location: Galle
  const [selectedPosition, setSelectedPosition] = useState(null);
  const [address, setAddress] = useState(''); // Address of the selected position
  const [houseNo, setHouseNo] = useState(''); // Placeholder for house number
  const [showWarning, setShowWarning] = useState(false); // State to toggle warning message

  const navigate = useNavigate(); // Initialize useNavigate

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
      },
    });
    return null;
  };

  // Handle confirmation (navigate to checkout page)
  const handleConfirm = () => {
    // Check if house number is empty or address is not fetched correctly
    if (!houseNo.trim()) {
      setShowWarning(true); // Show warning message for empty house number
    } else if (!address || address === 'Unable to fetch address') {
      setShowWarning(true); // Show warning message for invalid address
    } else {
      setShowWarning(false); // Hide warning if everything is valid
      navigate('/checkout'); // Navigates to the checkout page (you can connect it later)
    }
  };

  return (
    <div className="map-container">
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


      <div className="info-container">
        <p className="important-note">
          <strong>Important:</strong> Please note that when changing the location on our map, your delivery address will be automatically adjusted based on the new map location selected, ensuring a smooth and hassle-free experience.
        </p>
        
        {/* Warning message moved above input field */}
        {showWarning && (
          <div className="warning-message">
            <p>Please ensure that you have entered your house number and that the address is valid.</p>
          </div>
        )}
        
        <div className="form-group">
          <label htmlFor="houseNo">House No:</label>
          <input
            id="houseNo"
            type="text"
            placeholder="Confirm your house number (eg: No 4)"
            value={houseNo}
            onChange={(e) => setHouseNo(e.target.value)}
          />
        </div>
        <div className="button-group">
          <button className="checkout-button" onClick={handleConfirm}>
            Confirm and checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Map;
