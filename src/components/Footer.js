import React from 'react';
import './Footer.css';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaYoutube, FaInstagram, FaTiktok } from 'react-icons/fa';
import logo from '../images/logo.JPEG';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../config/footerLanguages';

function CustomFooter() {
  const { language } = useLanguage();
  const t = translations[language].footer;

  return (
    <div>
      <footer className="footer">
        <Container>
          <Row>
            <Col md={3} className="footer-section d-flex align-items-start">
              <img
                src={logo}
                alt="WCS Logo"
                width="100"
                height="100"
                className="footer-logo"
              />
            </Col>   
            <Col md={3} className="footer-section">
              <h5 className='title-text'>{t.aboutTitle}</h5>
              <Link to="/Aboutus" className="footer-link">{t.aboutLinks.aboutUs}</Link><br />
              <Link to="/feedback" className="footer-link">{t.aboutLinks.feedback}</Link><br />
              <Link to="/contact" className="footer-link">{t.aboutLinks.contactUs}</Link>
            </Col>
            <Col md={3} className="footer-section">
              <h5 className='title-text'>{t.policyTitle}</h5>
              <Link to="/teamsandconditions" className="footer-link">{t.policyLinks.terms}</Link><br />
              <Link to="/privacy" className="footer-link">{t.policyLinks.privacy}</Link>
            </Col>
            <Col md={3} className="footer-section">
              <div className="social-media-icons">
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
            </Col>
          </Row>
          <Row className="footer-end">
            <Col md={12}>
              <p className="rights-reserved">{t.rightsReserved}</p>
            </Col>
          </Row>
        </Container>
      </footer>
    </div>
  );
}

export default CustomFooter;