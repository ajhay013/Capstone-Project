import React from 'react';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';


const MyNavbar = () => {
  return (
    <Navbar style={{ backgroundColor: '#e5e5e5 ' }} expand="lg" fixed="top">
      <Container>
       
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#link">Find Job</Nav.Link>
            <Nav.Link href="#link">Employers</Nav.Link>
            <Nav.Link href="#link">Customer Support</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MyNavbar;
