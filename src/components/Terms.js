import React from 'react';
import './Terms.css';

function CustomTerms() {
  return (
    <div className="terms-container">
      <h1 className="text-center">Terms & Conditions</h1>
      <p className="text-muted text-center">(Last updated: 8th October 2024)</p>

      <div className="terms-content">
        <h3>Introduction</h3>
        <p>Welcome to WCS! By using our services, you agree to these terms and conditions. Please read them carefully.</p>

        <h3>Service Usage</h3>
        <ul>
          <li>Users can modify their waste collection schedule up to two times per day.</li>
          <li>Waste must be separated into degradable, non-degradable, and food waste. If not properly separated, collection will not occur.</li>
          <li>Users must ensure that the waste provided adheres to the weight limit of their subscription plan.</li>
        </ul>

        <h3>Payment Terms</h3>
        <ul>
          <li>All payments must be made in advance.</li>
          <li>If selecting cash on delivery (COD), the first collection must be paid upfront.</li>
        </ul>

        <h3>Cancellation Policy</h3>
        <ul>
          <li>Users may cancel their collection at any time if the waste has not yet been collected.</li>
          <li>If at least one collection has taken place, no refunds will be issued for canceled orders.</li>
        </ul>

        <h3>Amendments</h3>
        <p>We may update these terms from time to time. Continued use of the service implies acceptance of any changes.</p>

        <h3>Contact Us</h3>
        <p>For any inquiries, please reach out via our Contact Us page.</p>
      </div>
    </div>
  );
}

export default CustomTerms;
