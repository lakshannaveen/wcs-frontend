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
import { Link, useNavigate } from "react-router-dom"; 
import Cookies from "js-cookie"; 

function CustomNavbar() {
  const [showSidebar, setShowSidebar] = useState(false);
  const [user, setUser] = useState(null); // State to store user data
  const navigate = useNavigate(); 

  // Function to fetch user data from the JWT token in cookies
  const fetchUserData = () => {
    const token = Cookies.get("token");
    if (token) {
      try {
        const decodedToken = JSON.parse(atob(token.split(".")[1])); 
        setUser(decodedToken); // Set user data (username and more) to state
      } catch (error) {
        console.error("Failed to decode token:", error);
      }
    } else {
      setUser(null); // No token, set user to null
    }
  };
  
  useEffect(() => {
    fetchUserData(); 
  }, []);

  const handleToggleSidebar = () => setShowSidebar(!showSidebar);

  // Function to generate a background color based on the username
  const generateBackgroundColor = (username) => {
    if (!username) return 'gray'; // Default color 
    
    const hashCode = username.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const hue = hashCode % 360; 
    return `hsl(${hue}, 70%, 50%)`; // Return a color from HSL format
  };

  // Function to create the profile initials
  const getProfileInitials = () => {
    if (!user || !user.username) return ""; 
    return user.username.charAt(0).toUpperCase(); 
  };

  // Function to handle logout and clear the JWT token from cookies
  const handleLogout = () => {
    if (window.confirm("Are you sure you want to log out?")) {
      Cookies.remove("token");
      sessionStorage.clear(); // Clear session storage 
      setUser(null); // Set user to null after logout
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
              <Nav.Link onClick={handleToggleSidebar} className="ms-2">
                <div
                  className="profile-icon"
                  style={{ backgroundColor: user ? generateBackgroundColor(user.username) : 'gray' }}
                >
                  {user ? (
                    getProfileInitials() // Show the first letter 
                  ) : (
                    <FontAwesomeIcon icon={faUser} size="lg" /> 
                  )}
                </div>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Sidebar */}
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
                {/* Display Edit Profile and Log Out links when user is logged in */}
                <Nav.Link as={Link} to="/changepassword">
                  Change Password
                </Nav.Link>
                <Nav.Link onClick={handleLogout} className="logout-link">
                  Log Out
                </Nav.Link>
              </>
            ) : (
              <>
                {/* Show Login and Register links when the user is not logged in */}
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
