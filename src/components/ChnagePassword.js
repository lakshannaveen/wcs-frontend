import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ChnagePassword.css";

const ChangePassword = () => {
  const [email, setEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [showModal, setShowModal] = useState(false); 

  const navigate = useNavigate();

  const validateEmail = (email) => {
    const emailRegex =
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    const passwordRegex =
      /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    return passwordRegex.test(password);
  };

  // Calculate password strength based on the entered password
  const calculatePasswordStrength = (password) => {
    if (password.length < 8) return 0;
    let strength = 0;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength += 1;
    if (/\d/.test(password)) strength += 1;
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) strength += 1;
    return strength;
  };

  const handleSubmit = async (e) => {
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

    try {
      const response = await fetch('http://localhost:5002/api/password/change-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          currentPassword,
          newPassword,
          confirmPassword,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("Password changed successfully!");
        setShowModal(true); // Show the success modal
        setTimeout(() => {
          navigate("/"); // Redirect to the home page after 2 seconds
        }, 2000); // Delay for 2 seconds
      } else {
        setMessage(data.message || "An error occurred while changing the password.");
      }
    } catch (error) {
      setMessage("Failed to change the password. Please try again.");
    }
  };

  const handlePasswordChange = (e) => {
    const password = e.target.value;
    setNewPassword(password);
    setPasswordStrength(calculatePasswordStrength(password)); // Update password strength
  };

  const getPasswordStrengthColor = () => {
    if (passwordStrength === 0) return 'red';
    return 'green';
  };

  const closeModal = () => setShowModal(false); // Close modal handler

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
            onChange={handlePasswordChange} // Handle password change to check strength
            placeholder="Enter new password"
            required
          />
          <div className="password-strength">
            <div
              className="password-strength-bar"
              style={{
                width: `${(passwordStrength / 3) * 100}%`,
                backgroundColor: getPasswordStrengthColor(),
              }}
            />
            <span className={`strength-text ${getPasswordStrengthColor()}`}>
              {passwordStrength === 0 ? 'Weak' : 'Strong'}
            </span>
          </div>
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

        <button className="button" type="submit">
          Change Password
        </button>
      </form>

      {/* Modal for success message */}
      {showModal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>Password changed successfully!</h2>
            <button onClick={closeModal}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChangePassword;
