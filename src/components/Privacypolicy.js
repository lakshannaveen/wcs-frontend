import React from 'react'
import './Privacypolicy.css';

const CustomPrivacypolicy = () => {
  return (
   
        <div className="container privacy-policy-container">
      <h1 className="text-center">Privacy Policy</h1>
      <p className="text-muted text-center">(Last updated: 8th May 2024)</p>

      <section>
        <h3>Information we collect</h3>
        <p>
          We collect the following information from you:
          <ul>
            <li>Personal Information: Name, email address, phone number, and address when you register for a waste collection plan or contact us.</li>
            <li>Payment Information: Payment details are collected when you purchase our services.</li>
            <li>Automatically Collected Information: IP address, browser type, and usage (via cookies) when you visit our website.</li>
          </ul>
        </p>
      </section>

      <section>
        <h3>How We Use Your Information</h3>
        <p>We use the information we collect to:
          <ul>
            <li>Provide and manage waste collection services.</li>
            <li>Process your payments and send invoices.</li>
            <li>Communicate with you regarding service updates or changes.</li>
            <li>Improve our website and services based on user behavior.</li>
            <li>Comply with legal requirements.</li>
          </ul>
        </p>
      </section>

      <section>
        <h3>Cookies</h3>
        <p>We use cookies to enhance your experience on our website. Cookies help us track how you interact with the site, but they do not collect personal data. You can manage or disable cookies through your browser settings.</p>
      </section>

      <section>
        <h3>Data Sharing</h3>
        <p>We do not sell or share your personal information with third parties, except:</p>
        <ul>
          <li>Service Providers: We may share your information with third-party providers (e.g., payment processors) to facilitate our service.</li>
          <li>Legal Compliance: If required by law, we may share your information with authorities to comply with legal obligations.</li>
        </ul>
      </section>

      <section>
        <h3>Data Security</h3>
        <p>We implement reasonable security measures to protect your personal information from unauthorized access, disclosure, or misuse. However, no online system is entirely secure, and we cannot guarantee the absolute security of your data.</p>
      </section>

      <section>
        <h3>Your Rights</h3>
        <p>You have the right to:
          <ul>
            <li>Access the personal information we hold about you.</li>
            <li>Request corrections to inaccurate information.</li>
            <li>Request the deletion of your data, subject to legal requirements.</li>
          </ul>
        </p>
      </section>

      <section>
        <h3>Changes to This Policy</h3>
        <p>We may update this Privacy Policy from time to time. Any changes will be posted on this page, and we encourage you to review it periodically.</p>
      </section>
      <p className="text-center mt-4">
        If you have any questions or concerns about this Privacy Policy or how we handle your data, please contact us via our <a href="/contact">Contact Us</a> page.
      </p>
    </div>
  )
}

export default CustomPrivacypolicy
