import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaLayerGroup, FaUser, FaPlusSquare, FaBriefcase, FaEnvelope, FaBookmark, FaCog } from 'react-icons/fa'; 
import { useNavigate, useLocation } from 'react-router-dom';

function EmployerSidebar() {
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
            className="d-flex flex-column p-2" 
            style={{ 
                width: '80%', 
                maxWidth: '400px', 
                minWidth: '250px', 
                height: '105vh', 
                marginRight: '25px',
                backgroundColor: '#f0f8ff',
            }}
        >
            <h2 style={{ fontSize: '16px', marginTop: '50px', marginBottom: '30px', color: '#606060' }}>
                Employer Dashboard
            </h2>
            <ul className="nav flex-column">
                <li className="nav-item">
                    <button
                        className="btn btn-link nav-link"
                        style={isActive('/employer/overview') ? { ...buttonStyle, ...activeStyle } : buttonStyle}
                        onClick={() => navigate('/employer/overview')}
                    >
                        <FaLayerGroup className="me-2" style={{ color: isActive('/employer/overview') ? '#0A65CC' : '#838383' }} />
                        Overview
                    </button>
                </li>
                <li className="nav-item">
                    <button
                        className="btn btn-link nav-link"
                        style={isActive('/employer/profile') ? { ...buttonStyle, ...activeStyle } : buttonStyle}
                        onClick={() => navigate('/employer/profile')}
                    >
                        <FaUser className="me-2" style={{ color: isActive('/employer/profile') ? '#0A65CC' : '#838383' }} />
                        Employer Profile
                    </button>
                </li>
                <li className="nav-item">
                    <button
                        className="btn btn-link nav-link"
                        style={isActive('/employer/postjob') ? { ...buttonStyle, ...activeStyle } : buttonStyle}
                        onClick={() => navigate('/employer/postjob')}
                    >
                        <FaPlusSquare className="me-2" style={{ color: isActive('/employer/postjob') ? '#0A65CC' : '#838383' }} />
                        Post a Job
                    </button>
                </li>
                <li className="nav-item">
                    <button
                        className="btn btn-link nav-link"
                        style={isActive('/employer/myjobs') ? { ...buttonStyle, ...activeStyle } : buttonStyle}
                        onClick={() => navigate('/employer/myjobs')}
                    >
                        <FaBriefcase className="me-2" style={{ color: isActive('/employer/myjobs') ? '#0A65CC' : '#838383' }} />
                        My Jobs
                    </button>
                </li>
                <li className="nav-item">
                    <button
                        className="btn btn-link nav-link"
                        style={isActive('/employer/employermessage') ? { ...buttonStyle, ...activeStyle } : buttonStyle}
                        onClick={() => navigate('')}
                    >
                        <FaEnvelope className="me-2" style={{ color: isActive('/employer/employermessage') ? '#0A65CC' : '#838383' }} />
                        Messages
                    </button>
                </li>
                <li className="nav-item">
                    <button
                        className="btn btn-link nav-link"
                        style={isActive('/employer/savedapplicant') ? { ...buttonStyle, ...activeStyle } : buttonStyle}
                        onClick={() => navigate('/employer/savedapplicant')}
                    >
                        <FaBookmark className="me-2" style={{ color: isActive('/employer/savedapplicant') ? '#0A65CC' : '#838383' }} />
                        Saved Applicants
                    </button>
                </li>
                <li className="nav-item">
                    <button
                        className="btn btn-link nav-link"
                        style={isActive('/employer/settings') ? { ...buttonStyle, ...activeStyle } : buttonStyle}
                        onClick={() => navigate('/employer/settings')}
                    >
                        <FaCog className="me-2" style={{ color: isActive('/employer/settings') ? '#0A65CC' : '#838383' }} />
                        Settings
                    </button>
                </li>
            </ul>
        </div>
    );
}

export default EmployerSidebar;
