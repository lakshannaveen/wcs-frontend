import React, { useEffect, useState } from 'react';
import "./OrderBill.css";

const OrderBill = () => {
  const [checkoutData, setCheckoutData] = useState(null);

  useEffect(() => {
    const storedCheckoutData = JSON.parse(sessionStorage.getItem('checkoutpagedata'));
    
    if (storedCheckoutData) {
      setCheckoutData(storedCheckoutData);
      
      // Send the order data to the backend to trigger email
      fetch('http://localhost:5002/api/email/sendOrderConfirmation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(storedCheckoutData),
      })
      .then(response => response.json())  // Parse the response as JSON
      .then(data => {
        if (data.message) {
          console.log(data.message);
        }
      })
      .catch(error => console.error('Error sending email:', error));
      
      // Set timeout to clear session data after 5 minutes (300000 ms)
      setTimeout(() => {
        sessionStorage.removeItem('checkoutpagedata');
        alert("Checkout data has been cleared due to inactivity.");
      }, 300000); // 5 minutes in milliseconds
    } else {
      alert("No order data found. Please complete the checkout process.");
    }
  }, []);

  if (!checkoutData) {
    return <div>Loading...</div>;
  }

  const { senderDetails, recipientDetails, mapPageData, paymentDetails, wasteCollectionTime } = checkoutData;
  const isSameSenderRecipient = senderDetails.firstName === recipientDetails.firstName && 
                                senderDetails.lastName === recipientDetails.lastName && 
                                senderDetails.phone === recipientDetails.phone && 
                                senderDetails.zipCode === recipientDetails.zipCode;

  return (
    <div className="order-bill">
      <h2>Order Bill</h2>

      <table>
        <tbody>
          <tr>
            <th colSpan="2">Sender Details</th>
          </tr>
          <tr>
            <td><strong>Name:</strong></td>
            <td>{`${senderDetails.firstName} ${senderDetails.lastName}`}</td>
          </tr>
          <tr>
            <td><strong>Phone:</strong></td>
            <td>{senderDetails.phone}</td>
          </tr>
          <tr>
            <td><strong>Zip Code:</strong></td>
            <td>{senderDetails.zipCode}</td>
          </tr>

          {!isSameSenderRecipient && (
            <>
              <tr>
                <th colSpan="2">Recipient Details</th>
              </tr>
              <tr>
                <td><strong>Name:</strong></td>
                <td>{`${recipientDetails.firstName} ${recipientDetails.lastName}`}</td>
              </tr>
              <tr>
                <td><strong>Phone:</strong></td>
                <td>{recipientDetails.phone}</td>
              </tr>
              <tr>
                <td><strong>Zip Code:</strong></td>
                <td>{recipientDetails.zipCode}</td>
              </tr>
            </>
          )}

          <tr>
            <th colSpan="2">Map and Subscription Details</th>
          </tr>
          <tr>
            <td><strong>Location:</strong></td>
            <td>Lat: {mapPageData.latitude}, Long: {mapPageData.longitude}</td>
          </tr>
          <tr>
            <td><strong>Subscription Plan:</strong></td>
            <td>{mapPageData.subscriptionPlan}</td>
          </tr>
          <tr>
            <td><strong>Subscription Price:</strong></td>
            <td>{mapPageData.subscriptionPrice}</td>
          </tr>

          {mapPageData.selectedDates && (
            <tr>
              <td><strong>Selected Dates:</strong></td>
              <td>{mapPageData.selectedDates}</td>
            </tr>
          )}
          {mapPageData.selectedDays && (
            <tr>
              <td><strong>Selected Days:</strong></td>
              <td>{mapPageData.selectedDays}</td>
            </tr>
          )}

          {/* Show Waste Collection Time */}
          {wasteCollectionTime && (
            <tr>
              <td><strong>Waste Collection Time:</strong></td>
              <td>{wasteCollectionTime}</td>
            </tr>
          )}

          <tr>
            <th colSpan="2">Payment Details</th>
          </tr>
          <tr>
            <td><strong>Payment Method:</strong></td>
            <td>{paymentDetails.paymentMethod}</td>
          </tr>
          <tr>
            <td><strong>Total Price:</strong></td>
            <td>{mapPageData.subscriptionPrice}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default OrderBill;
