import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import EmployerSidebar from '../../../components/EmployerSidebar';
import { FaTimes , FaPlus } from 'react-icons/fa';
import { FaQuestionCircle } from 'react-icons/fa';
import HiringNotification from '../../../components/hiringnotification';

export default function Step1ScreeningQuestions({ questions = [], setQuestions = () => {} }) {
    const [disabledSections, setDisabledSections] = useState([]);
    const navigate = useNavigate();
    const [localQuestions, setLocalQuestions] = useState([
        { id: 1, question: '', answer: '', idealAnswer: '', mustHave: false, isEdited: false },
    ]);
    const [showQualificationSettings, setShowQualificationSettings] = useState(false);
    const [currentSection, setCurrentSection] = useState('');

    const addScreeningQuestion = () => {
        const newQuestion = {
            id: localQuestions.length + 1,
            question: '',
            answer: '',
            idealAnswer: '',
            mustHave: false,
            isEdited: false,
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
        const updatedQuestions = localQuestions.filter((q) => q.id !== id);
        setLocalQuestions(updatedQuestions);
        setQuestions(updatedQuestions);

        // Check if the section still has questions after deletion
        const sectionsWithQuestions = new Set(updatedQuestions.map((q) => q.section));
        const newDisabledSections = disabledSections.filter((section) =>
            sectionsWithQuestions.has(section)
        );

        setDisabledSections(newDisabledSections);
    };

    const sectionQuestions = {
        education: {
            question: 'Have you completed any level of education?',
            options: ['Yes', 'No'],
            
        },
        skills: {
            question: 'Do you possess any relevant skills for this job?',
            options: ['Yes', 'No'],
        },
        experience: {
            question: 'Do you have relevant experience for this job?',
            options: ['Yes', 'No'],
        },
        availability: {
            question: 'Are you available to start immediately?',
            options: ['Yes', 'No'],
        },
        motivation: {
            question: 'Are you interested in applying for this position?',
            options: ['Yes', 'No'],
        },
        location: {
            question: 'Are you located in the required area?',
            options: ['Yes', 'No'],
        },
        workPreference: {
            question: 'Do you have a preference for a work environment?',
            options: ['Yes', 'No'],
        },
        certifications: {
            question: 'Do you hold any relevant certifications?',
            options: ['Yes', 'No'],
        },
        languages: {
            question: 'Do you speak any of the required languages fluently?',
            options: ['Yes', 'No'],
        },
        salaryExpectation: {
            question: 'Does the offered salary range meet your expectations?',
            options: ['Yes', 'No'],
        },
        travelWillingness: {
            question: 'Are you willing to travel for work?',
            options: ['Yes', 'No'],
        },
        relocation: {
            question: 'Are you open to relocating for this job?',
            options: ['Yes', 'No'],
        },
        reference: {
            question: 'Do you have professional references available?',
            options: ['Yes', 'No'],
        },
        portfolio: {
            question: 'Do you have a portfolio or work samples to share?',
            options: ['Yes', 'No'],
        },
        availabilityForInterview: {
            question: 'Are you available for an interview?',
            options: ['Yes', 'No'],
        },
        projectExperience: {
            question: 'Have you worked on relevant projects?',
            options: ['Yes', 'No'],
        },
        teamExperience: {
            question: 'Have you worked in a team-based environment?',
            options: ['Yes', 'No'],
        },
        leadershipExperience: {
            question: 'Do you have leadership experience?',
            options: ['Yes', 'No'],
        },
        diversityAndInclusion: {
            question: 'Do you contribute to a diverse and inclusive work environment?',
            options: ['Yes', 'No'],
        },
        workStyle: {
            question: 'Do you consider yourself to be detail-oriented?',
            options: ['Yes', 'No'],
        },
    };
    
    
    


    const handleClick = (section) => {
        if (!disabledSections.includes(section)) {
            handleSectionClick(section);
            setDisabledSections((prev) => [...prev, section]);
        }
    };
    
    const handleSectionClick = (section) => {
        if (!disabledSections.includes(section)) {
            setCurrentSection(section);
            const newQuestion = {
                id: localQuestions.length + 1,
                question: sectionQuestions[section].question,
                answer: '',
                idealAnswer: '',
                mustHave: false,
                isEdited: false,
            };
    
            const updatedQuestions = [...localQuestions, newQuestion];
            setLocalQuestions(updatedQuestions);
            setQuestions(updatedQuestions);
        }
    };
    


    return (
        <div style={{ display: 'flex', minHeight: '100vh' }}>
            <div
                style={{
                    width: '20%',
                    minWidth: '250px',
                    backgroundColor: '#fff',
                    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
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
                    minWidth: '700px',
                }}
            >
             

                <div
                    style={{
                        flex: 1,
                        padding: '40px 60px',
                        maxWidth: '1500px',
                        margin: '0 auto',
                        textAlign: 'left',
                    }}
                >
                   <h2 style={{fontSize: '24px', fontWeight: '600', marginLeft: '-30px' , marginTop: '5px' }}>
                      Add Screening Questions
                   </h2>
                   <p style={{ marginTop: '0', fontSize: '16px', color: 'gray', marginLeft: '-30px' }}>
                      Write custom screening questions
                   </p>


                    <div>
                        {localQuestions.map((q) => (
                            <div
                                key={q.id}
                                style={{
                                    border: '1px solid #ddd',
                                    padding: '45px',
                                    borderRadius: '8px',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '20px',
                                    marginTop: '20px',
                                    width: '120%',
                                    backgroundColor: '#fff',
                                    position: 'relative',
                                    marginLeft: '-30px',
                                    boxShadow: 'rgba(0, 0, 0, 0.15) 0px 2px 8px', 
                                }}
                            >
                                {/* Delete Button */}
                                <button
                                    onClick={() => deleteQuestion(q.id)}
                                    style={{
                                        position: 'absolute',
                                        top: '-15px',
                                        right: '10px',
                                        backgroundColor: 'transparent',
                                        border: 'none',
                                        color: 'red',
                                        fontSize: '25px',
                                        cursor: 'pointer',
                                        marginRight: '-30px',
                                    }}
                                >
                                    <FaTimes />
                                </button>

                                <input
                                    type="text"
                                    placeholder="Type your question here"
                                    value={q.question}
                                    onChange={(e) => updateQuestion(q.id, 'question', e.target.value)}
                                    style={{
                                        width: '100%',
                                        padding: '12px',
                                        border: '1px solid #ccc',
                                        borderRadius: '4px',
                                        backgroundColor: '#fff',
                                        color: '#333',
                                        fontSize: '14px',
                                    }}
                                />

                                <div
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '20px',
                                    }}
                                >
                                    {/* Dynamic Answer Dropdown */}
                                    <select
                                        value={q.answer}
                                        onChange={(e) => updateQuestion(q.id, 'answer', e.target.value)}
                                        style={{
                                            padding: '10px',
                                            border: '1px solid #ccc',
                                            borderRadius: '4px',
                                            backgroundColor: '#fff',
                                            flex: '1',
                                            color: '#333',
                                            fontSize: '14px',
                                        }}
                                    >
                                        <option value="">Select Answer</option>
                                        {currentSection && sectionQuestions[currentSection].options.map((opt, index) => (
                                            <option key={index} value={opt}>{opt}</option>
                                        ))}
                                    </select>

                                    {/* Dynamic Ideal Answer Dropdown */}
                                    <select
                                        value={q.idealAnswer}
                                        onChange={(e) => updateQuestion(q.id, 'idealAnswer', e.target.value)}
                                        style={{
                                            width: '40%',
                                            padding: '10px',
                                            border: '1px solid #ccc',
                                            borderRadius: '4px',
                                            backgroundColor: '#fff',
                                            color: '#333',
                                            fontSize: '14px',
                                        }}
                                    >
                                        <option value="">Select Ideal Answer</option>
                                        {currentSection && sectionQuestions[currentSection].options.map((opt, index) => (
                                            <option key={index} value={opt}>{opt}</option>
                                        ))}
                                    </select>

                                    <label
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '8px',
                                        }}
                                    >
                                        <input
                                            type="checkbox"
                                            checked={q.mustHave}
                                            onChange={(e) =>
                                                updateQuestion(q.id, 'mustHave', e.target.checked)
                                            }
                                        />
                                        Must-Have Qualification
                                    </label>
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
                                marginRight: '-130px',
                            }}
                        >
                             <FaPlus style={{ marginRight: '8px' }} />
                            Custom Screening Question
                        </button>
                    </div>

                    <div style={{ textAlign: 'left', marginBottom: '20px' }}>
    <h2 style={{ fontSize: '18px', fontWeight: '600', color: '#333' , marginTop: '30px' }}>Add Screening Questions</h2>
