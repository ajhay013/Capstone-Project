import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import React, { useState } from 'react'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faUser, faBuilding } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom'; 
import { postToEndpoint } from '../components/apiService';
import { useAuth } from '../AuthContext';

function SignInEmployer() {
    const navigate = useNavigate();
    const { login } = useAuth(); 
    const [formType, setFormType] = useState('employer');
    const [isRemembered, setIsRemembered] = useState(false);
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [isEmailCorrect, setIsEmailCorrect] = useState(null);
    const [isPasswordCorrect, setIsPasswordCorrect] = useState(null);
    
    const [inputs, setInputs] = useState({
        email: '',
        password: ''
    });

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value }));
        
        if (name === 'email') {
            setEmailError('');
            setIsEmailCorrect(false);
        }
        if (name === 'password') {
            setPasswordError('');
            setIsPasswordCorrect(false);
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
    
        const loginData = new URLSearchParams({
            email: inputs.email,
            password: inputs.password,
            formType
        });

        postToEndpoint('/login.php', loginData, {
            'Content-Type': 'application/x-www-form-urlencoded'
        })
        .then(response => {
            if (response.data.success) {
                const userData = {
                    id: response.data.employer_id,
                    firstname: response.data.firstname,
                    userType: response.data.userType
                };
                login(userData); 
        
                if (response.data.profileIncomplete) {
                    navigate('/employer/companyprofile');
                } else {
                    navigate('/employer/overview');
                }
            } else {
                    const errorMessage = response.data.error || '';
                    
                    if (typeof errorMessage === 'string' && errorMessage.includes('email')) {
                        setEmailError("Incorrect email");
                        setIsEmailCorrect(false);
                    } else if (typeof errorMessage === 'string' && errorMessage.includes('password')) {
                        setPasswordError("Incorrect password");
                        setIsPasswordCorrect(false);
                    } else {
                        alert(response.data.error || "Login failed. Please try again.");
                    }
                }
            })
            .catch(error => {
                console.error("There was an error submitting the form!", error);
                alert("An error occurred while submitting the form. Please try again.");
            });
    };

    const renderFormFields = () => (
        <>
            <div className="mb-3">
                <input
                    type="email"
                    name='email'
                    className={`form-control register ${emailError ? 'border border-danger' : isEmailCorrect ? 'border border-success' : ''}`}
                    placeholder="Email"
                    onChange={handleChange}
                    required
                />
                {emailError && <small className="text-danger">{emailError}</small>}
            </div>
            <div className="mb-3">
                <input
                    type="password"
                    name='password'
                    className={`form-control register ${passwordError ? 'border border-danger' : isPasswordCorrect ? 'border border-success' : ''}`}
                    placeholder="Password"
                    onChange={handleChange}
                    required
                />
                {passwordError && <small className="text-danger">{passwordError}</small>}
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
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-6 mt-5">
                    <h3 className="mb-3 text-start">Sign In</h3>
                    <h4 className="mb-4 text-start" style={{ fontSize: '15px' }}>
                        Don't have an account? <Link to="/registration" style={{ textDecoration: 'none', color: '#0A65CC' }}>Create Account</Link>
                    </h4>
                    <div className="d-flex justify-content-center mb-4">
                        <div className="d-flex flex-column align-items-center mb-4" style={{ backgroundColor: '#F1F2F4', padding: '26px', borderRadius: '10px', width: '580px' }}>
                            <h5 className="text-center mb-3">Sign In as</h5>
                            <div className="d-flex justify-content-center">
                                <Link to={"/candidate_login"}>
                                    <button 
                                        className={`btn btn-primary mx-1 custom-button ${formType === 'candidate' ? 'active' : ''}`}
                                        style={{ backgroundColor: formType === 'candidate' ? '#042852' : 'white', color: formType === 'candidate' ? 'white' : 'black', width: '270px', borderColor: 'black' }} 
                                    >
                                        <FontAwesomeIcon icon={faUser} /> Candidate
                                    </button>
                                </Link> 
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

export default SignInEmployer;
