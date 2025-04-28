import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useNavigate } from 'react-router-dom';
import './Register.css';
import Cookies from 'js-cookie'; // To manage cookies

function CustomRegister() {
  const { theme } = useTheme();
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
    
    const hasLowercase = /[a-z]/.test(password);
    const hasUppercase = /[A-Z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    
    // Only return 1 (strong) if all conditions are met
    if (hasLowercase && hasUppercase && hasNumber && hasSpecialChar) {
      return 1;
    }
    return 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!isChecked) {
      setError('You must agree to the Terms and Conditions and Privacy Policy.');
      return;
    }
  
    const nameRegex = /^[A-Za-z]+$/;
    if (!nameRegex.test(formData.firstname)) {
      setError('First Name must only contain letters and no spaces');
      return;
    }
  
    if (!nameRegex.test(formData.lastname)) {
      setError('Last Name must only contain letters and no spaces');
      return;
    }
  
    if (!nameRegex.test(formData.username)) {
      setError('Username must only contain letters and no spaces');
      return;
    }
  
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailRegex.test(formData.email)) {
      setError('Please enter a valid email');
      return;
    }
  
    if (formData.createpassword.length < 8) {
      setError('Password must be at least 8 characters long');
      return;
    }
  
    if (formData.createpassword !== formData.confirmpassword) {
      setError('Passwords do not match');
      return;
    }
  
    if (passwordStrength < 1) {
      setError('Password must contain at least 1 uppercase, 1 lowercase, 1 number, and 1 special character');
      return;
    }
  
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
        credentials: 'include',
      });
  
      const data = await response.json();
  
      if (response.ok) {
        setSuccessMessage('Registration successful!');
        setShowModal(true);
        // Store the token in cookies or localStorage
        Cookies.set('token', data.token, { expires: 1 }); // Store for 1 day
        localStorage.setItem('token', data.token); // Store in localStorage too
        setTimeout(() => {
          navigate('/'); // Redirect to home page
        }, 2000);
      } else {
        setError(data.error || 'Registration failed. Please try again.');
      }
    } catch (error) {
      console.error(error);
      setError('Something went wrong. Please try again.');
    }
  };
  
  const getPasswordStrengthColor = () => {
    return passwordStrength === 1 ? 'green' : 'red';
  };

  return (
    <div className={`register-page ${theme}`}>
      <div className={`regform ${theme}`}>
        <form className={`registerForm ${theme}`} onSubmit={handleSubmit}>
          <h1>Register</h1>
          <div className={`formBody ${theme}`}>
            {/* All your form fields remain exactly the same */}
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
                    width: `${passwordStrength * 100}%`,
                    backgroundColor: getPasswordStrengthColor(),
                  }}
                />
                <span className={`strength-text ${getPasswordStrengthColor()}`}>
                  {passwordStrength === 1 ? 'Strong' : 'Weak'}
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

      {showModal && (
        <div className={`modal-overlay ${theme}`} onClick={() => setShowModal(false)}>
          <div className={`modal-content ${theme}`} onClick={(e) => e.stopPropagation()}>
            <h2>{successMessage}</h2>
            <button onClick={() => setShowModal(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CustomRegister;