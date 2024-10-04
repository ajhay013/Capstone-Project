import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import React, { useState } from 'react'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faUser, faBuilding } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom'; 

function SignInForm() {
    const [formType, setFormType] = useState('candidate');
    const [isRemembered, setIsRemembered] = useState(false);

    const renderFormFields = () => (
        <>
            <div className="mb-3">
                <input type="email" className="form-control" placeholder="Email" />
            </div>
            <div className="mb-3">
                <input type="password" className="form-control" placeholder="Password" />
            </div>
            <div className="d-flex justify-content-between mb-3">
                <div className="form-check">
                    <input 
                        type="checkbox" 
                        className="form-check-input" 
                        checked={isRemembered} 
                        onChange={() => setIsRemembered(!isRemembered)} 
                    />
                    <label className="form-check-label">Remember Me</label>
                </div>
                <Link to="/forgot-password" style={{ textDecoration: 'underline', color: '#0A65CC' }}>Forgot Password?</Link>
            </div>
            <div className="d-flex justify-content-center">
                <button type="submit" className="btn btn-success btn-custom" style={{ backgroundColor: '#0A65CC', width: '700px', marginTop: '20px' }}>
                    Sign In <FontAwesomeIcon icon={faArrowRight} />
                </button>
            </div>
        </>
    );

    return (
        <div className="container mt-0">
            <div className="row">
                <div className="col-md-6">
                    <h3 className="mb-3 text-start">Sign In</h3>
                    <h4 className="mb-4 text-start" style={{ fontSize: '15px' }}>
                        Don't have an account? <Link to="/registration" style={{ textDecoration: 'underline', color: '#0A65CC' }}>Create Account</Link>
                    </h4>
                    <div className="d-flex justify-content-center mb-4">
                        <div className="d-flex flex-column align-items-center mb-4" style={{ backgroundColor: '#F1F2F4', padding: '26px', borderRadius: '10px', width: '580px' }}>
                            <h5 className="text-center mb-3">Sign In as</h5>
                            <div className="d-flex justify-content-center">
                                <button 
                                    className={`btn btn-primary mx-1 custom-button ${formType === 'candidate' ? 'active' : ''}`}
                                    style={{ backgroundColor: formType === 'candidate' ? '#042852' : 'white', color: formType === 'candidate' ? 'white' : 'black', width: '270px', borderColor: 'black' }} 
                                    onClick={() => setFormType('candidate')}
                                >
                                    <FontAwesomeIcon icon={faUser} /> Candidate
                                </button>
                                <button 
                                    className={`btn btn-primary mx-1 custom-button ${formType === 'employer' ? 'active' : ''}`}
                                    style={{ backgroundColor: formType === 'employer' ? '#042852' : 'white', color: formType === 'employer' ? 'white' : 'black', width: '270px', borderColor: 'black' }} 
                                    onClick={() => setFormType('employer')}
                                >
                                    <FontAwesomeIcon icon={faBuilding} /> Employer
                                </button>
                            </div>
                        </div>
                    </div>
                    <form>
                        {renderFormFields()}
                    </form>
                </div>
                <div className="col-md-6 d-none d-md-block">
                    <img 
                        src="src/assets/our-services.jpg" 
                        alt="Sign In Visual" 
                        className="img-fluid"
                        style={{ height: '700px', width: '800px' }}
                    />
                </div>
            </div>
        </div>
    );
}

export default SignInForm;
