import React, { useState } from 'react';
import './Register.css';

function CustomRegister() {
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    username: '',
    email: '',
    createpassword: '',
    confirmpassword: '',
  });

  const [error, setError] = useState('');
  const [passwordStrength, setPasswordStrength] = useState(0);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Update password strength on password change
    if (name === 'createpassword') {
      setPasswordStrength(calculatePasswordStrength(value));
    }
  };

  const calculatePasswordStrength = (password) => {
    if (password.length < 8) return 0; // Weak if less than 8 characters
    let strength = 0;

    // Check for mixed case letters
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength += 1;

    // Check for numbers
    if (/\d/.test(password)) strength += 1;

    // Check for special characters (optional)
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) strength += 1;

    return strength;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate first name, last name, and username (only letters)
    const nameRegex = /^[A-Za-z]+$/;
    if (!nameRegex.test(formData.firstname)) {
      setError('First Name must only contain letters');
      return;
    }
    if (!nameRegex.test(formData.lastname)) {
      setError('Last Name must only contain letters');
      return;
    }
    if (!nameRegex.test(formData.username)) {
      setError('Username must only contain letters');
      return;
    }

    // Validate email format
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailRegex.test(formData.email)) {
      setError('Please enter a valid email');
      return;
    }

    // Validate password length
    if (formData.createpassword.length < 8) {
      setError('Password must be at least 8 characters long');
      return;
    }

    // Check if passwords match
    if (formData.createpassword !== formData.confirmpassword) {
      setError('Passwords do not match');
      return;
    }

    // If password strength is weak, show an error
    if (passwordStrength < 2) {
      setError('Password is too weak. Please choose a stronger password.');
      return;
    }

    // If no errors, submit the form
    setError('');
    alert('Registration successful!');
    // Perform registration logic (e.g., API call)
  };

  // Determine progress bar color based on password strength
  const getPasswordStrengthColor = () => {
    if (passwordStrength === 0) return 'red';
    return 'green';
  };

  return (
    <div className="register-page">
      <div className="regform">
        <form className="registerForm" onSubmit={handleSubmit}>
          <h1>Register</h1>
          <div className="formBody">
            <div className="Box">
              <label htmlFor="firstname">First Name</label>
              <input
                type="text"
                name="firstname"
                placeholder="First Name"
                value={formData.firstname}
                onChange={handleChange}
                required
              />
            </div>

            <div className="Box">
              <label htmlFor="lastname">Last Name</label>
              <input
                type="text"
                name="lastname"
                placeholder="Last Name"
                value={formData.lastname}
                onChange={handleChange}
                required
              />
            </div>

            <div className="Box">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>

            <div className="Box">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="Box">
              <label htmlFor="createpassword">Enter Password</label>
              <input
                type="password"
                name="createpassword"
                placeholder="Enter Password"
                value={formData.createpassword}
                onChange={handleChange}
                required
              />
              {/* Password Strength Progress Bar */}
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

            <div className="Box">
              <label htmlFor="confirmpassword">Confirm Password</label>
              <input
                type="password"
                name="confirmpassword"
                placeholder="Confirm Password"
                value={formData.confirmpassword}
                onChange={handleChange}
                required
              />
            </div>

            {error && <div className="error">{error}</div>} {/* Display error message in red */}

            <button className="button" type="submit">
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CustomRegister;
