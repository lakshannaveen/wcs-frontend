import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Modal } from 'react-bootstrap';
import './Search.css';

function Search() {
  const [location, setLocation] = useState(''); // Store the user's input for home address
  const [showModal, setShowModal] = useState(false); // Control the modal visibility
  const [confirmedLocation, setConfirmedLocation] = useState(''); // Store confirmed location
  const [addressParts, setAddressParts] = useState({
    streetNumber: '',
    streetName: '',
    city: '',
  }); 
  const [showDetailedForm, setShowDetailedForm] = useState(false); 
  const [errorMessage, setErrorMessage] = useState(''); 
  const navigate = useNavigate();
  const googleApiKey = "YOUR_GOOGLE_API_KEY"; // Replace with your Google API key

  const handleSearchClick = () => setShowDetailedForm(true);

  const handleSubmitAddress = async () => {
    const { streetNumber, streetName, city } = addressParts;
    if (!streetNumber || !streetName || !city) {
      setErrorMessage('Please complete all address fields!');
    } else {
      const fullAddress = `${streetNumber} ${streetName}, ${city}`;
      const isValid = await validateAddress(fullAddress);
      
      if (isValid) {
        setConfirmedLocation(fullAddress);
        setShowModal(true);
        setErrorMessage('');
      } else {
        setErrorMessage('The address you entered is not valid or not found on the map. You can use the "Locate Me" option to automatically get your current location.');

      }
    }
  };

  // Function to validate the address using Google Geocoding API
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
//locate me fuction
  const handleLocateMe = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const userLocation = `${latitude},${longitude}`;
          setConfirmedLocation(userLocation); // Set the location based on geolocation
          navigate('/map', { state: { location: userLocation } }); // Pass coordinates to the map
        },
        (error) => {
          console.error(error);
          setErrorMessage('Unable to retrieve your location.');
        }
      );
    } else {
      setErrorMessage('Geolocation is not supported by this browser.');
    }
  };

  return (
    <div className="d-flex flex-column align-items-center mt-4">
      <div className="search-box p-4 rounded bg-white shadow-lg">
        <h4 className="text-center">To Start Order Enter Address</h4>

        {!showDetailedForm && (
          <div className="input-container d-flex">
            <Form.Control
              type="text"
              placeholder="Enter Your Home Address"
              className="search-input"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              onFocus={handleSearchClick}
            />
            <Button className="search-btn" onClick={handleSearchClick}>
              <i className="bi bi-search"></i> Search
            </Button>
          </div>
        )}

        {showDetailedForm && (
          <div className="address-details-form mt-4">
            <Form.Control
              type="text"
              placeholder="Street Number (e.g., No 4)"
              className="mb-2"
              name="streetNumber"
              value={addressParts.streetNumber}
              onChange={handleAddressChange}
            />
            <Form.Control
              type="text"
              placeholder="Street Name (e.g., SGA Desilva Road)"
              className="mb-2"
              name="streetName"
              value={addressParts.streetName}
              onChange={handleAddressChange}
            />
            <Form.Control
              type="text"
              placeholder="City (e.g., Ambalangoda)"
              className="mb-2"
              name="city"
              value={addressParts.city}
              onChange={handleAddressChange}
            />
            <Button className="submit-btn mt-3" onClick={handleSubmitAddress}>
               Submit Address
            </Button>

            <Button className="mt-3 locate-btn ms-3" onClick={handleLocateMe}>
              Locate Me
            </Button>

          </div>
        )}

        {errorMessage && <div className="alert alert-danger mt-3">{errorMessage}</div>}
      </div>

      <Modal show={showModal} onHide={handleClose} dialogClassName="responsive-modal">
        <Modal.Header>
          <Modal.Title>Confirm Your Address</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Please confirm that the following is your correct home address:</p>
          <h5>{confirmedLocation}</h5>
        </Modal.Body>
        <Modal.Footer>
          <Button className="btn-secondary" variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button className="confirm-btn" onClick={handleConfirm}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Search;
