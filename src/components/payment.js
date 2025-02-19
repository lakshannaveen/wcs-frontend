import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useNavigate } from 'react-router-dom';

import './payment.css';

console.log('Stripe Publishable Key:', process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

// Load Stripe with the publishable key from environment
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

const Payment = () => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const [clientSecret, setClientSecret] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const paymentData = JSON.parse(sessionStorage.getItem('mappagedata'));
  const amountInLKR = paymentData?.subscriptionPrice || 0; // Retrieve subscription price

  useEffect(() => {
    // Fetch payment intent details from backend
    fetch('http://localhost:5002/api/payment/create-payment-intent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: amountInLKR * 100, // Stripe expects amount in cents, so multiply by 100
        currency: 'lkr',
      }),
    })
    .then((response) => response.json())
    .then((data) => {
      setClientSecret(data.clientSecret);
    })
    .catch((error) => {
      setError('Failed to load payment details. Please try again.');
      console.error('Error fetching client secret:', error);
    });
  }, [amountInLKR]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
  
    if (!stripe || !elements || !clientSecret) {
      setError("Stripe is not initialized. Please try again.");
      setLoading(false);
      return;
    }
  
    const cardElement = elements.getElement(CardElement);
  
    const { error: paymentError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: { card: cardElement },
    });
  
    if (paymentError) {
      setError(paymentError.message);
      setLoading(false);
      return;
    }
  
    if (paymentIntent.status === 'succeeded') {
      alert('Payment Successful!');
  
      // Retrieve data from sessionStorage
      const checkoutData = JSON.parse(sessionStorage.getItem('checkoutpagedata'));
      const mapPageData = JSON.parse(sessionStorage.getItem('mappagedata'));
  
      // Validate if all data is present
      if (!checkoutData || !mapPageData) {
        alert("Checkout data or map page data is missing. Please go back and try again.");
        setLoading(false);
        return;
      }
  
      // Add payment details (without transactionId and paymentStatus)
      checkoutData.paymentDetails = {
        paymentMethod: "Online",
      };
  
      // Add mapPageData details to checkoutData
      checkoutData.mapPageData = {
        userId: mapPageData.userId,
        latitude: mapPageData.latitude,
        longitude: mapPageData.longitude,
        houseNo: mapPageData.houseNo,
        streetName: mapPageData.streetName,
        zipCode: mapPageData.zipCode,
        subscriptionType: mapPageData.subscriptionPlan,
        selectedDates: mapPageData.selectedDates,
        selectedDays: mapPageData.selectedDays,
        wasteCollectionTime: mapPageData.wasteCollectionTime,
        senderDetails: mapPageData.senderDetails,
        recipientDetails: mapPageData.recipientDetails,
        subscriptionPrice: mapPageData.subscriptionPrice,
      };
  
      // Prepare the data to send to the backend
      const orderData = {
        orderDetails: {
          ...checkoutData,
          checkoutDetails: {
            user_id: checkoutData.user_id,
            senderDetails: checkoutData.senderDetails,
            recipientDetails: checkoutData.recipientDetails,
            wasteCollectionTime: checkoutData.wasteCollectionTime,
            paymentDetails: checkoutData.paymentDetails,
            mapPageData: checkoutData.mapPageData,
          },
        },
        checkoutDetails: checkoutData, // this contains all the data needed
      };
  
      // Send the data to the backend
      try {
        const response = await fetch("http://localhost:5002/api/checkout/order", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(orderData),
        });
  
        const data = await response.json();
  
        if (response.ok && data.message === "Order placed successfully") {
          const checkoutId = data.checkoutId;
          sessionStorage.setItem('checkoutId', checkoutId);
          checkoutData.checkoutId = checkoutId;
          sessionStorage.setItem('checkoutpagedata', JSON.stringify(checkoutData));
  
          alert('Order placed successfully!');
          navigate("/bill");  // Navigate to the bill page after successful payment
        } else {
          console.error('Order placement failed:', data);
          alert(data.message || "Failed to place order.");
        }
      } catch (error) {
        console.error("Error placing order:", error);
        alert("There was an error placing your order. Please try again.");
      }
    } else {
      alert("Payment was not successful. Please try again.");
    }
  
    setLoading(false);
  };
  
  

  return (
    <div className="payment-container">
      <h2>Enter Your Payment Details</h2>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="card-element-container">
          <label htmlFor="card-element">Credit Card Information</label>
          <CardElement />
        </div>
        <p>Amount: LKR {amountInLKR}</p>
        <button type="submit" disabled={!stripe || loading}>
          {loading ? 'Processing...' : 'Submit Payment'}
        </button>
      </form>
    </div>
  );
};

// Wrap the Payment component with Stripe Elements
const StripePayment = () => (
  <Elements stripe={stripePromise}>
    <Payment />
  </Elements>
);

export default StripePayment;
