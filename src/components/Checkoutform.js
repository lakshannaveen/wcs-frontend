import React, { useState } from 'react';
import './Checkoutform.css';

function Checkoutform() {
  const [formErrors, setFormErrors] = useState({
    email: '',
    phone: '',
    recipient: {
      firstName: '',
      lastName: '',
      zipCode: '',
      phone: ''
    },
    plan: '',
    wasteAmount: '',
    paymentMethod: '',
    terms: ''
  });

  const [hasSubmitted, setHasSubmitted] = useState(false); // Track form submission

  const [senderDetails, setSenderDetails] = useState({
    firstName: '',
    lastName: '',
    zipCode: '',
    phone: '',
    email: '',
    wasteAmount: '',
    selectedPlan: '', // Track selected plan
  });

  const [recipientDetails, setRecipientDetails] = useState({
    firstName: '',
    lastName: '',
    zipCode: '',
    phone: ''
  });

  const [isRecipientSame, setIsRecipientSame] = useState(false); // Track if sender and recipient are the same

  const [paymentDetails, setPaymentDetails] = useState({
    paymentMethod: '',
    agreedToTerms: false
  });

  const handleSenderChange = (e) => {
    const { name, value } = e.target;
    setSenderDetails({ ...senderDetails, [name]: value });

    // Auto-fill recipient fields if checkbox is checked
    if (isRecipientSame && (name === 'firstName' || name === 'lastName' || name === 'zipCode' || name === 'phone')) {
      setRecipientDetails({
        ...recipientDetails,
        [name]: value
      });
    }
  };

  const handleRecipientChange = (e) => {
    const { name, value } = e.target;
    setRecipientDetails({ ...recipientDetails, [name]: value });
  };

  const handlePlanChange = (e) => {
    const { value } = e.target;
    setSenderDetails({ ...senderDetails, selectedPlan: value });
  };

  const handleCheckboxChange = () => {
    setIsRecipientSame(!isRecipientSame);

    // Auto-fill recipient details if checkbox is checked
    if (!isRecipientSame) {
      setRecipientDetails({
        firstName: senderDetails.firstName,
        lastName: senderDetails.lastName,
        zipCode: senderDetails.zipCode,
        phone: senderDetails.phone
      });
    } else {
      // Reset recipient details if checkbox is unchecked
      setRecipientDetails({
        firstName: '',
        lastName: '',
        zipCode: '',
        phone: ''
      });
    }
  };

  const handlePaymentChange = (e) => {
    const { name, value } = e.target;
    setPaymentDetails({ ...paymentDetails, [name]: value });
  };

  const handleTermsChange = () => {
    setPaymentDetails({ ...paymentDetails, agreedToTerms: !paymentDetails.agreedToTerms });
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
      },
      plan: '',
      wasteAmount: '',
      paymentMethod: '',
      terms: ''
    };

    // Validate email
    const email = senderDetails.email;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      errors.email = 'Please enter a valid email address.';
    }

    // Validate phone number
    const phone = senderDetails.phone;
    const phoneRegex = /^\d{10}$/; // Assuming phone number should be 10 digits
    if (!phone || !phoneRegex.test(phone)) {
      errors.phone = 'Please enter a valid phone number.';
    }

    // Validate sender details
    const { firstName, lastName, zipCode, wasteAmount } = senderDetails;

    if (!firstName) errors.firstName = 'First Name is required.';
    if (!lastName) errors.lastName = 'Last Name is required.';
    if (!zipCode) errors.zipCode = 'Zip Code is required.';
    if (!wasteAmount || wasteAmount <= 0) errors.wasteAmount = 'Waste amount must be greater than 0.';

    // Validate recipient details
    const { firstName: recipientFirstName, lastName: recipientLastName, zipCode: recipientZipCode, phone: recipientPhone } = recipientDetails;

    if (!recipientFirstName) errors.recipient.firstName = 'Recipient First Name is required.';
    if (!recipientLastName) errors.recipient.lastName = 'Recipient Last Name is required.';
    if (!recipientZipCode) errors.recipient.zipCode = 'Recipient Zip Code is required.';
    if (!recipientPhone) errors.recipient.phone = 'Recipient Phone Number is required.';

    // Check if at least one plan is selected
    const planSelected = senderDetails.selectedPlan;
    if (!planSelected) {
      errors.plan = 'Please select a plan.';
    }

    // Validate payment method
    const paymentMethod = paymentDetails.paymentMethod;
    if (!paymentMethod) {
      errors.paymentMethod = 'Please select a payment method.';
    }

    // Validate terms and conditions
    if (!paymentDetails.agreedToTerms) {
      errors.terms = 'You must agree to the terms and conditions.';
    }

    setFormErrors(errors);
    return Object.values(errors).every((error) => error === '' && typeof error === 'object' && Object.values(error).every(e => e === ''));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setHasSubmitted(true); // Mark the form as submitted
    if (validateForm()) {
      // Proceed with order submission
      alert('Order Placed Successfully!');
    } else {
      alert('Please fix the errors before submitting.');
    }
  };

  return (
    <div className="checkout-container">
      <h2 className="checkout-header">CHECKOUT</h2>
      <div className="checkout-forms">
        <div className="form-section">
          <h3>Sender & Recipient Details</h3>
          <form className="sender-form" onSubmit={handleSubmit}>
            {/* Sender details form */}
            <div className="input-group">
              <label>First Name*</label>
              <input
                type="text"
                name="firstName"
                value={senderDetails.firstName}
                placeholder="First Name"
                onChange={handleSenderChange}
              />
              {hasSubmitted && formErrors.firstName && <p className="error">{formErrors.firstName}</p>}
            </div>
            <div className="input-group">
              <label>Last Name*</label>
              <input
                type="text"
                name="lastName"
                value={senderDetails.lastName}
                placeholder="Last Name"
                onChange={handleSenderChange}
              />
              {hasSubmitted && formErrors.lastName && <p className="error">{formErrors.lastName}</p>}
            </div>
            <div className="input-group">
              <label>Zip Code*</label>
              <input
                type="text"
                name="zipCode"
                value={senderDetails.zipCode}
                placeholder="Zip Code"
                onChange={handleSenderChange}
              />
              {hasSubmitted && formErrors.zipCode && <p className="error">{formErrors.zipCode}</p>}
            </div>
            <div className="input-group">
              <label>Phone Number*</label>
              <input
                type="tel"
                name="phone"
                value={senderDetails.phone}
                placeholder="Phone Number"
                onChange={handleSenderChange}
              />
              {hasSubmitted && formErrors.phone && <p className="error">{formErrors.phone}</p>}
            </div>
            <div className="input-group">
              <label>Email*</label>
              <input
                type="email"
                name="email"
                value={senderDetails.email}
                placeholder="Email"
                onChange={handleSenderChange}
              />
              {hasSubmitted && formErrors.email && <p className="error">{formErrors.email}</p>}
            </div>

            {/* Plan selection */}
            <div className="input-group">
              <label>Your Plan</label>
              <div className="checkbox-group">
                <label>
                  <input
                    type="radio"
                    name="plan"
                    value="Daily"
                    checked={senderDetails.selectedPlan === 'Daily'}
                    onChange={handlePlanChange}
                  /> Daily
                </label>
                <label>
                  <input
                    type="radio"
                    name="plan"
                    value="Weekly"
                    checked={senderDetails.selectedPlan === 'Weekly'}
                    onChange={handlePlanChange}
                  /> Weekly
                </label>
                <label>
                  <input
                    type="radio"
                    name="plan"
                    value="Monthly"
                    checked={senderDetails.selectedPlan === 'Monthly'}
                    onChange={handlePlanChange}
                  /> Monthly
                </label>
              </div>
              {hasSubmitted && formErrors.plan && <p className="error">{formErrors.plan}</p>}
            </div>

            {/* Waste amount */}
            <div className="input-group">
              <label>Waste Amount*</label>
              <div className="input-with-kg">
                <input
                  type="number"
                  name="wasteAmount"
                  min="0"
                  step="1"
                  value={senderDetails.wasteAmount}
                  onChange={handleSenderChange}
                  placeholder="0"
                />
                <span>kg</span>
              </div>
              {hasSubmitted && formErrors.wasteAmount && <p className="error">{formErrors.wasteAmount}</p>}
            </div>

            {/* Recipient details form */}
            <h3>Recipient Details</h3>
            <div className="checkbox-group">
              <label>
                <input
                  type="checkbox"
                  checked={isRecipientSame}
                  onChange={handleCheckboxChange}
                /> Recipient is the same as sender
              </label>
            </div>
            <div className="input-group">
              <label>Recipient First Name*</label>
              <input
                type="text"
                name="firstName"
                value={recipientDetails.firstName}
                onChange={handleRecipientChange}
                disabled={isRecipientSame} // Disable input if checkbox is checked
              />
              {hasSubmitted && formErrors.recipient.firstName && <p className="error">{formErrors.recipient.firstName}</p>}
            </div>
            <div className="input-group">
              <label>Recipient Last Name*</label>
              <input
                type="text"
                name="lastName"
                value={recipientDetails.lastName}
                onChange={handleRecipientChange}
                disabled={isRecipientSame} // Disable input if checkbox is checked
              />
              {hasSubmitted && formErrors.recipient.lastName && <p className="error">{formErrors.recipient.lastName}</p>}
            </div>
            <div className="input-group">
              <label>Recipient Zip Code*</label>
              <input
                type="text"
                name="zipCode"
                value={recipientDetails.zipCode}
                onChange={handleRecipientChange}
                disabled={isRecipientSame} // Disable input if checkbox is checked
              />
              {hasSubmitted && formErrors.recipient.zipCode && <p className="error">{formErrors.recipient.zipCode}</p>}
            </div>
            <div className="input-group">
              <label>Recipient Phone Number*</label>
              <input
                type="tel"
                name="phone"
                value={recipientDetails.phone}
                onChange={handleRecipientChange}
                disabled={isRecipientSame} // Disable input if checkbox is checked
              />
              {hasSubmitted && formErrors.recipient.phone && <p className="error">{formErrors.recipient.phone}</p>}
            </div>

            {/* Payment method */}
            <h3>Payment Details</h3>
            <div className="input-group">
              <label>Payment Method</label>
              <div className="radio-group">
                <label>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="Online"
                    onChange={handlePaymentChange}
                  /> Online Payment
                </label>
                <label>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="Cash"
                    onChange={handlePaymentChange}
                  /> Cash on Delivery
                </label>
              </div>
              {hasSubmitted && formErrors.paymentMethod && <p className="error">{formErrors.paymentMethod}</p>}
            </div>

            {/* Terms and Conditions */}
            <div className="checkbox-group">
              <label>
                <input
                  type="checkbox"
                  checked={paymentDetails.agreedToTerms}
                  onChange={handleTermsChange}
                /> I agree to the Terms and Conditions
              </label>
              {hasSubmitted && formErrors.terms && <p className="error">{formErrors.terms}</p>}
            </div>

            <button type="submit" className="submit-btn">
              Place Order
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Checkoutform;
