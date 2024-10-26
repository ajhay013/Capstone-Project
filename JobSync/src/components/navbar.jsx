import { Link, useLocation } from 'react-router-dom';
import '../css/MyNavbar.css'
import { useAuth } from '../AuthContext'; 

const MyNavbar = () => { // Accept userId as a prop
  const location = useLocation(); 
  const { user, logout } = useAuth();
  const handleLogout = () => {
            logout(); // Call the logout function from context
            navigate('/'); // Redirect to home or login page
        };
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
                  {user && (
                      <>
                        <Nav.Link as={Link} to="/dashboard" className={location.pathname === '/dashboard' ? 'active-link' : ''}>
                            Dashboard
                        </Nav.Link>
                        <Nav.Link as={Link} to="/jobAlerts" className={location.pathname === '/jobAlerts' ? 'active-link' : ''}>
                            Job Alerts
                        </Nav.Link>
                        </>
                    )}
                  <Nav.Link as={Link} to="/customersupport" className={location.pathname === '/customersupport' ? 'active-link' : ''}>
                    Customer Support
                  </Nav.Link>
                </Nav>
                <Nav className="ms-auto">
                  <Nav.Link href="#">jobsync@gmail.com</Nav.Link>
                            {user && (
                                <>
                                    <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
                                    <Nav.Link>{user.firstname}</Nav.Link>
                                </>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    );
};

export default MyNavbar;
