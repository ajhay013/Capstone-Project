import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import React, { useState, useEffect } from 'react'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faUser, faBuilding } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom'; 
import { useAuth } from '../AuthContext';
import { postToEndpoint } from '../components/apiService';

function RegistrationForm() {
    const navigate = useNavigate();
    const { user } = useAuth(); 
    
    const [inputs, setInputs] = useState({
        type: 'applicant',
        firstname: '',
        lastname: '',
        gender: '',
        contact: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [isLoading, setIsLoading] = useState(false); 
    const [errorMessage, setErrorMessage] = useState(''); 
    const [passwordError, setPasswordError] = useState(''); 
    const [nameError, setNameError] = useState({ firstname: '', lastname: '' });
    const [showErrors, setShowErrors] = useState(false); 
    const [formCompleted, setFormCompleted] = useState(false);
    const [contactError, setContactError] = useState(''); 


    useEffect(() => {
        if (user) {
            navigate('/applicants/overview');
        }
    }, [user, navigate]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setInputs(values => ({ ...values, [name]: value }));
    
        if (name === 'firstname' || name === 'lastname') {
            setNameError(prevErrors => ({ ...prevErrors, [name]: '' }));
            const nameRegex = /^[A-Za-z\s]*$/;
            if (!nameRegex.test(value) && value !== '') {
                setNameError(prevErrors => ({ ...prevErrors, [name]: "Name cannot contain numbers." }));
            }
            if (value.length < 2) {
                setNameError(prevErrors => ({ ...prevErrors, [name]: `${name.charAt(0).toUpperCase() + name.slice(1)} must be at least 2 characters.` }));
            }
        }
        
        if (name === 'password') {
            const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
            setPasswordError(passwordRegex.test(value) ? '' : "Password must be at least 8 characters, one uppercase, lowercase, numbers, and a special character.");
        }
    
        if (name === 'confirmPassword') {
            setErrorMessage(value !== inputs.password ? "Passwords do not match." : '');
        }
    
        if (name === 'contact') {
            const contactRegex = /^[1-9]\d{0,9}$/;
            if (value.length === 10) {
                setContactError('');
            } else if (!contactRegex.test(value) && value !== '') {
                setContactError("Contact number must be 10 digits long and cannot start with 0");
            } else {
                setContactError('');
            }
        }
    };
    
    

    const validateNames = () => {
        const nameRegex = /^([A-Z][a-zA-Z]*(\s[A-Z][a-zA-Z]*)?)$/;
        let errors = { firstname: '', lastname: '' };
    
        if (inputs.firstname.length < 2) {
            errors.firstname = "Must be at least 2 characters.";
        }
        if (inputs.lastname.length < 2) {
            errors.lastname = "Must be at least 2 characters.";
        }
    
        if (!nameRegex.test(inputs.firstname || '')) {
            errors.firstname = "Must start with a capital letter.";
        }
        if (!nameRegex.test(inputs.lastname || '')) {
            errors.lastname = "Must start with a capital letter.";
        }
    
        setNameError(errors);
        return errors.firstname === '' && errors.lastname === '';
    };
    
    
    const handleSubmit = (event) => {
        event.preventDefault();
        setShowErrors(true);

        if (!validateNames() || inputs.password !== inputs.confirmPassword || passwordError) {
            setErrorMessage(inputs.password !== inputs.confirmPassword ? "Passwords do not match." : '');
            return;
        }
    
        setIsLoading(true);
        setErrorMessage('');
    
        postToEndpoint('/index.php', inputs)
            .then(response => {
                setIsLoading(false);
                if (response.data.status === 1) { 
                    navigate('/email_verification', { state: { email: inputs.email, formType: inputs.type } });
                } else {
                    alert(response.data.message || "Registration failed. Please try again.");
                }
            })
            .catch(error => {
                setIsLoading(false);
                alert("An error occurred while submitting the form. Please try again.");
            });
    };
    const [formType, setFormType] = useState('candidate');
    const [isAgreed, setIsAgreed] = useState(false);

    useEffect(() => {
        const requiredFieldsFilled = inputs.firstname && inputs.lastname && inputs.gender && inputs.contact && inputs.email && inputs.password && inputs.confirmPassword;
        setFormCompleted(requiredFieldsFilled && isAgreed);
    }, [inputs, isAgreed]);

    const renderFormFields = () => (
        <>
            <input type="hidden" id="type" name="type" value={inputs.type} />
            <div className="row mb-3">
                <div className="col">
                    <input 
                        type="text" 
                        className={`form-control register ${showErrors && nameError.firstname ? 'is-invalid' : ''}`} 
                        placeholder="First Name *" 
                        name='firstname' 
                        onChange={handleChange} 
                        onKeyDown={(e) => {
                            if (/[^A-Za-z\s]/.test(e.key) && e.key !== 'Backspace') {
                                e.preventDefault();
                            }
                        }} 
                        required  
                    />
                    {showErrors && nameError.firstname && (
                        <div className="text-danger mt-1" style={{ fontSize: '0.8rem' }}>
                            {nameError.firstname}
                        </div>
                    )}
                </div>
                <div className="col">
                    <input 
                        type="text" 
                        className="form-control register" 
                        placeholder="Middle Name (Optional)" 
                        name='middlename' 
                        onChange={handleChange} 
                        onKeyDown={(e) => {
                            if (/[^A-Za-z\s]/.test(e.key) && e.key !== 'Backspace') {
                                e.preventDefault(); 
                            }
                        }} 
                    />
                </div>
            </div>
            <div className="row mb-3">
                <div className="col">
                    <input 
                        type="text" 
                        className={`form-control register ${showErrors && nameError.lastname ? 'is-invalid' : ''}`} 
                        placeholder="Last Name *" 
                        name='lastname' 
                        onChange={handleChange} 
                        onKeyDown={(e) => {
                            if (/[^A-Za-z\s]/.test(e.key) && e.key !== 'Backspace') {
                                e.preventDefault(); 
                            }
                        }} 
                        required 
                    />
                    {showErrors && nameError.lastname && (
                        <div className="text-danger mt-1" style={{ fontSize: '0.8rem' }}>
                            {nameError.lastname}
                        </div>
                    )}
                </div>
                <div className="col">
                    <input 
                        type="text" 
                        className="form-control register" 
                        placeholder="Suffix (Optional)" 
                        name='suffix' 
                        onChange={handleChange} 
                        onKeyDown={(e) => {
                            if (/[^A-Za-z\s]/.test(e.key) && e.key !== 'Backspace') {
                                e.preventDefault(); 
                            }
                        }} 
                    />
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
                <div className="col d-flex">
                    <input 
                        type="text" 
                        className="form-control register" 
                        style={{ backgroundColor: '#e6e6e6', width: '65px', marginRight: '-1px', borderRadius: '10px 0px 0px 10px', textAlign: 'center' }} 
                        value="+63" 
                        disabled 
                    />
                    <input 
                        type="text" 
                        className={`form-control register ${contactError ? 'is-invalid' : ''}`} 
                        style={{ borderRadius: '0px 10px 10px 0px' }} 
                        placeholder="Contact Number *" 
                        name='contact' 
                        onChange={handleChange} 
                        onKeyDown={(e) => {
                            if (inputs.contact.length === 0 && e.key === '0') {
                                e.preventDefault();
                            }
                            if (!/[0-9]/.test(e.key) && e.key !== 'Backspace') {
                                e.preventDefault();
                            }
                        }} 
                        maxLength={10} 
                        required 
                    />
                </div>
                {contactError && (
                        <div className="text-danger mt-1" style={{ fontSize: '0.8rem', textAlign: 'end'}}>
                            {contactError}
                        </div>
                    )}
            </div>


            <div className="mb-3">
                <input type="email" className="form-control register" placeholder="Email *" name='email' onChange={handleChange} required />
            </div>
            <div className="mb-3">
                <input 
                    type="password" 
                    className={`form-control register ${passwordError ? 'is-invalid' : ''}`} 
                    placeholder="Password *" 
                    name="password" 
                    onChange={handleChange} 
                    required 
                />
                {passwordError && (
                    <div className="text-danger mt-1" style={{ fontSize: '0.8rem' }}>
                        {passwordError}
                    </div>
                )}
            </div>
            <div className="mb-3">
                <input 
                    type="password" 
                    className={`form-control register ${errorMessage ? 'is-invalid' : ''}`} 
                    placeholder="Confirm Password *" 
                    name="confirmPassword" 
                    onChange={handleChange} 
                    required 
                />
                {errorMessage && (
                    <div className="text-danger mt-1" style={{ fontSize: '0.8rem' }}>
                        {errorMessage}
                    </div>
                )}
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
                    className="btn btn-custom" 
                    style={{ width: '700px', marginTop: '20px' }} 
                    disabled={!formCompleted || isLoading} 
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
                    <h4 className="mb-4 text-start" style={{ fontSize: '15px' }}>Already have an account? <Link to="/candidate_login" style={{ textDecoration: 'none', color: '#0A65CC' }}>Log In</Link>
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
                                <Link to="/registration_employer">
                                    <button 
                                        className={`btn btn-primary mx-1 custom-button ${formType === 'employer' ? 'active' : ''}`}
                                        style={{ backgroundColor: formType === 'employer' ? '#042852' : 'white', color: formType === 'employer' ? 'white' : 'black', width: '270px', borderColor: 'black' }} 
                                    >
                                        <FontAwesomeIcon icon={faBuilding} /> Employer
                                    </button>
                                </Link>
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
