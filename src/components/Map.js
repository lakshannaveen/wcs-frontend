import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useLocation, useNavigate } from 'react-router-dom';
import './Map.css';

// Custom waste bin icon for map
const wasteBinIcon = new L.Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/929/929430.png', // Bin icon URL
  iconSize: [30, 30],
});

const Map = () => {
  const [coordinates, setCoordinates] = useState([6.0535, 80.221]); // Default location: Galle
  const [selectedPosition, setSelectedPosition] = useState(null);
  const [address, setAddress] = useState(''); // Address of the selected position
  const [houseNo, setHouseNo] = useState(''); // Store house number
  const [showWarning, setShowWarning] = useState(false); // Toggle warning for invalid address
  const [isLocationConfirmed, setIsLocationConfirmed] = useState(false); // Flag to confirm location

  const navigate = useNavigate(); // To navigate to checkout page
  const location = useLocation().state?.location;

  useEffect(() => {
    if (location) {
      const [lat, lng] = location.split(',').map(Number);
      setCoordinates([lat, lng]);
      fetchAddress(lat, lng); // Fetch address from the coordinates
    }
  }, [location]);

  // Function to fetch the address from the OpenStreetMap Nominatim API
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

  // Custom hook to handle user clicks on the map
  const LocationSelector = () => {
    useMapEvents({
      click: (event) => {
        const { lat, lng } = event.latlng;
        setSelectedPosition([lat, lng]);
        fetchAddress(lat, lng); // Fetch address for the new position
      },
    });
    return null;
  };

  // Handle the confirmation of the location
  const handleConfirm = () => {
    // Show warning if house number is not provided or address is invalid
    if (!houseNo.trim()) {
      setShowWarning(true); // Trigger warning message for missing house number
    } else if (!address || address === 'Unable to fetch address') {
      setShowWarning(true); // Trigger warning for invalid address
    } else {
      setShowWarning(false); // Hide warning message
      setIsLocationConfirmed(true); // Set the flag to indicate successful confirmation
      navigate('/checkout', { state: { address, houseNo } }); // Navigate to checkout page with address and house number
    }
  };

  // Handle the change in the house number input field
  const handleHouseNoChange = (e) => {
    setHouseNo(e.target.value);
  };

  return (
    <div className="map-container">
      <h3>
        {selectedPosition
          ? `Selected Location: ${address || 'Fetching address...'}` 
          : 'Select a location on the map'}
      </h3>

      {/* Map */}
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
        <Marker position={coordinates} icon={wasteBinIcon}>
          <Popup>{address || 'Loading address...'}</Popup>
        </Marker>
      </MapContainer>

      {/* Address and House Number Input */}
      {!isLocationConfirmed ? (
        <div className="address-details-form mt-3">
          <input
            type="text"
            placeholder="House Number (e.g., No 4)"
            value={houseNo}
            onChange={handleHouseNoChange}
            className="house-number-input mb-2"
          />
        {showWarning && (
        <div className="alert alert-danger">
             Please provide a valid house number and address in the map.
          </div>
          )}
          <button onClick={handleConfirm} className="btn btn-primary">
            Confirm Location
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default Map;
