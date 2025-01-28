import React from 'react';
import './AdminDashbord.css';

const AdminDashboard = () => {
  return (
    <div className="admin-dashboard-container">
      <h1 className="admin-dashboard-title">Admin Dashboard</h1>
      <div className="admin-dashboard-buttons">
        <button className="admin-dashboard-button">Map</button>
        <button className="admin-dashboard-button">Orders</button>
      </div>
    </div>
  );
};

export default AdminDashboard;
