import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './OrderHistory.css';
import { useLanguage } from '../contexts/LanguageContext';
import translations from '../translations/orderHistoryTranslations';

const isOrderExpired = (expiryDate) => {
  if (!expiryDate) return false;
  const now = new Date();
  const expiry = new Date(expiryDate);
  return expiry < now;
};

const OrderHistory = () => {
  const { language } = useLanguage();
  const t = translations[language];
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
      const confirmCancel = window.confirm(t.alerts.confirmation);
      if (!confirmCancel) return;

      try {
        const response = await fetch(`http://localhost:5002/api/checkout/cancel/${orderToCancel.checkout_id}`, {
          method: 'DELETE',
        });
        if (response.ok) {
          setOrders(orders.filter(order => order.checkout_id !== orderToCancel.checkout_id));
          alert(t.alerts.success);
        } else {
          alert(t.alerts.error);
        }
      } catch (error) {
        console.error('Error canceling order:', error);
        alert(t.alerts.error);
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
    return <div>{t.loading}</div>;
  }

  return (
    <div className="order-history">
      <h1>{t.title}</h1>
      {orders.length > 0 ? (
        <div className="order-list">
          {orders.map(order => (
            <div key={order.checkout_id} className="order-card">
              <table className="order-table">
                <tbody>
                  <tr>
                    <td><strong>{t.labels.checkoutId}</strong></td>
                    <td>{order.checkout_id}</td>
                  </tr>
                  <tr>
                    <td><strong>{t.labels.createdAt}</strong></td>
                    <td>{order.created_at ? formatDate(order.created_at) : t.na}</td>
                  </tr>
                  <tr>
                    <td><strong>{t.labels.senderName}</strong></td>
                    <td>{order.sender_firstname} {order.sender_lastname}</td>
                  </tr>
                  <tr>
                    <td><strong>{t.labels.recipientName}</strong></td>
                    <td>{order.recipient_firstname} {order.recipient_lastname}</td>
                  </tr>
                  <tr>
                    <td><strong>{t.labels.collectionTime}</strong></td>
                    <td>{order.collection_time}</td>
                  </tr>
                  <tr>
                    <td><strong>{t.labels.subscriptionType}</strong></td>
                    <td>{order.subscription_type}</td>
                  </tr>
                  <tr>
                    <td><strong>{t.labels.price}</strong></td>
                    <td>{order.price}</td>
                  </tr>
                  <tr>
                    <td><strong>{t.labels.paymentType}</strong></td>
                    <td>{order.payment_type}</td>
                  </tr>
                  {order.subscription_type === 'monthly' && (
                    <>
                      <tr>
                        <td><strong>{t.labels.selectedDate}</strong></td>
                        <td>{order.selected_dates?.length > 0 ? formatDate(order.selected_dates[0]) : t.na}</td>
                      </tr>
                      <tr>
                        <td><strong>{t.labels.expiryDate}</strong></td>
                        <td>{order.expire_date ? formatDate(order.expire_date) : t.na}</td>
                      </tr>
                    </>
                  )}
                  {order.subscription_type === 'weekly' && (
                    <>
                      <tr>
                        <td><strong>{t.labels.selectedDays}</strong></td>
                        <td>{order.selected_days ? order.selected_days.join(', ') : t.na}</td>
                      </tr>
                      <tr>
                        <td><strong>{t.labels.expiryDate}</strong></td>
                        <td>{order.expire_date ? formatDate(order.expire_date) : t.na}</td>
                      </tr>
                    </>
                  )}
                  <tr>
                    <td><strong>{t.labels.houseNumber}</strong></td>
                    <td>{order.house_number}</td>
                  </tr>
                  <tr>
                    <td><strong>{t.labels.streetName}</strong></td>
                    <td>{order.street_name}</td>
                  </tr>
                  <tr>
                    <td><strong>{t.labels.collected}</strong></td>
                    <td>{order.collected ? t.status.yes : t.status.no}</td>
                  </tr>
                </tbody>
              </table>
              <button
                className="cancel-bton"
                onClick={() => handleCancelClick(order)}
                disabled={order.collected}
              >
                {order.collected ? t.buttons.collected : t.buttons.cancelOrder}
              </button>

              {!order.collected && order.subscription_type !== 'one-time' && (
                <button
                  className="update-btoon"
                  onClick={() => handleUpdateClick(order.checkout_id)}
                >
                  {isOrderExpired(order.expiry_date) ? t.buttons.expired : t.buttons.updateCollectionTime}
                </button>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p>{t.noOrders}</p>
      )}

      {showConfirmation && (
        <div className="confirmation-overlay">
          <div className="confirmation-box">
            <p>{t.confirmation.prompt}</p>
            <button className="confirm-btn" onClick={cancelOrder}>{t.confirmation.yes}</button>
            <button className="no-btn" onClick={cancelCancellation}>{t.confirmation.no}</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderHistory;
