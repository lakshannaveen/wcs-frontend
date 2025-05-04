import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { useNavigate } from 'react-router-dom';
import { registerTranslations } from '../config/registerLanguages';
import Cookies from 'js-cookie';
import './Register.css';

function CustomRegister() {
  // Access theme and language contexts
  const { theme } = useTheme();
  const { language } = useLanguage();

  // Get localized translation strings for current language
  const t = registerTranslations[language].register;

  // Hook to navigate after successful registration
  const navigate = useNavigate();

  // State for form fields
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    username: '',
    email: '',
    createpassword: '',
    confirmpassword: '',
  });

  // State for error/success messages and other flags
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [isChecked, setIsChecked] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Recalculate password strength on password change
    if (name === 'createpassword') {
      setPasswordStrength(calculatePasswordStrength(value));
    }
  };

  // Handle checkbox toggle
  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked);
  };

  // Check strength of password based on rules
  const calculatePasswordStrength = (password) => {
    if (password.length < 8) return 0;

    const hasLowercase = /[a-z]/.test(password);
    const hasUppercase = /[A-Z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (hasLowercase && hasUppercase && hasNumber && hasSpecialChar) {
      return 1;
    }
    return 0;
  };

  // Form submission handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate terms checkbox
    if (!isChecked) {
      setError(t.errors.termsRequired);
      return;
    }

    const nameRegex = /^[A-Za-z]+$/;

    // Validate first name
    if (!nameRegex.test(formData.firstname)) {
      setError(t.errors.firstNameInvalid);
      return;
    }

    // Validate last name
    if (!nameRegex.test(formData.lastname)) {
      setError(t.errors.lastNameInvalid);
      return;
    }

    // Validate username
    if (!nameRegex.test(formData.username)) {
      setError(t.errors.usernameInvalid);
      return;
    }

    // Validate email
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailRegex.test(formData.email)) {
      setError(t.errors.emailInvalid);
      return;
    }

    // Validate password length
    if (formData.createpassword.length < 8) {
      setError(t.errors.passwordLength);
      return;
    }

    // Check password match
    if (formData.createpassword !== formData.confirmpassword) {
      setError(t.errors.passwordMismatch);
      return;
    }

    // Check password strength
    if (passwordStrength < 1) {
      setError(t.errors.passwordStrength);
      return;
    }

    // Clear error if all validations pass
    setError('');

    try {
      // Send POST request to backend API
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
        // Show success and modal, save token
        setSuccessMessage(t.successMessage);
        setShowModal(true);
        Cookies.set('token', data.token, { expires: 1 });
        localStorage.setItem('token', data.token);

        // Redirect to homepage after short delay
        setTimeout(() => {
          navigate('/');
        }, 2000);
      } else {
        // Show API error
        setError(data.error || t.errors.registrationFailed);
      }
    } catch (error) {
      console.error(error);
      setError(t.errors.serverError);
    }
  };

  // Password strength bar color
  const getPasswordStrengthColor = () => {
    return passwordStrength === 1 ? 'green' : 'red';
  };

  return (
    <div className={`register-page ${theme}`}>
      <div className={`regform ${theme}`}>
        <form className={`registerForm ${theme}`} onSubmit={handleSubmit}>
          <h1>{t.title}</h1>
          <div className={`formBody ${theme}`}>

            {/* First Name Field */}
            <div className="Box">
              <label htmlFor="firstname">{t.firstNameLabel}</label>
              <input
                type="text"
                name="firstname"
                placeholder={t.firstNamePlaceholder}
                value={formData.firstname}
                onChange={handleChange}
                required
              />
            </div>

            {/* Last Name Field */}
            <div className="Box">
              <label htmlFor="lastname">{t.lastNameLabel}</label>
              <input
                type="text"
                name="lastname"
                placeholder={t.lastNamePlaceholder}
                value={formData.lastname}
                onChange={handleChange}
                required
              />
            </div>

            {/* Username Field */}
            <div className="Box">
              <label htmlFor="username">{t.usernameLabel}</label>
              <input
                type="text"
                name="username"
                placeholder={t.usernamePlaceholder}
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>

            {/* Email Field */}
            <div className="Box">
              <label htmlFor="email">{t.emailLabel}</label>
              <input
                type="email"
                name="email"
                placeholder={t.emailPlaceholder}
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            {/* Password Field with strength bar */}
            <div className="Box">
              <label htmlFor="createpassword">{t.passwordLabel}</label>
              <input
                type="password"
                name="createpassword"
                placeholder={t.passwordPlaceholder}
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
                  {passwordStrength === 1 ? t.passwordStrength.strong : t.passwordStrength.weak}
                </span>
              </div>
            </div>

            {/* Confirm Password Field */}
            <div className="Box">
              <label htmlFor="confirmpassword">{t.confirmPasswordLabel}</label>
              <input
                type="password"
                name="confirmpassword"
                placeholder={t.confirmPasswordPlaceholder}
                value={formData.confirmpassword}
                onChange={handleChange}
                required
              />
            </div>

            {/* Terms & Conditions Checkbox */}
            <div className="checkbox-container">
              <input
                type="checkbox"
                name="terms"
                checked={isChecked}
                onChange={handleCheckboxChange}
                id="terms"
              />
              <label htmlFor="terms">
                {t.termsText} <span>{t.privacyPolicy}</span> {t.and} <span>{t.TAQ}</span>
              </label>
            </div>

            {/* Show error or success message */}
            {error && <div className="error">{error}</div>}
            {successMessage && <div className="success">{successMessage}</div>}

            {/* Submit Button */}
            <button className="button" type="submit">
              {t.registerButton}
            </button>
          </div>

          {/* Login link */}
          <div className="login-link">
            <p>{t.loginPrompt} <a href="/login">{t.loginLink}</a></p>
          </div>
        </form>
      </div>

      {/* Success Modal */}
      {showModal && (
        <div className={`modal-overlay ${theme}`} onClick={() => setShowModal(false)}>
          <div className={`modal-content ${theme}`} onClick={(e) => e.stopPropagation()}>
            <h2>{successMessage}</h2>
            <button onClick={() => setShowModal(false)}>{t.closeButton}</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CustomRegister;
