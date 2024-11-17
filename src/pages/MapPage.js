import React from 'react';
import { useLocation } from 'react-router-dom';
import Map from '../components/Map'; 

function MapPage() {
  const { state } = useLocation(); // Retrieve the location passed via React Router
  const location = state?.location || 'Galle'; // Default to Galle if no location is provided

  return (
    <div className="d-flex flex-column align-items-center mt-4">
      <h4 className="text-center">Map for: {location}</h4>
      <div style={{ width: '100%', maxWidth: '800px' }}>
        <Map location={location} />
      </div>
    </div>
  );
}

export default MapPage;
