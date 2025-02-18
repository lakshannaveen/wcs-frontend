import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import './payment.css';

// Load the Stripe publishable key from the environment variables
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

const Payment = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch the client secret from the backend when the component mounts
  useEffect(() => {
    fetch('http://localhost:5002/api/checkout/create-payment-intent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        // Pass any required data such as amount or currency
        amount: 5000, // Example: $50.00
        currency: 'usd',
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
  }, []);

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    if (!stripe || !elements || !clientSecret) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    // Confirm the payment using the client secret and card details
    const { error: paymentError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: cardElement,
      },
    });

    if (paymentError) {
      setError(paymentError.message);
      setLoading(false);
    } else {
      if (paymentIntent.status === 'succeeded') {
        alert('Payment Successful!');
        // Optionally, navigate to a confirmation page or do something after success
        // Example: navigate('/confirmation');
      }
      setLoading(false);
    }
  };

  return (
    <div className="payment-container">
      <h2>Enter Your Payment Details</h2>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="card-element-container">
          <label htmlFor="card-element">Credit Card Information</label>
          {/* Stripe's CardElement automatically renders the card input fields */}
          <CardElement />
        </div>
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
