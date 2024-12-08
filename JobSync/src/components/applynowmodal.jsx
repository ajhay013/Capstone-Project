import React, { useState } from 'react';
import { Modal, Button, Form, ProgressBar } from 'react-bootstrap';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; 

const ApplyModal = ({ show, handleClose }) => {
    const [currentStep, setCurrentStep] = useState(1);
    const [progress, setProgress] = useState(0); 
    const [selectedOption, setSelectedOption] = useState(null); 
    const [preferredContact, setPreferredContact] = useState(null);
    const [selectedResume, setSelectedResume] = useState('');
    const [isChecked, setIsChecked] = useState(false);
    const [coverLetter, setCoverLetter] = useState('');

    const handleResumeSelect = (event) => {
        const selectedValue = event.target.value;
        setSelectedResume(selectedValue); 
        console.log("Selected Resume: ", selectedValue);
    };

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

    const handlePreferredContact = (option) => {
        setPreferredContact(option); 
    };

    const handleResumeChange = (e) => {
        setSelectedResume(e.target.value); 
    };

    const handleCoverLetterChange = (value) => {
        setCoverLetter(value);
    };

    const modalBodyStyle = currentStep === 4 
        ? { 
            position: 'relative', 
            overflowY: 'auto', 
            maxHeight: '700px',
            paddingRight: '10px' 
        } 
        : { 
            position: 'relative', 
            overflow: 'hidden', 
            height: '500px' 
        };

        const handleResumeUpload = (event) => {
            const file = event.target.files[0]; 
            if (file) {
                console.log('Resume file selected:', file);
               
            }
        };
        

    return (
        <Modal
            show={show}
            onHide={handleClose}
            centered
            className="modal-lg"
            style={{
                maxWidth: '90%',
                height: 'auto',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                margin: 0,
                padding: 0,
                marginTop: '100px',
                marginLeft: '125px',
            }}
        >
            <Modal.Header closeButton>
                <Modal.Title>Apply to Job</Modal.Title>
            </Modal.Header>
            <Modal.Body style={modalBodyStyle}>
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <ProgressBar now={progress} label={`${Math.round(progress)}%`} className="flex-grow-1" />
                    <span className="ms-2" style={{ fontSize: '0.9rem' }}>{Math.round(progress)}%</span>
                </div>

                {/* Step 1: Contact Info */}
                {currentStep === 1 && (
                    <div>
                        <h5 style={{ marginTop: '20px' }}>Contact info</h5>
                        <div className="d-flex align-items-center mb-3">
                            <img
                                src="../src/assets/berns.jpg"
                                alt="Profile"
                                className="rounded-circle me-2"
                                style={{ width: '80px', height: '80px' }}
                            />
                            <div>
                                <strong>ARENDAYEN, Ajhay R.</strong>
                                <p className="mb-0" style={{ fontSize: '1rem' }}>
                                    Student at University of Caloocan City
                                </p>
                                <p className="mb-0" style={{ fontSize: '0.9rem', color: 'gray' }}>
                                    Caloocan City, National Capital Region, Philippines
                                </p>
                            </div>
                        </div>
                        <Form>
                            <Form.Group className="mb-3" controlId="email">
                                <Form.Label>Email address*</Form.Label>
                                <Form.Control type="email" placeholder="ajhayarendayen@gmail.com" />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="phoneCountryCode">
                                <Form.Label>Phone country code*</Form.Label>
                                <Form.Select>
                                    <option>Philippines (+63)</option>
                                </Form.Select>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="mobilePhoneNumber">
                                <Form.Label>Mobile phone number*</Form.Label>
                                <Form.Control type="text" placeholder="Enter your mobile number" />
                            </Form.Group>
                            <p className="text-muted" style={{ fontSize: '0.9rem' }}>
                                Submitting this application won't change your JobSync profile.
                                <br />
                                Application powered by JobSync |{' '}
                                <a href="#" style={{ color: '#0073b1' }}>Help Center</a>
                            </p>
                        </Form>
                    </div>
                )}

                {/* Step 2: Additional Questions */}
                {currentStep === 2 && (
                    <div>
                        <h5 style={{ marginTop: '20px' }}>Additional Questions</h5>
                        <p style={{ marginTop: '20px' }}>Do you prefer to be contacted?</p>
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
                                            width: '30px',
                                            height: '30px',
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
                        <p>What is your preferred method of contact?</p>
                        <div className="d-flex flex-column justify-content-start mb-4">
                            {['Email', 'Phone', 'Both'].map((option, index) => (
                                <div
                                    key={index}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        marginBottom: '10px',
                                        cursor: 'pointer',
                                    }}
                                    onClick={() => handlePreferredContact(option)}
                                >
                                    <div
                                        className="circle-option"
                                        style={{
                                            width: '30px',
                                            height: '30px',
                                            borderRadius: '50%',
                                            border: '2px solid #0073b1',
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            backgroundColor: preferredContact === option ? '#0073b1' : 'white',
                                            color: preferredContact === option ? 'white' : '#0073b1',
                                            fontSize: '1.2rem',
                                        }}
                                    >
                                        {preferredContact === option ? '✓' : ''}
                                    </div>
                                    <span style={{ marginLeft: '10px', fontSize: '1rem' }}>
                                        {option}
                                    </span>
                                </div>
                            ))}
                            <p className="text-muted mt-3" style={{ fontSize: '0.9rem' }}>
                                Submitting this application won't change your JobSync profile.
                                <br />
                                Application powered by JobSync |{' '}
                                <a href="#" style={{ color: '#0073b1' }}>Help Center</a>
                            </p>
                        </div>
                    </div>
                )}

                {/* Step 3: Resume Upload and Cover Letter */}
{currentStep === 3 && (
    <div>
        <h5 style={{ marginTop: '20px' }}>Upload Resume & Cover Letter</h5>

        <Form>
    {/* Resume Dropdown */}
    <Form.Group className="mb-3" controlId="resumeSelect">
        <Form.Label>Select Resume</Form.Label>
        <Form.Control 
            as="select"
            onChange={handleResumeSelect}
        >
            <option value="">Select a resume</option>
            <option value="resume1.pdf">Resume 1</option>
            <option value="resume2.pdf">Resume 2</option>
            <option value="resume3.pdf">Resume 3</option>
        </Form.Control>
    </Form.Group>



            {/* Cover Letter */}
            <Form.Group className="mb-3" controlId="coverLetter">
                <Form.Label>Cover Letter</Form.Label>
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

                        <h5 style={{ marginTop: '10px' , marginBottom: '15px' }}>Contact Information</h5>
                        <div className="d-flex align-items-center mb-3">
                            <img
                                src="../src/assets/berns.jpg"
                                alt="Profile"
                                className="rounded-circle me-2"
                                style={{ width: '80px', height: '80px' }}
                            />
                            <div>
                                <strong>ARENDAYEN, Ajhay R.</strong>
                                <p className="mb-0" style={{ fontSize: '1rem' }}>
                                    Student at University of Caloocan City
                                </p>
                                <p className="mb-0" style={{ fontSize: '0.9rem', color: 'gray' }}>
                                    Caloocan City, National Capital Region, Philippines
                                </p>
                            </div>
                        </div>
                        <Form>
                            <Form.Group className="mb-3" controlId="email">
                                <Form.Label>Email address*</Form.Label>
                                <Form.Control type="email" placeholder="ajhayarendayen@gmail.com" />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="phoneCountryCode">
                                <Form.Label>Phone country code*</Form.Label>
                                <Form.Select>
                                    <option>Philippines (+63)</option>
                                </Form.Select>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="mobilePhoneNumber">
                                <Form.Label>Mobile phone number*</Form.Label>
                                <Form.Control type="text" placeholder="Enter your mobile number" />
                            </Form.Group>

                            <hr className="my-4" />

                            <Form.Group className="mb-3" controlId="resumeSelect">
    <Form.Label>Choose Uploaded Resume</Form.Label>
    <Form.Control 
        type="text" 
        placeholder="Enter resume file name (e.g., resume1.pdf)" 
        value={selectedResume} 
        onChange={handleResumeChange} 
    />
</Form.Group>

                        </Form>

                        <hr className="my-4" />
                        
                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <h5>Additional Questions</h5>
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
                        <p style={{ color:"black" , marginTop: '-20px'}}>Yes</p>

                        <hr className="my-4" />

                        {/* Follow JobSync Checkbox */}
                        <Form.Check 
                            type="checkbox" 
                            label="Follow JobSync to stay updated with their page"
                            checked={isChecked} 
                            onChange={() => setIsChecked(!isChecked)} 
                            className="mt-3"
                        />
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
            <Modal.Footer>
                {currentStep > 1 && (
                    <Button variant="secondary" onClick={handleBack}>
                        Back
                    </Button>
                )}
                <Button variant="primary" onClick={handleNext}>
                    {currentStep === 4 ? 'Submit' : 'Next'}
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ApplyModal;
