import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import './Search.css';

function Search() {
  const [location, setLocation] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    if (location.trim()) {
      navigate('/map', { state: { location } }); // Navigate to the map page with the location
    } else {
      alert('Please enter a location!');
    }
  };

  return (
    <div className="d-flex flex-column align-items-center mt-4">
      <div className="search-box p-4 rounded bg-white shadow-lg">
        <h4 className="text-center">Start Your Order Here</h4>
        <div className="input-container d-flex">
          <Form.Control
            type="text"
            placeholder="Enter Your Location"
            className="search-input"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          <Button className="search-btn" onClick={handleSearch}>
            <i className="bi bi-search"></i> Search
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Search;
