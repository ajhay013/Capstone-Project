import React, { useState } from 'react';
import EmployerSidebar from '../../../components/EmployerSidebar';
import { FaTimes } from 'react-icons/fa'; // Import the FaTimes icon from React Icons

export default function Step2ScreeningQuestions({ questions = [], setQuestions = () => {} }) {
    const [localQuestions, setLocalQuestions] = useState([
        { id: 1, question: '', answer: '', idealAnswer: '', mustHave: false, isEdited: false },
    ]); // Added isEdited to track if the question has been edited

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
    };

    const handlePostJob = () => {
        // Logic to post the job
        console.log('Job posted with questions:', localQuestions);
        // Navigate or perform further actions
    };

    return (
        <div style={{ display: 'flex', minHeight: '100vh' }}>
            {/* Sidebar */}
            <div
                style={{
                    width: '20%',
                    minWidth: '250px',
                    backgroundColor: '#fff',
                    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
                    minHeight: '100vh',
                    marginLeft: '-200px',
                }}
            >
                <EmployerSidebar />
            </div>

            {/* Main Content */}
            <div
                style={{
                    flex: 1,
                    padding: '40px 60px',
                    maxWidth: '1500px',
                    margin: '0 auto',
                }}
            >
                {/* Header */}
                <h2 style={{ marginBottom: '20px', fontSize: '24px', fontWeight: '600' }}>
                    Add Screening Questions
                </h2>

                {/* Screening Questions */}
                <div>
                    {/* Screening Questions */}
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

                            {/* Question Field */}
                            <input
                                type="text"
                                placeholder="Type your question here"
                                value={q.question}
                                onChange={(e) =>
                                    updateQuestion(q.id, 'question', e.target.value)
                                }
                                onBlur={(e) => {
                                    if (e.target.value.trim() !== '') {
                                        updateQuestion(q.id, 'isEdited', true);
                                    }
                                }}
                                style={{
                                    width: '100%',
                                    padding: '12px',
                                    border: q.isEdited ? 'none' : '1px solid #ccc', 
                                    borderRadius: '4px',
                                    backgroundColor: '#fff',
                                    color: '#333',
                                    fontSize: '14px',
                                    marginTop: '-20px',
                                    marginBottom: '20px',
                                }}
                            />

                            {/* Answer Fields */}
                            <div
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '20px',
                                }}
                            >
                                {/* Answer Dropdown */}
                                <select
                                    value={q.answer}
                                    onChange={(e) =>
                                        updateQuestion(q.id, 'answer', e.target.value)
                                    }
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
                                    <option value="Yes">Yes</option>
                                    <option value="No">No</option>
                                </select>

                                {/* Ideal Answer Dropdown */}
                                <select
                                    value={q.idealAnswer}
                                    onChange={(e) =>
                                        updateQuestion(q.id, 'idealAnswer', e.target.value)
                                    }
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
                                    <option value="Yes">Yes</option>
                                    <option value="No">No</option>
                                </select>

                                {/* Must-Have Checkbox */}
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

                {/* Add Screening Question Button (Aligned to the right) */}
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
                    <button
                        onClick={addScreeningQuestion}
                        style={{
                            padding: '12px 24px',
                            border: 'none',
                            borderRadius: '4px',
                            backgroundColor: '#28a745',
                            color: '#fff',
                            cursor: 'pointer',
                            fontSize: '16px',
                            marginRight: '-130px',
                        }}
                        onMouseEnter={(e) => (e.target.style.backgroundColor = '#218838')}
                        onMouseLeave={(e) => (e.target.style.backgroundColor = '#28a745')}
                    >
                        Add Screening Question
                    </button>
                </div>

                 {/* Back Button */}
    <button
        onClick={() => window.history.back()}
        style={{
            padding: '10px 20px',
            border: '1px solid black',
            borderRadius: '4px',
            backgroundColor: '#fff',
            color: '#000',
            cursor: 'pointer',
            fontSize: '16px',
            marginRight: '10px',
        }}
    >
        Back
    </button>

    {/* Next Button */}
    <button
        onClick={() => navigate('/step2')}
        style={{
            padding: '10px 20px',
            border: 'none',
            borderRadius: '4px',
            backgroundColor: '#007bff',
            color: '#fff',
            cursor: 'pointer',
            fontSize: '16px',
        }}
    >
        Post Job
    </button>
                </div>
            </div>
 
    );
}
