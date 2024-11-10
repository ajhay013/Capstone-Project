import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from '../assets/logo3.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import ph from '../assets/ph.png';
import { useAuth } from '../AuthContext'; 
import defaultProfilePicture from '../assets/user_default.png';

function SearchJobs() {
    const [selected] = useState("Philippines");
    const { user } = useAuth(); 
  
    return (
        <header className="job-sync-header p-3 border-bottom">
            <div className="container">
                <div className="d-flex flex-wrap justify-content-between align-items-center">
                    {/* Logo */}
                    <div className="logo d-flex align-items-center mb-2 mb-md-0" style={{ paddingRight: '15px' }}>
                        <img src={logo} alt="JobSync Logo" width="58" height="50" />
                        <span className="ms-2 fw-bold fs-4">JobSync</span>
                    </div>

                    {/* Search Bar */}
                    <div className="search-bar flex-grow-1 d-flex justify-content-center mb-2 mb-md-0">
                        {/* Country Selector */}
                        <div className="custom-select" style={{ position: 'relative', maxWidth: '200px' }}>
                            <div className="selected-option" style={{ display: 'flex', alignItems: 'center', border: '1px solid #dee2e6', borderRadius: '10px 0 0 10px', background: '#fff', padding: '10px', cursor: 'pointer'}}>
                                <img src={ph} alt="Philippines" style={{ width: '27px', marginRight: '10px', marginLeft: '5px' }} />
                                {selected}
                            </div>
                        </div>

                        {/* Job Search Input */}
                        <div className="input-group" style={{ maxWidth: '400px' }}>
                            <div className="input-group-prepend">
                                <span className="input-group-text" style={{ border: 'none', background: 'transparent', color: '#0A65CC' }}>
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
                        <div className="input-group" style={{ maxWidth: '400px' , paddingRight: '15px' }}>
                            <div className="input-group-prepend">
                                <span className="input-group-text" style={{ border: 'none', background: 'transparent', color: '#0A65CC' }}>
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

                    {/* User Actions */}
                    <div className="actions d-flex align-items-center">
                        {user ? (
                            <div className="profile-pic" style={{ display: 'flex', alignItems: 'center' }}>
                                <img 
                                    src={user.profilePicture || defaultProfilePicture} 
                                    alt="Profile"
                                    style={{ width: '40px', height: '40px', borderRadius: '50%', marginRight: '10px' }}
                                />
                            </div>
                        ) : (
                            <>
                                <Link to="/candidate_login" className="btn btn-outline-custom me-2 custom-btn">
                                    Sign In
                                </Link>
                                <Link to="/employer_login">
                                <button className="btn btn-primary custom-btn" style={{background: '#0A65CC'}} type="button">
                                    Post A Job
                                </button>
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
}

export default SearchJobs;
