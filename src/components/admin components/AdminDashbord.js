import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminDashbord.css';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [orderClicks, setOrderClicks] = useState(0); // order button click

  // Password check function
  const checkPasswordAndNavigate = (path) => {
    const enteredPassword = prompt("Enter Admin Password:");

    if (enteredPassword === null || enteredPassword.trim() === "") {
      // User canceled or entered an empty password, return early
      return;
    }

    const enteredPasswordTrimmed = enteredPassword.trim();
    const correctPassword = "1020";  // Hardcoded password

    // Log the entered password and the correct password for debugging
    console.log("Entered Password:", enteredPasswordTrimmed);
    console.log("Correct Password:", correctPassword);

    if (enteredPasswordTrimmed === correctPassword) {
      localStorage.setItem("adminToken", "fake-jwt-token");  // Set token
      navigate(path);  // Navigate if the password matches
    } else {
      alert("Incorrect password! Access denied.");
    }
  };

  // Handle "Orders" button click and increment the counter
  const handleOrdersClick = () => {
    setOrderClicks(prev => prev + 1);  //  click count
  };

  return (
    <div className="admin-dashboard-container">
      <h1 className="admin-dashboard-title">Admin Dashboard</h1>
      <div className="admin-dashboard-buttons">
        <button className="admin-dashboard-button">Map</button>
        <button 
          className="admin-dashboard-button" 
          onClick={handleOrdersClick} // Increment on click
        >
          Orders
        </button>
        
        {/* Render Contact Inquiries and Feedback buttons after 5 "Orders" clicks */}
        {orderClicks >= 5 && (
          <>
            <button 
              className="admin-dashboard-button" 
              onClick={() => checkPasswordAndNavigate('/contactinquiries')}
            >
              Contact Inquiries
            </button>
            <button 
              className="admin-dashboard-button" 
              onClick={() => checkPasswordAndNavigate('/feedbackmessage')}
            >
              Feedback
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
