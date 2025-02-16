import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminDashbord.css';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [headingClicks, setHeadingClicks] = useState(0); // Heading click count
  const [showAdditionalButtons, setShowAdditionalButtons] = useState(false); // To control the visibility of additional buttons

  // Password check function for navigating to a given path
  const checkPasswordAndNavigate = (path, correctPassword) => {
    const enteredPassword = prompt("Enter Admin Password:");

    if (enteredPassword === null || enteredPassword.trim() === "") {
      // User canceled or entered an empty password, return early
      return;
    }

    const enteredPasswordTrimmed = enteredPassword.trim();

    if (enteredPasswordTrimmed === correctPassword) {
      localStorage.setItem("adminToken", "fake-jwt-token");  // Set token
      navigate(path);  // Navigate if the password matches
    } else {
      alert("Incorrect password! Access denied.");
    }
  };

  // Handle Admin Dashboard heading click
  const handleHeadingClick = () => {
    setHeadingClicks(prev => prev + 1); // Increment click count on heading
    if (headingClicks >= 4) {  // Show additional buttons after the 5th click on heading
      setShowAdditionalButtons(true);
    }
  };

  // Handle Orders button click and navigate to the orders page after password check
  const handleOrdersClick = () => {
    const correctPassword = "1050"; // Define the password for accessing Orders
    checkPasswordAndNavigate('/orders', correctPassword); // Check password before navigating
  };

  return (
    <div className="admin-dashboard-container">
      <h1 className="admin-dashboard-title" onClick={handleHeadingClick}>
        Admin Dashboard
      </h1>

      <div className="admin-dashboard-buttons">
        <button className="admin-dashboard-button">Map</button>
       

        {/* Render additional buttons after 5 clicks on the heading */}
        {showAdditionalButtons && (
          <>
            <button 
              className="admin-dashboard-button" 
              onClick={() => checkPasswordAndNavigate('/contactinquiries', "1020")}
            >
              Contact Inquiries
            </button>
            <button className="admin-dashboard-button" onClick={handleOrdersClick}>
          Orders
        </button>
            <button 
              className="admin-dashboard-button" 
              onClick={() => checkPasswordAndNavigate('/feedbackmessage', "1020")}
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
