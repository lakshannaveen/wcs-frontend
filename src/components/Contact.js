
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

  const validate = () => {
      let tempErrors = {};
      if (!formData.firstName) tempErrors.firstName = "First Name is required";
      if (!formData.lastName) tempErrors.lastName = "Last Name is required";
      if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) tempErrors.email = "Valid Email is required";
      if (!formData.phone || formData.phone.length !== 10) tempErrors.phone = "Valid Phone Number is required (10 digits)";
      if (!formData.message) tempErrors.message = "Message cannot be empty";
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

  const handleSubmit = (event) => {
      event.preventDefault();
      if (validate()) {
          console.log('Form submitted', formData);
          // Add form submission logic here (such as sending to backend)
      } else {
          console.log('Validation failed');
      }
      setValidated(true); 
  };
  return (
    <div className='contactus'>
        <div className='left-section'>
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
                 <p className='business-para'>Business Hours: Monday - Friday: 9 AM - 5 PM</p>
                 </div>
      <div className="right-section">
        <h2>Ask Anything</h2>
        <Form onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="formFirstName">
            <div className="form-label-wrapper">
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
              </div>
            </Form.Group>
            
            <Form.Group as={Col} controlId="formLastName">
            <div className="form-label-wrapper">
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
              </div>
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Group as={Col} controlId="formEmail">
            <div className="form-label-wrapper">
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
              </div>
            </Form.Group>
            
            <Form.Group as={Col} controlId="formPhone">
            <div className="form-label-wrapper">
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
              </div>
            </Form.Group>
          </Row>

          <Form.Group controlId="formMessage" className="mb-3">
          <div className="form-label-wrapper">
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
            </div>
          </Form.Group>

          <Button variant="success" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    </div>
    
  )
}

export default CustomContact
