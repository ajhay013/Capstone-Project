import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import Webcam from 'react-webcam';
import React, { useState, useEffect, useRef } from 'react'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faUser, faBuilding, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom'; 
import axios from 'axios';
import { useAuth } from '../AuthContext';
import Swal from 'sweetalert2';


export default function EmployerRegistrationForm() {
    const [formType, setFormType] = useState('employer');
    const [isAgreed, setIsAgreed] = useState(false);
    const [step, setStep] = useState(1); 
    const [firstName, setFirstName] = useState('');
    const [middleName, setMiddleName] = useState('');
    const [lastName, setLastName] = useState('');
    const [suffix, setSuffix] = useState('');
    const [position, setPosition] = useState('');
    const [contactNumber, setContactNumber] = useState('');
    const [email, setEmail] = useState(''); 
    const [password, setPassword] = useState(''); 
    const [confirmPassword, setConfirmPassword] = useState(''); 
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false); 
    const { user } = useAuth(); 

    const [documentImage, setDocumentImage] = useState(null);
    const [faceImage, setFaceImage] = useState(null);
    const [backImage, setBackImage] = useState(null);
    const [cameraActive, setCameraActive] = useState(false);
    const webcamRef = useRef(null);
    const api_url = "http://localhost:80/capstone-project/jobsync/src/api/employer.php";

    const [idFrontImagePreview, setIdFrontImagePreview] = useState(null);
    const [backImagePreview, setBackImagePreview] = useState(null);

    const handleImageUpload = (event, setImage, setPreview) => {
        const file = event.target.files[0];
        if (file) {
            setImage(file);
            setPreview(URL.createObjectURL(file)); 
        }
    };
    

    const captureFaceImage = () => {
        const imageSrc = webcamRef.current.getScreenshot();
        setFaceImage(imageSrc);
        setCameraActive(false);
    };

    const isStep2Valid = () => {
        return documentImage && backImage && faceImage;
    };

    const handleNext = (e) => {
        e.preventDefault();
        if (isFirstStepValid()) {
            setStep(2);
        }
    };
    useEffect(() => {
        if (user) {
            navigate('/dashboard');
        }
    }, [user, navigate]);
    const isFirstStepValid = () => {
        return firstName.trim() !== '' && 
               lastName.trim() !== '' && 
               position.trim() !== '' && 
               contactNumber.trim() !== '';
    };

    const handleBack = () => {
        setStep(1); 
    };
    const handleBack1 = () => {
        setStep(2); 
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true); 

        const documentBase64 = await convertToBase64(documentImage);
        const backBase64 = await convertToBase64(backImage);

        const payload = {
            document: documentBase64,
            face: faceImage.split(',')[1],  
            backSideId: backBase64,
            firstName,
            middleName,
            lastName,
            suffix,
            position,
            contactNumber,
            email,
            password,
            type: 'employer'
        };

        try {
            const response = await axios.post(api_url, payload, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        
            if (response.data.decision) {
                if (response.data.decision !== 'reject') { 
                    navigate('/email_verification', { state: { email, formType } });
                } else {
                    await Swal.fire({
                        title: 'Rejected!',
                        text: "Your ID verification has been rejected.",
                        icon: 'error',
                        confirmButtonText: 'OK'
                    });
                }
            } else if (response.data.error) {
                await Swal.fire({
                    title: 'Error!',
                    text: `Error: ${response.data.error}`,
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            } else {
                await Swal.fire({
                    title: 'Unexpected Response',
                    text: "Unexpected response from the server.",
                    icon: 'warning',
                    confirmButtonText: 'OK'
                });
            }
        
        } catch (error) {
            console.error("Error:", error);
            await Swal.fire({
                title: 'Error!',
                text: "Error verifying ID.",
                icon: 'error',
                confirmButtonText: 'OK'
            });
        } finally {
            setIsLoading(false);
        }
        
        

   
    };
    const convertToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result.split(',')[1]);
            reader.onerror = (error) => reject(error);
        });
    };

    const renderFormFieldsStep2 = () => (
        <>
            <h6 style={{ textAlign: 'left', color: '#505050' }}>ID Verification:</h6>
            <div className="d-flex gap-3 mb-3">
                <div style={{ width: '50%' }}>
                    <small className="form-text text-muted">Upload the front of your Government ID</small>
                    <input 
                        type="file" 
                        className="form-control" 
                        accept="image/*" 
                        onChange={(e) => handleImageUpload(e, setDocumentImage, setIdFrontImagePreview)} 
                        required 
                    />
                    <div 
                        className="mt-2" 
                        style={{ width: '100%', height: '150px', borderRadius: '5px', backgroundColor: '#f8f9fa', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    >
                        {idFrontImagePreview ? (
                            <img 
                                src={idFrontImagePreview} 
                                alt="Uploaded Front ID Preview" 
                                style={{ width: '100%', height: '100%', borderRadius: '5px', objectFit: 'cover' }} 
                            />
                        ) : (
                            <span className="text-muted">Front ID Preview</span>
                        )}
                    </div>
                </div>

                <div style={{ width: '50%'}}>
                <small className="form-text text-muted">Upload the back of your Government ID</small>
                <input 
                    type="file" 
                    className="form-control" 
                    accept="image/*" 
                    onChange={(e) => handleImageUpload(e, setBackImage, setBackImagePreview)} 
                    required 
                />
                <div 
                    className="mt-2" 
                    style={{ width: '100%', height: '150px', borderRadius: '5px', backgroundColor: '#f8f9fa', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                    {backImagePreview ? (
                        <img 
                            src={backImagePreview} 
                            alt="Uploaded Back ID Preview" 
                            style={{ width: '100%', height: '100%', borderRadius: '5px', objectFit: 'cover' }} 
                        />
                    ) : (
                        <span className="text-muted">Back ID Preview</span>
                    )}
                </div>
                </div>

            </div>
            <div className="d-flex justify-content-center mb-3">
                <div style={{ width: '50%'}}>
                                    
                {faceImage && (
                    <div style={{ marginBottom: '10px' }}>
                        <p>Captured Face Image Preview:</p>
                        <img src={faceImage} alt="Face Preview" style={{ width: '100%', height: '100%', borderRadius: '5px', objectFit: 'cover' }}  />
                    </div>
                )}
                <label>Take a selfie:</label>
                {cameraActive ? (
                    <div>
                        <Webcam
                            audio={false}
                            ref={webcamRef}
                            screenshotFormat="image/jpeg"
                            style={{ width: '100%', borderRadius: '5px' }}
                        />
                        <button type="button" onClick={captureFaceImage} style={{ marginTop: '10px' }}>Capture</button>
                    </div>
                ) : (
                    <>
                        <input 
                            type="file" 
                            accept="image/*" 
                            onChange={(e) => handleImageUpload(e, setFaceImage)} 
                            style={{ display: 'none' }}
                            id="face-upload"
                        />
                        <button type="button" onClick={() => setCameraActive(true)} style={{ marginLeft: '10px' }}>
                            Open Camera
                        </button>
                    </>
                )}

                </div>
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

                <button 
                    type="button" 
                    className="btn btn-primary btn-custom" 
                    style={{ backgroundColor: '#0A65CC', width: '500px', marginTop: '20px', marginLeft: '20px', border: 'none' }}
                    onClick={() => setStep(3)}
                    disabled={!isStep2Valid()} 
                >
                    Next <FontAwesomeIcon icon={faArrowRight} />
                </button>
            </div>    
        </>
    );


    const renderFormFieldsStep1 = () => (
        <>
            <h6 style={{textAlign: 'left', color: '#505050'}}>Personal Information:</h6>
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
    const renderFormFieldsStep3 = () => (
        <>
        <h6 style={{textAlign: 'left', color: '#505050'}}>Account Setup:</h6>
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
                    onClick={handleBack1}
                    disabled={isLoading}
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
                    {isLoading ? 'Verifying your ID...' : <>Create Account <FontAwesomeIcon icon={faArrowRight} /></>}

                    
                </button>
            </div>
        </>
    );

    const renderProgressBar = () => (
        <div className="progress-bar-container mb-4">
            <div className="progress-bar-step">
                <div className={`circle ${step >= 1 ? 'completed' : ''}`}>1</div>
                <span>Personal Information</span>
            </div>
            <div className={`progress-line ${step > 1 ? 'completed' : ''}`}></div>
            <div className="progress-bar-step">
                <div className={`circle ${step >= 2 ? 'completed' : ''}`}>2</div>
                <span>ID Verification</span>
            </div>
            <div className={`progress-line ${step > 2 ? 'completed' : ''}`}></div>
            <div className="progress-bar-step">
                <div className={`circle ${step === 3 ? 'completed' : ''}`}>3</div>
                <span>Account Setup</span>
            </div>
        </div>
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
                    {renderProgressBar()}
                     <form onSubmit={handleSubmit}>
                        {step === 1 ? renderFormFieldsStep1() 
                        : step === 2 ? renderFormFieldsStep2() 
                        : renderFormFieldsStep3()}
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
