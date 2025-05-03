import React, { useState } from 'react';
import './Checkoutform.css';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../translations/checkoutTranslations';



function Checkoutform() {
  const navigate = useNavigate();
  const { language, toggleLanguage } = useLanguage();
  const t = translations[language];

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

    // Validate email
    const email = senderDetails.email;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      errors.email = 'Please enter a valid email address.';
    }

    // Validate Waste Collection Time
    if (!wasteCollectionTime) {
      setTimeError('You must select a waste collection time.');
    }

    // Validate sender phone number (10 digits)
    const senderPhone = senderDetails.phone;
    const phoneRegex = /^\d{10}$/; // Phone number should be exactly 10 digits
    if (!senderPhone || !phoneRegex.test(senderPhone)) {
      errors.phone = 'Please enter a valid 10-digit phone number.';
    }

    // Validate sender details
    const { firstName, lastName, zipCode } = senderDetails;

    if (!firstName) errors.firstName = 'First Name is required.';
    if (!lastName) errors.lastName = 'Last Name is required.';
    
    // Validate sender zip code (numeric, max 6 digits)
    const zipCodeRegex = /^\d{1,6}$/; // Zip code should be numeric and maximum 6 digits
    if (!zipCode || !zipCodeRegex.test(zipCode)) {
      errors.zipCode = 'Please enter a valid zip code (up to 6 digits).';
    }

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

    // Validate payment method
    const paymentMethod = paymentDetails.paymentMethod;
    if (!paymentMethod) {
      errors.paymentMethod = 'Please select a payment method.';
    }
     // Waste collection time validation
    if (!wasteCollectionTime) {
      setTimeError('You must select a waste collection time.');
      return false;
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

  const mappagedata = JSON.parse(sessionStorage.getItem('mappagedata'));
  const price = mappagedata ? mappagedata.subscriptionPrice.toFixed(2) : '0.00';  // Format to two decimal places, default to '0.00'
  
  // Your existing handlers and validation code...
  const handleSubmit = (event) => {
    event.preventDefault();
    setHasSubmitted(true);
  
    // Validate sender and recipient details
    if (!senderDetails.firstName || !senderDetails.lastName || !senderDetails.zipCode || !senderDetails.phone) {
      alert("Please fill in all sender details.");
      return;
    }
  
    if (!recipientDetails.firstName || !recipientDetails.lastName || !recipientDetails.zipCode || !recipientDetails.phone) {
      alert("Please fill in all recipient details.");
      return;
    }
  
    // Validate form before proceeding
    if (validateForm()) {
      const mappagedata = JSON.parse(sessionStorage.getItem('mappagedata'));
  
      // Check if mappagedata or userId is missing
      if (!mappagedata || !mappagedata.userId) {
        alert("User ID is missing! Please go back and select a location.");
        return;
      }
  
      const userId = mappagedata.userId;  // This is where the userId is assigned
      const price = mappagedata.subscriptionPrice;
  
      // Check if price is missing
      if (!price) {
        alert("Price is missing! Please go back and select a subscription.");
        return;
      }
  
      // Prepare checkout data
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
        user_id: userId,  // Make sure userId is used in the payload
        selected_days: Array.isArray(mappagedata.selectedDays) ? mappagedata.selectedDays : [mappagedata.selectedDays],
        selected_dates: Array.isArray(mappagedata.selectedDates) ? mappagedata.selectedDates : [mappagedata.selectedDates],
      };
  
      // Store checkout data in sessionStorage
      sessionStorage.setItem('checkoutpagedata', JSON.stringify(checkoutpagedata));
  
      alert('Your order is being processed...');
  
      setTimeout(() => {
        const storedCheckoutPageData = JSON.parse(sessionStorage.getItem('checkoutpagedata'));
  
        // Check if the payment method is online
        if (storedCheckoutPageData.paymentDetails.paymentMethod === "Online") {
          // Navigate to the payment page for online payments
          navigate("/payment");
        } else {
          // Send data to the backend for non-online payments
          fetch("http://localhost:5002/api/checkout/order", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              orderDetails: storedCheckoutPageData.paymentDetails,
              checkoutDetails: storedCheckoutPageData,
              userId: userId,  // Ensure userId is included in the backend request
            }),
          })
          .then((response) => response.json())
          .then((data) => {
            if (data.message === "Order placed successfully") {
              const checkoutId = data.checkoutId;  // Extract checkoutId from response
              sessionStorage.setItem('checkoutId', checkoutId);  // Store it in session storage
  
              // Update checkoutpagedata with checkoutId
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
    <div className="checkout-container">
      <div className="language-toggle-container">
        <button onClick={toggleLanguage} className="language-toggle">
          {language === 'en' ? 'සිංහල' : 'English'}
        </button>
      </div>

      <h2 className="checkout-header">{t.title}</h2>
      
      <div className="checkout-forms">
        {/* Sender Details Section */}
        <div className="form-section">
          <h3>{t.senderTitle}</h3>
          <form className="sender-form" onSubmit={handleSubmit}>
            {['firstName', 'lastName', 'zipCode', 'phone', 'email'].map((field) => (
              <div className="input-group" key={field}>
                <label>{t.senderLabels[field]}</label>
                <input
                  type={field === 'email' ? 'email' : field === 'phone' ? 'tel' : 'text'}
                  name={field}
                  value={senderDetails[field]}
                  placeholder={t.senderPlaceholders[field]}
                  onChange={handleSenderChange}
                />
                {hasSubmitted && formErrors[field] && (
                  <p className="error">{formErrors[field]}</p>
                )}
              </div>
            ))}

            <div className="input-group">
              <label className="timelable">{t.collectionTimeLabel}</label>
              <select
                name="wasteCollectionTime"
                value={wasteCollectionTime}
                onChange={handleTimeChange}
                className="time-dropdown"
              >
                <option value="">{t.timePlaceholder}</option>
                {t.timeOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              {hasSubmitted && timeError && <p className="error">{timeError}</p>}
            </div>

            <div className="checkbox-group">
              <label>
                <input
                  type="checkbox"
                  checked={isRecipientSame}
                  onChange={handleCheckboxChange}
                />
                {t.sameAsSender}
              </label>
            </div>
          </form>
        </div>

        {/* Recipient Details Section */}
        <div className="form-section">
          <h3>{t.recipientTitle}</h3>
          {['firstName', 'lastName', 'zipCode', 'phone'].map((field) => (
            <div className="input-group" key={field}>
              <label>{t.recipientLabels[field]}</label>
              <input
                type={field === 'phone' ? 'tel' : 'text'}
                name={field}
                value={recipientDetails[field]}
                placeholder={t.recipientPlaceholders[field]}
                onChange={handleRecipientChange}
                disabled={isRecipientSame}
              />
              {hasSubmitted && formErrors.recipient[field] && (
                <p className="error">{formErrors.recipient[field]}</p>
              )}
            </div>
          ))}
        </div>

        {/* Payment Details Section */}
        <div className="form-section">
          <h3>{t.paymentTitle}</h3>
          
          <div className="radio-group">
            {t.paymentMethods.map((method) => (
              <label key={method.value}>
                <input
                  type="radio"
                  name="paymentMethod"
                  value={method.value}
                  onChange={handlePaymentChange}
                  checked={paymentDetails.paymentMethod === method.value}
                />
                {method.label}
              </label>
            ))}
            {hasSubmitted && formErrors.paymentMethod && (
              <p className="error">{formErrors.paymentMethod}</p>
            )}
          </div>

          <div className="checkbox-group">
            <label>
              <input
                type="checkbox"
                checked={paymentDetails.agreedToTerms}
                onChange={handleTermsChange}
              />
              {t.termsText[0]}
              <a href="/teamsandconditions" target="_blank" rel="noopener noreferrer">
                {t.termsText[1]}
              </a>
            </label>
            {hasSubmitted && formErrors.terms && (
              <p className="error">{formErrors.terms}</p>
            )}
          </div>

          <div className="important-note">
            <strong>{t.importantNote[0]}</strong>
            {t.importantNote[1]}
            <br />
            <a href="/customguidance" className="check-waste-guidance" target="_blank" rel="noopener noreferrer">
              {t.guidanceLink}
            </a>
          </div>

          <button type="submit" className="place-order-button" onClick={handleSubmit}>
            {t.submitButton} - LKR {price}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Checkoutform;