import React, { useState } from "react";
import "./AdminRegsiter.css";

const AdminRegister = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");


  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
  
    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }
  
    if (!validatePassword(password)) {
      setError(
        "Password must be at least 8 characters long, and include uppercase, lowercase, a number, and a special character."
      );
      return;
    }
  
    try {
      const response = await fetch("http://localhost:5002/api/admin/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        alert("Admin registered successfully!");
        window.location.href = "/admin-login";
      } else {
        setError(data.message || "Registration failed!");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    }
  };
  
  return (
    <div className="admin-register-container">
      <h1 className="admin-register-title">Admin Register</h1>
      <form className="admin-register-form" onSubmit={handleRegister}>
        {error && <p className="admin-register-error">{error}</p>}
        <input
          type="email"
          placeholder="Admin Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="admin-register-input"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="admin-register-input"
        />
        <button type="submit" className="admin-register-button">
          Register
        </button>
      </form>
    </div>
  );
};

export default AdminRegister;
