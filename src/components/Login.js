import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { loginTranslations } from '../config/loginLanguages';
import './Login.css';

function CustomLogin() {
  const { theme } = useTheme();
  const { language } = useLanguage();
  const t = loginTranslations[language].login;
  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState({ username: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate username and password
    let errors = {};
    if (username.trim() === '') {
      errors.username = t.errors.usernameRequired;
    }
    if (password.length < 8) {
      errors.password = t.errors.passwordLength;
    }

    if (Object.keys(errors).length > 0) {
      setErrorMessage(errors);
      return;
    }
    
    setErrorMessage({});
    setLoading(true);

    try {
      const response = await fetch('http://localhost:5002/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ username, password }),
      });
      
      const result = await response.json();
      
      if (response.ok) {
        setSuccessMessage(t.successMessage);
        setShowModal(true);
        setTimeout(() => {
          navigate('/');
        }, 2000);
      } else {
        setErrorMessage({ username: result.error || '', password: '' });
      }
    } catch (error) {
      console.error('Error during login:', error);
      setErrorMessage({ username: t.errors.serverError });
    } finally {
      setLoading(false);
    }
  };

  const closeModal = () => setShowModal(false);

  return (
    <div className={`logform ${theme}`}>
      <form className={`loginForm ${theme}`} onSubmit={handleSubmit}>
        <h1>{t.title}</h1>
        <div className="formBody">
          {errorMessage.username && (
            <div className="error">{errorMessage.username}</div>
          )}
          {errorMessage.password && (
            <div className="error">{errorMessage.password}</div>
          )}
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
          <button className="button" type="submit" disabled={loading}>
            {loading ? t.loadingButton : t.submitButton}
          </button>
          <div className="register">
            <label>{t.registerPrompt} </label>
            <a href="/register">{t.registerLink}</a>
          </div>
        </div>
      </form>
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