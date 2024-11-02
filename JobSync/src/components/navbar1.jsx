import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import { FaHome, FaInfoCircle, FaShareAlt, FaEnvelope } from 'react-icons/fa';

const MyNavbar1 = () => {
  const location = useLocation();

  const getActiveStyle = (path) => {
    return location.pathname === path
      ? { fontWeight: 'bold', color: '#0A65CC', textDecoration: 'underline' }
      : {};
  };

  return ( 
    <Navbar expand="lg" style={{ width: '100%', backgroundColor: 'transparent' }}>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mx-auto" style={{ gap: '20px' }}> 
          <Nav.Link as={Link} to="/Employer/companyprofile" style={{ ...getActiveStyle('/Employer/companyprofile'), padding: '10px 20px' }}>
            <FaHome /> Company Profile
          </Nav.Link>
          <Nav.Link as={Link} to="/Employer/foundinginfo" style={{ ...getActiveStyle('/Employer/foundinginfo'), padding: '10px 20px' }}>
            <FaInfoCircle /> Founding Info
          </Nav.Link>
          <Nav.Link as={Link} to="/Employer/socialmedia" style={{ ...getActiveStyle('/Employer/socialmedia'), padding: '10px 20px' }}>
            <FaShareAlt /> Social Media Info
          </Nav.Link>
          <Nav.Link as={Link} to="/Employer/contact" style={{ ...getActiveStyle('/Employer/contact'), padding: '10px 20px' }}>
            <FaEnvelope /> Contact
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default MyNavbar1;
