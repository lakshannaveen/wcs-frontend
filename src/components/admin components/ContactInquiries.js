import React, { useState, useEffect } from 'react';
import './ContactInquiries.css';

const ContactInquiries = () => {
  const [inquiries, setInquiries] = useState([]);

  // Fetch inquiries from the API
  useEffect(() => {
    const fetchInquiries = async () => {
      try {
        const response = await fetch('http://localhost:5002/api/contact/contact');
        if (!response.ok) {
          throw new Error('Failed to fetch contact inquiries');
        }
        const data = await response.json();
        console.log('Inquiries data:', data); // Debugging the response
        setInquiries(data);
      } catch (error) {
        console.error('Error fetching inquiries:', error);
      }
    };
    
    fetchInquiries();
  }, []); // Empty dependency array means this runs once on mount
  const handleReplyStatusChange = async (id, replySent) => {
    console.log('Sending to backend:', { id, reply_sent: replySent }); // Debugging the data
    
    if (!id) {
      console.error('ID is missing or undefined!');
      return; // Prevent further action if id is missing
    }
  
    try {
      const response = await fetch('http://localhost:5002/api/contact/reply', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, reply_sent: replySent }), // Ensure proper data sent
      });
  
      if (!response.ok) {
        throw new Error('Failed to update reply status');
      }
  
      const updatedInquiry = await response.json();
      setInquiries((prevInquiries) =>
        prevInquiries.map((inquiry) =>
          inquiry.id === id
            ? { ...inquiry, replySent: updatedInquiry.reply_sent }
            : inquiry
        )
      );
    } catch (error) {
      console.error('Error updating reply status:', error);
    }
  };
  
  
  
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
            <th>Replied</th>
          </tr>
        </thead>
        <tbody>
          {inquiries.map((inquiry) => (
            <tr key={inquiry.id}>
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
              <td>
              <input
  type="checkbox"
  checked={inquiry.replySent}  
  onChange={async (e) => {
    const newReplyStatus = e.target.checked;
    await handleReplyStatusChange(inquiry.id, newReplyStatus);
  }}
/>




              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ContactInquiries;
