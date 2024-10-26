import React from 'react'//carosule import
import Carousel from 'react-bootstrap/Carousel';
import carosle1 from '../images/carosle1.jpg';
import carosle2 from '../images/carosle2.jpg';
import carosle3 from '../images/carosle3.jpg';

import './Home.css';
//card import
import Card from 'react-bootstrap/Card';
import {  Row, Col } from 'react-bootstrap';
import card1 from '../images/card1.jpeg';
import card2 from '../images/card2.jpeg';
import card3 from '../images/card3.jpeg';
import Search from '../components/Search';





function CustomHome() {
  return (
    <div>
      {/* carousel section*/}
      <Carousel>
      <Carousel.Item>
        <img 
        className='d-block w-100' src={carosle1} alt='First slide'>
        </img>
       </Carousel.Item>
      <Carousel.Item>
      <img className='d-block w-100' src={carosle2} alt='Second slide'>
      </img>
       </Carousel.Item>
      <Carousel.Item>
      <img className='d-block w-100' src={carosle3} alt='Third slide'>
      </img>
        </Carousel.Item>
    </Carousel>
   
<Search /> {/* search.js page  */}

      {/* card section*/}
      <Row className='custom-card-group'>
        <Col md= {3} className="d-flex justify-content-center">
          <a href='#' className='card-link'>
            <Card className='custom-card'>
              <Card.Img variant="top" src={card1} alt='subscription' />
            </Card>
          </a>
        </Col>
        <Col md= {3} className="d-flex justify-content-center">
          <a href='#' className='card-link'>
            <Card className='custom-card'>
              <Card.Img variant="top" src={card2} alt='offers' />
            </Card>
          </a>
        </Col>
        <Col md= {3} className="d-flex justify-content-center">
          <a href='#' className='card-link'>
            <Card className='custom-card'>
              <Card.Img variant="top" src={card3} alt='aboutus' />
            </Card>
          </a>
        </Col>
      </Row>
      {/*commitement section*/}
      <section className='commitment-section'>
        <div className='container'>
          <h2>
          Our Waste Collection Services are 100% Committed to Your Community!</h2>
          <p>Eco-Friendly, Reliable, and Tailored Just for You!</p>
          <p className='highlight'>Together, We're Building a Cleaner Tomorrow!</p>
          <button className='order-now-btn'>Order Now</button> 
        </div>
      </section>
     
    </div>
  )
}

export default CustomHome
