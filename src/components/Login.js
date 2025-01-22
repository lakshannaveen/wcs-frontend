import React, { useState } from 'react';
import './Login.css';

function CustomLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState({ username: '', password: '' });

  const handleSubmit = (e) => {
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
    alert('Login successful!');
    // Perform login logic (e.g., API call)
  };

  return (
    <div className="logform">
      <form className="loginForm" onSubmit={handleSubmit}>
        <h1>Login</h1>
        <div className="formBody">
          <div className="Box">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Enter your username"
              style={{
                borderColor: errorMessage.username ? 'red' : '#ccc',
              }}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            {errorMessage.username && (
              <span className="error">{errorMessage.username}</span>
            )}
          </div>
          <div className="Box">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              style={{
                borderColor: errorMessage.password ? 'red' : '#ccc',
              }}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {errorMessage.password && (
              <span className="error">{errorMessage.password}</span>
            )}
          </div>
          <button className="button" type="submit">Login</button>
          <div className="register">
            <label>Don't have an account? </label>
            <a href="register">Register</a>
          </div>
        </div>
      </form>
    </div>
  );
}

export default CustomLogin;
