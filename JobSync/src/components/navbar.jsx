import React, {useState, useEffect} from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import '../css/MyNavbar.css';
import { useAuth } from '../AuthContext';
import axios from 'axios';

const USER_TYPES = {
    APPLICANT: 'applicant',
    EMPLOYER: 'employer',
};

const MyNavbar = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { user, logout } = useAuth();

    const [unreadCount, setUnreadCount] = useState(0);

    useEffect(() => {
        axios.get('http://localhost:80/capstone-project/jobsync/src/api/fetch_unread_count.php')
            .then(response => {
                if (response.data.success) {
                    setUnreadCount(response.data.unread_count);
                }
            })
            .catch(error => console.error('Error fetching unread count:', error));
    }, []);

    const handleJobAlertClick = () => {
        axios.post('http://localhost:80/capstone-project/jobsync/src/api/mark_as_read.php')
            .then(response => {
                if (response.data.success) {
                    setUnreadCount(0);
                }
            })
            .catch(error => console.error('Error marking alerts as read:', error));
    };


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
                    <Nav.Link as={Link} onClick={handleJobAlertClick} to="/applicants/jobsalert" className={location.pathname === '/applicants/jobsalert' ? 'active-link' : ''}>
                        Job Alerts {unreadCount > 0 && <span className="badge bg-primary" style={{borderRadius: '50px', fontSize: '10px', position: 'relative', top: '-5px', left: '-1px'}}>{unreadCount}</span>}
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
                            <Nav.Link href="#">me.jobsync@gmail.com</Nav.Link>

                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    );
};

export default MyNavbar;
