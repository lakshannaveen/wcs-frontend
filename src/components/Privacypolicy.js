import React from 'react';
import { useTheme } from '../context/ThemeContext';
import './Privacypolicy.css';

const CustomPrivacypolicy = () => {
  const { theme } = useTheme();

  return (
    <div className={`privacy-page ${theme}`}>
      <div className={`privacy-container ${theme}`}>
        <div className="privacy-content-wrapper">
          <h1>Privacy Policy</h1>
          <p className="last-updated">Last updated: 8th October 2024</p>

          <section className="privacy-section">
            <h2>Information we collect</h2>
            <p>We collect the following information from you:</p>
            <ul>
              <li>Personal Information: Name, email address, phone number, and address when you register for a waste collection plan or contact us.</li>
              <li>Payment Information: Payment details are collected when you purchase our services.</li>
              <li>Automatically Collected Information: IP address, browser type, and usage (via cookies) when you visit our website.</li>
            </ul>
          </section>

          <section className="privacy-section">
            <h2>How We Use Your Information</h2>
            <p>We use the information we collect to:</p>
            <ul>
              <li>Provide and manage waste collection services.</li>
              <li>Process your payments and send invoices.</li>
              <li>Communicate with you regarding service updates or changes.</li>
              <li>Improve our website and services based on user behavior.</li>
              <li>Comply with legal requirements.</li>
            </ul>
          </section>

          <section className="privacy-section">
            <h2>Data Sharing</h2>
            <p>We do not sell or share your personal information with third parties, except:</p>
            <ul>
              <li>Service Providers: We may share your information with third-party providers (e.g., payment processors) to facilitate our service.</li>
              <li>Legal Compliance: If required by law, we may share your information with authorities to comply with legal obligations.</li>
            </ul>
          </section>

          <section className="privacy-section">
            <h2>Data Security</h2>
            <p>We implement reasonable security measures to protect your personal information from unauthorized access, disclosure, or misuse. However, no online system is entirely secure, and we cannot guarantee the absolute security of your data.</p>
          </section>

          <section className="privacy-section">
            <h2>Your Rights</h2>
            <p>You have the right to:</p>
            <ul>
              <li>Access the personal information we hold about you.</li>
              <li>Request corrections to inaccurate information.</li>
              <li>Request the deletion of your data, subject to legal requirements.</li>
            </ul>
          </section>

          <section className="privacy-section">
            <h2>Changes to This Policy</h2>
            <p>We may update this Privacy Policy from time to time. Any changes will be posted on this page, and we encourage you to review it periodically.</p>
          </section>

          <div className="contact-info">
            <p>
              If you have any questions or concerns about this Privacy Policy or how we handle your data, 
              please contact us via our <a href="/contact">Contact Us</a> page.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomPrivacypolicy;