import React, { useEffect, useRef } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaHome, FaInfoCircle, FaShareAlt, FaEnvelope } from 'react-icons/fa';

const MyNavbar2 = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const navItems = [
    { path: '/employer/employerdashboard/employersettings/companysettings', icon: <FaHome />, label: 'Company Profile' },
    { path: '/employer/employerdashboard/employersettings/foundingsettings', icon: <FaInfoCircle />, label: 'Founding Info' },
    { path: '/employer/employerdashboard/employersettings/socmedsettings', icon: <FaShareAlt />, label: 'Social Media Info' },
    { path: '/employer/employerdashboard/employersettings/accountsettings', icon: <FaEnvelope />, label: 'Account Settings' },
  ];

  const activeIndex = navItems.findIndex(item => item.path === location.pathname);
  const activeLinkRef = useRef(null);
  const lineRef = useRef(null);

  useEffect(() => {
    if (activeIndex === -1) {
      // Redirect to Company Profile if not already on a valid path
      navigate(navItems[0].path);
    }
  }, [location, navigate, navItems]);

  useEffect(() => {
    if (activeLinkRef.current && lineRef.current) {
      const { offsetWidth, offsetLeft } = activeLinkRef.current;
      lineRef.current.style.width = `${offsetWidth}px`;
      lineRef.current.style.left = `${offsetLeft}px`;
    }
  }, [activeIndex]);

  return (
    <div style={{ position: 'relative' }}>
      <Navbar expand="lg" style={{ width: '100%', backgroundColor: 'transparent', marginTop: '30px' }}>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mx-auto" style={{ gap: '20px' }}>
            {navItems.map((item, index) => (
              <Nav.Link
                key={item.path}
                as={Link}
                to={item.path}
                ref={index === activeIndex ? activeLinkRef : null}
                style={{ padding: '10px 20px', fontWeight: index === activeIndex ? 'bold' : 'normal', color: index === activeIndex ? '#0A65CC' : '#757575' }}
              >
                {item.icon} {item.label}
              </Nav.Link>
            ))}
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <div style={{ display: 'flex', justifyContent: 'center', width: '100vw', marginLeft: '-50vw', left: '50%', position: 'relative' }}>
        <hr style={{ border: '1px solid #757575', margin: '1px 0 0 0', width: '40%' }} />
      </div>
     
      <div style={{ position: 'absolute', bottom: '0px', height: '2px', backgroundColor: '#0A65CC', transition: 'left 0.3s, width 0.3s' }} ref={lineRef} />
    </div>
  );
};

export default MyNavbar2;
