import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { loginTranslations } from '../config/loginLanguages';
import './Login.css';

function CustomLogin() {
  // Access theme from context
  const { theme } = useTheme();

  // Access current language from context
  const { language } = useLanguage();

  // Get translation text for current language
  const t = loginTranslations[language].login;
  
  // State for form inputs
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // State for showing validation or error messages
  const [errorMessage, setErrorMessage] = useState({ username: '', password: '' });

  // State to show loading spinner/text
  const [loading, setLoading] = useState(false);

  // State to show success message
  const [successMessage, setSuccessMessage] = useState('');

  // State to toggle success modal
  const [showModal, setShowModal] = useState(false);

  // Hook to navigate programmatically
  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form behavior

    // Validation checks
    let errors = {};
    if (username.trim() === '') {
      errors.username = t.errors.usernameRequired;
    }
    if (password.length < 8) {
      errors.password = t.errors.passwordLength;
    }

    // If there are validation errors, set and return
    if (Object.keys(errors).length > 0) {
      setErrorMessage(errors);
      return;
    }

    // Clear previous errors and show loading
    setErrorMessage({});
    setLoading(true);

    try {
      // Make login request to backend API
      const response = await fetch('http://localhost:5002/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include', // Include cookies
        body: JSON.stringify({ username, password }),
      });

      const result = await response.json();

      if (response.ok) {
        // On success, show modal and navigate after delay
        setSuccessMessage(t.successMessage);
        setShowModal(true);
        setTimeout(() => {
          navigate('/');
        }, 2000);
      } else {
        // Show backend error if login fails
        setErrorMessage({ username: result.error || '', password: '' });
      }
    } catch (error) {
      // Handle network/server error
      console.error('Error during login:', error);
      setErrorMessage({ username: t.errors.serverError });
    } finally {
      setLoading(false); // Stop loading spinner
    }
  };

  // Close success modal
  const closeModal = () => setShowModal(false);

  return (
    <div className={`logform ${theme}`}>
      <form className={`loginForm ${theme}`} onSubmit={handleSubmit}>
        <h1>{t.title}</h1>
        <div className="formBody">
          {/* Display error messages if any */}
          {errorMessage.username && (
            <div className="error">{errorMessage.username}</div>
          )}
          {errorMessage.password && (
            <div className="error">{errorMessage.password}</div>
          )}

          {/* Username input */}
          <div className="Box">
            <label htmlFor="username">{t.usernameLabel}</label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder={t.usernamePlaceholder}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          {/* Password input */}
          <div className="Box">
            <label htmlFor="password">{t.passwordLabel}</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder={t.passwordPlaceholder}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Submit button */}
          <button className="button" type="submit" disabled={loading}>
            {loading ? t.loadingButton : t.submitButton}
          </button>

          {/* Register link */}
          <div className="register">
            <label>{t.registerPrompt} </label>
            <a href="/register">{t.registerLink}</a>
          </div>
        </div>
      </form>

      {/* Success modal */}
      {showModal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className={`modal-content ${theme}`} onClick={(e) => e.stopPropagation()}>
            <h2>{successMessage}</h2>
            <button onClick={closeModal}>{t.closeButton}</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CustomLogin;
