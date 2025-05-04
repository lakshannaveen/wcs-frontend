import React, { useState, useEffect } from 'react';
import './About.css';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../config/aboutLanguages';


const CustomAbout = () => {
  const [feedbackData, setFeedbackData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { theme } = useTheme();
  const { language } = useLanguage();
  const t = translations[language].aboutUs;

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const response = await fetch('http://localhost:5002/api/feedback/feedback');
        if (response.ok) {
          const data = await response.json();
          setFeedbackData(data.feedbacks.slice(-3).reverse());
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
    <div className={`about-page ${theme}`}>
      <Container>
        <section className={`about-us-container ${theme}`}>
          <div className={`about-us-content ${theme}`}>
            <h2>{t.title}</h2>
            {t.content.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </section>
        <hr className={`divider ${theme}`} />

        {/* Customer Feedback Section */}
        <Container className={`review-section ${theme} my-5`}>
          <h4 className="text-center">{t.feedbackTitle}</h4>
          {loading ? (
            <p>{t.loadingText}</p>
          ) : (
            <Row>
              {feedbackData.map((feedback, index) => (
                <Col md={4} key={index} className="mb-4">
                  <Card className={`review-card ${theme}`}>
                    <Card.Header className={`name-header ${theme}`}>
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