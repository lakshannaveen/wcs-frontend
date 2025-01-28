// AdminDashboard.js
import React from 'react';
import { Link } from 'react-router-dom'; 
import './AdminDashbord.css';

const AdminDashboard = () => {
  return (
    <div className="admin-dashboard-container">
      <h1 className="admin-dashboard-title">Admin Dashboard</h1>
      <div className="admin-dashboard-buttons">
        <button className="admin-dashboard-button">Map</button>
        <button className="admin-dashboard-button">Orders</button>
        <Link to="/contactinquiries"> 
          <button className="admin-dashboard-button">Contact Inquiries</button>
        </Link>
      </div>
    </div>
  );
};

export default AdminDashboard;
