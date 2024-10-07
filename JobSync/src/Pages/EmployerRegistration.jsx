import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import React, { useState } from 'react'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faUser, faBuilding } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom'; 

export default function EmployerRegistrationForm() {
    const [formType, setFormType] = useState('employer');
    const [isAgreed, setIsAgreed] = useState(false);
    
        const renderFormFields = () => (
            <>
                <div className="row mb-3">
                    <div className="col">
                        <input type="text" className="form-control register" placeholder="First Name" />
                    </div>
                    <div className="col">
                        <input type="text" className="form-control register" placeholder="Middle Name" />
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="col">
                        <input type="text" className="form-control register" placeholder="Last Name" />
                    </div>
                    <div className="col">
                        <input type="text" className="form-control register" placeholder="Suffix (Optional)" />
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="col">
                        <input type="text" className="form-control register" placeholder="Gender" />
                    </div>
                    <div className="col">
                        <input type="text" className="form-control register" placeholder="Contact Number" />
                    </div>
                </div>
                <div className="mb-3">
                    <input type="email" className="form-control register" placeholder="Email" />
                </div>
                <div className="mb-3">
                    <input type="password" className="form-control register" placeholder="Password" />
                </div>
                <div className="mb-3">
                    <input type="password" className="form-control register" placeholder="Confirm Password" />
                </div>
                <div className="form-check mb-3 d-flex align-items-center">
                    <input 
                        type="checkbox" 
                        className="form-check-input" 
                        checked={isAgreed} 
                        onChange={() => setIsAgreed(!isAgreed)} 
                    />
                    <label className="form-check-label" style={{ marginLeft: 10 }}>
                        I've read and agreed with your Terms and Services
                    </label>
                </div>
                <div className="d-flex justify-content-center">
                    <button type="submit" className="btn btn-success btn-custom" style={{ backgroundColor: '#0A65CC', width: '700px', marginTop: '20px' }}>
                        Create Account <FontAwesomeIcon icon={faArrowRight} />
                    </button>
                </div>
            </>
        );

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-6">
                    <h3 className="mb-3 text-start">Create Account</h3>
                    <h4 className="mb-4 text-start" style={{ fontSize: '15px' }}>Already have an account? <Link to="/signin" style={{ textDecoration: 'none', color: '#0A65CC' }}>Log In</Link>
                    </h4>
                    <div className="d-flex justify-content-center mb-1">
                        <div className="d-flex flex-column align-items-center mb-4" style={{ backgroundColor: '#F1F2F4', padding: '26px', borderRadius: '10px', width: '580px' }}>
                            <h5 className="text-center mb-3">Create Account as</h5>
                            <div className="d-flex justify-content-center">
                                <Link to={"/registration"}><button 
                                    className={`btn btn-primary mx-1 custom-button ${formType === 'candidate' ? 'active' : ''}`}
                                    style={{ backgroundColor: formType === 'candidate' ? '#042852' : 'white', color: formType === 'candidate' ? 'white' : 'black', width: '270px', borderColor: 'black' }} 
                                >
                                    <FontAwesomeIcon icon={faUser} /> Candidate
                                </button></Link> 

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
                    <div 
                        style={{
                            position: 'relative',
                            marginTop: '0px',
                            width: '130%',
                        }}
                    >
                        <img 
                            src="src/assets/our-services.jpg" 
                            alt="Registration Visual" 
                            className="img-fluid"
                            style={{ 
                                height: '100%', 
                                width: '100%', 
                                objectFit: 'cover'
                            }}
                        />
                        <div
                            style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                height: '100%',
                                width: '100%',
                                background: 'linear-gradient(rgba(10, 22, 101, 0.4), rgba(0, 8, 42, 0.7))',
                                zIndex: 1
                            }}
                        ></div>
                    </div>
                </div>

            </div>
        </div>
    );
};
