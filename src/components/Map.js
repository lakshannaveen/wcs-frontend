import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useLocation, useNavigate } from 'react-router-dom';
import './Map.css';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';  // Corrected import
import { useLanguage } from '../contexts/LanguageContext';
import translations from '../translations/mapTranslations';

// Custom waste bin icon for map
const wasteBinIcon = new L.Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/929/929430.png', // Bin icon URL
  iconSize: [30, 30],
});

const Map = () => {
  const { language } = useLanguage();
  const t = translations[language];
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
  const [userId, setUserId] = useState(null); // State for user ID

  const navigate = useNavigate(); // To navigate to checkout page
  const location = useLocation().state?.location;

  // Get the JWT token from the cookies
  useEffect(() => {
    const token = Cookies.get('token'); // Get JWT token from cookie

    if (token) {
      try {
        const decoded = jwtDecode(token); // Decode the JWT token
        setUserId(decoded.id); // Assuming 'id' is the user ID in the payload
      } catch (error) {
        console.error("Failed to decode JWT token:", error);
      }
    }
  }, []);

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
      setAddress(data.display_name || t.addressNotFound);
    } catch (error) {
      console.error('Error fetching address:', error);
      setAddress(t.addressFetchError);
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
    if (!houseNo.trim() || !streetName.trim()) {
      setShowWarning(true);
    } else if (!subscriptionPlan) {
      setShowWarning(true);
    } else if (subscriptionPlan === 'weekly' && !selectedWeekday) {
      setShowWarning(true);
    } else if (subscriptionPlan === 'monthly' && !selectedDate) {
      setShowWarning(true);
    } else {
      setShowWarning(false);
      setIsLocationConfirmed(true);

      // Calculate subscription price based on selected plan
      let price = 0;
      if (subscriptionPlan === 'one-time') {
        price = 200;
      } else if (subscriptionPlan === 'weekly') {
        price = 2000; // 3 months of weekly service
      } else if (subscriptionPlan === 'daily') {
        price = 5000;
      } else if (subscriptionPlan === 'monthly') {
        price = 1000;
      }

    
  // Store checkout data including user ID and location (latitude, longitude)
      sessionStorage.setItem('mappagedata', JSON.stringify({
        userId, // User ID from decoded token
        latitude: selectedPosition[0],
        longitude: selectedPosition[1],
        houseNo,
        streetName,
        subscriptionPlan,
        subscriptionPrice: price,
        selectedWeekday,
        selectedDate,
        selectedDays: selectedWeekday, // Store the days selected for weekly plan
        selectedDates: selectedDate,   // Store the selected dates for monthly plan
      }));
  


      navigate('/checkout');
    }
  };

  return (
    <div className="map-container">
      <h3>
        {selectedPosition
          ? `${t.selectedLocationPrefix}${address || t.fetchingAddress}`
          : t.selectLocation}
      </h3>

      <MapContainer center={coordinates} zoom={7} style={{ height: '500px', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <LocationSelector />
        <Marker position={selectedPosition} icon={wasteBinIcon}>
          <Popup>{address || t.loadingAddress}</Popup>
        </Marker>
      </MapContainer>
      
      <div className="important-note">
        <strong>{t.note.important}</strong> {t.note.text}
        <br />
        <a href="/customsubscription" className="check-subscription" target="_blank" rel="noopener noreferrer">
          {t.links.checkSubscription}
        </a> |
        <a href="/customguidance" className="check-waste-guidance" target="_blank" rel="noopener noreferrer">
          {t.links.checkWasteGuidance}
        </a>
      </div>

      {!isLocationConfirmed ? (
        <div className="address-details-form mt-3">
        <input
          type="text"
          placeholder={t.placeholders.houseNumber}
          value={houseNo}
          onChange={(e) => setHouseNo(e.target.value)}
          className="house-number-input mb-2"
        />
        <input
          type="text"
          placeholder={t.placeholders.streetName}
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
            <option value="">{t.placeholders.selectPlan}</option>
            <option value="daily">{t.plans.daily}</option>
            <option value="weekly">{t.plans.weekly}</option>
            <option value="monthly">{t.plans.monthly}</option>
            <option value="one-time">{t.plans.oneTime}</option>
          </select>
        </div>

          {subscriptionPlan === 'weekly' && (
            <div className="weekly-plan">
            <select
              value={selectedWeekday}
              onChange={(e) => setSelectedWeekday(e.target.value)}
              className="form-select"
            >
              <option value="">{t.placeholders.selectWeekday}</option>
              <option value="monday">{t.weekdays.monday}</option>
              <option value="tuesday">{t.weekdays.tuesday}</option>
              <option value="wednesday">{t.weekdays.wednesday}</option>
              <option value="thursday">{t.weekdays.thursday}</option>
              <option value="friday">{t.weekdays.friday}</option>
            </select>
          </div>
        
          )}

          {subscriptionPlan === 'monthly' && (
            <div className="monthly-plan">
              <input type="date" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} className="form-control" min={new Date().toISOString().split("T")[0]} max={new Date(new Date().setDate(new Date().getDate() + 30)).toISOString().split("T")[0]} />
            </div>
          )}

          {showWarning && (
            <div className="alert custom-alert">
              {t.warning}
            </div>
          )}

          <button onClick={handleConfirm} className="btn btn-primary">{t.buttons.confirm}</button>
        </div>
      ) : null}
    </div>
  );
};

export default Map;