</div>

                    {/* Section Containers */}
                    <div
            style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', 
                gap: '20px',
                marginTop: '25px',
                
            }}
        >
            {Object.keys(sectionQuestions).map((section) => (
                <div
                    key={section}
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
                            fontSize: '15px',
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

                    {/* Checkbox Section */}
                    <div style={{ marginTop: '30px' }}>
                        <label style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <input
                                type="checkbox"
                                checked={showQualificationSettings}
                                onChange={(e) => setShowQualificationSettings(e.target.checked)}
                                style={{ width: '20px', height: '20px', marginLeft: '-20px' }}
                            />
                            Filter out and send rejections to applicants who don't meet any must-have qualifications.
                            <FaQuestionCircle style={{ color: 'gray'}} />
                        </label>
                    </div>

                    {/* Qualification Settings */}
                    {showQualificationSettings && (
                        <div
                            style={{
                                marginTop: '30px',
                                border: '1px solid #ddd',
                                padding: '20px',
                                borderRadius: '8px',
                                width: '110%',
                                marginLeft: '-30px',
                                boxShadow: 'rgba(0, 0, 0, 0.15) 0px 2px 8px', 
                            }}
                        >
                            <h3 style={{ marginBottom: '10px' }}>Qualification Setting</h3>
                            <textarea
                                placeholder="Thank you for your interest in..."
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
                      {/* Hiring Notification */}
                        <HiringNotification />
            

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' , marginTop: '40px'}}>
                    <button
                        onClick={() => window.history.back()}
                        style={{
                            padding: '10px 20px',
                            border: '1px solid black',
                            borderRadius: '4px',
                            backgroundColor: '#fff',
                            color: '#000',
                            cursor: 'pointer',
                        }}
                    >
                        Back
                    </button>
                    <button
                        onClick={() => navigate('')}
                        style={{
                            padding: '10px 20px',
                            border: 'none',
                            borderRadius: '4px',
                            backgroundColor: '#007bff',
                            color: '#fff',
                            cursor: 'pointer',
                        }}
                    >
                        Post Job
                    </button>
                </div>
            </div>
        </div>
        </div>
    );
}
