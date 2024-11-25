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
                <Nav.Link as={Link} to="/findemployer" className={location.pathname === '/findemployer' ? 'active-link' : ''}>
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
            return (
                <>
                    <Nav.Link as={Link} to="/" className={location.pathname === '/' ? 'active-link' : ''}>
                        Home
                    </Nav.Link>
                    <Nav.Link as={Link} to="/findjob" className={location.pathname === '/findjob' ? 'active-link' : ''}>
                        Find Job
                    </Nav.Link>
                    <Nav.Link as={Link} to="/findemployer" className={location.pathname === '/findemployer' ? 'active-link' : ''}>
                        Employers
                    </Nav.Link>
                    <Nav.Link as={Link} to="/applicants/overview" className={location.pathname === '/applicants/overview' ? 'active-link' : ''}>
                        Dashboard
                    </Nav.Link>
                    <Nav.Link as={Link} to="/applicants/jobsalert" className={location.pathname === '/applicants/jobsalert' ? 'active-link' : ''}>
                        Job Alerts
                    </Nav.Link>
                    <Nav.Link as={Link} to="/customersupport" className={location.pathname === '/customersupport' ? 'active-link' : ''}>
                    Customer Support
                    </Nav.Link>
                </>
            );
        } else if (user.userType === USER_TYPES.EMPLOYER) {
            return (
                <>
                    <Nav.Link as={Link} to="/home" className={location.pathname === '/home' ? 'active-link' : ''}>
                        Home
                    </Nav.Link>
                    <Nav.Link as={Link} to="/employer/findapplicant" className={location.pathname === '/employer/findapplicant' ? 'active-link' : ''}>
                        Find Applicant
                    </Nav.Link>
                    <Nav.Link as={Link} to="/employer/overview" className={location.pathname === '/employer/overview' || location.pathname === '/employer/profile' ||
                    location.pathname === '/employer/postjob' || location.pathname === '/employer/savedapplicant' || location.pathname === '/employer/settings' ? 'active-link' : ''}>
                        Dashboard
                    </Nav.Link>
                    <Nav.Link as={Link} to="/employer/myjobs" className={location.pathname === '/employer/myjobs' ? 'active-link' : ''}>
                        My Jobs
                    </Nav.Link>
                    <Nav.Link as={Link} to="/employer/applications" className={location.pathname === '/employer/applications' ? 'active-link' : ''}>
                        Applications
                    </Nav.Link>
                    <Nav.Link as={Link} to="/customersupport" className={location.pathname === '/customersupport' ? 'active-link' : ''}>
                    Customer Support
                    </Nav.Link>
                </>
            );
        }
    };

    const renderName = () => {
        if(user.userType === USER_TYPES.APPLICANT) {
            return (
                <>
                    <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
                    <Nav.Link>{user.firstname}</Nav.Link>
                </>
            );
        }
        else if (user.userType === USER_TYPES.EMPLOYER) {
            return (
                <>
                    <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
                </>
            )
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
                                    {renderName()}
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
