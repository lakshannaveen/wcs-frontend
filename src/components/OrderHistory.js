import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './OrderHistory.css';

const isOrderExpired = (expiryDate) => {
  if (!expiryDate) return false;
  const now = new Date();
  const expiry = new Date(expiryDate);
  return expiry < now;
};

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [orderToCancel, setOrderToCancel] = useState(null);
  const navigate = useNavigate();

  const getUserIdFromToken = () => {
    const token = document.cookie.split(';').find(cookie => cookie.trim().startsWith('token='));
    if (token) {
      const tokenValue = token.split('=')[1];
      const decodedToken = JSON.parse(atob(tokenValue.split('.')[1]));
      return decodedToken.id;
    }
    return null;
  };

  useEffect(() => {
    const fetchOrders = async () => {
      const userId = getUserIdFromToken();
      if (userId) {
        try {
          const response = await fetch(`http://localhost:5002/api/checkout/order-history?user_id=${userId}`);
          if (!response.ok) throw new Error('Network response was not ok');
          const data = await response.json();
          setOrders(data);
        } catch (err) {
          console.error("Failed to fetch orders", err);
        } finally {
          setLoading(false);
        }
      } else {
        console.error("No user ID found in token");
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleCancelClick = (order) => {
    setOrderToCancel(order);
    setShowConfirmation(true);
  };

  const cancelOrder = async () => {
    if (orderToCancel) {
      const confirmCancel = window.confirm("You will not receive your money back if the order has been collected at least once.");
      if (!confirmCancel) return;

      try {
        const response = await fetch(`http://localhost:5002/api/checkout/cancel/${orderToCancel.checkout_id}`, {
          method: 'DELETE',
        });
        if (response.ok) {
          setOrders(orders.filter(order => order.checkout_id !== orderToCancel.checkout_id));
          alert('Order canceled successfully');
        } else {
          alert('Error canceling order');
        }
      } catch (error) {
        console.error('Error canceling order:', error);
        alert('Error canceling order');
      }
    }
    setShowConfirmation(false);
    setOrderToCancel(null);
  };

  const cancelCancellation = () => {
    setShowConfirmation(false);
    setOrderToCancel(null);
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    const localDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
    return localDate.toISOString().split('T')[0];
  };

  const handleUpdateClick = (checkoutId) => {
    navigate(`/update/${checkoutId}`);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="order-history">
      <h1>Order History</h1>
      {orders.length > 0 ? (
        <div className="order-list">
          {orders.map(order => (
            <div key={order.checkout_id} className="order-card">
              <table className="order-table">
                <tbody>
                  <tr>
                    <td><strong>Checkout ID:</strong></td>
                    <td>{order.checkout_id}</td>
                  </tr>
                  <tr>
                    <td><strong>Created At:</strong></td>
                    <td>{order.created_at ? formatDate(order.created_at) : 'N/A'}</td>
                  </tr>
                  <tr>
                    <td><strong>Sender Name:</strong></td>
                    <td>{order.sender_firstname} {order.sender_lastname}</td>
                  </tr>
                  <tr>
                    <td><strong>Recipient Name:</strong></td>
                    <td>{order.recipient_firstname} {order.recipient_lastname}</td>
                  </tr>
                  <tr>
                    <td><strong>Collection Time:</strong></td>
                    <td>{order.collection_time}</td>
                  </tr>
                  <tr>
                    <td><strong>Subscription Type:</strong></td>
                    <td>{order.subscription_type}</td>
                  </tr>
                  <tr>
                    <td><strong>Price:</strong></td>
                    <td>{order.price}</td>
                  </tr>
                  <tr>
                    <td><strong>Payment Type:</strong></td>
                    <td>{order.payment_type}</td>
                  </tr>
                  {order.subscription_type === 'monthly' && (
                    <>
                      <tr>
                        <td><strong>Selected Date:</strong></td>
                        <td>{order.selected_dates?.length > 0 ? formatDate(order.selected_dates[0]) : 'N/A'}</td>
                      </tr>
                      <tr>
                        <td><strong>Expiry Date:</strong></td>
                        <td>{order.expire_date ? formatDate(order.expire_date) : 'N/A'}</td>
                      </tr>
                    </>
                  )}
                  {order.subscription_type === 'weekly' && (
                    <>
                      <tr>
                        <td><strong>Selected Days:</strong></td>
                        <td>{order.selected_days ? order.selected_days.join(', ') : 'N/A'}</td>
                      </tr>
                      <tr>
                        <td><strong>Expiry Date:</strong></td>
                        <td>{order.expire_date ? formatDate(order.expire_date) : 'N/A'}</td>
                      </tr>
                    </>
                  )}
                  <tr>
                    <td><strong>House Number:</strong></td>
                    <td>{order.house_number}</td>
                  </tr>
                  <tr>
                    <td><strong>Street Name:</strong></td>
                    <td>{order.street_name}</td>
                  </tr>
                  <tr>
                    <td><strong>Collected:</strong></td>
                    <td>{order.collected ? 'Yes' : 'No'}</td>
                  </tr>
                </tbody>
              </table>
              <button
                className="cancel-bton"
                onClick={() => handleCancelClick(order)}
                disabled={order.collected}
              >
                {order.collected ? 'Collected' : 'Cancel Order'}
              </button>

              {!order.collected && order.subscription_type !== 'one-time' && (
                <button
                  className="update-btoon"
                  onClick={() => handleUpdateClick(order.checkout_id)}
                >
                  {isOrderExpired(order.expiry_date) ? 'Expired' : 'Update Collection Time'}
                </button>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p>No orders found</p>
      )}

      {showConfirmation && (
        <div className="confirmation-overlay">
          <div className="confirmation-box">
            <p>Are you sure you want to cancel this order?</p>
            <button className="confirm-btn" onClick={cancelOrder}>Yes</button>
            <button className="no-btn" onClick={cancelCancellation}>No</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderHistory;
