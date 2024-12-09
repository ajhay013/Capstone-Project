import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, ProgressBar } from 'react-bootstrap';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; 
import axios from 'axios';

const ApplyModal = ({ show, handleClose, applicant_id, job_id }) => {
    const [currentStep, setCurrentStep] = useState(1);
    const [progress, setProgress] = useState(0); 
    const [selectedOption, setSelectedOption] = useState(null); 
    const [isChecked, setIsChecked] = useState(false);
    const [coverLetter, setCoverLetter] = useState('');
    const [ApplicantProfile, setApplicantProfile] = useState([]);

    const handleNext = () => {
        if (currentStep < 4) {
            setCurrentStep(currentStep + 1);
            setProgress(progress + 33.33);
        }
    };

    const handleBack = () => {
        if (currentStep > 1) { 
            setCurrentStep(currentStep - 1);
            setProgress(progress - 33.33);
        }
    };

    const handleOptionSelect = (option) => {
        setSelectedOption(option); 
    };

    const handleCoverLetterChange = (value) => {
        setCoverLetter(value);
    };

    useEffect(() => {
        const fetchApplicantProfile = async () => {
            try {
                const response = await axios.post(
                    'http://localhost:80/capstone-project/jobsync/src/api/getApplicantinfo.php',
                    { applicant_id } 
                );
                console.log(response.data);
                if (response.data && !response.data.error) {
                    setApplicantProfile(response.data); 
                } else {
                    console.error('Error in response:', response.data.error);
                }
            } catch (error) {
                console.error('Error fetching applicant profile:', error);
            }
        };
    
        if (applicant_id) {
            fetchApplicantProfile();
        }
    }, [applicant_id]);
    

    const modalBodyStyle = currentStep === 4 ||
    currentStep === 2
        ? { 
            position: 'relative', 
            overflowY: 'auto',
            maxHeight: '740px',
            paddingLeft: '40px',
            paddingRight: '40px'
        } 
        : { 
            position: 'relative', 
            overflow: 'hidden', 
            paddingLeft: '40px',
            paddingRight: '40px'
        };

        const handleResumeUpload = (event) => {
            const file = event.target.files[0]; 
            if (file) {
                console.log('Resume file selected:', file);
               
            }
        };

        const handleSubmit = () => {
            const applicationData = {
                applicant_id,
                job_id,
                coverLetter,
            };
    
            console.log("Application submitted:", applicationData);
            handleClose(); 
        };
        

    return (
        <Modal
        show={show}
        onHide={handleClose}
        aria-labelledby="contained-modal-title-vcenter"
        className="modal-lg"
        backdrop="static"
        >
            <Modal.Header closeButton style={{paddingLeft: '1.5rem', paddingRight: '1.5rem', fontSize: '10px'}}>
            <Modal.Title style={{paddingLeft: '10px'}}>Apply to Job</Modal.Title>
            </Modal.Header>
            <Modal.Body style={modalBodyStyle}>
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <ProgressBar now={progress} className="flex-grow-1" />
                    <span className="ms-2" style={{ fontSize: '0.9rem' }}>{Math.round(progress)}%</span>
                </div>

                {/* Step 1: Contact Info */}
                {currentStep === 1 && (
                    <div>
                        <h5 style={{ marginTop: '20px' }}>Contact info</h5>
                        <div className="d-flex align-items-center mb-3">
                            <img
                                src={ApplicantProfile.profile}
                                alt="Profile"
                                className="rounded-circle me-3"
                                style={{ width: '80px', height: '80px' }}
                            />
                            <div>
                                <strong>{ApplicantProfile.firstname} {ApplicantProfile.middlename} {ApplicantProfile.lastname}</strong>
                                <p className="mb-0" style={{ fontSize: '1rem' }}>
                                    {ApplicantProfile.headline}
                                </p>
                                <p className="mb-0" style={{ fontSize: '0.9rem', color: 'gray' }}>
                                {ApplicantProfile.address} - {ApplicantProfile.city}
                                </p>
                            </div>
                        </div>
                        <Form>
                            <Form.Group className="mb-3" controlId="email">
                                <Form.Label>Email address*</Form.Label>
                                <Form.Control className='register1' type="email" disabled value={ApplicantProfile.email}/>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="phoneCountryCode">
                                <Form.Label>City</Form.Label>
                                <Form.Control className='register1' type="email" disabled value={ApplicantProfile.city}/>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="mobilePhoneNumber">
                                <Form.Label>Mobile phone number*</Form.Label>
                                <Form.Control className='register1' type="text" disabled  value={ApplicantProfile?.contact ? `+63${ApplicantProfile.contact}` : ''}  />
                            </Form.Group>
                        </Form>
                        <div>
                            <p className="text-muted mb-0 mt-5" style={{ fontSize: '0.9rem' }}>
                                Submitting this application won't change your JobSync profile.
                                <br />
                                Application powered by JobSync |{' '}
                                <a href="#" style={{ color: '#0073b1' }}>Help Center</a>
                            </p>
                        </div>
                    </div>
                )}

                {/* Step 2: Additional Questions */}
                {currentStep === 2 && (
                    <div>
                        <h5 style={{ marginTop: '20px' }}>Screening Questions</h5>
                        <p style={{ marginTop: '20px', color: '#4f4f4f' }}>Do you prefer to be contacted?</p>
                        <div className="d-flex flex-column justify-content-start mb-4">
                            {['Yes', 'No'].map((option, index) => (
                                <div
                                    key={index}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        marginBottom: '10px',
                                        cursor: 'pointer',
                                    }}
                                    onClick={() => handleOptionSelect(option)}
                                >
                                    <div
                                        className="circle-option"
                                        style={{
                                            width: '25px',
                                            height: '25px',
                                            borderRadius: '50%',
                                            border: '2px solid #0073b1',
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            backgroundColor: selectedOption === option ? '#0073b1' : 'white',
                                            color: selectedOption === option ? 'white' : '#0073b1',
                                            fontSize: '1.2rem',
                                        }}
                                    >
                                        {selectedOption === option ? '✓' : ''}
                                    </div>
                                    <span style={{ marginLeft: '10px', fontSize: '1rem' }}>
                                        {option}
                                    </span>
                                </div>
                            ))}
                        </div>
                        <p style={{ marginTop: '20px', color: '#4f4f4f' }}>Do you prefer to be contacted?</p>
                        <div className="d-flex flex-column justify-content-start mb-4">
                            {['Yes', 'No'].map((option, index) => (
                                <div
                                    key={index}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        marginBottom: '10px',
                                        cursor: 'pointer',
                                    }}
                                    onClick={() => handleOptionSelect(option)}
                                >
                                    <div
                                        className="circle-option"
                                        style={{
                                            width: '25px',
                                            height: '25px',
                                            borderRadius: '50%',
                                            border: '2px solid #0073b1',
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            backgroundColor: selectedOption === option ? '#0073b1' : 'white',
                                            color: selectedOption === option ? 'white' : '#0073b1',
                                            fontSize: '1.2rem',
                                        }}
                                    >
                                        {selectedOption === option ? '✓' : ''}
                                    </div>
                                    <span style={{ marginLeft: '10px', fontSize: '1rem' }}>
                                        {option}
                                    </span>
                                </div>
                            ))}
                        </div>

                        
                    </div>
                )}

                {/* Step 3: Resume Upload and Cover Letter */}
                {currentStep === 3 && (
                    <div>
                        <h5 style={{ marginTop: '20px' }}>Upload Resume & Cover Letter</h5>

                        <Form>
                            {/* Resume Upload */}
                            <Form.Group className="mb-3" controlId="resumeSelect">
                                <Form.Label>Select Resume</Form.Label>
                                <Form.Control 
                                    as="select"
                                    className='register1'
                                >
                                    <option value="" disabled selected>Select a resume</option>
                                    <option value="resume1.pdf">Resume 1</option>
                                    <option value="resume2.pdf">Resume 2</option>
                                    <option value="resume3.pdf">Resume 3</option>
                                </Form.Control>
                            </Form.Group>

                            {/* Cover Letter */}
                            <Form.Group className="mb-3" controlId="coverLetter">
                                <Form.Label>Cover Letter (Optional)</Form.Label>
                                <ReactQuill
                                    value={coverLetter}
                                    onChange={handleCoverLetterChange}
                                    placeholder="Write your cover letter here"
                                    modules={{ toolbar: [['bold', 'italic', 'underline'], ['link']] }}
                                />
                            </Form.Group>
                        </Form>
                    </div>
                )}
                {/* Step 4: Confirmation */}
                {currentStep === 4 && (
                    <div>
                        <h5 style={{ marginTop: '20px' }}>Review your Application</h5>
                        <p className="mb-0">The employer will also receive a copy of your profile</p>

                        <hr className="my-4" />
                        
                        <button
                            style={{
                                position: 'absolute',
                                top: '20px',
                                right: '20px',
                                backgroundColor: 'transparent',
                                color: '#007bff',
                                border: 'none',
                                padding: '8px 16px',
                                cursor: 'pointer',
                                fontSize: '1rem',
                                marginTop: '135px',
                            }}
                        >
                            Edit
                        </button>

                        <h5 style={{ marginTop: '10px', marginBottom: '15px' }}>Contact Information</h5>
                        <div className="d-flex align-items-center mb-3">
                            <img
                                src={ApplicantProfile.profile}
                                alt="Profile"
                                className="rounded-circle me-2"
                                style={{ width: '80px', height: '80px' }}
                            />
                            <div>
                                <strong>{ApplicantProfile.firstname} {ApplicantProfile.middlename} {ApplicantProfile.lastname}</strong>
                                <p className="mb-0" style={{ fontSize: '1rem' }}>
                                    {ApplicantProfile.headline}
                                </p>
                                <p className="mb-0" style={{ fontSize: '0.9rem', color: 'gray' }}>
                                {ApplicantProfile.address} - {ApplicantProfile.city}
                                </p>
                            </div>
                        </div>

                        <div className="mb-3">
                            <strong>Email address</strong>
                            <p>{ApplicantProfile.email}</p>
                        </div>
                        <div className="mb-3">
                            <strong>City</strong>
                            <p>{ApplicantProfile.city}</p>
                        </div>
                        <div className="mb-3">
                            <strong>Phone number</strong>
                            <p>+63{ApplicantProfile.contact}</p>
                        </div>

                        <hr className="my-4" />

                        <div className="mb-3">
                            <strong>Your uploaded resume</strong>
                            <p>resume1.pdf</p>
                        </div>

                        <hr className="my-4" />
                        
                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <h5>Screening Questions</h5>
                            <button
                                style={{
                                    backgroundColor: 'transparent',
                                    color: '#0073b1',
                                    border: 'none',
                                    padding: '8px 16px',
                                    cursor: 'pointer',
                                    fontSize: '1rem',
                                }}
                                onClick={() => setIsChecked(!isChecked)}
                            >
                                Edit
                            </button>
                        </div>
                        <p style={{ marginTop: '20px' }}>Do you prefer to be contacted?</p>
                        <p style={{ color: "black", marginTop: '-20px' }}>Yes</p>

                        <hr className="my-4" />

                        {/* Follow JobSync Checkbox */}
                        <div className="mt-3">
                            <strong>Follow JobSync to stay updated with their page</strong>
                            <p>{isChecked ? 'Yes' : 'No'}</p>
                        </div>

                        <p className="text-muted mt-3 mb-0" style={{ fontSize: '0.9rem' }}>
                            We will automatically save your answer and resume to pre-fill future applications and improve your experience on JobSync.
                            You can control this in your <a href="/application-settings" style={{ color: '#0073b1' }}>Application Settings</a>.
                            <a href="/learn-more" style={{ color: '#0073b1' }}> Learn more</a>
                            <br />
                            Application powered by JobSync |{' '}
                            <a href="/help-center" style={{ color: '#0073b1' }}>Help Center</a>
                        </p>
                    </div>

                )}
            </Modal.Body>
            <Modal.Footer style={{paddingLeft: '2rem', paddingRight: '2rem', justifyContent: 'space-between'}}>
                {currentStep > 1 ? (
                    <Button onClick={handleBack} style={{height: '40px', fontSize: '12px', borderRadius: '3px', width: '75px', color: '#156ad7', background: '#bce0ff', border: 'none', fontWeight: '700'}}>
                        Back
                    </Button>
                ) : (
                    <Button onClick={handleClose} style={{height: '40px', fontSize: '12px', borderRadius: '3px', width: '75px', color: '#156ad7', background: '#bce0ff', border: 'none', fontWeight: '700'}}>
                        Close
                    </Button>
                )}
                {currentStep < 4 ? (
                    <Button onClick={handleNext} style={{width: '120px', height: '40px', fontSize: '12px', borderRadius: '3px', background: '#156ad7', fontWeight: '500'}}>Next</Button>
                ) : (
                    <Button onClick={handleSubmit} style={{width: '120px', height: '40px', fontSize: '12px', borderRadius: '3px', background: '#156ad7', fontWeight: '500'}}>Submit</Button>
                )}
            </Modal.Footer>
        </Modal>
    );
};

export default ApplyModal;
