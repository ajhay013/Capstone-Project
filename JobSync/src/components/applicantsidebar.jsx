import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaLayerGroup, FaBriefcase, FaBookmark, FaBell, FaCog } from 'react-icons/fa'; 
import { useNavigate, useLocation } from 'react-router-dom';

function ApplicantsSidebar() {
    const navigate = useNavigate();
    const location = useLocation();

    const activeStyle = {
        backgroundColor: '#b8e2fe', 
        color: '#0A65CC', 
        fontWeight: 'bold',
        width: '100%',
        borderRadius: '0.25rem',
    };

    const buttonStyle = {
        width: '100%',
        textAlign: 'left',
        padding: '10px 15px',
        color: 'black',
    };

       const isActive = (path) => location.pathname === path;

    return (
        <div 
            className="d-flex flex-column bg-light p-2" 
            style={{ 
                width: '80%', 
                maxWidth: '400px', 
                minWidth: '250px', 
                height: '100vh', 
                marginRight: '25px' 
            }}
        >
            <h2 className="text-primary" style={{ fontSize: '20px', marginTop: '50px', marginBottom: '30px' }}>
                Applicant Dashboard
            </h2>
            <ul className="nav flex-column">
                <li className="nav-item">
                    <button
                        className="btn btn-link nav-link"
                        style={isActive('/applicants/applicantdashboard/overview') ? { ...buttonStyle, ...activeStyle } : buttonStyle}
                        onClick={() => navigate('/applicants/applicantdashboard/overview')}
                    >
                        <FaLayerGroup className="me-2" style={{ color: isActive('/applicants/applicantdashboard/overview') ? '#0A65CC' : 'black' }} />
                        Overview
                    </button>
                </li>
                <li className="nav-item">
                    <button
                        className="btn btn-link nav-link"
                        style={isActive('/applicants/applicantdashboard/appliedjobs') ? { ...buttonStyle, ...activeStyle } : buttonStyle}
                        onClick={() => navigate('/applicants/applicantdashboard/appliedjobs')}
                    >
                        <FaBriefcase className="me-2" style={{ color: isActive('/applicants/applicantdashboard/appliedjobs') ? '#0A65CC' : 'black' }} />
                        Applied Jobs
                    </button>
                </li>
                <li className="nav-item">
                    <button
                        className="btn btn-link nav-link"
                        style={isActive('/applicants/applicantdashboard/favoritejobs') ? { ...buttonStyle, ...activeStyle } : buttonStyle}
                        onClick={() => navigate('/applicants/applicantdashboard/favoritejobs')}
                    >
                        <FaBookmark className="me-2" style={{ color: isActive('/applicants/applicantdashboard/favoritejobs') ? '#0A65CC' : 'black' }} />
                        Favorite Jobs
                    </button>
                </li>
                <li className="nav-item">
                    <button
                        className="btn btn-link nav-link"
                        style={isActive('/applicants/applicantdashboard/jobsalert') ? { ...buttonStyle, ...activeStyle } : buttonStyle}
                        onClick={() => navigate('/applicants/applicantdashboard/jobsalert')}
                    >
                        <FaBell className="me-2" style={{ color: isActive('/applicants/applicantdashboard/jobsalert') ? '#0A65CC' : 'black' }} />
                        Job Alerts
                    </button>
                </li>
                <li className="nav-item">
                    <button
                        className="btn btn-link nav-link"
                        style={isActive('/applicants/applicantdashboard/applicantsettings') ? { ...buttonStyle, ...activeStyle } : buttonStyle}
                        onClick={() => navigate('/applicants/applicantdashboard/applicantsettings')}
                    >
                        <FaCog className="me-2" style={{ color: isActive('/applicants/applicantdashboard/applicantsettings') ? '#0A65CC' : 'black' }} />
                        Settings
                    </button>
                </li>
            </ul>
        </div>
    );
}

export default ApplicantsSidebar;
