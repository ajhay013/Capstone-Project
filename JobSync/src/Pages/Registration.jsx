import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import React, { useState } from 'react'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faUser, faBuilding } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom'; 

function RegistrationForm() {
    const [formType, setFormType] = useState('candidate');
    const [isAgreed, setIsAgreed] = useState(false);

    const renderFormFields = () => (
        <>
            <div className="row mb-3">
                <div className="col">
                    <input type="text" className="form-control" placeholder="First Name" />
                </div>
                <div className="col">
                    <input type="text" className="form-control" placeholder="Middle Name" />
                </div>
            </div>
            <div className="row mb-3">
                <div className="col">
                    <input type="text" className="form-control" placeholder="Last Name" />
                </div>
                <div className="col">
                    <input type="text" className="form-control" placeholder="Suffix (Optional)" />
                </div>
            </div>
            {formType === 'employer' && (
                <>
                  
                    <div className="mb-3">
                        <input type="text" className="form-control" placeholder="Contact Number" />
                    </div>
                </>
            )}
            {formType === 'candidate' && (
                <div className="row mb-3">
                    <div className="col">
                        <input type="text" className="form-control" placeholder="Gender" />
                    </div>
                    <div className="col">
                        <input type="text" className="form-control" placeholder="Contact Number" />
                    </div>
                </div>
            )}
            <div className="mb-3">
                <input type="email" className="form-control" placeholder={formType === 'employer' ? "Position" : "Email"} />
            </div>
            {formType === 'candidate' && (
                <>
                    <div className="mb-3">
                        <input type="password" className="form-control" placeholder="Password" />
                    </div>
                    <div className="mb-3">
                        <input type="password" className="form-control" placeholder="Confirm Password" />
                    </div>
                </>
            )}
            <div className="form-check mb-3 d-flex align-items-center">
                <input 
                    type="checkbox" 
                    className="form-check-input" 
                    checked={isAgreed} 
                    onChange={() => setIsAgreed(!isAgreed)} 
                />
                <label className="form-check-label" style={{ margin: 10 }}>
                    I've read and agreed with your Terms and Services
                </label>
            </div>
            <div className="d-flex justify-content-center">
            <button type="submit" className="btn btn-success btn-custom" style={{ backgroundColor: '#0A65CC', width: '700px', marginTop: '20px' }}>
    {formType === 'employer' ? 'Next Page' : 'Create Account'} <FontAwesomeIcon icon={faArrowRight} />
</button>
            </div>
        </>
    );

    return (
        <div className="container mt-0">
            <div className="row">
                <div className="col-md-6">
                    <h3 className="mb-3 text-start">Create Account</h3>
                    <h4 className="mb-4 text-start" style={{ fontSize: '15px' }}>Already have an account? <Link to="/signin" style={{ textDecoration: 'underline', color: '#0A65CC' }}>Log In</Link>
                    </h4>
                    <div className="d-flex justify-content-center mb-4">
                        <div className="d-flex flex-column align-items-center mb-4" style={{ backgroundColor: '#F1F2F4', padding: '26px', borderRadius: '10px', width: '580px' }}>
                            <h5 className="text-center mb-3">Create Account as</h5>
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
                        alt="Registration Visual" 
                        className="img-fluid"
                        style={{ height: '700px', width: '800px' }}
                    />
                </div>
            </div>
        </div>
    );
}

export default RegistrationForm;
