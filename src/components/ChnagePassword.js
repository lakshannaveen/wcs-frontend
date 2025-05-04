import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { useLanguage } from "../context/LanguageContext";
import { changePasswordTranslations } from "../config/changePasswordLanguages";
import "./ChnagePassword.css";

const ChangePassword = () => {
  const { theme } = useTheme();
  const { language } = useLanguage();
  const t = changePasswordTranslations[language].changePassword;
  
  const [email, setEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();

  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    return passwordRegex.test(password);
  };

  const calculatePasswordStrength = (password) => {
    if (password.length < 8) return 0;
    let strength = 0;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength += 1;
    if (/\d/.test(password)) strength += 1;
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) strength += 1;
    return strength;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setMessage(t.errors.invalidEmail);
      return;
    }

    if (!validatePassword(newPassword)) {
      setMessage(t.errors.invalidPassword);
      return;
    }

    if (newPassword === currentPassword) {
      setMessage(t.errors.samePassword);
      return;
    }

    if (newPassword !== confirmPassword) {
      setMessage(t.errors.passwordMismatch);
      return;
    }

    try {
      const response = await fetch('http://localhost:5002/api/password/change-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          currentPassword,
          newPassword,
          confirmPassword,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(t.successMessage);
        setShowModal(true);
        setTimeout(() => {
          navigate("/");
        }, 2000);
      } else {
        setMessage(data.message || t.errors.serverError);
      }
    } catch (error) {
      setMessage(t.errors.networkError);
    }
  };

  const handlePasswordChange = (e) => {
    const password = e.target.value;
    setNewPassword(password);
    setPasswordStrength(calculatePasswordStrength(password));
  };

  const getPasswordStrengthColor = () => {
    if (passwordStrength === 0) return 'red';
    return 'green';
  };

  const closeModal = () => setShowModal(false);

  return (
    <div className={`change-password-page ${theme}`}>
      <div className={`change-password-form ${theme}`}>
        <form className={`form-container ${theme}`} onSubmit={handleSubmit}>
          <h1>{t.title}</h1>

          {message && (
            <div className={message === t.successMessage ? "success" : "error"}>
              {message}
            </div>
          )}

          <div className="input-box">
            <label>{t.emailLabel}</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t.emailPlaceholder}
              required
            />
          </div>

          <div className="input-box">
            <label>{t.currentPasswordLabel}</label>
            <input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder={t.currentPasswordPlaceholder}
              required
            />
          </div>

          <div className="input-box">
            <label>{t.newPasswordLabel}</label>
            <input
              type="password"
              value={newPassword}
              onChange={handlePasswordChange}
              placeholder={t.newPasswordPlaceholder}
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
                {passwordStrength === 0 ? t.passwordStrength.weak : t.passwordStrength.strong}
              </span>
            </div>
          </div>

          <div className="input-box">
            <label>{t.confirmPasswordLabel}</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder={t.confirmPasswordPlaceholder}
              required
            />
          </div>

          <button className="button" type="submit">
            {t.changeButton}
          </button>
        </form>

        {showModal && (
          <div className={`modal-overlay ${theme}`} onClick={closeModal}>
            <div className={`modal-content ${theme}`} onClick={(e) => e.stopPropagation()}>
              <h2>{t.successMessage}</h2>
              <button onClick={closeModal}>{t.closeButton}</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChangePassword;