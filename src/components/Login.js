import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import './Login.css';

function CustomLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState({ username: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [showModal, setShowModal] = useState(false); // State for showing the modal
  const navigate = useNavigate(); // Initialize useNavigate hook

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate username and password
    let errors = {};
    if (username.trim() === '') {
      errors.username = 'Username is required';
    }
    if (password.length < 8) {
      errors.password = 'Password must be at least 8 characters long';
    }

    if (Object.keys(errors).length > 0) {
      setErrorMessage(errors);
      return;
    }

    // If validation passes, clear the error messages
    setErrorMessage({});
    setLoading(true);

    try {
      const response = await fetch('http://localhost:5002/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include', // This allows cookies to be sent with the request
        body: JSON.stringify({ username, password }),
      });
      

      const result = await response.json();
      
      if (response.ok) {
        // Successful login
        setSuccessMessage('Login successful!');
        setShowModal(true); // Show the success modal

      

        setTimeout(() => {
          navigate('/'); // Redirect to home page after 2 seconds
        }, 2000); // Delay for 2 seconds
      } else {
        // Handle backend error messages for invalid username or password
        setErrorMessage({ username: result.error || '', password: '' });
      }
    } catch (error) {
      console.error('Error during login:', error);
      setErrorMessage({ username: 'Something went wrong. Please try again later.' });
    } finally {
      setLoading(false);
    }
  };

  const closeModal = () => setShowModal(false); // Close modal handler

  return (
    <div className="logform">
      <form className="loginForm" onSubmit={handleSubmit}>
        <h1>Login</h1>
        <div className="formBody">
          {/* Error messages */}
          {errorMessage.username && (
            <div className="error">{errorMessage.username}</div>
          )}
          {errorMessage.password && (
            <div className="error">{errorMessage.password}</div>
          )}
          <div className="Box">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="Box">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button className="button" type="submit" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
          <div className="register">
            <label>Don't have an account? </label>
            <a href="/register">Register</a>
          </div>
        </div>
      </form>

      {/* Modal for success message */}
      {showModal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>{successMessage}</h2>
            <button onClick={closeModal}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CustomLogin;
