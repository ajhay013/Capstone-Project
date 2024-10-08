import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import '../css/MyNavbar.css'

const MyNavbar = () => {
  const location = useLocation(); 

  return (
    <div>
    <Navbar style={{ backgroundColor: '#eaeaea', fontWeight: '400'}} expand="lg" fixed="top">
      <Container>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/" className={location.pathname === '/' ? 'active-link' : ''}>
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/findjob" className={location.pathname === '/findjob' ? 'active-link' : ''}>
              Find Job
            </Nav.Link>
            <Nav.Link as={Link} to="/employers" className={location.pathname === '/employers' ? 'active-link' : ''}>
              Employers
            </Nav.Link>
            <Nav.Link as={Link} to="/customersupport" className={location.pathname === '/customersupport' ? 'active-link' : ''}>
              Customer Support
            </Nav.Link>
          </Nav>
          <Nav className="ms-auto">
            <Nav.Link href="mailto:JobSync@gmail.com">jobsync@gmail.com</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    
   </div>
    
  );
};

export default MyNavbar;
