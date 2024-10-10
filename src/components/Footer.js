import React from 'react'
import './Footer.css';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaYoutube, FaInstagram, FaTiktok } from 'react-icons/fa';
import logo from '../images/logo.JPEG';



function CustomFooter() {
  return (
    <div>
      <footer className="footer">
            <Container>
                <Row>
                    <Col md={3} className="footer-section d-flex align-items-start">
                            <img
                            src={logo} // path to your logo
                            alt="WCS Logo"
                            width="100"
                            height="100"
                            className="footer-logo"
                            />
                            </Col>   
                    <Col md={3} className="footer-section">
                      <h5 className='title-text'>About</h5>
                        <Link to="/Aboutus" className="footer-link">About Us</Link><br></br>
                        <Link to="/feedback" className="footer-link">Feedback</Link><br></br>
                        <Link to="/contact" className="footer-link">Contact Us</Link>
                    </Col>
                    <Col md={3} className="footer-section">
                      <h5 className='title-text'>Policy</h5>
                        <Link to="/teamsandconditions" className="footer-link">Teams and Conditions</Link><br></br>
                        <Link to="/privacy" className="footer-link">Privacy Policy</Link>
                    </Col >
                    <Col md={3} className="footer-section">
                    <div className="social-media-icons">
                     <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                        <FaFacebookF size={30} color="#FFFFFF" />
                        </a>
                        <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer">
                    <FaYoutube size={30} color="#FFFFFF" />
                        </a>
                    <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                     <FaInstagram size={30} color="#FFFFFF" />
                    </a>
                    <a href="https://www.tiktok.com" target="_blank" rel="noopener noreferrer">
                     <FaTiktok size={30} color="#FFFFFF" />
                    </a>
                 </div>
                 </Col>
                 </Row>
                <Row className="footer-end">
            <Col md={12}>
              <p className="rights-reserved">© 2024 WCS. All rights reserved.</p>
            </Col>
          </Row>
            </Container>
        </footer>
    </div>
  )
}

export default CustomFooter
