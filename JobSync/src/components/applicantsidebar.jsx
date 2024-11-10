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
        fontWeight: '500',
        width: 'calc(100% + 16px)', 
        borderRadius: '0.25rem',
        marginLeft: '-8px', 
        padding: '10px 22px', 
    };

    const buttonStyle = {
        width: '100%',
        textAlign: 'left',
        padding: '10px 15px',
        color: '#838383',
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
            <h2 className="text" style={{ fontSize: '16px', marginTop: '50px', marginBottom: '30px', color: '#606060' }}>
                Applicant Dashboard
            </h2>
            <ul className="nav flex-column">
                <li className="nav-item">
                    <button
                        className="btn btn-link nav-link"
                        style={isActive('/applicants/overview') ? { ...buttonStyle, ...activeStyle } : buttonStyle}
                        onClick={() => navigate('/applicants/overview')}
                    >
                        <FaLayerGroup className="me-2" style={{ color: isActive('/applicants/overview') ? '#0A65CC' : '#838383' }} />
                        Overview
                    </button>
                </li>
                <li className="nav-item">
                    <button
                        className="btn btn-link nav-link"
                        style={isActive('/applicants/appliedjobs') ? { ...buttonStyle, ...activeStyle } : buttonStyle}
                        onClick={() => navigate('/applicants/appliedjobs')}
                    >
                        <FaBriefcase className="me-2" style={{ color: isActive('/applicants/appliedjobs') ? '#0A65CC' : '#838383' }} />
                        Applied Jobs
                    </button>
                </li>
                <li className="nav-item">
                    <button
                        className="btn btn-link nav-link"
                        style={isActive('/applicants/favoritejobs') ? { ...buttonStyle, ...activeStyle } : buttonStyle}
                        onClick={() => navigate('/applicants/favoritejobs')}
                    >
                        <FaBookmark className="me-2" style={{ color: isActive('/applicants/favoritejobs') ? '#0A65CC' : '#838383' }} />
                        Favorite Jobs
                    </button>
                </li>
                <li className="nav-item">
                    <button
                        className="btn btn-link nav-link"
                        style={isActive('/applicants/jobsalert') ? { ...buttonStyle, ...activeStyle } : buttonStyle}
                        onClick={() => navigate('/applicants/jobsalert')}
                    >
                        <FaBell className="me-2" style={{ color: isActive('/applicants/jobsalert') ? '#0A65CC' : '#838383' }} />
                        Job Alerts
                    </button>
                </li>
                <li className="nav-item">
                    <button
                        className="btn btn-link nav-link"
                        style={isActive('/applicants/applicantsettings') ? { ...buttonStyle, ...activeStyle } : buttonStyle}
                        onClick={() => navigate('/applicants/applicantsettings')}
                    >
                        <FaCog className="me-2" style={{ color: isActive('/applicants/applicantsettings') ? '#0A65CC' : '#838383' }} />
                        Settings
                    </button>
                </li>
            </ul>
        </div>
    );
}

export default ApplicantsSidebar;
