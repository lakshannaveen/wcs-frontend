import React, { useState } from 'react';
import './Checkoutform.css';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';



function Checkoutform() {
  const navigate = useNavigate();
  const { language } = useLanguage();
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
      <h2 className="checkout-header">{language === 'en' ? 'CHECKOUT' : 'ගෙවීම'}</h2>
      <div className="checkout-forms">
        <div className="form-section">
          <h3>{language === 'en' ? 'Sender Details' : 'යවන්නාගේ විස්තර'}</h3>
          <form className="sender-form" onSubmit={handleSubmit}>
            {/* Sender details form */}
            <div className="input-group">
              <label>{language === 'en' ? 'First Name*' : 'මුල් නම*'}</label>
              <input
                type="text"
                name="firstName"
                value={senderDetails.firstName}
                placeholder={language === 'en' ? 'First Name*' : 'යවන්නාගේ මුල් නම*'}
                onChange={handleSenderChange}
              />
              {hasSubmitted && formErrors.firstName && <p className="error">{formErrors.firstName}</p>}
            </div>
            <div className="input-group">
              <label>{language === 'en' ? 'Last Name*' : 'අවසන් නම*'}</label>
              <input
                type="text"
                name="lastName"
                value={senderDetails.lastName}
                placeholder={language === 'en' ? 'Last Name*' : 'යවන්නාගේ අවසන් නම*'}
                onChange={handleSenderChange}
              />
              {hasSubmitted && formErrors.lastName && <p className="error">{formErrors.lastName}</p>}
            </div>
            <div className="input-group">
              <label>{language === 'en' ? 'Zip Code*' : 'තැපැල් කේතය*'}</label>
              <input
                type="text"
                name="zipCode"
                value={senderDetails.zipCode}
               placeholder={language === 'en' ? 'Zip Code' : 'තැපැල් කේතය'}
                onChange={handleSenderChange}
              />
              {hasSubmitted && formErrors.zipCode && <p className="error">{formErrors.zipCode}</p>}
            </div>
            <div className="input-group">
              <label>    {language === 'en' ? 'Phone Number*' : 'දුරකථන අංකය*'}</label>
              <input
                type="tel"
                name="phone"
                value={senderDetails.phone}
                placeholder={language === 'en' ? 'Phone Number' : ' යවන්නාගේ දුරකථන අංකය'}
                onChange={handleSenderChange}
              />
              {hasSubmitted && formErrors.phone && <p className="error">{formErrors.phone}</p>}
            </div>
            <div className="input-group">
              <label> {language === 'en' ? 'Email*' : 'විද්‍යුත් තැපෑල*'} </label>
              <input
                type="email"
                name="email"
                value={senderDetails.email}
                placeholder={language === 'en' ? 'Email' : 'යවන්නාගේ විද්‍යුත් තැපෑල'}
                onChange={handleSenderChange}
              />
              {hasSubmitted && formErrors.email && <p className="error">{formErrors.email}</p>}
            </div>

            {/*waste collection time */}

                    <div className="input-group">
        <label className="timelable"> {language === 'en' ? 'Waste Collection Time*' : 'කසළ එකතු කිරීමේ වේලාව*'}</label>
        <select name="wasteCollectionTime" value={wasteCollectionTime} onChange={handleTimeChange} className="time-dropdown">
          <option value=""> {language === 'en' ? 'Select a time' : 'වේලාවක් තෝරන්න'}</option>
          <option value="Morning">{language === 'en' ? 'Morning' : 'උදේ' }  (9AM-12PM)</option>
          <option value="Afternoon"> {language === 'en' ? 'Afternoon ' : 'දවල්'}  (12PM-3PM)</option>
          <option value="Evening">{language === 'en' ? 'Evening ' : 'සවස '}  (3PM-6PM)</option>
        </select>
        {hasSubmitted && timeError && <p className="error">{timeError}</p>}
      </div>


            {/* Recipient Same As Sender Checkbox */}
            <div className="checkbox-group">
              <label>
                <input
                  type="checkbox"
                  checked={isRecipientSame}
                  onChange={handleCheckboxChange}
                />{language === 'en' 
                  ? 'Recipient is the same as sender' 
                  : 'යවන්නා සහ ලබන්නා එකම පුත්ගලයෙකු වේ (යවන්නාගෙ තොරතුරු සහ ලබන්නාගෙ තොරතුරු සමානයි'}
              </label>
            </div>
          </form>
        </div>

        <div className="form-section">
          <h3>{language === 'en' ? 'Recipient Details' : 'ලබන්නාගේ විස්තර'}</h3>
          <div className="input-group">
            <label> {language === 'en' ? 'First Name*' : 'මුල් නම*'}</label>
            <input
              type="text"
              name="firstName"
              value={recipientDetails.firstName}
               placeholder={language === 'en' ? 'Recipient First Name' : 'ලබන්නාගේ මුල් නම'}
              onChange={handleRecipientChange}
              disabled={isRecipientSame}
            />
            {hasSubmitted && formErrors.recipient.firstName && <p className="error">{formErrors.recipient.firstName}</p>}
          </div>
          <div className="input-group">
            <label>{language === 'en' ? 'Last Name*' : 'අවසන් නම*'}</label>
            <input
              type="text"
              name="lastName"
              value={recipientDetails.lastName}
              placeholder={language === 'en' ? 'Recipient Last Name*' : 'ලබන්නාගේ අවසන් නම*'}
              onChange={handleRecipientChange}
              disabled={isRecipientSame}
            />
            {hasSubmitted && formErrors.recipient.lastName && <p className="error">{formErrors.recipient.lastName}</p>}
          </div>
          <div className="input-group">
            <label>{language === 'en' ? 'Zip Code*' : 'තැපැල් කේතය*'}</label>
            <input
              type="text"
              name="zipCode"
              value={recipientDetails.zipCode}
              placeholder={language === 'en' ? 'Zip Code*' : 'තැපැල් කේතය*'}
              onChange={handleRecipientChange}
              disabled={isRecipientSame}
            />
            {hasSubmitted && formErrors.recipient.zipCode && <p className="error">{formErrors.recipient.zipCode}</p>}
          </div>
          <div className="input-group">
            <label> {language === 'en' ? 'Phone Number*' : 'දුරකථන අංකය*'}</label>
            <input
              type="tel"
              name="phone"
              value={recipientDetails.phone}
              placeholder={language === 'en' ? 'Recipient Phone Number*' : 'ලබන්නාගේ දුරකථන අංකය*'}
              onChange={handleRecipientChange}
              disabled={isRecipientSame}
            />
            {hasSubmitted && formErrors.recipient.phone && <p className="error">{formErrors.recipient.phone}</p>}
          </div>
        </div>

        <div className="form-section">
        <h3>{language === 'en' ? 'Payment Details' : 'ගෙවීම් විස්තර'}</h3>
          <div className="radio-group">
            <label>
              <input
                type="radio"
                name="paymentMethod"
                value="Online"
                onChange={handlePaymentChange}
                checked={paymentDetails.paymentMethod === 'Online'}
              />  {language === 'en' ? 'Online Payment' : 'අන්තර්ජාල ගෙවීම'}
            </label>
            <label>
              <input
                type="radio"
                name="paymentMethod"
                value="Cash"
                onChange={handlePaymentChange}
                checked={paymentDetails.paymentMethod === 'Cash'}
              />{ language === 'en' ? 'Cash on Delivery' : 'බෙදාහැරීමේදී මුදල්'}
            </label>
            {hasSubmitted && formErrors.paymentMethod && <p className="error">{formErrors.paymentMethod}</p>}
          </div>

          <div className="checkbox-group">
         <label>
        <input
          type="checkbox"
          checked={paymentDetails.agreedToTerms}
          onChange={handleTermsChange}
        />  
        {language === 'en' ? 'I agree to the ' : 'මම එකඟ වෙමි '}
        <a href="/teamsandconditions" target="_blank" rel="noopener noreferrer">   {language === 'en' ? 'terms and conditions' : 'නියමයන් සහ කොන්දේසි'}</a>
      </label>
      {hasSubmitted && formErrors.terms && <p className="error">{formErrors.terms}</p>}
    </div>


          {/*waste guidance note */}
          <div className="important-note">
        <strong>{language === 'en' ? 'Important:' : 'වැදගත්:'}</strong> 
        {language === 'en' 
              ? ' Waste disposal guidelines are essential for proper waste management.' 
              : ' නිසි අපද්‍රව්‍ය කළමනාකරණය සඳහා අපද්‍රව්‍ය බැහැර කිරීමේ මාර්ගෝපදේශ අත්‍යවශ්‍ය වේ.'}
        <br />
        <a href="/customguidance" className="check-waste-guidance" target="_blank" rel="noopener noreferrer">
          {language === 'en' 
                ? 'Click here for more information on waste disposal' 
                : 'අපද්‍රව්‍ය බැහැර කිරීම පිළිබඳ වැඩි විස්තර සඳහා මෙතැන ක්ලික් කරන්න'}
        </a>
      </div>

      <button type="submit" className="place-order-button" onClick={handleSubmit}>
      {language === 'en' ? 'Place Order' : 'ඇණවුම් කරන්න'} - LKR {price}
</button>

        </div>
      </div>
    </div>
  );
}

export default Checkoutform;
