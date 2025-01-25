import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Register.css';

function CustomRegister() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    username: '',
    email: '',
    createpassword: '',
    confirmpassword: '',
  });

  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [isChecked, setIsChecked] = useState(false); // State for checkbox validation
  const [showModal, setShowModal] = useState(false); // State for showing success modal

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === 'createpassword') {
      setPasswordStrength(calculatePasswordStrength(value)); // Update password strength dynamically
    }
  };

  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked); // Update checkbox state
  };

  const calculatePasswordStrength = (password) => {
    if (password.length < 8) return 0;
    let strength = 0;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength += 1; // Check for mixed case
    if (/\d/.test(password)) strength += 1; // Check for numbers
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) strength += 1; // Check for special characters
    return strength;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Ensure the user has agreed to the Terms and Conditions
    if (!isChecked) {
      setError('You must agree to the Terms and Conditions and Privacy Policy.');
      return;
    }

    // Validate first name (only letters, no spaces)
    const nameRegex = /^[A-Za-z]+$/;
    if (!nameRegex.test(formData.firstname)) {
      setError('First Name must only contain letters and no spaces');
      return;
    }

    // Validate last name (only letters, no spaces)
    if (!nameRegex.test(formData.lastname)) {
      setError('Last Name must only contain letters and no spaces');
      return;
    }

    // Validate username (only letters, no spaces)
    if (!nameRegex.test(formData.username)) {
      setError('Username must only contain letters and no spaces');
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
    try {
      const response = await fetch('http://localhost:5002/api/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstname: formData.firstname,
          lastname: formData.lastname,
          username: formData.username,
          email: formData.email,
          createpassword: formData.createpassword,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccessMessage('Registration successful!');
        setShowModal(true); // Show success modal
        setTimeout(() => {
          navigate('/'); // Redirect to the home page after 2 seconds
        }, 2000); // Delay for 2 seconds
      } else {
        setError(data.error || 'Registration failed. Please try again.');
      }
    } catch (error) {
      console.error(error);
      setError('Something went wrong. Please try again.');
    }
  };

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

            {/* Terms and Conditions Checkbox */}
            <div className="checkbox-container">
              <input
                type="checkbox"
                name="terms"
                checked={isChecked}
                onChange={handleCheckboxChange}
                id="terms"
              />
              <label htmlFor="terms">
                I agree to the <span>Privacy Policy</span> and <span>TAQ</span>
              </label>
            </div>

            {error && <div className="error">{error}</div>}
            {successMessage && <div className="success">{successMessage}</div>}

            <button className="button" type="submit">
              Register
            </button>
          </div>
          <div className="login-link">
            <p>Already have an account? <a href="/login">Login</a></p>
          </div>
        </form>
      </div>

      {/* Success Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>{successMessage}</h2>
            <button onClick={() => setShowModal(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CustomRegister;
