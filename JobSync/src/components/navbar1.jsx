import React, { useEffect, useRef } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import { FaHome, FaInfoCircle, FaShareAlt, FaEnvelope } from 'react-icons/fa';

const MyNavbar1 = () => {
  const location = useLocation();
  const navItems = [
    { path: '/employer/companyprofile', icon: <FaHome />, label: 'Company Profile' },
    { path: '/employer/foundinginfo', icon: <FaInfoCircle />, label: 'Founding Info' },
    { path: '/employer/socialmedia', icon: <FaShareAlt />, label: 'Social Media Info' },
    { path: '/employer/contact', icon: <FaEnvelope />, label: 'Contact' },
  ];

  const activeIndex = navItems.findIndex(item => item.path === location.pathname);
  const activeLinkRef = useRef(null);
  const lineRef = useRef(null);

  useEffect(() => {
    if (activeLinkRef.current && lineRef.current) {
      const { offsetWidth, offsetLeft } = activeLinkRef.current;
      lineRef.current.style.width = `${offsetWidth}px`;
      lineRef.current.style.left = `${offsetLeft}px`;
    }
  }, [activeIndex]);

  const handleClick = (e) => {
    e.preventDefault();
  };

  return (
    <div style={{ position: 'relative' }}>
      <Navbar expand="lg" style={{ width: '100%', backgroundColor: 'transparent' }}>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mx-auto" style={{ gap: '20px', position: 'relative' }}>
            {navItems.map((item, index) => (
              <Nav.Link
                key={item.path}
                as={Link}
                to={item.path}
                ref={index === activeIndex ? activeLinkRef : null}
                style={{
                  padding: '10px 20px',
                  fontWeight: index === activeIndex ? '500' : 'normal',
                  color: index === activeIndex ? '#0A65CC' : '#898989',
                }}
                onClick={handleClick} 
              >
                {item.icon} {item.label}
              </Nav.Link>
            ))}
            <div
              ref={lineRef}
              style={{
                position: 'absolute',
                height: '2px',
                backgroundColor: '#0A65CC',
                top: '62px',
                bottom: '0',
                transition: 'left 0.3s ease, width 0.3s ease',
              }}
            />
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          width: '100vw',
          marginLeft: '-50vw',
          left: '50%',
          position: 'relative',
        }}
      >
        <hr style={{ border: '1px solid #757575', margin: '10px 0 0 0', width: '60%' }} />
      </div>
    </div>
  );
};

export default MyNavbar1;
