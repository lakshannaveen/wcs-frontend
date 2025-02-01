import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { FaStar } from 'react-icons/fa';
import './FeedBack.css';

function CustomFeedback() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        feedback: '',
    });
    const [rating, setRating] = useState(0);
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const validate = () => {
        let tempErrors = {};
        if (!formData.firstName) tempErrors.firstName = "First Name is required";
        if (!formData.lastName) tempErrors.lastName = "Last Name is required";
        if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) tempErrors.email = "Valid Email is required";
        if (!formData.feedback) tempErrors.feedback = "Feedback cannot be empty";
        if (rating === 0) tempErrors.rating = "Please select a rating";
        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    const handleRating = (value) => {
        setRating(value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        // Validate the form data
        if (validate()) {
            const feedbackData = { ...formData, rating };
    
            try {
                const response = await fetch('http://localhost:5002/api/feedback/submit', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(feedbackData),
                });
    
                if (response.ok) {
                    const data = await response.json();
                    console.log('Feedback submitted:', data);
                    
                    // Show success message and reset form
                    alert('Thank you for your feedback!'); // Or use another way to notify the user.
                    setFormData({}); // Reset form fields
                    setRating(0); // Reset rating, if applicable
                } else {
                    const errorData = await response.json();
                    console.error('Error:', errorData.message);
                    alert(`Error: ${errorData.message}`); // Notify user about error
                }
            } catch (error) {
                console.error('Error submitting feedback:', error);
                alert('Something went wrong. Please try again later.'); // Inform user of a generic error
            }
        } else {
            console.log('Validation failed');
            alert('Please fill out all fields correctly.');
        }
    };
    
    return (
        <div className="feedback-container mx-auto mt-5">
            <Container>
                <h2 className=" feedback-title">Feedback</h2>
                <Form noValidate onSubmit={handleSubmit} className="feedback-form">
                    <Row>
                        <Col md={6}>
                            <Form.Group controlId="firstName">
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
                        </Col>
                        <Col md={6}>
                            <Form.Group controlId="lastName">
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
                        </Col>
                    </Row>

                    <Form.Group controlId="email" className="mt-3">
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

                    <Form.Group className="mt-4 text-center">
                        <Form.Label>How satisfied are you with our services?</Form.Label>
                        <div>
                            {[1, 2, 3, 4, 5].map((star) => (
                                <FaStar
                                    key={star}
                                    size={24}
                                    color={star <= rating ? '#FFD700' : '#e4e5e9'}
                                    onClick={() => handleRating(star)}
                                    className="star-rating"
                                />
                            ))}
                        </div>
                        {errors.rating && (
                            <div className="text-danger">{errors.rating}</div>
                        )}
                    </Form.Group>

                    <Form.Group controlId="feedback" className="mt-3">
                        <div className="form-label-wrapper">
                            <Form.Label></Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={4}
                                name="feedback"
                                placeholder="Write your feedback here"
                                value={formData.feedback}
                                onChange={handleChange}
                                isInvalid={!!errors.feedback}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.feedback}
                            </Form.Control.Feedback>
                        </div>
                    </Form.Group>

                    <Button variant="success" type="submit" className="mt-4 feedback-submit-btn">
                        Submit
                    </Button>

                    <p className="feedback-note mt-3">
                        Your feedback will be kept confidential, and any personal information collected will only be used to enhance our services. Thank you for your trust.
                    </p>
                </Form>
            </Container>
        </div>
    );
}

export default CustomFeedback;
