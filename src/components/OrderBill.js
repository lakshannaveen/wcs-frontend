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
      return;
    }

    // Set a timeout to delete session storage data after 5 minutes (300000ms)
    const timeout = setTimeout(() => {
        sessionStorage.removeItem('checkoutpagedata');
        alert("Session expired. Data has been removed.");
        window.close(); // Close the tab
      }, 3600000); // 1 hour (60 minutes)
      
    // Cleanup function to clear the timeout if the component unmounts
    return () => clearTimeout(timeout);

  }, []);

  if (!checkoutData) {
    return <div>Loading...</div>;
  }

  const { senderDetails, recipientDetails, mapPageData, paymentDetails } = checkoutData;

  return (
    <div className="order-bill">
      <h2>Order Bill</h2>

      <table>
        <tbody>
          {/* Sender Details */}
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

          {/* Recipient Details */}
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

          {/* Map Details */}
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
          <tr>
            <td><strong>Selected Dates:</strong></td>
            <td>{mapPageData.selectedDates || 'N/A'}</td>
          </tr>
          <tr>
            <td><strong>Selected Days:</strong></td>
            <td>{mapPageData.selectedDays || 'N/A'}</td>
          </tr>

          {/* Payment Details */}
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
