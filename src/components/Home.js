import React from 'react';
import { useTheme } from '../context/ThemeContext';
import Carousel from 'react-bootstrap/Carousel';
import carosle1 from '../images/carosle1.jpg';
import carosle2 from '../images/carosle2.jpg';
import carosle3 from '../images/carosle3.jpg';
import './Home.css';
import Card from 'react-bootstrap/Card';
import { Row, Col } from 'react-bootstrap';
import card1 from '../images/card1.jpeg';
import card2 from '../images/card2.jpeg';
import card3 from '../images/card3.jpeg';
import Search from './Search';
import { Link } from 'react-router-dom';

function CustomHome() {
  const { theme } = useTheme();

  return (
    <div className={`home-container ${theme}`}>
      {/* carousel section */}
      <Carousel className={`home-carousel ${theme}`}>
        <Carousel.Item>
          <img className='d-block w-100' src={carosle1} alt='First slide' />
        </Carousel.Item>
        <Carousel.Item>
          <img className='d-block w-100' src={carosle2} alt='Second slide' />
        </Carousel.Item>
        <Carousel.Item>
          <img className='d-block w-100' src={carosle3} alt='Third slide' />
        </Carousel.Item>
      </Carousel>

      <div id="search-section">
        <Search /> {/* Search.js page */}
      </div>

      {/* card section */}
      <Row className={`custom-card-group ${theme}`}>
        <Col md={3} className="d-flex justify-content-center">
          <Link to='/customsubscription' className='card-link'>
            <Card className={`custom-card ${theme}`}>
              <Card.Img variant="top" src={card1} alt='subscription' />
            </Card>
          </Link>
        </Col>
        <Col md={3} className="d-flex justify-content-center">
          <Link to='/customguidance' className='card-link'>
            <Card className={`custom-card ${theme}`}>
              <Card.Img variant="top" src={card2} alt='offers' />
            </Card>
          </Link>
        </Col>
        <Col md={3} className="d-flex justify-content-center">
          <Link to='/aboutus' className='card-link'>
            <Card className={`custom-card ${theme}`}>
              <Card.Img variant="top" src={card3} alt='example' />
            </Card>
          </Link>
        </Col>
      </Row>

      {/* commitment section */}
      <section className={`commitment-section ${theme}`}>
        <div className='container'>
          <h2>
            Our Waste Collection Services are 100% Committed to Your Community!
          </h2>
          <p>Eco-Friendly, Reliable, and Tailored Just for You!</p>
          <p className='highlight'>Together, We're Building a Cleaner Tomorrow!</p>
          <Link to="/orderhistory">
            <button className='order-now-btn'>Order History</button>
          </Link>
        </div>
      </section>
    </div>
  );
}

export default CustomHome;