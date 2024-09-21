import React from 'react';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';


const MyNavbar = () => {
  return (
    <Navbar style={{ backgroundColor: '#F1F2F4 ' }} expand="lg" fixed="top">
      <Container>
       
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#findjob">Find Job</Nav.Link>
            <Nav.Link href="#employers">Employers</Nav.Link>
            <Nav.Link href="#customersupport">Customer Support</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MyNavbar;
