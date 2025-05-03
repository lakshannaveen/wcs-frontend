import React, { useState } from 'react';
import { FaFacebookF, FaYoutube, FaInstagram, FaTiktok } from 'react-icons/fa';
import './Contact.css';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useLanguage } from '../contexts/LanguageContext';
import { contactTranslations } from '../translations/contactTranslations';

const CustomContact = () => {
  //for the translations
  const { language } = useLanguage();
  const t = contactTranslations[language];


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
    if (!formData.firstName) tempErrors.firstName = t.errors.firstName;//errors with translations
    if (!formData.lastName) tempErrors.lastName = t.errors.lastName;
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) tempErrors.email = t.errors.email;
    if (!formData.phone || formData.phone.length !== 10) tempErrors.phone = t.errors.phone;
    if (!formData.message) tempErrors.message = t.errors.message;
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
          setSuccessMessage(data.message || t.success.default);
          setFormData({
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            message: '',
          });
        } else {
          const errorData = await response.json();
          setErrorMessage(errorData.error || t.error.submitErorr);
        }
      } catch (error) {
        console.error('Error submitting form:', error);
        setErrorMessage(t.errors.serverError);
      }
      setValidated(true); 
    }
    setValidated(true); 
  };

  return (
    <div className='contactus'>
      <div className='left-section'>
           <h2 className='heading-contact'>{t.contactInfo.title}</h2>
        <p>{t.contactInfo.subtitle}</p>
        <p><strong>{t.contactInfo.emailLabel}:</strong> {t.contactInfo.email}</p>
        <p><strong>{t.contactInfo.phoneLabel}:</strong> {t.contactInfo.phone}</p>
        <h3>{t.socialMedia.title}</h3>
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
        <p className='business-para'>{t.businessHours}</p>
      </div>
      
      <div className="right-section">
        <h2>{t.form.title}</h2>
        <Form onSubmit={handleSubmit} noValidate validated={validated}>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="formFirstName">
              <div className="form-label-wrapper">
                <Form.Label>{t.form.labels.firstName}</Form.Label>
                <Form.Control
                  type="text"
                  name="firstName"
                  placeholder={t.form.placeholders.firstName}
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
                <Form.Label>{t.form.labels.lastName}</Form.Label>
                <Form.Control
                  type="text"
                  name="lastName"
                  placeholder={t.form.placeholders.lastName}
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
                <Form.Label>{t.form.labels.email}</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  placeholder={t.form.placeholders.email}
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
                <Form.Label>{t.form.labels.phone}</Form.Label>
                <Form.Control
                  type="tel"
                  name="phone"
                  placeholder={t.form.placeholders.phone}
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
              <Form.Label>{t.form.labels.message}</Form.Label>
              <Form.Control
                as="textarea"
                name="message"
                placeholder={t.form.placeholders.message}
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
          {t.form.submitButton}
          </Button>
        </Form>

        {successMessage && <p className="success-message">{successMessage}</p>}
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </div>
    </div>
  );
};

export default CustomContact;
