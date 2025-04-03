import React from 'react';
import { useTheme } from '../context/ThemeContext';
import './Terms.css';

function CustomTerms() {
  const { theme } = useTheme();

  return (
    <div className={`terms-page ${theme}`}>
      <div className={`terms-container ${theme}`}>
        <h1>Terms & Conditions</h1>
        <p className="last-updated">(Last updated: 8th October 2024)</p>

        <div className="terms-content">
          <section className="terms-section">
            <h2>Introduction</h2>
            <p>Welcome to WCS! By using our services, you agree to these terms and conditions. Please read them carefully.</p>
          </section>

          <section className="terms-section">
            <h2>Service Usage</h2>
            <ul>
              <li>Users can modify their waste collection schedule up to two times per day.</li>
              <li>Waste must be separated into degradable, non-degradable, and food waste. If not properly separated, collection will not occur.</li>
              <li>Users must ensure that the waste provided adheres to the weight limit of their subscription plan.</li>
            </ul>
          </section>

          <section className="terms-section">
            <h2>Payment Terms</h2>
            <ul>
              <li>All payments must be made in advance.</li>
              <li>If selecting cash on delivery (COD), the first collection must be paid upfront.</li>
            </ul>
          </section>

          <section className="terms-section">
            <h2>Cancellation Policy</h2>
            <ul>
              <li>Users may cancel their collection at any time if the waste has not yet been collected.</li>
              <li>If at least one collection has taken place, no refunds will be issued for canceled orders.</li>
            </ul>
          </section>

          <section className="terms-section">
            <h2>Amendments</h2>
            <p>We may update these terms from time to time. Continued use of the service implies acceptance of any changes.</p>
          </section>

          <div className="contact-info">
            <p>For any inquiries, please reach out via our <a href="/contact">Contact Us</a> page.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CustomTerms;