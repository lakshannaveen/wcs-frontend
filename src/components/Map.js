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
  const [coordinates, setCoordinates] = useState([7.8731, 80.7718]); // Center of Sri Lanka
  const [selectedPosition, setSelectedPosition] = useState([7.8731, 80.7718]); // Default position is the same
  const [address, setAddress] = useState(''); // Address of the selected position
  const [houseNo, setHouseNo] = useState(''); // Store house number
  const [streetName, setStreetName] = useState(''); // Store street name
  const [showWarning, setShowWarning] = useState(false); // Toggle warning for invalid inputs
  const [isLocationConfirmed, setIsLocationConfirmed] = useState(false); // Flag to confirm location
  const [subscriptionPlan, setSubscriptionPlan] = useState(''); // Store selected subscription plan
  const [selectedWeekday, setSelectedWeekday] = useState(''); // Store selected weekday for weekly plan
  const [selectedDate, setSelectedDate] = useState(''); // Store selected date for monthly plan

  const navigate = useNavigate(); // To navigate to checkout page
  const location = useLocation().state?.location;

  useEffect(() => {
    if (location) {
      const [lat, lng] = location.split(',').map(Number);
      setCoordinates([lat, lng]);
      setSelectedPosition([lat, lng]); // Update selected position as well
      fetchAddress(lat, lng); // Fetch address from the coordinates
    }
  }, [location]);

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

  const LocationSelector = () => {
    useMapEvents({
      click: (event) => {
        const { lat, lng } = event.latlng;
        setSelectedPosition([lat, lng]); // Update selected position with the new coordinates
        fetchAddress(lat, lng); // Fetch address for the new position
      },
    });
    return null;
  };

  const handleConfirm = () => {
    // Check if all required fields are filled
    if (!houseNo.trim() || !streetName.trim()) {
      setShowWarning(true); // Trigger warning message for missing inputs
    } else if (!address || address === 'Unable to fetch address') {
      setShowWarning(true); // Trigger warning for invalid address
    } else if (!subscriptionPlan) {
      setShowWarning(true); // Trigger warning if no subscription plan is selected
    } else if (subscriptionPlan === 'weekly' && !selectedWeekday) {
      setShowWarning(true); // Trigger warning if no weekday is selected for weekly plan
    } else if (subscriptionPlan === 'monthly' && !selectedDate) {
      setShowWarning(true); // Trigger warning if no date is selected for monthly plan
    } else {
      setShowWarning(false); // Hide warning message
      setIsLocationConfirmed(true); // Set the flag to indicate successful confirmation
      navigate('/checkout', { state: { address, houseNo, streetName, subscriptionPlan, selectedWeekday, selectedDate } }); // Navigate to checkout page with all details
    }
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
        zoom={7} // Adjusted zoom level to show the whole of Sri Lanka
        style={{ height: '500px', width: '100%' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <LocationSelector />
        {/* Move marker to the selected position */}
        <Marker position={selectedPosition} icon={wasteBinIcon}>
          <Popup>{address || 'Loading address...'}</Popup>
        </Marker>
      </MapContainer>
      <div className="important-note">
        <strong>Important:</strong> Please note that when changing the location on our map, your address will be automatically adjusted based on the new map location selected, ensuring a smooth and hassle-free experience.
      </div>

      {/* Address and Details Form */}
      {!isLocationConfirmed ? (
        <div className="address-details-form mt-3">
          <input
            type="text"
            placeholder="House Number (e.g., No 4)"
            value={houseNo}
            onChange={(e) => setHouseNo(e.target.value)}
            className="house-number-input mb-2"
          />
          <input
            type="text"
            placeholder="Street Name (e.g., Dewata road)"
            value={streetName}
            onChange={(e) => setStreetName(e.target.value)}
            className="street-name-input mb-2"
          />
          <div className="subscription-plan-selection mb-2">
            <select
              value={subscriptionPlan}
              onChange={(e) => setSubscriptionPlan(e.target.value)}
              className="form-select"
            >
              <option value="">Select Subscription Plan</option>
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
            </select>
          </div>

          {/* Show appropriate options based on subscription plan */}
          {subscriptionPlan === 'weekly' && (
            <div className="weekly-plan">
              <select
                value={selectedWeekday}
                onChange={(e) => setSelectedWeekday(e.target.value)}
                className="form-select"
              >
                <option value="">Select Weekday</option>
                <option value="monday">Monday</option>
                <option value="tuesday">Tuesday</option>
                <option value="wednesday">Wednesday</option>
                <option value="thursday">Thursday</option>
                <option value="friday">Friday</option>
              </select>
            </div>
          )}

          {subscriptionPlan === 'monthly' && (
            <div className="monthly-plan">
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="form-control"
                min={new Date().toISOString().split("T")[0]} // Disable past dates
                max={new Date(new Date().setDate(new Date().getDate() + 30)).toISOString().split("T")[0]} // Disable dates beyond 30 days
                placeholder="Select a date"
              />
            </div>
          )}

          {showWarning && (
            <div className="alert alert-danger">
              Please provide a valid house number, street name, address on map, and select a subscription plan.
            </div>
          )}

          <button onClick={handleConfirm} className="btn btn-primary">
            Confirm and Checkout
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default Map;
