import React, { useEffect, useState } from 'react';
import "./OrderBill.css";

const OrderBill = () => {
  const [checkoutData, setCheckoutData] = useState(null);

  useEffect(() => {
    // Retrieve checkout data from session storage
    const storedCheckoutData = JSON.parse(sessionStorage.getItem('checkoutpagedata'));
    
    if (storedCheckoutData) {
      setCheckoutData(storedCheckoutData);
    } else {
      alert("No order data found. Please complete the checkout process.");
    }
  }, []);

  if (!checkoutData) {
    return <div>Loading...</div>;
  }

  const { senderDetails, recipientDetails, mapPageData, paymentDetails } = checkoutData;

  return (
    <div className="order-bill">
      <h2>Order Bill</h2>

      {/* Sender Details */}
      <div className="sender-details">
        <h3>Sender Details</h3>
        <p><strong>Name:</strong> {`${senderDetails.firstName} ${senderDetails.lastName}`}</p>
        <p><strong>Phone:</strong> {senderDetails.phone}</p>
        <p><strong>Zip Code:</strong> {senderDetails.zipCode}</p>
      </div>

      {/* Recipient Details */}
      <div className="recipient-details">
        <h3>Recipient Details</h3>
        <p><strong>Name:</strong> {`${recipientDetails.firstName} ${recipientDetails.lastName}`}</p>
        <p><strong>Phone:</strong> {recipientDetails.phone}</p>
        <p><strong>Zip Code:</strong> {recipientDetails.zipCode}</p>
      </div>

      {/* Map Data (Location and Subscription Plan) */}
      <div className="map-details">
        <h3>Map and Subscription Details</h3>
        <p><strong>Location:</strong> Lat: {mapPageData.latitude}, Long: {mapPageData.longitude}</p>
        <p><strong>Subscription Plan:</strong> {mapPageData.subscriptionPlan}</p>
        <p><strong>Subscription Price:</strong> {mapPageData.subscriptionPrice}</p>
        <p><strong>Selected Dates:</strong> {mapPageData.selectedDates || 'N/A'}</p>
        <p><strong>Selected Days:</strong> {mapPageData.selectedDays || 'N/A'}</p>
      </div>

      {/* Payment Details */}
      <div className="payment-details">
        <h3>Payment Details</h3>
        <p><strong>Payment Method:</strong> {paymentDetails.paymentMethod}</p>
        <p><strong>Total Price:</strong> {mapPageData.subscriptionPrice}</p>
      </div>

      {/* Final Total */}
      <div className="final-total">
        <h3>Total</h3>
        <p><strong>Total Price:</strong> {mapPageData.subscriptionPrice}</p>
      </div>
    </div>
  );
};

export default OrderBill;
