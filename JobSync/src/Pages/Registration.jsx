import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import React, { useState } from 'react'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faUser, faBuilding } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom'; 
import axios from "axios";
// Optional: Import the loader package
import { Oval } from 'react-loader-spinner'; // If using react-loader-spinner

function RegistrationForm() {
    const navigate = useNavigate();
    
    const [inputs, setInputs] = useState({
        type: 'applicant'
    });
    const [isLoading, setIsLoading] = useState(false); // Loader state

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value }));
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        setIsLoading(true); // Start loading
    
        axios.post('http://localhost:80/capstone-project/jobsync/src/api/index.php', inputs)
            .then(response => {
                setIsLoading(false); // Stop loading
                console.log(response.data);
                if (response.data.status === 1) { 
                    navigate('/email_verification', { state: { email: inputs.email } }); 
                } else {
                    alert(response.data.message || "Registration failed. Please try again.");
                }
            })
            .catch(error => {
                setIsLoading(false); // Stop loading
                console.error("There was an error submitting the form!", error);
                alert("An error occurred while submitting the form. Please try again.");
            });
    }


    const [formType, setFormType] = useState('candidate');
    const [isAgreed, setIsAgreed] = useState(false);
    
        const renderFormFields = () => (
            <>
                <input type="hidden" id="type" name="type" value={inputs.type} />
                <div className="row mb-3">
                    <div className="col">
                        <input type="text" className="form-control register" placeholder="First Name *" name='firstname' onChange={handleChange} required  />
                    </div>
                    <div className="col">
                        <input type="text" className="form-control register" placeholder="Middle Name" name='middlename' onChange={handleChange} />
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="col">
                        <input type="text" className="form-control register" placeholder="Last Name *" name='lastname' onChange={handleChange} required />
                    </div>
                    <div className="col">
                        <input type="text" className="form-control register" placeholder="Suffix (Optional)" name='suffix' onChange={handleChange} />
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="col">
                        <select 
                            className="form-control register" 
                            name='gender' 
                            onChange={handleChange} 
                            required 
                            value={inputs.gender || ''}
                        >
                            <option value="" disabled>Select Gender *</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select>
                    </div>
                    <div className="col">
                        <input type="text" className="form-control register" placeholder="Contact Number *" name='contact' onChange={handleChange} required />
                    </div>
                </div>
                <div className="mb-3">
                    <input type="email" className="form-control register" placeholder="Email *" name='email' onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <input type="password" className="form-control register" placeholder="Password *" name='password' onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <input type="password" className="form-control register" placeholder="Confirm Password *" required />
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
                <div className="d-flex justify-content-center" style={{ position: 'relative' }}>
                    {isLoading ? (
                        <div 
                            className="loader" 
                            style={{
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)'
                            }}
                        />
                    ) : null}
                    <button 
                        type="submit" 
                        className="btn btn-success btn-custom" 
                        style={{ backgroundColor: '#0A65CC', width: '700px', marginTop: '20px', opacity: isLoading ? 0.4 : 1 }} 
                        disabled={isLoading}
                    >
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
                                <button 
                                    className={`btn btn-primary mx-1 custom-button ${formType === 'candidate' ? 'active' : ''}`}
                                    style={{ backgroundColor: formType === 'candidate' ? '#042852' : 'white', color: formType === 'candidate' ? 'white' : 'black', width: '270px', borderColor: 'black' }} 
                                    onClick={() => setFormType('candidate')}
                                >
                                    <FontAwesomeIcon icon={faUser} /> Candidate
                                </button>
                                <Link to ="/registration_employer"><button 
                                    className={`btn btn-primary mx-1 custom-button ${formType === 'employer' ? 'active' : ''}`}
                                    style={{ backgroundColor: formType === 'employer' ? '#042852' : 'white', color: formType === 'employer' ? 'white' : 'black', width: '270px', borderColor: 'black' }} 
                                >
                                    <FontAwesomeIcon icon={faBuilding} /> Employer
                                </button></Link>
                            </div>
                        </div>
                    </div>
                    <form onSubmit={handleSubmit}>
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
}

export default RegistrationForm;
