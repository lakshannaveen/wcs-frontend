import React, { useState } from 'react';
import { FaFacebookF, FaYoutube, FaInstagram, FaTiktok } from 'react-icons/fa';
import './Contact.css';
import { Form, Button, Row, Col } from 'react-bootstrap';

const CustomContact = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: '',
  });
  const [errors, setErrors] = useState({});
  const [validated, setValidated] = useState(false); 
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const validate = () => {
    let tempErrors = {};
    if (!formData.firstName) tempErrors.firstName = 'First Name is required';
    if (!formData.lastName) tempErrors.lastName = 'Last Name is required';
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) tempErrors.email = 'Valid Email is required';
    if (!formData.phone || formData.phone.length !== 10) tempErrors.phone = 'Valid Phone Number is required (10 digits)';
    if (!formData.message) tempErrors.message = 'Message cannot be empty';
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSuccessMessage('');
    setErrorMessage('');

    if (validate()) {
      try {
        const response = await fetch('http://localhost:5002/api/contact/contact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          const data = await response.json();
          setSuccessMessage(data.message || 'Contact saved successfully!');
          setFormData({
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            message: '',
          });
        } else {
          const errorData = await response.json();
          setErrorMessage(errorData.error || 'Failed to save contact.');
        }
      } catch (error) {
        console.error('Error submitting form:', error);
        setErrorMessage('An error occurred while submitting the form. Please try again later.');
      }
    }
    setValidated(true); 
  };

  return (
    <div className="contactus">
      <div className="left-section">
        <h2>Contact Information</h2>
        <p>Feel Free to Contact us via</p>
        <p><strong>Email:</strong> wastecollectionsystem.lk@gmail.com</p>
        <p><strong>Phone:</strong> 0912234567</p>
        <h3>Find Us on Social Media</h3>
        <div className="social-icons">
          <a href="https://www.facebook.com/profile.php?id=61567165493241&mibextid=ZbWKwL" target="_blank" rel="noopener noreferrer">
            <FaFacebookF size={30} color="#FFFFFF" />
          </a>
          <a href="https://youtube.com/@wcs-x3?si=lRB3Qz9z4pqeObtO" target="_blank" rel="noopener noreferrer">
            <FaYoutube size={30} color="#FFFFFF" />
          </a>
          <a href="https://www.instagram.com/wcs_08/profilecard/?igsh=MWpmbHh1NTcxb3ZqOA==" target="_blank" rel="noopener noreferrer">
            <FaInstagram size={30} color="#FFFFFF" />
          </a>
          <a href="https://tiktok.com/@WCS_08" target="_blank" rel="noopener noreferrer">
            <FaTiktok size={30} color="#FFFFFF" />
          </a>
        </div>
        <p className="business-para">Business Hours: Monday - Friday: 9 AM - 5 PM</p>
      </div>
      <div className="right-section">
        <h2>Ask Anything</h2>
        <Form onSubmit={handleSubmit} noValidate validated={validated}>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="formFirstName">
              <Form.Label>First Name *</Form.Label>
              <Form.Control
                type="text"
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleChange}
                isInvalid={!!errors.firstName}
              />
              <Form.Control.Feedback type="invalid">
                {errors.firstName}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col} controlId="formLastName">
              <Form.Label>Last Name *</Form.Label>
              <Form.Control
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleChange}
                isInvalid={!!errors.lastName}
              />
              <Form.Control.Feedback type="invalid">
                {errors.lastName}
              </Form.Control.Feedback>
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Group as={Col} controlId="formEmail">
              <Form.Label>Email *</Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                isInvalid={!!errors.email}
              />
              <Form.Control.Feedback type="invalid">
                {errors.email}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col} controlId="formPhone">
              <Form.Label>Phone Number *</Form.Label>
              <Form.Control
                type="tel"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
                isInvalid={!!errors.phone}
              />
              <Form.Control.Feedback type="invalid">
                {errors.phone}
              </Form.Control.Feedback>
            </Form.Group>
          </Row>

          <Form.Group controlId="formMessage" className="mb-3">
            <Form.Label>Message</Form.Label>
            <Form.Control
              as="textarea"
              name="message"
              placeholder="Write your inquiry here..."
              value={formData.message}
              onChange={handleChange}
              isInvalid={!!errors.message}
            />
            <Form.Control.Feedback type="invalid">
              {errors.message}
            </Form.Control.Feedback>
          </Form.Group>

          <Button variant="success" type="submit">
            Submit
          </Button>
        </Form>
        {successMessage && <p className="success-message">{successMessage}</p>}
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </div>
    </div>
  );
};

export default CustomContact;
