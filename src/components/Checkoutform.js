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
        zipCode: '',  // Added validation for recipient zipCode
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
  
    // Validate sender phone number (10 digits)
    const senderPhone = senderDetails.phone;
    const phoneRegex = /^\d{10}$/; // Phone number should be exactly 10 digits
    if (!senderPhone || !phoneRegex.test(senderPhone)) {
      errors.phone = 'Please enter a valid 10-digit phone number.';
    }
  
    // Validate sender details
    const { firstName, lastName, zipCode, wasteAmount } = senderDetails;
  
    if (!firstName) errors.firstName = 'First Name is required.';
    if (!lastName) errors.lastName = 'Last Name is required.';
    
    // Validate sender zip code (numeric, max 6 digits)
    const zipCodeRegex = /^\d{1,6}$/; // Zip code should be numeric and maximum 6 digits
    if (!zipCode || !zipCodeRegex.test(zipCode)) {
      errors.zipCode = 'Please enter a valid zip code (up to 6 digits).';
    }
  
    if (!wasteAmount || wasteAmount <= 0) errors.wasteAmount = 'Waste amount must be greater than 0.';
  
    // Skip recipient fields validation if "Recipient is the same as sender" is checked
    if (!isRecipientSame) {
      const { firstName: recipientFirstName, lastName: recipientLastName, zipCode: recipientZipCode, phone: recipientPhone } = recipientDetails;
  
      if (!recipientFirstName) errors.recipient.firstName = 'Recipient First Name is required.';
      if (!recipientLastName) errors.recipient.lastName = 'Recipient Last Name is required.';
      
      // Validate recipient zip code (numeric, max 6 digits)
      if (!recipientZipCode || !zipCodeRegex.test(recipientZipCode)) {
        errors.recipient.zipCode = 'Please enter a valid recipient zip code (up to 6 digits).';
      }
  
      // Validate recipient phone number (10 digits)
      if (!recipientPhone || !phoneRegex.test(recipientPhone)) {
        errors.recipient.phone = 'Please enter a valid 10-digit recipient phone number.';
      }
    }
  
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
  
    // Check if all errors are resolved
    return Object.values(errors).every((error) => {
      if (typeof error === 'object') {
        return Object.values(error).every(e => e === '');  // Check nested errors
      }
      return error === '';  // Check top-level errors
    });
  };
  
  
  const handleSubmit = (event) => {
    event.preventDefault();
    setHasSubmitted(true); // Mark the form as submitted
    
    if (validateForm()) {
      // Proceed to payment page or submit the form
      alert('Order Placed Successfully!');
      // Redirect to the payment page
      // For example, using react-router-dom
      window.location.href = '/payment';  // You can use `history.push('/payment')` if you are using react-router.
    } else {
      alert('Please fix the errors before submitting.');
    }
  };
  

  return (
    <div className="checkout-container">
      <h2 className="checkout-header">CHECKOUT</h2>
      <div className="checkout-forms">
        <div className="form-section">
          <h3>Sender Details</h3>
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
                <span className="kg">kg</span>
              </div>
              {hasSubmitted && formErrors.wasteAmount && <p className="error">{formErrors.wasteAmount}</p>}
            </div>

            {/* Recipient Same As Sender Checkbox */}
            <div className="checkbox-group">
              <label>
                <input
                  type="checkbox"
                  checked={isRecipientSame}
                  onChange={handleCheckboxChange}
                /> Recipient is the same as sender
              </label>
            </div>
          </form>
        </div>

        <div className="form-section">
          <h3>Recipient Details</h3>
          <div className="input-group">
            <label>First Name*</label>
            <input
              type="text"
              name="firstName"
              value={recipientDetails.firstName}
              placeholder="Recipient First Name"
              onChange={handleRecipientChange}
              disabled={isRecipientSame}
            />
            {hasSubmitted && formErrors.recipient.firstName && <p className="error">{formErrors.recipient.firstName}</p>}
          </div>
          <div className="input-group">
            <label>Last Name*</label>
            <input
              type="text"
              name="lastName"
              value={recipientDetails.lastName}
              placeholder="Recipient Last Name"
              onChange={handleRecipientChange}
              disabled={isRecipientSame}
            />
            {hasSubmitted && formErrors.recipient.lastName && <p className="error">{formErrors.recipient.lastName}</p>}
          </div>
          <div className="input-group">
            <label>Zip Code*</label>
            <input
              type="text"
              name="zipCode"
              value={recipientDetails.zipCode}
              placeholder="Recipient Zip Code"
              onChange={handleRecipientChange}
              disabled={isRecipientSame}
            />
            {hasSubmitted && formErrors.recipient.zipCode && <p className="error">{formErrors.recipient.zipCode}</p>}
          </div>
          <div className="input-group">
            <label>Phone Number*</label>
            <input
              type="tel"
              name="phone"
              value={recipientDetails.phone}
              placeholder="Recipient Phone Number"
              onChange={handleRecipientChange}
              disabled={isRecipientSame}
            />
            {hasSubmitted && formErrors.recipient.phone && <p className="error">{formErrors.recipient.phone}</p>}
          </div>
        </div>

        <div className="form-section">
          <h3>Payment Details</h3>
          <div className="radio-group">
            <label>
              <input
                type="radio"
                name="paymentMethod"
                value="Online"
                onChange={handlePaymentChange}
                checked={paymentDetails.paymentMethod === 'Online'}
              /> Online Payment
            </label>
            <label>
              <input
                type="radio"
                name="paymentMethod"
                value="Cash"
                onChange={handlePaymentChange}
                checked={paymentDetails.paymentMethod === 'Cash'}
              /> Cash on Delivery
            </label>
            {hasSubmitted && formErrors.paymentMethod && <p className="error">{formErrors.paymentMethod}</p>}
          </div>

          <div className="checkbox-group">
            <label>
              <input
                type="checkbox"
                checked={paymentDetails.agreedToTerms}
                onChange={handleTermsChange}
              /> I agree to the terms and conditions
            </label>
            {hasSubmitted && formErrors.terms && <p className="error">{formErrors.terms}</p>}
          </div>

          <button type="submit" onClick={handleSubmit}>Place Order</button>
        </div>
      </div>
    </div>
  );
}

export default Checkoutform;
