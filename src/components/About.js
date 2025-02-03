import React, { useState, useEffect } from 'react';
import './About.css';
import { Container, Row, Col, Card } from 'react-bootstrap';

const CustomAbout = () => {
  const [feedbackData, setFeedbackData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const response = await fetch('http://localhost:5002/api/feedback/feedback');
        if (response.ok) {
          const data = await response.json();
          setFeedbackData(data.feedbacks.slice(0, 3)); // Get only the first 3 feedbacks
        } else {
          console.error('Failed to fetch feedback data');
        }
      } catch (error) {
        console.error('Error fetching feedback:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeedback();
  }, []);

  return (
    <div>
      <Container>
        <section className="about-us-container">
          <div className="about-us-content">
            <h2>About Us</h2>
            <p>
              WCS (Waste Collection System) is committed to providing efficient and sustainable waste collection and management services, with a vision to drive a "Green Future" for our communities. Our mission is to make it easy for individuals and businesses to responsibly dispose of waste, promoting a cleaner and greener environment.
            </p>
            <p>
              Established in 2024, WCS has quickly become a trusted partner in waste management across various regions. Through our "Green Future" initiative, our dedicated team ensures that waste from homes, restaurants, and businesses is collected, sorted, and responsibly recycled or disposed of. Our primary focus is to reduce landfill waste and promote sustainable practices by offering a range of service plans tailored to our customers' diverse needs.
            </p>
            <p>
              Our services include daily, weekly, and monthly collection plans, catering to households, businesses, and industrial clients. With a fleet of modern vehicles and a dedicated team, we are committed to timely and efficient waste collection services. By prioritizing sustainability, WCS is driving towards a Green Future where waste is minimized, and recycling becomes second nature.
            </p>
            <p>
              Join WCS today, and become part of the Green Future movement. Let's work together to create a cleaner, more sustainable world. For inquiries or service requests, reach out to our customer service hotline at 0912234567.
            </p>
          </div>
        </section>
        <hr />

        {/* Customer Feedback Section */}
        <Container className="review-section my-5">
          <h4 className="text-center">OUR CUSTOMERS SPEAK FOR US</h4>
          {loading ? (
            <p>Loading feedback...</p>
          ) : (
            <Row>
              {feedbackData.map((feedback, index) => (
                <Col md={4} key={index} className="mb-4">
                  <Card className="review-card">
                    <Card.Header className="text-white name-header">
                      {feedback.first_name} {feedback.last_name}
                    </Card.Header>
                    <Card.Body>
                      <Card.Text>{feedback.feedback}</Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          )}
        </Container>
      </Container>
    </div>
  );
};

export default CustomAbout;