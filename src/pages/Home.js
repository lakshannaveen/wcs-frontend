import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import carosle1 from '../images/carosle1.jpg';
import carosle2 from '../images/carosle2.jpg';
import carosle3 from '../images/carosle3.jpg';

import './Home.css';
// card import
import Card from 'react-bootstrap/Card';
import { Row, Col } from 'react-bootstrap';
import card1 from '../images/card1.jpeg';
import card2 from '../images/card2.jpeg';
import card3 from '../images/card3.jpeg';
import Search from '../components/Search';
import { Link } from 'react-router-dom';


//import language change function
import { useLanguage } from '../contexts/LanguageContext';
function CustomHome() {

    const { language } = useLanguage();

  return (
    <div>
      {/* carousel section */}
      <Carousel>
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
      <Row className='custom-card-group'>
        <Col md={3} className="d-flex justify-content-center">
          <Link to='/customsubscription' className='card-link'>
            <Card className='custom-card'>
              <Card.Img variant="top" src={card1} alt='subscription' />
            </Card>
          </Link>
        </Col>
        <Col md={3} className="d-flex justify-content-center">
          <Link to='/customguidance' className='card-link'>
            <Card className='custom-card'>
              <Card.Img variant="top" src={card2} alt='offers' />
            </Card>
          </Link>
        </Col>
        <Col md={3} className="d-flex justify-content-center">
          <Link to='/aboutus' className='card-link'>
            <Card className='custom-card'>
              <Card.Img variant="top" src={card3} alt='example' />
            </Card>
          </Link>
        </Col>
      </Row>

      {/* commitment section */}
      <section className='commitment-section'>
        <div className='container'>
          <h2>{language === 'en' 
            ? 'Our Waste Collection Services are 100% Committed to Your Community! ' : 'අපගේ අපද්‍රව්‍ය එකතු කිරීමේ සේවාවන් ඔබේ ප්‍රජාවට 100% කැපවී ඇත!'}
          </h2>
          <p>{language === 'en' ? 'Eco-Friendly, Reliable, and Tailored Just for You!' : 'පරිසර හිතකාමී, විශ්වාසදායක සහ ඔබ වෙනුවෙන්ම සකස් කර ඇත!'} </p>
          <p className='highlight'> {language === 'en' ?" Together, We're Building a Cleaner Tomorrow! ":'එක්ව, අපි පිරිසිදු හෙට දවසක් ගොඩනඟමු!'} </p>
          <Link to="/orderhistory">
            <button className='order-now-btn'>Order History</button>
          </Link>
        </div>
      </section>
    </div>
  );
}

export default CustomHome;
