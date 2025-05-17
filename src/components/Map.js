import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useLocation, useNavigate } from 'react-router-dom';
import './Map.css';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { mapTranslations } from '../config/mapLanguages';

// Sri Lanka boundaries
const SRI_LANKA_BOUNDS = {
  north: 9.831,   // Northernmost point
  south: 5.919,    // Southernmost point
  west: 79.521,    // Westernmost point
  east: 81.879      // Easternmost point
};

// Custom waste bin icon for map marker
const wasteBinIcon = new L.Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/929/929430.png',
  iconSize: [30, 30],
});

const Map = () => {
  const { theme } = useTheme();
  const { language } = useLanguage();
  const t = mapTranslations[language].map;

  // Default center coordinates (Sri Lanka)
  const [coordinates, setCoordinates] = useState([7.8731, 80.7718]);
  const [selectedPosition, setSelectedPosition] = useState([7.8731, 80.7718]);
  const [address, setAddress] = useState('');
  const [houseNo, setHouseNo] = useState('');
  const [streetName, setStreetName] = useState('');
  const [showWarning, setShowWarning] = useState(false);
  const [isLocationConfirmed, setIsLocationConfirmed] = useState(false);
  const [subscriptionPlan, setSubscriptionPlan] = useState('');
  const [selectedWeekday, setSelectedWeekday] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [userId, setUserId] = useState(null);
  const [clickError, setClickError] = useState('');

  const navigate = useNavigate();
  const location = useLocation().state?.location;

  // Decode JWT token to extract user ID
  useEffect(() => {
    const token = Cookies.get('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUserId(decoded.id);
      } catch (error) {
        console.error("Failed to decode JWT token:", error);
      }
    }
  }, []);

  // If location is passed from another page, set map coordinates and fetch address
  useEffect(() => {
    if (location) {
      const [lat, lng] = location.split(',').map(Number);
      if (isWithinSriLanka(lat, lng)) {
        setCoordinates([lat, lng]);
        setSelectedPosition([lat, lng]);
        fetchAddress(lat, lng);
      }
    }
  }, [location]);

  // Check if coordinates are within Sri Lanka
  const isWithinSriLanka = (lat, lng) => {
    return (
      lat >= SRI_LANKA_BOUNDS.south &&
      lat <= SRI_LANKA_BOUNDS.north &&
      lng >= SRI_LANKA_BOUNDS.west &&
      lng <= SRI_LANKA_BOUNDS.east
    );
  };

  // Fetch human-readable address from latitude and longitude
  const fetchAddress = async (lat, lng, isFromClick = false) => {
    try {
      // First check if location is within Sri Lanka
      if (!isWithinSriLanka(lat, lng)) {
        setClickError(t.locationOutsideSriLanka);
        return;
      }

      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&addressdetails=1`
      );
      const data = await response.json();

      const { address: addr } = data;

      // Prevent selecting invalid areas (e.g., sea or forest)
      const hasLandInfo = addr?.road || addr?.city || addr?.suburb || addr?.state;

      if (isFromClick && !hasLandInfo) {
        setClickError(t.invalidLocation);
        return;
      }

      // Additional check to ensure the location is in Sri Lanka
      if (addr?.country !== 'Sri Lanka') {
        setClickError(t.locationOutsideSriLanka);
        return;
      }

      setClickError('');
      setSelectedPosition([lat, lng]);
      setAddress(data.display_name || t.fetchingAddress);
    } catch (error) {
      console.error('Error fetching address:', error);
      setAddress(t.fetchingAddress);
    }
  };

  // Handle map click to get location
  const LocationSelector = () => {
    useMapEvents({
      click: (event) => {
        const { lat, lng } = event.latlng;
        fetchAddress(lat, lng, true);
      },
    });
    return null;
  };

  // Handle form confirmation and validation
  const handleConfirm = () => {
    if (!houseNo.trim() || !streetName.trim()) {
      setShowWarning(true);
    } else if (!subscriptionPlan) {
      setShowWarning(true);
    } else if (subscriptionPlan === 'weekly' && !selectedWeekday) {
      setShowWarning(true);
    } else if (subscriptionPlan === 'monthly' && !selectedDate) {
      setShowWarning(true);
    } else if (!isWithinSriLanka(selectedPosition[0], selectedPosition[1])) {
      setClickError(t.locationOutsideSriLanka);
    } else {
      setShowWarning(false);
      setIsLocationConfirmed(true);

      // Assign subscription price based on selected plan
      let price = 0;
      if (subscriptionPlan === 'one-time') price = 200;
      else if (subscriptionPlan === 'weekly') price = 2000;
      else if (subscriptionPlan === 'daily') price = 5000;
      else if (subscriptionPlan === 'monthly') price = 1000;

      // Store all user selections temporarily for checkout
      sessionStorage.setItem('mappagedata', JSON.stringify({
        userId,
        latitude: selectedPosition[0],
        longitude: selectedPosition[1],
        houseNo,
        streetName,
        subscriptionPlan,
        subscriptionPrice: price,
        selectedWeekday,
        selectedDate,
        selectedDays: selectedWeekday,
        selectedDates: selectedDate,
      }));

      navigate('/checkout');
    }
  };

  // Apply theme to the page
  useEffect(() => {
    if (theme === 'dark') {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [theme]);

  return (
    <div className={`map-page ${theme}`}>
      <div className={`map-container ${theme}`}>
        <h3>
          {selectedPosition
            ? `${t.selectedLocation} ${address || t.fetchingAddress}` 
            : t.selectLocation}
        </h3>

        {/* Interactive map for selecting waste collection location */}
        <MapContainer 
          center={coordinates} 
          zoom={7} 
          style={{ height: '500px', width: '100%' }}
          maxBounds={[
            [SRI_LANKA_BOUNDS.south, SRI_LANKA_BOUNDS.west], // SW
            [SRI_LANKA_BOUNDS.north, SRI_LANKA_BOUNDS.east]  // NE
          ]}
          maxBoundsViscosity={1.0}
          minZoom={7}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <LocationSelector />
          <Marker position={selectedPosition} icon={wasteBinIcon}>
            <Popup>{address || t.loadingAddress}</Popup>
          </Marker>
        </MapContainer>

        {clickError && (
          <div className="alert alert-warning mt-2">{clickError}</div>
        )}

        {/* Info section */}
        <div className="important-note">
          <strong>{t.importantNote.split(':')[0]}:</strong> {t.importantNote.split(':')[1].trim()}
          <br />
          <a href="/customsubscription" className="check-subscription" target="_blank" rel="noopener noreferrer">
            {t.checkSubscription}
          </a> |
          <a href="/customguidance" className="check-waste-guidance" target="_blank" rel="noopener noreferrer">
            {t.checkWasteGuidance}
          </a>
        </div>

        {/* Form for entering address and selecting subscription */}
        {!isLocationConfirmed ? (
          <div className="address-details-form mt-3">
            <input 
              type="text" 
              placeholder={t.houseNumberPlaceholder} 
              value={houseNo} 
              onChange={(e) => setHouseNo(e.target.value)} 
              className="house-number-input mb-2" 
            />
            <input 
              type="text" 
              placeholder={t.streetNamePlaceholder} 
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
                <option value="">{t.selectPlan}</option>
                <option value="daily">{t.dailyPlan}</option>
                <option value="weekly">{t.weeklyPlan}</option>
                <option value="monthly">{t.monthlyPlan}</option>
                <option value="one-time">{t.oneTimePlan}</option>
              </select>
            </div>

            {/* Show weekday selector if weekly plan is chosen */}
            {subscriptionPlan === 'weekly' && (
              <div className="weekly-plan">
                <select 
                  value={selectedWeekday} 
                  onChange={(e) => setSelectedWeekday(e.target.value)} 
                  className="form-select"
                >
                  <option value="">{t.selectWeekday}</option>
                  <option value="monday">{t.monday}</option>
                  <option value="tuesday">{t.tuesday}</option>
                  <option value="wednesday">{t.wednesday}</option>
                  <option value="thursday">{t.thursday}</option>
                  <option value="friday">{t.friday}</option>
                </select>
              </div>
            )}

            {/* Show date picker if monthly plan is chosen */}
            {subscriptionPlan === 'monthly' && (
              <div className="monthly-plan">
                <input 
                  type="date" 
                  value={selectedDate} 
                  onChange={(e) => setSelectedDate(e.target.value)} 
                  className="form-control" 
                  min={new Date().toISOString().split("T")[0]} 
                  max={new Date(new Date().setDate(new Date().getDate() + 30)).toISOString().split("T")[0]} 
                />
              </div>
            )}

            {showWarning && (
              <div className="alert custom-alert">
                {t.warningMessage}
              </div>
            )}

            <button onClick={handleConfirm} className="btn btn-primary">
              {t.confirmButton}
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Map;