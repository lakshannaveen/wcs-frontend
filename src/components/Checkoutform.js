import React, { useState } from 'react';
import './Checkoutform.css';
import { useNavigate } from 'react-router-dom';


function Checkoutform() {
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
  
    if (!senderDetails.firstName || !senderDetails.lastName || !senderDetails.zipCode || !senderDetails.phone) {
      alert("Please fill in all sender details.");
      return;
    }
  
    if (!recipientDetails.firstName || !recipientDetails.lastName || !recipientDetails.zipCode || !recipientDetails.phone) {
      alert("Please fill in all recipient details.");
      return;
    }
  
    if (validateForm()) {
      const mappagedata = JSON.parse(sessionStorage.getItem('mappagedata'));
  
      if (!mappagedata || !mappagedata.userId) {
        alert("User ID is missing! Please go back and select a location.");
        return;
      }
  
      const userId = mappagedata.userId;
      console.log("Extracted User ID:", userId);
  
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
        user_id: mappagedata.userId,
        selected_days: Array.isArray(mappagedata.selectedDays) ? mappagedata.selectedDays : [mappagedata.selectedDays],
        selected_dates: Array.isArray(mappagedata.selectedDates) ? mappagedata.selectedDates : [mappagedata.selectedDates],
      };
  
      console.log("Final Checkout Data:", checkoutpagedata);
  
      sessionStorage.setItem('checkoutpagedata', JSON.stringify(checkoutpagedata));
  
      alert('Your order is being processed...');
  
      setTimeout(() => {
        const storedCheckoutPageData = JSON.parse(sessionStorage.getItem('checkoutpagedata'));
        console.log("Sending Checkout Data to Backend:", storedCheckoutPageData);
  
        fetch("http://localhost:5002/api/checkout/order", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            orderDetails: storedCheckoutPageData.paymentDetails,
            checkoutDetails: storedCheckoutPageData,
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
  
            if (storedCheckoutPageData.paymentDetails.paymentMethod === "Online") {
              navigate("/payment");
            } else {
              navigate("/bill");
            }
          } else {
            alert(data.message || "Failed to place order.");
          }
        })
        .catch((error) => {
          console.error("Error placing order:", error);
          alert("There was an error processing your order. Please try again.");
        });
      }, 3000);
    } else {
      alert("Please fix the errors before submitting.");
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

            {/*waste collection time */}

                    <div className="input-group">
        <label className="timelable">Waste Collection Time*</label>
        <select name="wasteCollectionTime" value={wasteCollectionTime} onChange={handleTimeChange} className="time-dropdown">
          <option value="">Select a time</option>
          <option value="Morning">Morning (9AM-12PM)</option>
          <option value="Afternoon">Afternoon (12PM-3PM)</option>
          <option value="Evening">Evening (3PM-6PM)</option>
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
        />  
        I agree to the  
        <a href="/teamsandconditions" target="_blank" rel="noopener noreferrer"> terms and conditions</a>
      </label>
      {hasSubmitted && formErrors.terms && <p className="error">{formErrors.terms}</p>}
    </div>


          {/*waste guidance note */}
          <div className="important-note">
        <strong>Important:</strong> Waste disposal guidelines are essential for proper waste management.  
        <br />
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
  );
}

export default Checkoutform;
