import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './UpdateOrderPage.css';

const UpdateOrderPage = () => {
  const { checkoutId } = useParams();
  const [collectionTime, setCollectionTime] = useState('morning');
  const [updateCount, setUpdateCount] = useState(0);
  const [isDisabled, setIsDisabled] = useState(false);

  useEffect(() => {
    document.body.classList.add('update-order-page-body');

    // Retrieve update count from localStorage
    const today = new Date().toISOString().split('T')[0]; // Get today's date as YYYY-MM-DD
    const storedData = JSON.parse(localStorage.getItem('updateCount')) || {};

    if (storedData.date === today) {
      setUpdateCount(storedData.count);
      setIsDisabled(storedData.count >= 2);
    } else {
      // Reset update count if it's a new day
      localStorage.setItem('updateCount', JSON.stringify({ date: today, count: 0 }));
    }

    return () => {
      document.body.classList.remove('update-order-page-body');
    };
  }, []);

  const handleTimeChange = (e) => {
    setCollectionTime(e.target.value);
  };

  const handleUpdate = async () => {
    if (updateCount >= 2) {
      alert('Today\'s update limit reached. Please try again tomorrow.');
      return;
    }

    const capitalizedCollectionTime = collectionTime.charAt(0).toUpperCase() + collectionTime.slice(1).toLowerCase();
    const validTimes = ['Morning', 'Afternoon', 'Evening'];

    if (!validTimes.includes(capitalizedCollectionTime)) {
      alert('Invalid collection time selected.');
      return;
    }

    try {
      const response = await fetch(`http://localhost:5002/api/checkout/update-collection-time/${checkoutId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ collectionTime: capitalizedCollectionTime }),
      });

      const data = await response.json();

      if (response.ok) {
        alert('Collection time updated successfully. Scheduled for tomorrow.');

        // Increase update count and store it
        const newCount = updateCount + 1;
        setUpdateCount(newCount);
        setIsDisabled(newCount >= 2);

        localStorage.setItem('updateCount', JSON.stringify({
          date: new Date().toISOString().split('T')[0],
          count: newCount,
        }));
      } else {
        alert(data.message || 'Failed to schedule collection time update.');
      }
    } catch (err) {
      console.error('Error:', err);
      alert('An error occurred while scheduling the collection time update.');
    }
  };

  return (
    <div className="update-order-page">
      <p><strong>Checkout ID:</strong> {checkoutId}</p>

      <div className="dropdown-container">
        <label htmlFor="time-slot" className="dropdown-label">Select a Time Slot:</label>
        <select 
          id="time-slot" 
          className="time-slot-dropdown" 
          value={collectionTime}
          onChange={handleTimeChange}
          disabled={isDisabled}
        >
          <option value="morning">Morning (9 AM - 12 PM)</option>
          <option value="afternoon">Afternoon (12 PM - 3 PM)</option>
          <option value="evening">Evening (3 PM - 6 PM)</option>
        </select>
      </div>

      <button className="update-button" onClick={handleUpdate} disabled={isDisabled}>
        {isDisabled ? 'Limit Reached' : 'Update'}
      </button>

      {isDisabled && <p className="error-message">Today's update limit is reached. Try again tomorrow.</p>}

      <div className="important-note">
        <strong>Important:</strong> Changes will take effect from the next collection day.
      </div>
    </div>
  );
};

export default UpdateOrderPage;
