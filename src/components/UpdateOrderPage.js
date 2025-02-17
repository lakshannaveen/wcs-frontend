import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './UpdateOrderPage.css';

const UpdateOrderPage = () => {
  const { checkoutId } = useParams();
  const [collectionTime, setCollectionTime] = useState('morning');

  useEffect(() => {
    document.body.classList.add('update-order-page-body');
    
    return () => {
      document.body.classList.remove('update-order-page-body');
    };
  }, []);

  // Handle the collection time selection
  const handleTimeChange = (e) => {
    setCollectionTime(e.target.value);
  };

  // Handle the update button click
  const handleUpdate = async () => {
    // Capitalize the first letter and make the rest lowercase
    const capitalizedCollectionTime = collectionTime.charAt(0).toUpperCase() + collectionTime.slice(1).toLowerCase();

    const validTimes = ['Morning', 'Afternoon', 'Evening'];

    // Validate the selected collection time
    if (!validTimes.includes(capitalizedCollectionTime)) {
      alert('Invalid collection time selected.');
      return;
    }

    try {
      const response = await fetch(`http://localhost:5002/api/checkout/update-collection-time/${checkoutId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ collectionTime: capitalizedCollectionTime }),
      });

      const data = await response.json();

      if (response.ok) {
        alert('Collection time updated successfully.');
      } else {
        alert(data.message || 'Failed to update collection time.');
      }
    } catch (err) {
      console.error('Error:', err);
      alert('An error occurred while updating collection time.');
    }
  };

  return (
    <div className="update-order-page">
      <p><strong>Checkout ID:</strong> {checkoutId}</p>

      <div className="dropdown-container">
        <label htmlFor="time-slot" className="dropdown-label">
          Select a Time Slot:
        </label>
        <select 
          id="time-slot" 
          className="time-slot-dropdown" 
          value={collectionTime}
          onChange={handleTimeChange}
        >
          <option value="morning">Morning (9 AM - 12 PM)</option>
          <option value="afternoon">Afternoon (12 PM - 3 PM)</option>
          <option value="evening">Evening (3 PM - 6 PM)</option>
        </select>
      </div>

      <button className="update-button" onClick={handleUpdate}>Update</button>
    </div>
  );
};

export default UpdateOrderPage;
