import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import jobsycnLogo from '../assets/logo3.png';
import { useAuth } from '../AuthContext'; 
import defaultProfilePicture from '../assets/company_logo.jpg';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { FaRegBell } from 'react-icons/fa';
import { postToEndpoint } from '../components/apiService';

function EmployerHeader() {
    const { user, logout } = useAuth(); 
    const [logo, setLogo] = useState(null);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const handleLogout = () => {
        setLoading(true);
        setTimeout(() => {
            logout();
            navigate('/');
            setLoading(false);
        }, 2000);
    };

    useEffect(() => {
        const fetchCompanyInfo = async () => {
          if (user?.id) {
            try {
              const response = await postToEndpoint('/getCompanyInfo.php', {
                employer_id: user.id,
              });
              if (response.data) {
                const { logo } = response.data;
                setLogo(logo ? logo : null);
              }
            } catch (error) {
              console.error('Error fetching company info:', error);
            }
          }
        };
    
        fetchCompanyInfo();
      }, [user]);

    const logoUrl = logo instanceof File ? URL.createObjectURL(logo) : logo;

    const toggleDropdown = (event) => {
        event.stopPropagation(); 
        setDropdownOpen((prev) => !prev);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownOpen(false);
            }
        };
    
        const handlePageClick = () => {
            setDropdownOpen(false); 
        };
    
        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('click', handlePageClick);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('click', handlePageClick);
        };
    }, []);

    const handleOptionClick = () => setDropdownOpen(false);

    return (
        <>
        {loading && (
            <div id="preloader">
            </div>
        )}
        <header className="job-sync-header p-3 border-bottom">
            <div className="container">
                <div className="d-flex flex-wrap justify-content-between align-items-center">
                    {/* Logo */}
                    <div className="logo d-flex align-items-center mb-2 mb-md-0" style={{ paddingRight: '15px' }}>
                        <img src={jobsycnLogo} alt="JobSync Logo" width="58" height="50" />
                        <span className="ms-2 fw-bold fs-4">JobSync</span>
                    </div>

                    {/* User Actions */}
                    <div className="actions d-flex align-items-center">
    {user ? (
        <>
            <div style={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
                <FaRegBell
                    style={{
                        fontSize: '20px',
                        marginRight: '18px',
                        cursor: 'pointer',
                    }}
                />
                <Link to="/employer/postjob">
                    <button
                        className="btn btn-primary me-3 custom-btn"
                        style={{ background: '#0A65CC' }}
                        type="button"
                    >
                        Post A Job
                    </button>
                </Link>
                <div className="profile-pic" style={{ position: 'relative' }}>
                    <img
                        src={logoUrl || defaultProfilePicture}
                        alt="Profile"
                        style={{
                            width: '40px',
                            height: '40px',
                            borderRadius: '50%',
                            cursor: 'pointer',
                        }}
                        onClick={toggleDropdown}
                    />
                    {dropdownOpen && (
                        <div
                            className="dropdown-menu show"
                            ref={dropdownRef}
                            style={{
                                position: 'absolute',
                                top: '100%',
                                right: '0',
                                zIndex: 9,
                                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                                backgroundColor: '#fff',
                                borderRadius: '0.25rem',
                                overflow: 'hidden',
                                paddingTop: '5px',
                                paddingBottom: '5px',
                            }}
                        >
                            <Link
                                to="/employer/settings"
                                className="dropdown-item d-flex align-items-center"
                                onClick={handleOptionClick}
                                style={{
                                    padding: '0.5rem 1rem',
                                    fontWeight: '500',
                                    fontSize: '14px',
                                    transition: 'all 0.3s ease',
                                }}
                                onMouseEnter={(e) => {
                                    e.target.style.backgroundColor = '#cfe7ff';
                                    e.target.style.color = '#0955b7';
                                }}
                                onMouseLeave={(e) => {
                                    e.target.style.backgroundColor = 'transparent';
                                    e.target.style.color = '#212529';
                                }}
                            >
                                <i className="fas fa-cog me-2" style={{ color: '#818181' }}></i>
                                Settings
                            </Link>
                            <div className="dropdown-divider" style={{ margin: '0', borderTop: 'none' }}></div>
                            <button
                                className="dropdown-item d-flex align-items-center"
                                onClick={handleLogout}
                                style={{
                                    padding: '0.5rem 1rem',
                                    border: 'none',
                                    background: 'transparent',
                                    cursor: 'pointer',
                                    fontWeight: '500',
                                    fontSize: '14px',
                                    transition: 'all 0.3s ease',
                                }}
                                onMouseEnter={(e) => {
                                    e.target.style.backgroundColor = '#cfe7ff';
                                    e.target.style.color = '#0955b7';
                                }}
                                onMouseLeave={(e) => {
                                    e.target.style.backgroundColor = 'transparent';
                                    e.target.style.color = '#212529';
                                }}
                            >
                                <i className="fas fa-sign-out-alt me-2" style={{ color: '#dc3545' }}></i>
                                Logout
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </>
    ) : (
        <>
            <Link to="/candidate_login" className="btn btn-outline-custom me-2 custom-btn">
                Sign In
            </Link>
            <Link to="/employer_login">
                <button
                    className="btn btn-primary custom-btn"
                    style={{ background: '#0A65CC' }}
                    type="button"
                >
                    Post A Job
                </button>
            </Link>
        </>
    )}
</div>

                </div>
            </div>
        </header>
        </>
    );
}

export default EmployerHeader;
