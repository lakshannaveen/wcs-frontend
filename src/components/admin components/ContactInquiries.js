import React, { useState, useEffect } from 'react';
import './ContactInquiries.css';

const ContactInquiries = () => {
  const [inquiries, setInquiries] = useState([]);

  useEffect(() => {
    const fetchInquiries = async () => {
      try {
        const response = await fetch('http://localhost:5002/api/contact/contact');
        if (!response.ok) {
          throw new Error('Failed to fetch contact inquiries');
        }
        const data = await response.json();
        setInquiries(data);
      } catch (error) {
        console.error('Error fetching inquiries:', error);
      }
    };

    fetchInquiries();
  }, []);

  return (
    <div className="contact-inquiries-container">
      <h2>Contact Inquiries</h2>
      <table className="contact-inquiries-table">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Message</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {inquiries.map((inquiry, index) => (
            <tr key={index}>
              <td>{inquiry.firstName}</td>
              <td>{inquiry.lastName}</td>
              <td>
                <a href={`mailto:${inquiry.email}`} className="email-link">
                  {inquiry.email}
                </a>
              </td>
              <td>
                <a href={`tel:${inquiry.phone}`} className="phone-link">
                  {inquiry.phone}
                </a>
              </td>
              <td>{inquiry.message}</td>
              <td>{new Date(inquiry.date).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ContactInquiries;
