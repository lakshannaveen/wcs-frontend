import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './UpdateOrderPage.css';

const UpdateOrderPage = () => {
  const { checkoutId } = useParams();

  useEffect(() => {
    document.body.classList.add('update-order-page-body');
    
    return () => {
      document.body.classList.remove('update-order-page-body');
    };
  }, []);

  return (
    <div className="update-order-page">
      <p><strong>Checkout ID:</strong> {checkoutId}</p>

      <div className="dropdown-container">
        <label htmlFor="time-slot" className="dropdown-label">
          Select a Time Slot:
        </label>
        <select id="time-slot" className="time-slot-dropdown">
          <option value="morning">Morning (9 AM - 12 PM)</option>
          <option value="afternoon">Afternoon (12 PM - 3 PM)</option>
          <option value="evening">Evening (3 PM - 6 PM)</option>
        </select>
      </div>

      <button className="update-button">Update</button>
    </div>
  );
};

export default UpdateOrderPage;
