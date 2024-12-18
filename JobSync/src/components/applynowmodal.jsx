import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, ProgressBar } from 'react-bootstrap';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; 
import Swal from 'sweetalert2';
import { postToEndpoint } from '../components/apiService';

const ApplyModal = ({ show, handleClose, applicant_id, job_id, jobTitle, companyName }) => {
    const [currentStep, setCurrentStep] = useState(1);
    const [progress, setProgress] = useState(0); 
    const [coverLetter, setCoverLetter] = useState('');
    const [ApplicantProfile, setApplicantProfile] = useState([]);
    const [resume, setResume] = useState([]);
    const [selectedResume, setSelectedResume] = useState('');
    const [isStep2Valid, setIsStep2Valid] = useState(false); 
    const [isStep3Valid, setIsStep3Valid] = useState(false);
    const [screeningQuestions, setScreeningQuestions] = useState([]);
    const [selectedOption, setSelectedOption] = useState({}); 
    const [loading, setLoading] = useState(false);

    const resetApplicationData = () => {
        setCurrentStep(1); 
        setSelectedResume('');
        setCoverLetter('');
        setSelectedOption({});
        setProgress(0); 
    };
    const handleModalClose = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You have unsaved changes. All progress will be lost if you close the application.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, close it!',
            cancelButtonText: 'Cancel',
            reverseButtons: true,
        }).then((result) => {
            if (result.isConfirmed) {
                resetApplicationData();
                handleClose(); 
            }
        });
    };
    
    const handleEditStep = (targetStep) => {
        const stepsCount = 4; 
        const stepProgress = 100 / (stepsCount - 1); 
        const newProgress = stepProgress * (targetStep - 1);
    
        setCurrentStep(targetStep);
        setProgress(newProgress);
    };
    const handleNext = () => {
        if (currentStep === 2 && !isStep2Valid) return; 
        if (currentStep === 3 && !isStep3Valid) return; 

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
    const handleCoverLetterChange = (value) => {
        setCoverLetter(value);
    };
    const handleResumeSelect = (e) => {
        setSelectedResume(e.target.value);
        setIsStep3Valid(!!e.target.value);
    };
    useEffect(() => {
        const fetchApplicantProfile = async () => {
            try {
                const response = await postToEndpoint('/getApplicantinfo.php', { applicant_id });
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

    useEffect(() => {
        const fetchResume = async () => {
            try {
                const response = await postToEndpoint('/getResume.php', { applicant_id });
                console.log(response.data);
    
                if (response.data && !response.data.error) {
                    setResume(response.data);
                } else {
                    console.error('Error in response:', response.data.error);
                }
            } catch (error) {
                console.error('Error fetching applicant profiles:', error);
            }
        };
    
        if (applicant_id) {
            fetchResume();
        }
    }, [applicant_id]); 

    useEffect(() => {
        const fetchScreeningQuestions = async () => {
            try {
                const response = await postToEndpoint('/getScreeningQuestion.php', { job_id });
                console.log('API Response:', response.data);
                if (response.data && Array.isArray(response.data) && response.data.length > 0) {
                    setScreeningQuestions(response.data);  
                } else {
                    console.error('No questions found or invalid response format');
                }
            } catch (error) {
                console.error('Error fetching screening questions:', error);
            }
        };
    
        if (job_id) {
            fetchScreeningQuestions();
        }
    }, [job_id]);
    
    const handleOptionSelect = (question_id, option) => {
        setSelectedOption((prevState) => {
            const updatedOptions = { ...prevState, [question_id]: option };
            
            const allAnswered = screeningQuestions.every(
                (question) => updatedOptions[question.question_id]
            );
            setIsStep2Valid(allAnswered); 
            return updatedOptions;
        });
    };
    
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
        const handleSubmit = async () => {
            const formData = new FormData();
            formData.append('applicant_id', applicant_id);
            formData.append('job_id', job_id);
            formData.append('coverLetter', coverLetter);
            formData.append('resume', selectedResume);
            formData.append('resume_name', resume.find((item) => item.resumePath === selectedResume)?.resumeName);
        
            Object.keys(selectedOption).forEach((questionId) => {
                formData.append(`screening_answer_${questionId}`, selectedOption[questionId]);
            });
        
            try {
                const response = await postToEndpoint('/applicationSubmission.php', formData, {
                    'Content-Type': 'multipart/form-data',
                });
        
                if (response.data.success) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Application Submitted',
                        text: 'Your application has been submitted successfully!',
                        confirmButtonText: 'OK',
                    }).then(() => {
                        resetApplicationData(); 
                        handleClose(); 
                        window.location.reload(); 
                    });
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Submission Failed',
                        text: response.data.message || 'There was an error submitting the application!',
                        confirmButtonText: 'OK',
                    }).then(() => {
                        resetApplicationData();
                        handleClose();
                    });
                }
            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'There was an error submitting the application!',
                    confirmButtonText: 'OK',
                });
            }
        };
        
    return (
        <>
        {loading && (
            <div id="preloader">
            </div>
        )}

        <Modal
        show={show}
        onHide={handleModalClose}
        aria-labelledby="contained-modal-title-vcenter"
        className="modal-lg"
        backdrop="static"
        >
            <Modal.Header closeButton style={{paddingLeft: '1.5rem', paddingRight: '1.5rem', fontSize: '16px'}}>
            <Modal.Title style={{paddingLeft: '10px'}}>Apply to {jobTitle}
                <p className='mb-0 mt-1'>at {companyName}</p>
            </Modal.Title>
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
                        <h5 style={{ marginTop: '20px' }}>Additional Questions</h5>
                        {Array.isArray(screeningQuestions) && screeningQuestions.length > 0 ? (
                            screeningQuestions.map((question) => (
                                <div key={question.question_id}>
                                    <p style={{ marginTop: '20px', color: '#4f4f4f', fontSize: '16px', fontWeight: '500' }}>
                                        {question.question}
                                    </p>

                                    {question.response_type === 'numeric' ? (
                                        <div className="d-flex flex-row justify-content-start mb-4">
                                            <input
                                                type="number"
                                                placeholder="Enter a number"
                                                className='register1'
                                                value={selectedOption[question.question_id] || ''}
                                                onChange={(e) => {
                                                    const value = e.target.value;
                                                    if (value === '' || Number(value) >= 0) {
                                                        handleOptionSelect(question.question_id, value);
                                                    }
                                                }}
                                                min="0"
                                                style={{
                                                    width: '200px',
                                                    height: '42px',
                                                    padding: '10px',
                                                    border: '1px solid #ccc',
                                                }}
                                            />
                                        </div>
                                    ) : (
                                        <div className="d-flex flex-row justify-content-start mb-4">
                                            {['Yes', 'No'].map((option, index) => (
                                                <div
                                                    key={index}
                                                    style={{
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        marginBottom: '10px',
                                                        cursor: 'pointer',
                                                    }}
                                                >
                                                    <input
                                                        type="radio"
                                                        id={`${question.question_id}-${option}`}
                                                        name={`question-${question.question_id}`} 
                                                        value={option}
                                                        checked={selectedOption[question.question_id] === option}
                                                        onChange={() => handleOptionSelect(question.question_id, option)}
                                                        style={{ display: 'none' }}
                                                    />
                                                    <div
                                                        onClick={() => handleOptionSelect(question.question_id, option)} 
                                                        style={{
                                                            width: '25px',
                                                            height: '25px',
                                                            borderRadius: '50%',
                                                            border: selectedOption[question.question_id] === option ? '2px solid #156ad7' : '2px solid #ababab',
                                                            display: 'flex',
                                                            justifyContent: 'center',
                                                            alignItems: 'center',
                                                            backgroundColor: selectedOption[question.question_id] === option ? '#156ad7' : 'white',
                                                            color: selectedOption[question.question_id] === option ? 'white' : '#0073b1',
                                                            fontSize: '0.9rem',
                                                            marginRight: '10px',
                                                            cursor: 'pointer',
                                                        }}
                                                    >
                                                        {selectedOption[question.question_id] === option ? '✓' : ''}
                                                    </div>
                                                    <label
                                                        htmlFor={`${question.question_id}-${option}`}
                                                        style={{
                                                            fontSize: '1rem',
                                                            color: '#4f4f4f',
                                                            cursor: 'pointer',
                                                            marginRight: '40px',
                                                        }}
                                                    >
                                                        {option}
                                                    </label>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                    <hr />
                                </div>
                            ))
                        ) : (
                            <p>No screening questions available.</p>
                        )}
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
                                    className="register1"
                                    value={selectedResume}
                                    onChange={handleResumeSelect}
                                >
                                    <option value="" disabled>
                                        Select your resume
                                    </option>
                                    {resume.length > 0 ? (
                                        resume.map((resume, index) => (
                                            <option key={index} value={resume.resumePath}>
                                                {resume.resumeName} 
                                            </option>
                                        ))
                                    ) : (
                                        <option value="" disabled>
                                            No resumes found
                                        </option>
                                    )}
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

                        <div>
                            <strong>Email address</strong>
                            <p className="mb-3">{ApplicantProfile.email}</p>
                        </div>
                        <div>
                            <strong>City</strong>
                            <p className="mb-3">{ApplicantProfile.city}</p>
                        </div>
                        <div>
                            <strong>Phone number</strong>
                            <p className="mb-3">+63{ApplicantProfile.contact}</p>
                        </div>

                        <hr className="my-4 position-relative" />
                        <button 
                            className="btn btn-outline-secondary position-absolute" 
                            style={{  backgroundColor: 'transparent', color: '#0073b1', border: 'none',  right: '40px' }}
                            onClick={() => handleEditStep(3)}
                        >
                            Edit
                        </button>
                        <div className="mb-3">
                            {/* Uploaded Resume */}
                            <h6>Uploaded Resume</h6>
                            {selectedResume ? (
                                <>
                                <div className='d-flex flex-row justify-content-start'>
                                    <p className="text-muted mb-0">
                                        {resume.find((item) => item.resumePath === selectedResume)?.resumeName}.
                                    </p>
                                    <a
                                        href={`http://localhost/uploads/${selectedResume}`} 
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="btn btn-link"
                                        style={{ fontSize: '0.9rem', padding: '0', marginLeft: '10px', textDecoration: 'none' }}
                                    >
                                        View Resume
                                    </a>
                                </div>
                                </>
                            ) : (
                                <p className="text-muted">No resume selected</p>
                            )}
                            {/* Edit button */}
                        </div>
                        <hr className="my-4 position-relative" />
                        <button 
                            className="btn btn-outline-secondary position-absolute" 
                            style={{  backgroundColor: 'transparent', color: '#0073b1', border: 'none',  right: '40px' }}
                            onClick={() => handleEditStep(2)}
                        >
                            Edit
                        </button>
                    {/* Screening Questions */}
                        <h6>Screening Questions</h6>
                        {Array.isArray(screeningQuestions) && screeningQuestions.length > 0 ? (
                            screeningQuestions.map((question) => (
                                <div key={question.question_id} className="mb-3">
                                    <strong style={{fontWeight: '500'}}>{question.question}</strong>
                                    <p className="text-muted">{selectedOption[question.question_id] || "No answer provided"}</p>
                                </div>
                            ))
                        ) : (
                            <p>No screening questions were answered.</p>
                        )}
                            <hr className="my-4 position-relative" />
                            {/* Cover Letter */}
                            {coverLetter && (
                                <div>
                                    <button 
                                        className="btn btn-outline-secondary position-absolute" 
                                        style={{  backgroundColor: 'transparent', color: '#0073b1', border: 'none',  right: '40px' }}
                                        onClick={() => handleEditStep(3)}
                                    >
                                        Edit
                                    </button>
                                    <div className="mb-3">
                                        <h6>Cover Letter</h6>
                                        <div className="quill-preview">
                                            <div
                                                dangerouslySetInnerHTML={{ __html: coverLetter }}
                                                className="text-muted"
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}
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
                    <Button onClick={handleModalClose} style={{height: '40px', fontSize: '12px', borderRadius: '3px', width: '75px', color: '#156ad7', background: '#bce0ff', border: 'none', fontWeight: '700'}}>
                        Close
                    </Button>
                )}
                {currentStep < 4 ? (
                    <Button onClick={handleNext} disabled={
                        (currentStep === 2 && !isStep2Valid) ||
                        (currentStep === 3 && !isStep3Valid)
                    } style={{width: '120px', height: '40px', fontSize: '12px', borderRadius: '3px', background: '#156ad7', fontWeight: '500'}}>Next</Button>
                ) : (
                    <Button onClick={handleSubmit} style={{width: '120px', height: '40px', fontSize: '12px', borderRadius: '3px', background: '#156ad7', fontWeight: '500'}}>Submit</Button>
                )}
            </Modal.Footer>
        </Modal>
        </>
    );
};

export default ApplyModal;
