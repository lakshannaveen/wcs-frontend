import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useNavigate } from 'react-router-dom';
import './payment.css';

// Log the Stripe Publishable Key to verify if it is being loaded
console.log('Stripe Publishable Key:', process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

// Load the Stripe publishable key from the environment variables
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

const Payment = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Retrieve payment data from sessionStorage (mappagedata)
  const paymentData = JSON.parse(sessionStorage.getItem('mappagedata'));
const amountInLKR = paymentData?.subscriptionPrice || 0; // Retrieve subscription price

  useEffect(() => {
    fetch('http://localhost:5002/api/payment/create-payment-intent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: amountInLKR * 100, // Stripe expects amount in cents, so multiply by 100
        currency: 'lkr', // Currency is now LKR (Sri Lankan Rupees)
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
        navigate('/orderreceipt', { state: { orderId: paymentIntent.id, amount: paymentIntent.amount_received / 100 } });
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
          <CardElement />
        </div>
        <p>Amount: LKR {amountInLKR}</p> {/* Display the amount in LKR */}
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
