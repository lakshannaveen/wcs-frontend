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
  }); // Store detailed address parts
  const [showDetailedForm, setShowDetailedForm] = useState(false); // Show detailed form after initial input
  const [errorMessage, setErrorMessage] = useState(''); // Show error message if necessary
  const navigate = useNavigate();

  // Handle search (initial form submission)
  const handleSearchClick = () => {
    // When the "Search" button or placeholder is clicked, show the detailed form.
    setShowDetailedForm(true);
  };

  // Handle address parts submission
  const handleSubmitAddress = () => {
    const { streetNumber, streetName, city } = addressParts;
    
    // Check if all address fields are filled
    if (!streetNumber || !streetName || !city) {
      setErrorMessage('Please complete all address fields!');
    } else {
      const fullAddress = `${streetNumber} ${streetName}, ${city}`;
      setConfirmedLocation(fullAddress);
      setShowModal(true); // Show the confirmation modal with the full address
      setErrorMessage(''); // Clear any error message
    }
  };

  // Handle the modal confirm action
  const handleConfirm = () => {
    // Navigate to the map page with the confirmed location
    navigate('/map', { state: { location: confirmedLocation } });
    setShowModal(false); // Close the modal after confirmation
  };

  // Handle the modal close action
  const handleClose = () => setShowModal(false); // Close the modal without confirmation

  // Handle address input change
  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setAddressParts({
      ...addressParts,
      [name]: value,
    });
  };

  return (
    <div className="d-flex flex-column align-items-center mt-4">
      <div className="search-box p-4 rounded bg-white shadow-lg">
        <h4 className="text-center">To Start Order Enter Address</h4>
        
        {/* Initial Search Form (Appears first) */}
        {!showDetailedForm && (
          <div className="input-container d-flex">
            <Form.Control
              type="text"
              placeholder="Enter Your Home Address"
              className="search-input"
              value={location}
              onChange={(e) => setLocation(e.target.value)} // Handle input change
              onFocus={handleSearchClick} // Show the detailed form when clicked
            />
            <Button className="search-btn" onClick={handleSearchClick}>
              <i className="bi bi-search"></i> Search
            </Button>
          </div>
        )}

        {/* Detailed Address Form (Appears after search button or input click) */}
        {showDetailedForm && (
          <div className="address-details-form mt-4">
            <Form.Control
              type="text"
              placeholder="Street Number (e.g., No 4)"
              className="mb-2"
              name="streetNumber"
              value={addressParts.streetNumber}
              onChange={handleAddressChange} // Handle address input change
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

            <Button className="mt-3" onClick={handleSubmitAddress}>
              Submit Address
            </Button>
          </div>
        )}

        {/* Show error message if the location or address is invalid */}
        {errorMessage && <div className="alert alert-danger mt-3">{errorMessage}</div>}
      </div>

      {/* Modal to confirm the complete address */}
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Your Address</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Please confirm that the following is your correct home address:</p>
          <h5>{confirmedLocation}</h5>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button className="confirm-btn" onClick={handleConfirm}>
            Confirm Address
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Search;
