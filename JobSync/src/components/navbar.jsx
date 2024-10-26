import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import '../css/MyNavbar.css';
import { useAuth } from '../AuthContext';

const USER_TYPES = {
    APPLICANT: 'applicant',
    EMPLOYER: 'employer',
};

const MyNavbar = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { user, logout } = useAuth();

    const handleLogout = () => {
        logout();
        navigate('/'); 
    };

    const renderNavLinks = () => {
        const commonLinks = (
            <>
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
            </>
        );

        if (!user) {
            return commonLinks;
        } else if (user.userType === USER_TYPES.APPLICANT) {
            // Applicant user
            return (
                <>
                    <Nav.Link as={Link} to="/" className={location.pathname === '/' ? 'active-link' : ''}>
                        Home
                    </Nav.Link>
                    <Nav.Link as={Link} to="/findjob" className={location.pathname === '/findjob' ? 'active-link' : ''}>
                        Find Job
                    </Nav.Link>
                    <Nav.Link as={Link} to="/employers" className={location.pathname === '/employers' ? 'active-link' : ''}>
                        Employers
                    </Nav.Link>
                    <Nav.Link as={Link} to="/dashboard" className={location.pathname === '/dashboard' ? 'active-link' : ''}>
                        Dashboard
                    </Nav.Link>
                    <Nav.Link as={Link} to="/jobAlerts" className={location.pathname === '/jobAlerts' ? 'active-link' : ''}>
                        Job Alerts
                    </Nav.Link>
                    <Nav.Link as={Link} to="/customersupport" className={location.pathname === '/customersupport' ? 'active-link' : ''}>
                    Customer Support
                    </Nav.Link>
                </>
            );
        } else if (user.userType === USER_TYPES.EMPLOYER) {
            // Employer user
            return (
                <>
                    {commonLinks}
                    <Nav.Link as={Link} to="/findcandidate" className={location.pathname === '/findcandidate' ? 'active-link' : ''}>
                        Find Candidate
                    </Nav.Link>
                    <Nav.Link as={Link} to="/dashboard" className={location.pathname === '/dashboard' ? 'active-link' : ''}>
                        Dashboard
                    </Nav.Link>
                    <Nav.Link as={Link} to="/myjobs" className={location.pathname === '/myjobs' ? 'active-link' : ''}>
                        My Jobs
                    </Nav.Link>
                    <Nav.Link as={Link} to="/applications" className={location.pathname === '/applications' ? 'active-link' : ''}>
                        Applications
                    </Nav.Link>
                </>
            );
        }
    };

    return (
        <div>
            <Navbar style={{ backgroundColor: '#eaeaea', fontWeight: '400' }} expand="lg" fixed="top">
                <Container>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            {renderNavLinks()}
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
