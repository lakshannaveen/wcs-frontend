import React, { useEffect, useState } from 'react';
import "./OrderBill.css";

const OrderBill = () => {
  const [checkoutData, setCheckoutData] = useState(null);

  useEffect(() => {
    const storedCheckoutData = JSON.parse(sessionStorage.getItem('checkoutpagedata'));

    if (storedCheckoutData) {
      setCheckoutData(storedCheckoutData);

      if (!sessionStorage.getItem('emailSent')) {
        fetch('http://localhost:5002/api/email/sendOrderConfirmation', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(storedCheckoutData),
        })
        .then(response => response.json())
        .then(data => {
          if (data.message) {
            console.log(data.message);
            sessionStorage.setItem('emailSent', 'true');
          }
        })
        .catch(error => console.error('Error sending email:', error));
      }

      setTimeout(() => {
        sessionStorage.removeItem('checkoutpagedata');
        sessionStorage.removeItem('emailSent');
        alert("Checkout data has been cleared due to inactivity.");
      }, 300000);
    } else {
      alert("No order data found. Please complete the checkout process.");
    }
  }, []);

  if (!checkoutData) {
    return <div>Loading...</div>;
  }

  const { senderDetails, recipientDetails, mapPageData, paymentDetails, wasteCollectionTime, checkoutId } = checkoutData;
  const isSameSenderRecipient = senderDetails.firstName === recipientDetails.firstName &&
    senderDetails.lastName === recipientDetails.lastName &&
    senderDetails.phone === recipientDetails.phone &&
    senderDetails.zipCode === recipientDetails.zipCode;

  const finalCheckoutId = checkoutId || "N/A";

  return (
    <div className="order-bill">
      <h2>Order Bill</h2>
      <table className="bill-table">
        <thead>
          <tr>
            <th>Field</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          <tr><td colSpan="2"><strong>Checkout ID</strong></td></tr>
          <tr><td>ID:</td><td>{finalCheckoutId}</td></tr>
          
          <tr><td colSpan="2"><strong>Sender Details</strong></td></tr>
          <tr><td>Name:</td><td>{`${senderDetails.firstName} ${senderDetails.lastName}`}</td></tr>
          <tr><td>Phone:</td><td>{senderDetails.phone}</td></tr>
          <tr><td>Zip Code:</td><td>{senderDetails.zipCode}</td></tr>

          {!isSameSenderRecipient && (
            <>
              <tr><td colSpan="2"><strong>Recipient Details</strong></td></tr>
              <tr><td>Name:</td><td>{`${recipientDetails.firstName} ${recipientDetails.lastName}`}</td></tr>
              <tr><td>Phone:</td><td>{recipientDetails.phone}</td></tr>
              <tr><td>Zip Code:</td><td>{recipientDetails.zipCode}</td></tr>
            </>
          )}

          <tr><td colSpan="2"><strong>Map and Subscription Details</strong></td></tr>
          <tr><td>Location:</td><td>Lat: {mapPageData.latitude}, Long: {mapPageData.longitude}</td></tr>
          <tr><td>Subscription Plan:</td><td>{mapPageData.subscriptionPlan}</td></tr>
          <tr><td>Subscription Price:</td><td>{mapPageData.subscriptionPrice}</td></tr>
          {mapPageData.selectedDates && <tr><td>Selected Dates:</td><td>{mapPageData.selectedDates}</td></tr>}
          {mapPageData.selectedDays && <tr><td>Selected Days:</td><td>{mapPageData.selectedDays}</td></tr>}
          {wasteCollectionTime && <tr><td>Waste Collection Time:</td><td>{wasteCollectionTime}</td></tr>}

          <tr><td colSpan="2"><strong>Payment Details</strong></td></tr>
          <tr><td>Payment Method:</td><td>{paymentDetails.paymentMethod}</td></tr>
          <tr><td>Total Price:</td><td>{mapPageData.subscriptionPrice}</td></tr>
        </tbody>
      </table>
    </div>
  );
};

export default OrderBill;