import React, { useState, useEffect } from "react";
import "./AdminRegsiter.css";

const AdminRegister = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [logins, setLogins] = useState([]);
  const [showLogins, setShowLogins] = useState(false);

  useEffect(() => {
    fetch("http://localhost:5002/api/admin/logins")
      .then((response) => response.json())
      .then((data) => {
        const twoWeeksAgo = new Date();
        twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 14);

        // Filter logins from the last two weeks and sort by newest first
        const filteredLogins = data
          .filter((log) => new Date(log.time) >= twoWeeksAgo)
          .sort((a, b) => new Date(b.time) - new Date(a.time));

        setLogins(filteredLogins);
      })
      .catch((err) => console.error("Error fetching logins:", err));
  }, []);

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePassword = (password) =>
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password);

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
    <div className="admin-page-container">
      {/* Admin Registration Form */}
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

      {/* Show Admin Login Button */}
      <button 
        className="show-admin-login-button" 
        onClick={() => setShowLogins(!showLogins)}
      >
        {showLogins ? "Hide Admin Login History" : "Show Admin Login History"}
      </button>

      {/* Admin Login History Table (Shown Only If Button is Clicked) */}
      {showLogins && (
        <div className="admin-login-history">
          <h2 className="admin-login-history-title">Admin Login History (Last 2 Weeks)</h2>
          <table className="admin-login-table">
            <thead>
              <tr>
                <th>Email</th>
                <th>Login Time</th>
              </tr>
            </thead>
            <tbody>
              {logins.length > 0 ? (
                logins.map((log, index) => (
                  <tr key={index}>
                    <td>{log.email}</td>
                    <td>{new Date(log.time).toLocaleString()}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="2">No logins in the last 2 weeks.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminRegister;
