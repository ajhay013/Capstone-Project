import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import EmployerSidebar from '../../../components/EmployerSidebar';
import { FaTimes , FaPlus } from 'react-icons/fa';
import { FaQuestionCircle } from 'react-icons/fa';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../../../AuthContext'; 
import Swal from 'sweetalert2';
import { useJobContext } from '../../../JobContext';
import { postToEndpoint } from '../../../components/apiService';

export default function Step1ScreeningQuestions({ questions = [], setQuestions = () => {} }) {
    const { user } = useAuth(); 
    const [disabledSections, setDisabledSections] = useState([]);
    const [qualificationMessage, setQualificationMessage] = useState('');
    const location = useLocation();
    const jobData = location.state; 
    const { resetJobData } = useJobContext();
    const navigate = useNavigate();
    const [localQuestions, setLocalQuestions] = useState([
        {
            id: 1,
            question: '',
            answerType: 'yesno',
            idealAnswer: 'Yes', 
            mustHave: false,
            isEdited: false,
        },
    ]);
    const [showQualificationSettings, setShowQualificationSettings] = useState(false);
    const [currentSection, setCurrentSection] = useState('');

    const addScreeningQuestion = () => {
        const newQuestion = {
            id: localQuestions.length + 1,
            question: '',
            answerType: 'yesno', 
            idealAnswer: 'Yes',
            mustHave: false,
            isEdited: false,
            section: currentSection, 
        };
    
        const updatedQuestions = [...localQuestions, newQuestion];
        setLocalQuestions(updatedQuestions);
        setQuestions(updatedQuestions);
    };
    
    const updateQuestion = (id, field, value) => {
        const updatedQuestions = localQuestions.map((q) =>
            q.id === id ? { ...q, [field]: value, isEdited: true } : q
        );
        setLocalQuestions(updatedQuestions);
        setQuestions(updatedQuestions);
    };


    const deleteQuestion = (id) => {
        const questionToDelete = localQuestions.find((q) => q.id === id);
    
        const updatedQuestions = localQuestions.filter((q) => q.id !== id);
        setLocalQuestions(updatedQuestions);
        setQuestions(updatedQuestions);
    
        if (questionToDelete) {
            const sectionToRestore = Object.keys(sectionQuestions).find(
                (section) => sectionQuestions[section].question === questionToDelete.question
            );
    
            if (sectionToRestore) {
                const hasOtherQuestionsInSection = updatedQuestions.some(
                    (q) => q.question === sectionQuestions[sectionToRestore].question
                );
    
                if (!hasOtherQuestionsInSection) {
                    setDisabledSections((prev) =>
                        prev.filter((section) => section !== sectionToRestore)
                    );
                }
            }
        }
    };
    const handleClick = (section) => {
        if (!disabledSections.includes(section)) {
            setCurrentSection(section);
    
            setDisabledSections((prevDisabledSections) => [...prevDisabledSections, section]);
    
            const newQuestion = {
                id: localQuestions.length + 1,
                question: sectionQuestions[section].question,
                answerType: 'yesno', 
                idealAnswer: 'Yes',
                mustHave: false,
                isEdited: false,
                section: section,
                isCustom: false,
            };
    
            const updatedQuestions = [...localQuestions, newQuestion];
            setLocalQuestions(updatedQuestions);
            setQuestions(updatedQuestions);
        }
    };
    
    const sectionQuestions = {
        education: {
            question: 'Have you completed any level of education?',
        },
        skills: {
            question: 'Do you possess any relevant skills for this job?',
        },
        experience: {
            question: 'Do you have relevant experience for this job?',
        },
        availability: {
            question: 'Are you available to start immediately?',
        },
        motivation: {
            question: 'Are you interested in applying for this position?',
        },
        location: {
            question: 'Are you located in the required area?',
        },
        workPreference: {
            question: 'Do you have a preference for a work environment?',
        },
        certifications: {
            question: 'Do you hold any relevant certifications?',
        },
        languages: {
            question: 'Do you speak any of the required languages fluently?',
        },
        salaryExpectation: {
            question: 'Does the offered salary range meet your expectations?',
        },
        travelWillingness: {
            question: 'Are you willing to travel for work?',
        },
        relocation: {
            question: 'Are you open to relocating for this job?',
        },
        reference: {
            question: 'Do you have professional references available?',
        },
        portfolio: {
            question: 'Do you have a portfolio or work samples to share?',
        },
        interviewAvailability: {
            question: 'Are you available for an interview?',
        },
        projectExperience: {
            question: 'Have you worked on relevant projects?',
        },
        teamExperience: {
            question: 'Have you worked in a team-based environment?',
        },
        leadershipExperience: {
            question: 'Do you have leadership experience?',
        },
        diversityAndInclusion: {
            question: 'Do you contribute to a diverse and inclusive work environment?',
        },
        workStyle: {
            question: 'Do you consider yourself to be detail-oriented?',
        },
    };
    const handlePostJob = async () => {
        try {
            const jobPostData = {
                jobData,
                employer_id: user.id,
                screeningQuestions: localQuestions,
                qualificationMessage,
            };
            const response = await postToEndpoint('/postJobs.php', jobPostData);
            if (response.data.success) {
                Swal.fire({
                    icon: 'success',
                    title: 'Job Saved!',
                    text: 'Your job was posted successfully.',
                    showCancelButton: true,
                    cancelButtonText: 'Close',
                    confirmButtonText: 'Go to My Jobs',
                    allowOutsideClick: false,
                    allowEscapeKey: false
                }).then((result) => {
                    if (result.isConfirmed) {
                        resetJobData();
                        navigate('/employer/myjobs');
                        setTimeout(() => {
                            window.scrollTo(0, 0);
                        }, 300);
                    } else {
                        resetJobData();
                        Swal.close();
                        navigate('/employer/postjob');
                        setTimeout(() => {
                            window.scrollTo(0, 0);
                        }, 300);
                    }
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Failed to post the job. Please try again.',
                    confirmButtonText: 'Okay',
                });
            }
        } catch (error) {
            console.error('Error posting job:', error);
            Swal.fire({
                icon: 'error',
                title: 'An error occurred',
                text: 'There was an issue posting the job. Please try again later.',
                confirmButtonText: 'Okay',
            });
        }
    };

    return (
        <div style={{ display: 'flex', minHeight: '100vh' }}>
            <div
                style={{
                    width: '20%',
                    minWidth: '250px',
                    backgroundColor: '#fff',
                    minHeight: '100vh',
                    marginLeft: '-14px',
                }}
            >
                <EmployerSidebar />
            </div>
            <div
                style={{
                    flex: 1,
                    padding: '20px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '20px',
                    minWidth: '800px',
                }}
            >
                <div
                    style={{
                        flex: 1,
                        padding: '40px',
                        paddingLeft: '0',
                        paddingRight: '0',
                        minWidth: '867px',
                        margin: '0 auto',
                        textAlign: 'left',
                        marginLeft: '20px',
                    }}
                >
                   <h2 style={{fontSize: '24px', fontWeight: '600', marginTop: '5px' }}>
                      Add Screening Questions
                   </h2>
                   <p style={{ marginTop: '0', fontSize: '16px', color: 'gray'}}>
                    We recommend adding 3 or more questions. Applicants must answer each question.
                   </p>

                    <div>
                        {localQuestions.map((q, index) => (
                            <div
                                key={`${q.id}-${index}`} 
                                style={{
                                    border: '1px solid #ddd',
                                    padding: '45px',
                                    borderRadius: '8px',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '20px',
                                    marginTop: '20px',
                                    backgroundColor: '#fff',
                                    position: 'relative',
                                    boxShadow: 'rgba(0, 0, 0, 0.15) 0px 2px 8px',
                                }}
                            >
                                <button
                                    onClick={() => deleteQuestion(q.id)}
                                    style={{
                                        position: 'absolute',
                                        top: '0',
                                        right: '0',
                                        backgroundColor: 'transparent',
                                        border: 'none',
                                        color: 'red',
                                        fontSize: '20px',
                                        cursor: 'pointer',
                                    }}
                                >
                                    <FaTimes />
                                </button>

                                <input
                                    type="text"
                                    placeholder="Type your question here"
                                    className='register1'
                                    value={q.question}
                                    onChange={(e) => updateQuestion(q.id, 'question', e.target.value)}
                                    style={{
                                        width: '100%',
                                        padding: '12px',
                                        border: '1px solid #ccc',
                                        backgroundColor: '#fff',
                                        color: '#333',
                                        fontSize: '14px',
                                    }}
                                />
                                <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                                    {q.isCustom !== false && <small style={{ marginRight: '47px' }}>Response Type</small>}

                                    {(q.answerType === 'yesno' || q.answerType === 'numeric') && <small>Ideal answer</small>}
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                                    {q.isCustom !== false && (
                                        <select
                                            value={q.answerType}
                                            onChange={(e) => updateQuestion(q.id, 'answerType', e.target.value)}
                                            style={{
                                                padding: '10px',
                                                border: '1px solid #ccc',
                                                borderRadius: '4px',
                                                backgroundColor: '#fff',
                                                color: '#333',
                                                fontSize: '14px',
                                                appearance: 'auto',
                                            }}
                                        >
                                            <option disabled value="">Response Type</option>
                                            <option value="yesno">Yes/No</option>
                                            <option value="numeric">Numeric</option>
                                        </select>
                                    )}
                                    {q.answerType === 'yesno' && (
                                        <>
                                        <div style={{ flex: '1 0 200px' }}>
                                        <select
                                            value={q.idealAnswer}
                                            onChange={(e) => updateQuestion(q.id, 'idealAnswer', e.target.value)}
                                            style={{
                                                width: '100%',
                                                padding: '10px',
                                                border: q.isCustom === false ? 'none' : '1px solid #ccc', 
                                                borderRadius: '4px',
                                                backgroundColor: q.isCustom === false ? 'transparent' : '#fff', 
                                                color:'#333', 
                                                fontSize: '14px',
                                                appearance: q.isCustom === false ? 'none' : 'auto', 
                                            }}
                                            disabled={q.isCustom === false} 
                                        >
                                                <option disabled value="">Select Ideal Answer</option>
                                                <option value="Yes">Yes</option>
                                                <option value="No">No</option>
                                            </select>
                                        </div>
                                        </>
                                    )}

                                    {q.answerType === 'numeric' && (
                                        <div style={{ flex: '1 0 200px' }}>
                                            <input
                                                type="number"
                                                value={q.idealAnswer}
                                                onChange={(e) => {
                                                    const value = parseInt(e.target.value, 10);
                                                    if (value >= 0 || e.target.value === "") {
                                                        updateQuestion(q.id, 'idealAnswer', e.target.value);
                                                    }
                                                }}
                                                placeholder="Type ideal numeric answer"
                                                style={{
                                                    width: '100%',
                                                    padding: '10px',
                                                    border: q.isCustom === false ? 'none' : '1px solid #ccc',
                                                    borderRadius: '4px',
                                                    backgroundColor: q.isCustom === false ? '#f0f0f0' : '#fff',
                                                    color: q.isCustom === false ? '#ccc' : '#333',
                                                    fontSize: '14px',
                                                }}
                                                disabled={q.isCustom === false}
                                                min="0"
                                            />
                                        </div>
                                    )}
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <input
                                            type="checkbox"
                                            style={{width: '20px', height: '20px'}}
                                            checked={q.mustHave}
                                            onChange={(e) => updateQuestion(q.id, 'mustHave', e.target.checked)}
                                        />
                                        <label>Must-Have Qualification</label>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', width: '100%', marginTop: '20px' }}>
                        <button
                            onClick={addScreeningQuestion}
                            style={{
                                padding: '12px 24px',
                                border: 'none',
                                borderRadius: '4px',
                                backgroundColor: '#28a745',
                                color: '#fff',
                                cursor: 'pointer',
                                fontSize: '14px',
                            }}
                        >
                             <FaPlus style={{ marginRight: '8px' }} />
                            Custom Screening Question
                        </button>
                    </div>

                    <div style={{ textAlign: 'left', marginBottom: '20px' }}>
                    <h2 style={{ fontSize: '18px', fontWeight: '600', color: '#333' , marginTop: '30px' }}>Add Screening Questions</h2>
                </div>
                    <div
                        style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', 
                            gap: '20px',
                            marginTop: '25px',
                            
                        }}
                    >
                    {Object.keys(sectionQuestions).map((section, index) => (
                        <div
                            key={`${section}-${index}`}
                            onClick={() => handleClick(section)}
                            style={{
                                padding: '15px',
                                backgroundColor: '#f8f9fa',
                                borderRadius: '20px',
                                cursor: disabledSections.includes(section) ? 'not-allowed' : 'pointer',
                                border: '1px solid #ddd',
                                textAlign: 'center',
                                height: '25px',
                                width: 'auto',
                                minWidth: '150px',
                                minHeight: '45px',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'center',
                                boxShadow: 'rgba(0, 0, 0, 0.15) 0px 2px 8px',
                                opacity: disabledSections.includes(section) ? 0.5 : 1,
                            }}
                        >
                            <h3
                                style={{
                                    fontSize: '13px',
                                    marginTop: '5px',
                                    fontWeight: '600',
                                    color: '#333',
                                    wordWrap: 'break-word',
                                    whiteSpace: 'normal',
                                    textAlign: 'center',
                                }}
                            >
                                {section.charAt(0).toUpperCase() + section.slice(1)}
                            </h3>
                        </div>
                    ))}

                    </div>

                    <div style={{ marginTop: '30px' }}>
                        <label style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <input
                                type="checkbox"
                                checked={showQualificationSettings}
                                onChange={(e) => setShowQualificationSettings(e.target.checked)}
                                style={{ width: '20px', height: '20px' }}
                            />
                            Filter out and send rejections to applicants who don't meet any must-have qualifications.
                            <FaQuestionCircle style={{ color: 'gray'}} />
                        </label>
                    </div>

                    {showQualificationSettings && (
                        <div style={{ marginTop: '30px', border: '1px solid #ddd', padding: '20px', borderRadius: '8px', width: '100%', boxShadow: 'rgba(0, 0, 0, 0.15) 0px 2px 8px', }}>
                            <h3 style={{ marginBottom: '10px' }}>Qualification Setting</h3>
                            <textarea
                                placeholder="Thank you for your interest in..."
                                value={qualificationMessage}
                                onChange={(e) => setQualificationMessage(e.target.value)}
                                rows="4"
                                style={{
                                    width: '100%',
                                    padding: '10px',
                                    border: '1px solid #ccc',
                                    borderRadius: '4px',
                                    backgroundColor: '#fff',
                                }}
                            />
                        </div>
                    )}

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' , marginTop: '40px'}}>
                    <button
                        onClick={() => {
                            window.history.back();
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        style={{
                            width: '150px',
                            padding: '11px',
                            color: '#000000',
                            background: 'transparent',
                            borderColor: '#b9b9b9',
                        }}
                    >
                        Back
                    </button>
                    <button
                        className="btn btn-primary"
                        style={{width: '150px', padding: '11px'}}
                        onClick={handlePostJob}
                    >
                        Post Job
                    </button>
                </div>
            </div>
        </div>
        </div>
    );
}
