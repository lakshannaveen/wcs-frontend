import React, { useState, useEffect } from 'react';
import './About.css';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { useLanguage } from '../contexts/LanguageContext';

const CustomAbout = () => {
  const [feedbackData, setFeedbackData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { language } = useLanguage();


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
            <h2>{language === 'en' ? 'About Us' : 'අපි ගැන'}</h2>
            <p>{language === 'en' ?
              'WCS (Waste Collection System) is committed to providing efficient and sustainable waste collection and management services, with a vision to drive a "Green Future" for our communities. Our mission is to make it easy for individuals and businesses to responsibly dispose of waste, promoting a cleaner and greener environment.' : 
              'WCS (අපද්‍රව්‍ය එකතු කිරීමේ පද්ධතිය) අපගේ ප්‍රජාවන් සඳහා "හරිත අනාගතයක්" ගෙන යාමේ දැක්ම ඇතිව කාර්යක්ෂම හා තිරසාර අපද්‍රව්‍ය එකතු කිරීමේ සහ කළමනාකරණ සේවා සැපයීමට කැපවී සිටී. අපගේ මෙහෙවර වන්නේ පුද්ගලයන්ට සහ ව්‍යාපාරවලට වගකීමෙන් යුතුව අපද්‍රව්‍ය බැහැර කිරීම පහසු කිරීම, පිරිසිදු හා හරිත පරිසරයක් ප්‍රවර්ධනය කිරීමයි.'}
            </p>
            <p>{language === 'en' ?
              'Established in 2024, WCS has quickly become a trusted partner in waste management across various regions. Through our "Green Future" initiative, our dedicated team ensures that waste from homes, restaurants, and businesses is collected, sorted, and responsibly recycled or disposed of. Our primary focus is to reduce landfill waste and promote sustainable practices by offering a range of service plans tailored to our customers" diverse needs.'
               :'2024 දී පිහිටුවන ලද WCS, විවිධ කලාප හරහා අපද්‍රව්‍ය කළමනාකරණයේ විශ්වාසදායක හවුල්කරුවෙකු බවට ඉක්මනින් පත්ව ඇත. අපගේ "හරිත අනාගතය" මුලපිරීම හරහා, අපගේ කැපවූ කණ්ඩායම නිවාස, අවන්හල් සහ ව්‍යාපාරවලින් අපද්‍රව්‍ය එකතු කිරීම, වර්ග කිරීම සහ වගකීමෙන් යුතුව ප්‍රතිචක්‍රීකරණය කිරීම හෝ බැහැර කිරීම සහතික කරයි. අපගේ මූලික අවධානය යොමු වන්නේ අපගේ ගනුදෙනුකරුවන්ගේ විවිධ අවශ්‍යතාවලට ගැලපෙන සේවා සැලසුම් මාලාවක් ඉදිරිපත් කිරීමෙන් ගොඩකිරීමේ අපද්‍රව්‍ය අඩු කිරීම සහ තිරසාර භාවිතයන් ප්‍රවර්ධනය කිරීමයි.'}
            </p>
            <p>{language === 'en' ? 
            'Our services include daily, weekly, and monthly collection plans, catering to households, businesses, and industrial clients. With a fleet of modern vehicles and a dedicated team, we are committed to timely and efficient waste collection services. By prioritizing sustainability, WCS is driving towards a Green Future where waste is minimized, and recycling becomes second nature.' :
              'අපගේ සේවාවන් අතරට දෛනික, සතිපතා සහ මාසික එකතු කිරීමේ සැලසුම්, නිවාස, ව්‍යාපාර සහ කාර්මික සේවාදායකයින් සඳහා ආහාර සැපයීම ඇතුළත් වේ. නවීන වාහන සමූහයක් සහ කැපවූ කණ්ඩායමක් සමඟින්, අපි කාලෝචිත හා කාර්යක්ෂම අපද්‍රව්‍ය එකතු කිරීමේ සේවාවන් සඳහා කැපවී සිටිමු. තිරසාරභාවයට ප්‍රමුඛත්වය දීමෙන්, WCS අපද්‍රව්‍ය අවම කරන සහ ප්‍රතිචක්‍රීකරණය දෙවන ස්වභාවයක් බවට පත්වන හරිත අනාගතයක් කරා ගමන් කරයි.'}
            </p>
            <p>{language === 'en' ?
              "Join WCS today, and become part of the Green Future movement. Let's work together to create a cleaner, more sustainable world. For inquiries or service requests, reach out to our customer service hotline at 0912234567." 
              : 'අදම WCS හා සම්බන්ධ වී හරිත අනාගත ව්‍යාපාරයේ කොටස්කරුවෙකු වන්න. පිරිසිදු, වඩාත් තිරසාර ලෝකයක් නිර්මාණය කිරීමට අපි එක්ව කටයුතු කරමු. විමසීම් හෝ සේවා ඉල්ලීම් සඳහා, 0912234567 හි අපගේ පාරිභෝගික සේවා ක්ෂණික ඇමතුම් අංකය අමතන්න.'}
            </p>
          </div>
        </section>
        <hr />

        {/* Customer Feedback Section */}
        <Container className="review-section my-5">
          <h4 className="text-center">{language === 'en' ? 'OUR CUSTOMERS SPEAK FOR US' : 'අපගේ ගනුදෙනුකරුවන් අප වෙනුවෙන් කතා කරයි'}</h4>
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