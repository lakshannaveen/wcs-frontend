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

// Custom waste bin icon for map
const wasteBinIcon = new L.Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/929/929430.png',
  iconSize: [30, 30],
});

const Map = () => {
  const { theme } = useTheme();
  const { language } = useLanguage();
  const t = mapTranslations[language].map;
  
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

  useEffect(() => {
    if (location) {
      const [lat, lng] = location.split(',').map(Number);
      setCoordinates([lat, lng]);
      setSelectedPosition([lat, lng]);
      fetchAddress(lat, lng);
    }
  }, [location]);

  const fetchAddress = async (lat, lng, isFromClick = false) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&addressdetails=1`
      );
      const data = await response.json();

      const { address: addr } = data;

      // Check if this is a valid land address
      const hasLandInfo = addr?.road || addr?.city || addr?.suburb || addr?.state;

      if (isFromClick && !hasLandInfo) {
        setClickError(t.invalidLocation);
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

  const LocationSelector = () => {
    useMapEvents({
      click: (event) => {
        const { lat, lng } = event.latlng;
        fetchAddress(lat, lng, true);
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
      
      let price = 0;
      if (subscriptionPlan === 'one-time') {
        price = 200;
      } else if (subscriptionPlan === 'weekly') {
        price = 2000;
      } else if (subscriptionPlan === 'daily') {
        price = 5000;
      } else if (subscriptionPlan === 'monthly') {
        price = 1000;
      }

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

        {clickError && (
          <div className="alert alert-warning mt-2">{clickError}</div>
        )}

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
