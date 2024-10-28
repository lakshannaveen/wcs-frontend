import React from 'react'
import './Terms.css';

function CustomTerms() {
  return (
    <div className="terms-container">
    <h1 className="text-center">Terms & Conditions</h1>
    <p className="text-muted text-center">(Last updated: 8th October 2024)</p>
    
    <div className="terms-content">
        <h3>Introduction</h3>
        <p>Welcome to WCS! By accessing or using our website, you agree to be bound by these terms and conditions. Please read them carefully before using our services.</p>
        
        <h3>Services Provided</h3>
        <p>We offer waste collection services based on monthly, weekly, and daily plans. The services you select are subject to the terms outlined in your specific plan.</p>
        
        <h3>User Responsibilities</h3>
        <ul>
            <li>Provide accurate and current information during registration.</li>
            <li>Use our services solely for lawful purposes.</li>
            <li>Ensure timely payment for the waste collection plan you select.</li>
        </ul>

        <h3>Payment Terms</h3>
        <p>All payments for waste collection plans must be made in advance. Failure to make timely payments may result in suspension of services.</p>

        <h3>Cancellation and Refunds</h3>
        <p>You can cancel your plan at any time, but refunds will be provided only for unused services, as per our refund policy.To cancel your plan, please contact us via the details provided on the Contact Us page.</p>

        <h3>Service Availability</h3>
        <p>While we strive to provide consistent, uninterrupted service, there may be instances where services are delayed or suspended due to unforeseen circumstances such as extreme weather or operational issues. In such cases, we will notify affected users as soon as possible.</p>

        <h3>Liability</h3>
        <p>We are committed to providing high-quality waste collection services, but we are not liable for any damages arising from:</p>
        <ul>
            <li>Interruption in service.</li>
            <li>Failure to comply with waste disposal guidelines.</li>
            <li>Any misuse of the website.</li>
        </ul>

        <h3>Amendments</h3>
        <p>We may update these terms from time to time. Any changes will be posted on this page, and your continued use of the website indicates your acceptance of the updated terms.</p>

        <h3>Governing Law</h3>
        <p>These terms and conditions are governed by the laws of Sri lanka, and any disputes will be subject to the jurisdiction of local courts.</p>

        <h3>Contact Us</h3>
        <p>For any questions or concerns regarding these terms, please reach out through our Contact Us page or via the provided contact details.</p>
    </div>
</div>
  )
}

export default CustomTerms
