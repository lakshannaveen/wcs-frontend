import React, { useState, useEffect } from "react";
import "./Profile.css";

function Customprofile() {
  const [FirstName, setFirstName] = useState("");
  const [LastName, setLastName] = useState("");
  const [PhoneNumber, setPhoneNumber] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Retrieve token from localStorage
  const token = localStorage.getItem("authToken");

  useEffect(() => {
    // If token is not present, set an error
    if (!token) {
      setError("You must be logged in to view and edit your profile.");
      setLoading(false);
      return;
    }

    // Fetch the profile data from the backend
    fetch("https://your-backend-api.com/profile", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch profile data.");
        }
        return response.json();
      })
      .then((data) => {
        setFirstName(data.firstName || "");
        setLastName(data.lastName || "");
        setPhoneNumber(data.phoneNumber || "");
        setLoading(false);
      })
      .catch((err) => {
        setError("Error fetching profile data. Please try again later.");
        setLoading(false);
      });
  }, [token]);

  const handleSave = () => {
    // If token is missing, set an error
    if (!token) {
      setError("You must be logged in to update your profile.");
      return;
    }

    // Send updated profile data to the backend
    fetch("https://your-backend-api.com/profile", {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName: FirstName,
        lastName: LastName,
        phoneNumber: PhoneNumber,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to update profile.");
        }
        return response.json();
      })
      .then((data) => {
        alert("Profile updated successfully!");
        console.log("Profile Updated:", data);
      })
      .catch((err) => {
        setError("Error updating profile. Please try again.");
      });
  };

  const handleDiscard = () => {
    // Refetch profile data to reset changes
    setLoading(true);
    fetch("https://your-backend-api.com/profile", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to reload profile data.");
        }
        return response.json();
      })
      .then((data) => {
        setFirstName(data.firstName || "");
        setLastName(data.lastName || "");
        setPhoneNumber(data.phoneNumber || "");
        setLoading(false);
      })
      .catch((err) => {
        setError("Error reloading profile data.");
        setLoading(false);
      });
  };

  // Show loading indicator or error messages
  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="profile-container">
      <h2>Edit Profile</h2>
      <div className="profile-form">
        <div className="form-group-row">
          <div className="form-group">
            <label>First Name *</label>
            <input
              type="text"
              value={FirstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="First Name"
            />
          </div>
          <div className="form-group">
            <label>Last Name *</label>
            <input
              type="text"
              value={LastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Last Name"
            />
          </div>
        </div>
        <div className="form-group">
          <label>Phone Number</label>
          <div className="phone-input">
            <span>+94</span>
            <input
              type="text"
              value={PhoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="Phone Number"
            />
          </div>
        </div>
        <div className="button-group">
          <button className="discard-btn" onClick={handleDiscard}>
            Discard
          </button>
          <button className="save-button" onClick={handleSave}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default Customprofile;
