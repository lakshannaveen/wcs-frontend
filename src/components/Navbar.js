import React from 'react';
import './Navbar.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import logo from '../images/logo.JPEG';
import { Link } from 'react-router-dom';
function CustomNavbar() {
  return (
    <div >
      <Navbar expand="lg" className="navbar">
      <Container>
      <Navbar.Brand as={Link}to='/'>
          <img
            src={logo} //path
            alt="WCS Logo" 
            width="60" 
            height="60" 
            className="d-inline-block align-top" 
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link}to='/' activeClassName="active-link">Home</Nav.Link>
            <NavDropdown  title="Services" id="basic-nav-dropdown">
              <NavDropdown.Item  className="nav-dropdown-menu" href="#action/3.1">Subscription Plans</NavDropdown.Item>
              <div className="dropdown-divider" />
              <NavDropdown.Item className="nav-dropdown-menu "  href="#action/3.2">
              Special Offers
              </NavDropdown.Item>
              </NavDropdown>
              <Nav.Link href="#sign-in" className="ms-2">
                Log In
              </Nav.Link>
              <Nav.Link href="#register" className="ms-2">
                Register
              </Nav.Link>
              </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </div>
  )
}

export default CustomNavbar
