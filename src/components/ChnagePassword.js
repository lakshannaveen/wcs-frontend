import React, { useState } from "react";
import "./ChnagePassword.css";

const ChangePassword = () => {
  const [email, setEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [passwordStrength, setPasswordStrength] = useState(0); // State for password strength

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

  const handlePasswordChange = (e) => {
    const password = e.target.value;
    setNewPassword(password);
    setPasswordStrength(calculatePasswordStrength(password)); // Update password strength
  };

  const getPasswordStrengthColor = () => {
    if (passwordStrength === 0) return 'red';
    return 'green';
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
    </div>
  );
};

export default ChangePassword;
