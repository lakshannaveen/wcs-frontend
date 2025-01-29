import React, { useState } from "react";
import "./ChnagePassword.css";

const ChangePassword = () => {
  const [email, setEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const validateEmail = (email) => {
    // Email validation regex: checks for a valid email format
    const emailRegex =
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    // Password should have at least 8 characters, 1 uppercase, 1 number, and 1 special character
    const passwordRegex =
      /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    return passwordRegex.test(password);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setMessage("Please enter a valid email address.");
      return;
    }

    if (!validatePassword(newPassword)) {
      setMessage(
        "Password must be at least 8 characters, contain 1 uppercase letter, 1 number, and 1 special character."
      );
      return;
    }

    if (newPassword === currentPassword) {
      setMessage("New password cannot be the same as the current password.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setMessage("New passwords do not match!");
      return;
    }

    // Simulate API call
    console.log("Changing password for:", email);
    setMessage("Password changed successfully!");
  };

  return (
    <div className="change-password-form">
      <form className="form-container" onSubmit={handleSubmit}>
        <h1>Change Password</h1>

        {/* Error or Success Message */}
        {message && (
          <div className={message === "Password changed successfully!" ? "success" : "error"}>
            {message}
          </div>
        )}

        <div className="input-box">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />
        </div>

        <div className="input-box">
          <label>Current Password</label>
          <input
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            placeholder="Enter current password"
            required
          />
        </div>

        <div className="input-box">
          <label>New Password</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="Enter new password"
            required
          />
        </div>

        <div className="input-box">
          <label>Confirm New Password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm new password"
            required
          />
        </div>

        <button className="submit-button" type="submit">
          Change Password
        </button>
      </form>
    </div>
  );
};

export default ChangePassword;
