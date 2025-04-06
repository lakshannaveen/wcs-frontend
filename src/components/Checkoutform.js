import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useNavigate } from 'react-router-dom';
import './Checkoutform.css';

function Checkoutform() {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const [formErrors, setFormErrors] = useState({
    email: '',
    phone: '',
    recipient: {
      firstName: '',
      lastName: '',
      zipCode: '',
      phone: ''
    },
    paymentMethod: '',
    terms: ''
  });

  const [wasteCollectionTime, setWasteCollectionTime] = useState('');
  const [timeError, setTimeError] = useState('');
  const [hasSubmitted, setHasSubmitted] = useState(false); // Track form submission

  const [senderDetails, setSenderDetails] = useState({
    firstName: '',
    lastName: '',
    zipCode: '',
    phone: '',
    email: '',
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

  const handleTimeChange = (e) => {
    setWasteCollectionTime(e.target.value);
    setTimeError(''); // Clear error when user selects a time
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
      paymentMethod: '',
      terms: ''
    };
    let isValid = true;

    // Validate email
    const email = senderDetails.email;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      errors.email = 'Please enter a valid email address.';
      isValid = false;
    }

    // Validate Waste Collection Time
    if (!wasteCollectionTime) {
      setTimeError('You must select a waste collection time.');
      isValid = false;
    }

    // Validate sender phone number (10 digits)
    const senderPhone = senderDetails.phone;
    const phoneRegex = /^\d{10}$/; // Phone number should be exactly 10 digits
    if (!senderPhone || !phoneRegex.test(senderPhone)) {
      errors.phone = 'Please enter a valid 10-digit phone number.';
      isValid = false;
    }

    // Validate sender details
    const { firstName, lastName, zipCode } = senderDetails;

    if (!firstName) {
      errors.firstName = 'First Name is required.';
      isValid = false;
    }
    if (!lastName) {
      errors.lastName = 'Last Name is required.';
      isValid = false;
    }
    
    // Validate sender zip code (numeric, max 6 digits)
    const zipCodeRegex = /^\d{1,6}$/; // Zip code should be numeric and maximum 6 digits
    if (!zipCode || !zipCodeRegex.test(zipCode)) {
      errors.zipCode = 'Please enter a valid zip code (up to 6 digits).';
      isValid = false;
    }

    // Skip recipient fields validation if "Recipient is the same as sender" is checked
    if (!isRecipientSame) {
      const { firstName: recipientFirstName, lastName: recipientLastName, zipCode: recipientZipCode, phone: recipientPhone } = recipientDetails;

      if (!recipientFirstName) {
        errors.recipient.firstName = 'Recipient First Name is required.';
        isValid = false;
      }
      if (!recipientLastName) {
        errors.recipient.lastName = 'Recipient Last Name is required.';
        isValid = false;
      }
      // Validate recipient zip code (numeric, max 6 digits)
      if (!recipientZipCode || !zipCodeRegex.test(recipientZipCode)) {
        errors.recipient.zipCode = 'Please enter a valid recipient zip code (up to 6 digits).';
        isValid = false;
      }

      // Validate recipient phone number (10 digits)
      if (!recipientPhone || !phoneRegex.test(recipientPhone)) {
        errors.recipient.phone = 'Please enter a valid 10-digit recipient phone number.';
        isValid = false;
      }
    }

    // Validate payment method
    const paymentMethod = paymentDetails.paymentMethod;
    if (!paymentMethod) {
      errors.paymentMethod = 'Please select a payment method.';
      isValid = false;
    }

    // Validate terms and conditions
    if (!paymentDetails.agreedToTerms) {
      errors.terms = 'You must agree to the terms and conditions.';
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  const mappagedata = JSON.parse(sessionStorage.getItem('mappagedata'));
  const price = mappagedata ? mappagedata.subscriptionPrice.toFixed(2) : '0.00';  // Format to two decimal places, default to '0.00'
  
  const handleSubmit = (event) => {
    event.preventDefault();
    setHasSubmitted(true);
    
    if (validateForm()) {
      const mappagedata = JSON.parse(sessionStorage.getItem('mappagedata'));
      // Check if mappagedata or userId is missing
      if (!mappagedata || !mappagedata.userId) {
        alert("User ID is missing! Please go back and select a location.");
        return;
      }
  
      const userId = mappagedata.userId;
      const price = mappagedata.subscriptionPrice;
  
      if (!price) {
        alert("Price is missing! Please go back and select a subscription.");
        return;
      }
  
      const checkoutpagedata = {
        senderDetails,
        recipientDetails,
        wasteCollectionTime,
        paymentDetails,
        mapPageData: {
          ...mappagedata,
          subscriptionType: mappagedata.subscriptionPlan || null,
          selectedDates: mappagedata.selectedDates || null,
          selectedDays: mappagedata.selectedDays || null,
          price,
        },
        user_id: userId,
        selected_days: Array.isArray(mappagedata.selectedDays) ? mappagedata.selectedDays : [mappagedata.selectedDays],
        selected_dates: Array.isArray(mappagedata.selectedDates) ? mappagedata.selectedDates : [mappagedata.selectedDates],
      };
  
      sessionStorage.setItem('checkoutpagedata', JSON.stringify(checkoutpagedata));
  
      alert('Your order is being processed...');
  
      setTimeout(() => {
        const storedCheckoutPageData = JSON.parse(sessionStorage.getItem('checkoutpagedata'));
  
        if (storedCheckoutPageData.paymentDetails.paymentMethod === "Online") {
          navigate("/payment");
        } else {
          fetch("http://localhost:5002/api/checkout/order", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              orderDetails: storedCheckoutPageData.paymentDetails,
              checkoutDetails: storedCheckoutPageData,
              userId: userId,
            }),
          })
          .then((response) => response.json())
          .then((data) => {
            if (data.message === "Order placed successfully") {
              const checkoutId = data.checkoutId;
              sessionStorage.setItem('checkoutId', checkoutId);
              storedCheckoutPageData.checkoutId = checkoutId;
              sessionStorage.setItem('checkoutpagedata', JSON.stringify(storedCheckoutPageData));
              alert("Order placed successfully!");
              navigate("/bill");
            } else {
              alert(data.message || "Failed to place order.");
            }
          })
          .catch((error) => {
            console.error("Error placing order:", error);
            alert("There was an error processing your order. Please try again.");
          });
        }
      }, 3000);
    } else {
      alert("Please fix the errors before submitting.");
    }
  };
  
  return (
    <div className={`checkout-page ${theme}`}>
      <div className={`checkout-container ${theme}`}>
        <h2 className={`checkout-header ${theme}`}>CHECKOUT</h2>
        <div className={`checkout-forms ${theme}`}>
          {/* Sender Details */}
          <div className={`form-section ${theme}`}>
            <h3 className="section-title">Sender Details</h3>
            <form className={`sender-form ${theme}`} onSubmit={handleSubmit}>
              <div className={`input-group ${theme}`}>
                <label>First Name*</label>
                <input
                  type="text"
                  name="firstName"
                  value={senderDetails.firstName}
                  placeholder="First Name"
                  onChange={handleSenderChange}
                  className={hasSubmitted && formErrors.firstName ? 'error-border' : ''}
                />
                {hasSubmitted && formErrors.firstName && <p className="error-message">{formErrors.firstName}</p>}
              </div>
              <div className={`input-group ${theme}`}>
                <label>Last Name*</label>
                <input
                  type="text"
                  name="lastName"
                  value={senderDetails.lastName}
                  placeholder="Last Name"
                  onChange={handleSenderChange}
                  className={hasSubmitted && formErrors.lastName ? 'error-border' : ''}
                />
                {hasSubmitted && formErrors.lastName && <p className="error-message">{formErrors.lastName}</p>}
              </div>
              <div className={`input-group ${theme}`}>
                <label>Zip Code*</label>
                <input
                  type="text"
                  name="zipCode"
                  value={senderDetails.zipCode}
                  placeholder="Zip Code"
                  onChange={handleSenderChange}
                  className={hasSubmitted && formErrors.zipCode ? 'error-border' : ''}
                />
                {hasSubmitted && formErrors.zipCode && <p className="error-message">{formErrors.zipCode}</p>}
              </div>
              <div className={`input-group ${theme}`}>
                <label>Phone Number*</label>
                <input
                  type="tel"
                  name="phone"
                  value={senderDetails.phone}
                  placeholder="Phone Number"
                  onChange={handleSenderChange}
                  className={hasSubmitted && formErrors.phone ? 'error-border' : ''}
                />
                {hasSubmitted && formErrors.phone && <p className="error-message">{formErrors.phone}</p>}
              </div>
              <div className={`input-group ${theme}`}>
                <label>Email*</label>
                <input
                  type="email"
                  name="email"
                  value={senderDetails.email}
                  placeholder="Email"
                  onChange={handleSenderChange}
                  className={hasSubmitted && formErrors.email ? 'error-border' : ''}
                />
                {hasSubmitted && formErrors.email && <p className="error-message">{formErrors.email}</p>}
              </div>

              <div className={`input-group ${theme}`}>
                <label className={`timelable ${theme}`}>Waste Collection Time*</label>
                <select 
                  name="wasteCollectionTime" 
                  value={wasteCollectionTime} 
                  onChange={handleTimeChange} 
                  className={`time-dropdown ${theme} ${hasSubmitted && timeError ? 'error-border' : ''}`}
                >
                  <option value="">Select a time</option>
                  <option value="Morning">Morning (9AM-12PM)</option>
                  <option value="Afternoon">Afternoon (12PM-3PM)</option>
                  <option value="Evening">Evening (3PM-6PM)</option>
                </select>
                {hasSubmitted && timeError && <p className="error-message">{timeError}</p>}
              </div>

              <div className={`checkbox-group ${theme}`}>
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

          {/* Recipient Details */}
          <div className={`form-section ${theme}`}>
            <h3 className="section-title">Recipient Details</h3>
            <div className={`input-group ${theme}`}>
              <label>First Name*</label>
              <input
                type="text"
                name="firstName"
                value={recipientDetails.firstName}
                placeholder="Recipient First Name"
                onChange={handleRecipientChange}
                disabled={isRecipientSame}
                className={hasSubmitted && formErrors.recipient.firstName ? 'error-border' : ''}
              />
              {hasSubmitted && formErrors.recipient.firstName && !isRecipientSame && <p className="error-message">{formErrors.recipient.firstName}</p>}
            </div>
            <div className={`input-group ${theme}`}>
              <label>Last Name*</label>
              <input
                type="text"
                name="lastName"
                value={recipientDetails.lastName}
                placeholder="Recipient Last Name"
                onChange={handleRecipientChange}
                disabled={isRecipientSame}
                className={hasSubmitted && formErrors.recipient.lastName ? 'error-border' : ''}
              />
              {hasSubmitted && formErrors.recipient.lastName && !isRecipientSame && <p className="error-message">{formErrors.recipient.lastName}</p>}
            </div>
            <div className={`input-group ${theme}`}>
              <label>Zip Code*</label>
              <input
                type="text"
                name="zipCode"
                value={recipientDetails.zipCode}
                placeholder="Recipient Zip Code"
                onChange={handleRecipientChange}
                disabled={isRecipientSame}
                className={hasSubmitted && formErrors.recipient.zipCode ? 'error-border' : ''}
              />
              {hasSubmitted && formErrors.recipient.zipCode && !isRecipientSame && <p className="error-message">{formErrors.recipient.zipCode}</p>}
            </div>
            <div className={`input-group ${theme}`}>
              <label>Phone Number*</label>
              <input
                type="tel"
                name="phone"
                value={recipientDetails.phone}
                placeholder="Recipient Phone Number"
                onChange={handleRecipientChange}
                disabled={isRecipientSame}
                className={hasSubmitted && formErrors.recipient.phone ? 'error-border' : ''}
              />
              {hasSubmitted && formErrors.recipient.phone && !isRecipientSame && <p className="error-message">{formErrors.recipient.phone}</p>}
            </div>
          </div>

          {/* Payment Details - Centered */}
          <div className={`payment-section ${theme}`}>
            <h3 className="section-title">Payment Details</h3>
            <div className={`radio-group ${theme}`}>
              <label>
                <input
                  type="radio"
                  name="paymentMethod"
                  value="Online"
                  onChange={handlePaymentChange}
                  checked={paymentDetails.paymentMethod === 'Online'}
                  className={hasSubmitted && formErrors.paymentMethod ? 'error-radio' : ''}
                /> Online Payment
              </label>
              <label>
                <input
                  type="radio"
                  name="paymentMethod"
                  value="Cash"
                  onChange={handlePaymentChange}
                  checked={paymentDetails.paymentMethod === 'Cash'}
                  className={hasSubmitted && formErrors.paymentMethod ? 'error-radio' : ''}
                /> Cash on Delivery
              </label>
              {hasSubmitted && formErrors.paymentMethod && <p className="error-message">{formErrors.paymentMethod}</p>}
            </div>

            <div className={`checkbox-group ${theme}`}>
              <label>
                <input
                  type="checkbox"
                  checked={paymentDetails.agreedToTerms}
                  onChange={handleTermsChange}
                  className={hasSubmitted && formErrors.terms ? 'error-checkbox' : ''}
                />  
                I agree to the  
                <a href="/teamsandconditions" target="_blank" rel="noopener noreferrer"> terms and conditions</a>
              </label>
              {hasSubmitted && formErrors.terms && <p className="error-message">{formErrors.terms}</p>}
            </div>

            <div className={`important-note ${theme}`}>
              <strong>Important:</strong><p className={`guidelines-text ${theme}`}> Waste disposal guidelines are essential for proper waste management.</p>
              <a href="/customguidance" className="check-waste-guidance" target="_blank" rel="noopener noreferrer">
                Click here for more information on waste disposal
              </a>
            </div>

            <button type="submit" className="place-order-button" onClick={handleSubmit}>
              Place Order - LKR {price}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkoutform;