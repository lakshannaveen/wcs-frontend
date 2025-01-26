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
import { Link, useNavigate } from "react-router-dom"; // Use useNavigate instead of useHistory
import Cookies from "js-cookie"; // Library for managing cookies

function CustomNavbar() {
  const [showSidebar, setShowSidebar] = useState(false);
  const [user, setUser] = useState(null); // State to store user data
  const navigate = useNavigate(); // Use useNavigate for navigation

  // Function to fetch user data from the JWT token in cookies
  const fetchUserData = () => {
    const token = Cookies.get("token");
    // Get JWT token from cookies
    if (token) {
      try {
        const decodedToken = JSON.parse(atob(token.split(".")[1])); // Decode JWT token
        console.log("Decoded Token:", decodedToken); // Debugging: Check the decoded token
        setUser(decodedToken); // Set user data (username and more) to state
      } catch (error) {
        console.error("Failed to decode token:", error);
      }
    } else {
      console.warn("JWT token not found in cookies.");
    }
  };
  
  

  useEffect(() => {
    fetchUserData(); // Fetch user data when the component mounts
  }, []);

  const handleToggleSidebar = () => setShowSidebar(!showSidebar);

  // Function to create the profile initials
  const getProfileInitials = () => {
    if (!user || !user.username) return ""; // Handle cases where user or username is null
    return user.username.charAt(0).toUpperCase(); // Get the first letter of the username
  };
  

  // Function to handle logout and clear the JWT token from cookies
  const handleLogout = () => {
    // Show confirmation dialog only on logout
    if (window.confirm("Are you sure you want to log out?")) {
      // Clear JWT token from cookies
      Cookies.remove("token"); // Remove the JWT token from cookies

      // Redirect to login page after logout
      navigate("/login");
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
              <div className="profile-icon">
                {user ? (
                  getProfileInitials() // Show the first letter of the username
                ) : (
                  <FontAwesomeIcon icon={faUser} size="lg" /> // Default icon
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
            {/* Removed Logout link */}
            <Nav.Link as={Link} to="/editprofile">
              Edit Profile
            </Nav.Link>
            {/* Log In and Register will always show */}
            <Nav.Link as={Link} to="/login">
              Log In
            </Nav.Link>
            <Nav.Link as={Link} to="/register">
              Register
            </Nav.Link>
            {/* Logout link */}
            <Nav.Link onClick={handleLogout} className="logout-link">
              Log Out
            </Nav.Link>
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
}

export default CustomNavbar;
