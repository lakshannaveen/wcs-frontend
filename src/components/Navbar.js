import React, { useState, useEffect } from "react";
import "./Navbar.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Offcanvas from "react-bootstrap/Offcanvas";
import logo from "../images/logo.JPEG";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate, useLocation } from "react-router-dom"; 
import Cookies from "js-cookie"; 
import { useLanguage } from '../contexts/LanguageContext';

function CustomNavbar() {
  const [showSidebar, setShowSidebar] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { language, toggleLanguage } = useLanguage();

  const fetchUserData = () => {
    const token = Cookies.get("token");
    if (token) {
      try {
        const decodedToken = JSON.parse(atob(token.split(".")[1])); 
        setUser(decodedToken);
      } catch (error) {
        console.error("Failed to decode token:", error);
      }
    } else {
      setUser(null);
    }
  };
  
  useEffect(() => {
    fetchUserData(); 
  }, []);

  const handleToggleSidebar = () => setShowSidebar(!showSidebar);

  const generateBackgroundColor = (username) => {
    if (!username) return 'gray';
    const hashCode = username.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const hue = hashCode % 360; 
    return `hsl(${hue}, 70%, 50%)`;
  };

  const getProfileInitials = () => {
    if (!user || !user.username) return ""; 
    return user.username.charAt(0).toUpperCase(); 
  };

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to log out?")) {
      Cookies.remove("token");
      sessionStorage.clear();
      setUser(null);
      navigate("/");
    }
  };

  return (
    <div>
      <Navbar expand="lg" className="navbar">
        <Container>
          <Navbar.Brand as={Link} to="/">
            <img
              src={logo}
              alt="WCS Logo"
              width="60"
              height="60"
              className="d-inline-block align-top"
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link as={Link} to="/" activeClassName="active-link">
                Home
              </Nav.Link>
              <NavDropdown title="Guidance" id="basic-nav-dropdown">
                <NavDropdown.Item as={Link} to="/customsubscription" className="nav-dropdown-menu">
                  Subscription Plans
                </NavDropdown.Item>
                <div className="dropdown-divider" />
                <NavDropdown.Item as={Link} to="/customguidance" className="nav-dropdown-menu">
                  Waste Guidance
                </NavDropdown.Item>
              </NavDropdown>
              
              {/* Language Toggle Button*/}
              <Nav.Link 
                onClick={toggleLanguage}
                className="language-toggle"
                
              >
                {language === 'en' ? 'සිංහල' : 'English'}
              </Nav.Link>

              <Nav.Link onClick={handleToggleSidebar} className="ms-2">
                <div
                  className="profile-icon"
                  style={{ backgroundColor: user ? generateBackgroundColor(user.username) : 'gray' }}
                >
                  {user ? (
                    getProfileInitials()
                  ) : (
                    <FontAwesomeIcon icon={faUser} size="lg" /> 
                  )}
                </div>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Offcanvas
        show={showSidebar}
        onHide={handleToggleSidebar}
        placement="end"
        className="offcanvas-custom"
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Profile</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Nav className="flex-column">
            {user ? (
              <>
                <Nav.Link as={Link} to="/changepassword">
                  Change Password
                </Nav.Link>
                <Nav.Link onClick={handleLogout} className="logout-link">
                  Log Out
                </Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/login">
                  Log In
                </Nav.Link>
                <Nav.Link as={Link} to="/register">
                  Register
                </Nav.Link>
              </>
            )}
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
}

export default CustomNavbar;