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
                Employer Dashboard
            </h2>
            <ul className="nav flex-column">
                <li className="nav-item">
                    <button
                        className="btn btn-link nav-link"
                        style={isActive('/employer/employerdashboard/employeroverview') ? { ...buttonStyle, ...activeStyle } : buttonStyle}
                        onClick={() => navigate('/employer/employerdashboard/employeroverview')}
                    >
                        <FaLayerGroup className="me-2" style={{ color: isActive('/employer/employerdashboard/employeroverview') ? '#0A65CC' : 'black' }} />
                        Overview
                    </button>
                </li>
                <li className="nav-item">
                    <button
                        className="btn btn-link nav-link"
                        style={isActive('/employer/employerdashboard/employerprofile') ? { ...buttonStyle, ...activeStyle } : buttonStyle}
                        onClick={() => navigate('/employer/employerdashboard/employerprofile')}
                    >
                        <FaUser className="me-2" style={{ color: isActive('/employer/employerdashboard/employerprofile') ? '#0A65CC' : 'black' }} />
                        Employer Profile
                    </button>
                </li>
                <li className="nav-item">
                    <button
                        className="btn btn-link nav-link"
                        style={isActive('/employer/employerdashboard/postajob') ? { ...buttonStyle, ...activeStyle } : buttonStyle}
                        onClick={() => navigate('/employer/employerdashboard/postajob')}
                    >
                        <FaPlusSquare className="me-2" style={{ color: isActive('/employer/employerdashboard/postjob') ? '#0A65CC' : 'black' }} />
                        Post a Job
                    </button>
                </li>
                <li className="nav-item">
                    <button
                        className="btn btn-link nav-link"
                        style={isActive('/employer/employerdashboard/myjobs') ? { ...buttonStyle, ...activeStyle } : buttonStyle}
                        onClick={() => navigate('/employer/employerdashboard/myjobs')}
                    >
                        <FaBriefcase className="me-2" style={{ color: isActive('/employer/employerdashboard/myjobs') ? '#0A65CC' : 'black' }} />
                        My Jobs
                    </button>
                </li>
                <li className="nav-item">
                    <button
                        className="btn btn-link nav-link"
                        style={isActive('/employer/employerdashboard/employermessage') ? { ...buttonStyle, ...activeStyle } : buttonStyle}
                        onClick={() => navigate('/employer/employerdashboard/employermessage')}
                    >
                        <FaEnvelope className="me-2" style={{ color: isActive('/employer/employerdashboard/employermessage') ? '#0A65CC' : 'black' }} />
                        Messages
                    </button>
                </li>
                <li className="nav-item">
                    <button
                        className="btn btn-link nav-link"
                        style={isActive('/employer/employerdashboard/savedapplicant') ? { ...buttonStyle, ...activeStyle } : buttonStyle}
                        onClick={() => navigate('/employer/employerdashboard/savedapplicant')}
                    >
                        <FaBookmark className="me-2" style={{ color: isActive('/employer/employerdashboard/savedapplicant') ? '#0A65CC' : 'black' }} />
                        Saved Applicants
                    </button>
                </li>
                <li className="nav-item">
                    <button
                        className="btn btn-link nav-link"
                        style={isActive('/employer/employerdashboard/employersettings') ? { ...buttonStyle, ...activeStyle } : buttonStyle}
                        onClick={() => navigate('/employer/employerdashboard/employersettings')}
                    >
                        <FaCog className="me-2" style={{ color: isActive('/employer/employerdashboard/employersettings') ? '#0A65CC' : 'black' }} />
                        Settings
                    </button>
                </li>
            </ul>
        </div>
    );
}

export default EmployerSidebar;
