import React, { useState, useEffect } from 'react';
import './ContactInquiries.css';

const ContactInquiries = () => {
  const [inquiries, setInquiries] = useState([]);

  // Simulate fetching contact inquiries data
  useEffect(() => {
    // Replace this with your actual data fetch from the API
    const fetchData = async () => {
      // For demonstration, we use static data
      const response = [
        {
          firstName: 'John',
          lastName: 'Doe',
          email: 'johndoe@example.com',
          message: 'I need more information about the services.',
          phone: '0912234567',
          date: '2025-01-28',
        },
        {
          firstName: 'Jane',
          lastName: 'Smith',
          email: 'janesmith@example.com',
          message: 'Interested in subscription plans.',
          phone: '0912237890',
          date: '2025-01-27',
        },
        // Add more inquiries as needed
      ];
      setInquiries(response);
    };

    fetchData();
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
              <td>{inquiry.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ContactInquiries;
