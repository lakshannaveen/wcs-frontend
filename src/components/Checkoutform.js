import React, { useState } from 'react';
import './Checkoutform.css';

function Checkoutform() {
  const [showRecipientForm, setShowRecipientForm] = useState(true);

  const handleNoOrderReceptionChange = () => {
    setShowRecipientForm((prevState) => !prevState);
  };

  return (
    <div className="checkout-container">
      <h2 className="checkout-header">CHECKOUTS</h2>
      <div className="checkout-forms">
        <div className="form-section">
          <h3>Sender Details</h3>
          <form className="sender-form">
            <div className="input-group">
              <label>Title</label>
              <select>
                <option>Mr.</option>
                <option>Ms.</option>
              </select>
            </div>
            <div className="input-group">
              <label>First Name*</label>
              <input type="text" placeholder="First Name" />
            </div>
            <div className="input-group">
              <label>Last Name*</label>
              <input type="text" placeholder="Last Name" />
            </div>
            <div className="input-group">
              <label>Zip Code*</label>
              <input type="text" placeholder="Zip Code" />
            </div>
            <div className="input-group">
              <label>Phone Number*</label>
              <input type="tel" placeholder="Phone Number" />
            </div>
            <div className="input-group">
              <label>Email*</label>
              <input type="email" placeholder="Email" />
            </div>
            <div className="input-group">
              <label>Your Plan</label>
              <div className="checkbox-group">
                <label><input type="checkbox" /> Daily</label>
                <label><input type="checkbox" /> Weekly</label>
                <label><input type="checkbox" /> Monthly</label>
              </div>
            </div>
            <div className="input-group">
              <label>Waste Amount*</label>
              <div className="input-with-kg">
                <input type="number" min="0" step="1" placeholder="0" />
                <span>kg</span>
              </div>
            </div>
            <div className="input-group checkbox-group-bottom">
              
              <label>
                <input
                  type="checkbox"
                  onChange={handleNoOrderReceptionChange}
                />{' '}
                same as sender
              </label>
            </div>
          </form>
        </div>
        {showRecipientForm && (
          <div className="form-section">
            <h3>Recipient Details</h3>
            <form className="recipient-form">
              <div className="input-group">
                <label>Title</label>
                <select>
                  <option>Mr.</option>
                  <option>Ms.</option>
                </select>
              </div>
              <div className="input-group">
                <label>First Name*</label>
                <input type="text" placeholder="First Name" />
              </div>
              <div className="input-group">
                <label>Last Name*</label>
                <input type="text" placeholder="Last Name" />
              </div>
              <div className="input-group">
                <label>Zip Code*</label>
                <input type="text" placeholder="Zip Code" />
              </div>
              <div className="input-group">
                <label>Phone Number*</label>
                <input type="tel" placeholder="Phone Number" />
              </div>
            </form>
          </div>
        )}
      </div>
      <div className="order-payment-box">
        <div className="order-details">
          <h3>Payment Details</h3>
          <div className="payment-options">
            <label><input type="radio" name="payment" /> Pay Online</label>
            <label><input type="radio" name="payment" /> Pay Cash</label>
          </div>
        </div>
        <div className="terms">
          <label>
            <input type="checkbox" /> I have agreed to the Terms and Conditions.
          </label>
          <button className="place-order-button">Place Order</button>
        </div>
      </div>
    </div>
  );
}

export default Checkoutform;
