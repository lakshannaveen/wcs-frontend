import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Modal } from 'react-bootstrap';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { searchTranslations } from '../config/searchLanguages';
import './Search.css';

function Search() {
  const { theme } = useTheme();
  const { language } = useLanguage();
  const t = searchTranslations[language].search;
  
  const [location, setLocation] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [confirmedLocation, setConfirmedLocation] = useState('');
  const [addressParts, setAddressParts] = useState({
    streetNumber: '',
    streetName: '',
    city: '',
  });
  const [showDetailedForm, setShowDetailedForm] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const googleApiKey = "YOUR_GOOGLE_API_KEY";

  const handleSearchClick = () => setShowDetailedForm(true);

  const handleSubmitAddress = async () => {
    const { streetNumber, streetName, city } = addressParts;
    if (!streetNumber || !streetName || !city) {
      setErrorMessage(t.errorIncomplete);
    } else {
      const fullAddress = `${streetNumber} ${streetName}, ${city}`;
      const isValid = await validateAddress(fullAddress);

      if (isValid) {
        setConfirmedLocation(fullAddress);
        setShowModal(true);
        setErrorMessage('');
      } else {
        setErrorMessage(t.errorInvalid);
      }
    }
  };

  const validateAddress = async (address) => {
    const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${googleApiKey}`;

    try {
      const response = await fetch(geocodeUrl);
      const data = await response.json();
      
      if (data.status === 'OK') {
        return true; 
      } else {
        return false; 
      }
    } catch (error) {
      console.error("Error validating address:", error);
      return false;
    }
  };

  const handleConfirm = () => {
    navigate('/map', { state: { location: confirmedLocation } });
    setShowModal(false);
  };

  const handleClose = () => setShowModal(false);

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setAddressParts({
      ...addressParts,
      [name]: value,
    });
  };

  const handleLocateMe = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const userLocation = `${latitude},${longitude}`;
          setConfirmedLocation(userLocation);
          navigate('/map', { state: { location: userLocation } });
        },
        (error) => {
          console.error(error);
          setErrorMessage(t.errorLocation);
        }
      );
    } else {
      setErrorMessage(t.errorGeolocation);
    }
  };

  return (
    <div className={`search-component ${theme}`}>
      <div className={`search-box ${theme}`}>
        <h4 className={`search-title ${theme}`}>{t.title}</h4>

        {!showDetailedForm ? (
          <div className="input-container">
            <Form.Control
              type="text"
              placeholder={t.placeholder}
              className={`search-input ${theme}`}
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              onFocus={handleSearchClick}
            />
            <Button 
              className={`search-btn ${theme}`} 
              onClick={handleSearchClick}
            >
              <i className="bi bi-search"></i> {t.searchButton}
            </Button>
          </div>
        ) : (
          <div className={`address-form-container ${theme}`}>
            <Form.Group controlId="streetNumber">
              <Form.Control
                type="text"
                placeholder={t.streetNumber}
                className={`form-input ${theme}`}
                name="streetNumber"
                value={addressParts.streetNumber}
                onChange={handleAddressChange}
              />
            </Form.Group>

            <Form.Group controlId="streetName" className="mt-2">
              <Form.Control
                type="text"
                placeholder={t.streetName}
                className={`form-input ${theme}`}
                name="streetName"
                value={addressParts.streetName}
                onChange={handleAddressChange}
              />
            </Form.Group>

            <Form.Group controlId="city" className="mt-2">
              <Form.Control
                type="text"
                placeholder={t.city}
                className={`form-input ${theme}`}
                name="city"
                value={addressParts.city}
                onChange={handleAddressChange}
              />
            </Form.Group>

            <div className="form-buttons mt-3">
              <Button 
                className={`submit-btn ${theme}`}
                onClick={handleSubmitAddress}
              >
                {t.submitAddress}
              </Button>
              <Button 
                className={`locate-btn ${theme}`}
                onClick={handleLocateMe}
              >
                {t.locateMe}
              </Button>
            </div>
          </div>
        )}

        {errorMessage && (
          <div className={`error-message ${theme}`}>
            {errorMessage}
          </div>
        )}
      </div>

      <Modal 
        show={showModal} 
        onHide={handleClose} 
        className={`address-modal ${theme}`}
      >
        <Modal.Header className={`modal-header ${theme}`}>
          <Modal.Title>{t.confirmTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body className={`modal-body ${theme}`}>
          <p>{t.confirmMessage}</p>
          <h5>{confirmedLocation}</h5>
        </Modal.Body>
        <Modal.Footer className={`modal-footer ${theme}`}>
          <Button 
            className={`cancel-btn ${theme}`}
            onClick={handleClose}
          >
            {t.cancel}
          </Button>
          <Button 
            className={`confirm-btn ${theme}`}
            onClick={handleConfirm}
          >
            {t.confirm}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Search;