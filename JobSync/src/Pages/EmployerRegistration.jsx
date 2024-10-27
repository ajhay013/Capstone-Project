import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import React, { useState } from 'react'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faUser, faBuilding, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom'; 
import axios from 'axios';

export default function EmployerRegistrationForm() {
    const [formType, setFormType] = useState('employer');
    const [isAgreed, setIsAgreed] = useState(false);
    const [step, setStep] = useState(1); // Manage form step
    const [firstName, setFirstName] = useState('');
    const [middleName, setMiddleName] = useState('');
    const [lastName, setLastName] = useState('');
    const [suffix, setSuffix] = useState('');
    const [position, setPosition] = useState('');
    const [contactNumber, setContactNumber] = useState('');
    const [email, setEmail] = useState(''); // Email state
    const [password, setPassword] = useState(''); // Password state
    const [confirmPassword, setConfirmPassword] = useState(''); // Confirm password state
    const [idFrontImage, setIdFrontImage] = useState(null); 
    const [idFrontImagePreview, setIdFrontImagePreview] = useState(null);
    const [idBackImage, setIdBackImage] = useState(null);
    const [idBackImagePreview, setIdBackImagePreview] = useState(null); 
    

    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false); // Loader state

    const handleFrontImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setIdFrontImage(file);
            const previewUrl = URL.createObjectURL(file);
            setIdFrontImagePreview(previewUrl);
        } else {
            setIdFrontImage(null);
            setIdFrontImagePreview(null);
        }
    };


    const handleBackImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setIdBackImage(file);
            const previewUrl = URL.createObjectURL(file);
            setIdBackImagePreview(previewUrl);
        } else {
            setIdBackImage(null);
            setIdBackImagePreview(null);
        }
    };


    const handleNext = (e) => {
        e.preventDefault();
        if (isFirstStepValid()) {
            setStep(2); // Move to the next step
        }
    };

    const isFirstStepValid = () => {
        return firstName.trim() !== '' && 
               lastName.trim() !== '' && 
               position.trim() !== '' && 
               contactNumber.trim() !== '';
    };

    const handleBack = () => {
        setStep(1); // Move back to the first step
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setIsLoading(true); // Start loading
    
        const inputs = {
            firstName,
            middleName,
            lastName,
            suffix,
            position,
            contactNumber,
            email,
            password,
            idFrontImage,
            idBackImage
        };


        const formData = new FormData();
            for (const key in inputs) {
                formData.append(key, inputs[key]);
    }

        axios.post('http://localhost:80/capstone-project/jobsync/src/api/index.php', inputs)
            .then(response => {
                setIsLoading(false); // Stop loading
                console.log(response.data);
                if (response.data.status === 1) { 
                    navigate('/email_verification', { state: { email } }); 
                } else {
                    alert(response.data.message || "Registration failed. Please try again.");
                }
            })
            .catch(error => {
                setIsLoading(false); // Stop loading
                console.error("There was an error submitting the form!", error);
                alert("An error occurred while submitting the form. Please try again.");
            });
    };

    const renderFormFieldsStep1 = () => (
        <>
            <div className="row mb-3">
                <div className="col">
                    <input 
                        type="text" 
                        className="form-control register" 
                        placeholder="First Name *" 
                        value={firstName} 
                        onChange={(e) => setFirstName(e.target.value)} 
                    />
                </div>
                <div className="col">
                    <input 
                        type="text" 
                        className="form-control register" 
                        placeholder="Middle Name" 
                        value={middleName} 
                        onChange={(e) => setMiddleName(e.target.value)} 
                    />
                </div>
            </div>
            <div className="row mb-3">
                <div className="col">
                    <input 
                        type="text" 
                        className="form-control register" 
                        placeholder="Last Name *"     
                        value={lastName} 
                        onChange={(e) => setLastName(e.target.value)} 
                    />
                </div>
                <div className="col">
                    <input 
                        type="text" 
                        className="form-control register" 
                        placeholder="Suffix (Optional)" 
                        value={suffix} 
                        onChange={(e) => setSuffix(e.target.value)} 
                    />
                </div>
            </div>
            <div className="row mb-3">
                <div className="col">
                    <input 
                        type="text" 
                        className="form-control register" 
                        placeholder="Position *" 
                        value={position} 
                        onChange={(e) => setPosition(e.target.value)} 
                    />
                </div>
            </div>
            <div className="row mb-3">
                <div className="col">
                    <input 
                        type="text" 
                        className="form-control register" 
                        placeholder="Contact Number *" 
                        value={contactNumber} 
                        onChange={(e) => setContactNumber(e.target.value)} 
                    />
                </div>
            </div>
            {/* Next button */}
            <div className="d-flex justify-content-center">
                <button 
                    type="button" 
                    className="btn btn-primary btn-custom" 
                    style={{ backgroundColor: '#0A65CC', width: '700px', marginTop: '20px', border: 'none' }}
                    onClick={handleNext}
                    disabled={!isFirstStepValid()} 
                >
                    Next <FontAwesomeIcon icon={faArrowRight} />
                </button>
            </div>
        </>
    );

    const renderFormFieldsStep2 = () => (
        <>
             <div className="d-flex gap-3 mb-3">
    <div style={{ width: '50%' }}>
        <small className="form-text text-muted">Upload the front of your ID for verification.</small>
        <input 
            type="file" 
            className="form-control register" 
            accept="image/*" 
            onChange={handleFrontImageChange} 
        />
        <div className="mt-2" style={{ width: '100%', height: '150px', borderRadius: '5px', backgroundColor: '#f8f9fa', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {idFrontImagePreview ? (
                <img 
                    src={idFrontImagePreview} 
                    alt="Uploaded Front ID Preview" 
                    style={{ width: '100%', height: 'auto', borderRadius: '5px' }} 
                />
            ) : (
                <span className="text-muted">Front ID Preview</span>
            )}
        </div>
    </div>

    <div style={{ width: '50%' }}>
        <small className="form-text text-muted">Upload the back of your ID for verification.</small>
        <input 
            type="file" 
            className="form-control register" 
            accept="image/*" 
            onChange={handleBackImageChange} 
        />
        <div className="mt-2" style={{ width: '100%', height: '150px', borderRadius: '5px', backgroundColor: '#f8f9fa', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {idBackImagePreview ? (
                <img 
                    src={idBackImagePreview} 
                    alt="Uploaded Back ID Preview" 
                    style={{ width: '100%', height: 'auto', borderRadius: '5px' }} 
                />
            ) : (
                <span className="text-muted">Back ID Preview</span>
            )}
        </div>
    </div>
</div>



            <div className="mb-3">
                <input 
                    type="email" 
                    className="form-control register" 
                    placeholder="Email *" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                />
            </div>
            <div className="mb-3">
                <input 
                    type="password" 
                    className="form-control register" 
                    placeholder="Password *" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                />
            </div>
            <div className="mb-3">
                <input 
                    type="password" 
                    className="form-control register" 
                    placeholder="Confirm Password *" 
                    value={confirmPassword} 
                    onChange={(e) => setConfirmPassword(e.target.value)} 
                />
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
            <div className="d-flex justify-content-center mb-3" style={{ position: 'relative' }}>
                <button 
                    type="button" 
                    className="btn btn-secondary btn-custom" 
                    style={{ backgroundColor: 'transparent', width: '500px', marginTop: '20px', color: '#000000' }}
                    onClick={handleBack}
                >
                    <FontAwesomeIcon icon={faArrowLeft} /> Back
                </button>
                {isLoading ? (
                    <div 
                        className="loader" 
                        style={{
                            position: 'absolute',
                            top: '45%',
                            left: '74%',
                            transform: 'translate(-50%, -50%)',
                            border: '5px solid #f3f3f3', 
                            borderTop: '5px solid #3498db', 
                            borderRadius: '50%',
                            width: '30px',
                            height: '30px',
                            animation: 'spin 2s linear infinite'
                        }}
                    />
                ) : null}
                <button 
                    type="submit" 
                    className="btn btn-success btn-custom" 
                    style={{ backgroundColor: '#0A65CC', width: '500px', marginTop: '20px', marginLeft: '20px', opacity: isLoading ? 0.4 : 1 }} 
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
                    <h4 className="mb-4 text-start" style={{ fontSize: '15px' }}>
                        Already have an account? <Link to="/candidate_login" style={{ textDecoration: 'none', color: '#0A65CC' }}>Log In</Link>
                    </h4>
                    <div className="d-flex justify-content-center mb-1">
                        <div className="d-flex flex-column align-items-center mb-4" style={{ backgroundColor: '#F1F2F4', padding: '26px', borderRadius: '10px', width: '580px' }}>
                            <h5 className="text-center mb-3">Create Account as</h5>
                            <div className="d-flex justify-content-center">
                                <Link to={"/registration"}>
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
                        {step === 1 ? renderFormFieldsStep1() : renderFormFieldsStep2()}
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
