import React, { useState } from 'react';
import './Checkoutform.css';

function Checkoutform() {
  const [showRecipientForm, setShowRecipientForm] = useState(true);
  const [formErrors, setFormErrors] = useState({
    email: '',
    phone: '',
    recipient: {
      firstName: '',
      lastName: '',
      zipCode: '',
      phone: ''
    }
  });

  const handleNoOrderReceptionChange = () => {
    setShowRecipientForm((prevState) => !prevState);
  };

  const validateForm = () => {
    let errors = {
      email: '',
      phone: '',
      recipient: {
        firstName: '',
        lastName: '',
        zipCode: '',
        phone: ''
      }
    };

    // Validate email
    const email = document.querySelector('input[type="email"]').value;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      errors.email = 'Please enter a valid email address.';
    }

    // Validate phone number
    const phone = document.querySelector('input[type="tel"]').value;
    const phoneRegex = /^\d{10}$/; // Assuming phone number should be 10 digits
    if (!phone || !phoneRegex.test(phone)) {
      errors.phone = 'Please enter a valid phone number.';
    }

    // Validate recipient details if not same as sender
    if (!showRecipientForm) {
      const recipientFirstName = document.querySelector('input[name="recipientFirstName"]').value;
      const recipientLastName = document.querySelector('input[name="recipientLastName"]').value;
      const recipientZipCode = document.querySelector('input[name="recipientZipCode"]').value;
      const recipientPhone = document.querySelector('input[name="recipientPhone"]').value;

      if (!recipientFirstName) errors.recipient.firstName = 'Recipient First Name is required.';
      if (!recipientLastName) errors.recipient.lastName = 'Recipient Last Name is required.';
      if (!recipientZipCode) errors.recipient.zipCode = 'Recipient Zip Code is required.';
      if (!recipientPhone) errors.recipient.phone = 'Recipient Phone Number is required.';
    }

    setFormErrors(errors);
    return Object.values(errors).every((error) => error === '' && typeof error === 'object' && Object.values(error).every(e => e === ''));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateForm()) {
      // Proceed with order submission
      alert('Order Placed Successfully!');
    } else {
      alert('Please fix the errors before submitting.');
    }
  };

  return (
    <div className="checkout-container">
      <h2 className="checkout-header">CHECKOUTS</h2>
      <div className="checkout-forms">
        <div className="form-section">
          <h3>Sender Details</h3>
          <form className="sender-form" onSubmit={handleSubmit}>
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
              {formErrors.phone && <p className="error">{formErrors.phone}</p>}
            </div>
            <div className="input-group">
              <label>Email*</label>
              <input type="email" placeholder="Email" />
              {formErrors.email && <p className="error">{formErrors.email}</p>}
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
                 Recipient details same as sender
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
                <input type="text" name="recipientFirstName" placeholder="First Name" />
                {formErrors.recipient.firstName && <p className="error">{formErrors.recipient.firstName}</p>}
              </div>
              <div className="input-group">
                <label>Last Name*</label>
                <input type="text" name="recipientLastName" placeholder="Last Name" />
                {formErrors.recipient.lastName && <p className="error">{formErrors.recipient.lastName}</p>}
              </div>
              <div className="input-group">
                <label>Zip Code*</label>
                <input type="text" name="recipientZipCode" placeholder="Zip Code" />
                {formErrors.recipient.zipCode && <p className="error">{formErrors.recipient.zipCode}</p>}
              </div>
              <div className="input-group">
                <label>Phone Number*</label>
                <input type="tel" name="recipientPhone" placeholder="Phone Number" />
                {formErrors.recipient.phone && <p className="error">{formErrors.recipient.phone}</p>}
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
          <button type="submit" className="place-order-button">Place Order</button>
        </div>
      </div>
    </div>
  );
}

export default Checkoutform;
