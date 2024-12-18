import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from '../assets/logo3.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import ph from '../assets/ph.png';
import { useAuth } from '../AuthContext';
import defaultProfilePicture from '../assets/user_default.png';
import { postToEndpoint } from '../components/apiService';

function SearchJobs() {
    const [selected] = useState("Philippines");
    const { user, logout } = useAuth();
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

    const [profile, setProfile] = useState(null);

    const fetchCompanyInfo = async () => {
        if (user?.id) {
            try {
                const response = await postToEndpoint('/getApplicantinfo.php', {
                    applicant_id: user.id,
                });
                if (response.data) {
                    const { profile } = response.data;
                    setProfile(profile ? profile : null);
                }
            } catch (error) {
                console.error('Error fetching company info:', error);
            }
        }
    };

    useEffect(() => {
        if (user?.id) {
            fetchCompanyInfo();  

            const intervalId = setInterval(() => {
                fetchCompanyInfo(); 
            }, 100); 

            return () => clearInterval(intervalId); 
        }
    }, [user?.id]); 

    const toggleDropdown = () => setDropdownOpen((prev) => !prev);

    useEffect(() => {
        const handleClickOutside = (event) => {
            // Close dropdown if the click is outside the dropdown container
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownOpen(false);
            }
        };

        // Attach the event listener
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            // Cleanup the event listener
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleOptionClick = () => setDropdownOpen(false);

    const profileUrl = profile instanceof File ? URL.createObjectURL(profile) : profile;

    return (
        <>
        {loading && (
            <div id="preloader">
            </div>
        )}
        <header className="job-sync-header p-3 border-bottom">
            <div className="container">
                <div className="d-flex flex-wrap justify-content-between align-items-center">
                    {/* Logo Section */}
                    <div className="logo d-flex align-items-center mb-2 mb-md-0">
                        <img src={logo} alt="JobSync Logo" width="58" height="50" />
                        <span className="ms-2 fw-bold fs-4">JobSync</span>
                    </div>

                    {/* Search Bar Section */}
                    <div className="search-bar flex-grow-1 d-flex justify-content-center mb-2 mb-md-0">
                        {/* Country Selector */}
                        <div className="custom-select" style={{ position: 'relative', maxWidth: '200px' }}>
                            <div
                                className="selected-option d-flex align-items-center"
                                style={{
                                    border: '1px solid #dee2e6',
                                    borderRadius: '10px 0 0 10px',
                                    background: '#fff',
                                    padding: '10px',
                                    cursor: 'pointer',
                                }}
                            >
                                <img
                                    src={ph}
                                    alt="Philippines"
                                    style={{ width: '27px', marginRight: '10px', marginLeft: '5px' }}
                                />
                                {selected}
                            </div>
                        </div>

                        {/* Job Search Input */}
                        <div className="input-group" style={{ maxWidth: '400px' }}>
                            <div className="input-group-prepend">
                                <span
                                    className="input-group-text"
                                    style={{ border: 'none', background: 'transparent', color: '#0A65CC' }}
                                >
                                    <FontAwesomeIcon icon={faSearch} />
                                </span>
                            </div>
                            <input
                                type="text"
                                className="form-control search-input"
                                placeholder="Job title, keyword, company"
                                style={{ paddingLeft: '45px', borderRadius: '0' }}
                            />
                        </div>

                        {/* Location Search Input */}
                        <div className="input-group" style={{ maxWidth: '400px', paddingRight: '15px' }}>
                            <div className="input-group-prepend">
                                <span
                                    className="input-group-text"
                                    style={{ border: 'none', background: 'transparent', color: '#0A65CC' }}
                                >
                                    <FontAwesomeIcon icon={faMapMarkerAlt} />
                                </span>
                            </div>
                            <input
                                type="text"
                                className="form-control search-input"
                                placeholder="City, state, or zip code"
                                style={{ paddingLeft: '45px', borderRadius: '0 10px 10px 0' }}
                            />
                        </div>
                    </div>
                        {/* User Actions Section */}
                        <div className="profile-pic actions d-flex align-items-center" style={{ position: 'relative' }}>
                        {user ? (
                            <>
                                <img
                                    src={profileUrl || defaultProfilePicture}
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
                                            left: '0',
                                            zIndex: 9,
                                            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                                            backgroundColor: '#fff',
                                            borderRadius: '0.25rem',
                                            overflow: 'hidden',
                                            paddingTop: '5px',
                                            paddingBottom: '5px'
                                        }}
                                    >
                                        <Link
                                            to="/applicantprofile"
                                            className="dropdown-item d-flex align-items-center"
                                            onClick={handleOptionClick}
                                            style={{
                                                padding: '0.5rem 1rem',
                                                transition: 'all 0.3s ease',
                                                fontWeight: '500',
                                                fontSize: '14px',
                                            }}
                                            onMouseEnter={(e) => {
                                                e.target.style.backgroundColor = '#cfe7ff';
                                                e.target.style.color = '#0955b7';
                                                e.target.style.fontWeight = '500';
                                                e.target.style.fontSize = '14px';
                                                e.target.style.borderRadius = '0.5rem';
                                            }}
                                            onMouseLeave={(e) => {
                                                e.target.style.backgroundColor = 'transparent';
                                                e.target.style.color = '#212529';
                                                e.target.style.borderRadius = '0';
                                            }}
                                        >
                                            <i className="fas fa-user-circle me-2" style={{ color: '#126fc1' }}></i>
                                            View Profile
                                        </Link>
                                        <Link
                                            to="/applicants/applicantsettings"
                                            className="dropdown-item d-flex align-items-center"
                                            onClick={handleOptionClick}
                                            style={{
                                                padding: '0.5rem 1rem',
                                                transition: 'all 0.3s ease',
                                                fontWeight: '500',
                                                fontSize: '14px',
                                                marginBottom: '5px'
                                            }}
                                            onMouseEnter={(e) => {
                                                e.target.style.backgroundColor = '#cfe7ff';
                                                e.target.style.color = '#0955b7';
                                                e.target.style.fontWeight = '500';
                                                e.target.style.fontSize = '14px';
                                                e.target.style.borderRadius = '0.5rem';
                                            }}
                                            onMouseLeave={(e) => {
                                                e.target.style.backgroundColor = 'transparent';
                                                e.target.style.color = '#212529';
                                                e.target.style.borderRadius = '0';
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
                                                transition: 'all 0.3s ease',
                                                fontWeight: '500',
                                                fontSize: '14px',
                                                marginTop: '5px',
                                                
                                            }}
                                            onMouseEnter={(e) => {
                                                e.target.style.backgroundColor = '#cfe7ff';
                                                e.target.style.color = '#0955b7';
                                                e.target.style.fontWeight = '500';
                                                e.target.style.fontSize = '14px';
                                                e.target.style.borderRadius = '0.5rem';
                                            }}
                                            onMouseLeave={(e) => {
                                                e.target.style.backgroundColor = 'transparent';
                                                e.target.style.color = '#212529';
                                                e.target.style.borderRadius = '0';
                                            }}
                                        >
                                            <i className="fas fa-sign-out-alt me-2" style={{ color: '#dc3545' }}></i>
                                            Logout
                                        </button>
                                    </div>
                                )}
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

export default SearchJobs;
