import React, { useState, useEffect } from 'react';
import './About.css';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { useLanguage } from '../contexts/LanguageContext';
import { aboutTranslations } from '../translations/aboutTranslations';


const CustomAbout = () => {
  const [feedbackData, setFeedbackData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { language } = useLanguage();
  const t = aboutTranslations[language];

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const response = await fetch('http://localhost:5002/api/feedback/feedback');
        if (response.ok) {
          const data = await response.json();
          setFeedbackData(data.feedbacks.slice(-3).reverse()); // Get the latest 3 feedbacks
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
            <h2>{t.title}</h2>
            <p>{t.paragraph1}</p>
            <p>{t.paragraph2}</p>
            <p>{t.paragraph3}</p>
            <p>{t.paragraph4}</p>
          </div>
        </section>
        <hr />

        {/* Customer Feedback Section */}
        <Container className="review-section my-5">
          <h4 className="text-center">{t.feedbackTitle}</h4>
          {loading ? (
            <p>{t.loadingText}</p>
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
                      <Card.Text>
                        {'⭐'.repeat(feedback.rating)}
                      </Card.Text>
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