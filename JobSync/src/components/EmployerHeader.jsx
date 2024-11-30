import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import jobsycnLogo from '../assets/logo3.png';
import { useAuth } from '../AuthContext'; 
import defaultProfilePicture from '../assets/company_logo.jpg';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { FaRegBell } from 'react-icons/fa';
import { postToEndpoint } from '../components/apiService';

function EmployerHeader() {
    const { user } = useAuth(); 
    const [logo, setLogo] = useState(null);

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

    return (
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
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <FaRegBell style={{ fontSize: '20px', marginRight: '18px', cursor: 'pointer' }} />

                                    <Link to ="/employer/postjob">
                                    <button className="btn btn-primary me-3 custom-btn" style={{background: '#0A65CC'}} type="button">
                                        Post A Job
                                    </button>
                                    </Link>
                                    <div className="profile-pic" style={{ display: 'flex', alignItems: 'center' }}>
                                        <Link to="/employer/settings">
                                            <img 
                                                src={logoUrl || defaultProfilePicture}
                                                alt="Profile"
                                                style={{ width: '40px', height: '40px', borderRadius: '50%', marginRight: '10px', cursor: 'pointer' }}
                                            />
                                        </Link>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <>
                                <Link to="/candidate_login" className="btn btn-outline-custom me-2 custom-btn">
                                    Sign In
                                </Link>
                                <Link to = "/employer_login" >
                                <button className="btn btn-primary custom-btn" type="button">
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

export default EmployerHeader;
