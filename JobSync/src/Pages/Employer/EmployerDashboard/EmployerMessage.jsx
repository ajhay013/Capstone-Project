import React, { useState } from 'react';

export default function Step1ScreeningQuestions() {
    const [qualifications, setQualifications] = useState([]);
    const [activeButton, setActiveButton] = useState(null);
    const [mustHaveChecked, setMustHaveChecked] = useState(false);
    const [filterOutChecked, setFilterOutChecked] = useState(true);
    const [screeningQuestions, setScreeningQuestions] = useState([
        {
            id: 1,
            jobFunction: "",
            idealAnswer: "",
            mustHave: false,
        },
    ]);

    const addQualification = (type) => {
        setQualifications([...qualifications, type]);
    };

    const handleButtonClick = (type) => {
        if (activeButton === type) {
            setActiveButton(null);
            setQualifications(qualifications.filter(qualification => qualification !== type));
        } else {
            setActiveButton(type);
            addQualification(type);
        }
    };

    const addScreeningQuestion = () => {
        setScreeningQuestions([
            ...screeningQuestions,
            {
                id: screeningQuestions.length + 1,
                jobFunction: "",
                idealAnswer: "",
                mustHave: false,
            },
        ]);
    };

    const handleScreeningChange = (id, field, value) => {
        setScreeningQuestions((prevQuestions) =>
            prevQuestions.map((question) =>
                question.id === id ? { ...question, [field]: value } : question
            )
        );
    };

    const buttonStyle = {
        padding: '10px',
        color: '#000',
        border: '2px solid black',
        borderRadius: '20px',
        cursor: 'pointer',
        width: '200px',
        backgroundColor: 'transparent',
        transition: 'background-color 0.3s, color 0.3s',
        height: '45px',
        textAlign: 'center',
    };

    const activeButtonStyle = {
        ...buttonStyle,
        backgroundColor: '#007bff',
        color: '#fff',
    };

    const checkboxStyle = {
        width: '20px',
        height: '20px',
        border: '2px solid #ccc',
        borderRadius: '4px',
        cursor: 'pointer',
        transition: 'background-color 0.3s',
        backgroundColor: 'transparent',
    };

    const checkboxCheckedStyle = {
        ...checkboxStyle,
        backgroundColor: 'green',
        borderColor: 'green',
    };

    return (
        <div>
            <h2 style={{ textAlign: 'left', marginTop: '55px' }}>Applicant Collection</h2>

            {/* Dropdown Field and Email Address Field */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '20px' }}>
                {/* Dropdown Field */}
                <div style={{ flex: 1 }}>
                    <label 
                        htmlFor="receiveOption" 
                        style={{ display: 'block', marginBottom: '8px', textAlign: 'left', marginLeft: '50px' }}
                    >
                        Receive Applicant by
                    </label>
                    <select
                        id="receiveOption"
                        style={{
                            display: 'block',
                            width: '50%',
                            padding: '8px',
                            border: '1px solid #ccc',
                            borderRadius: '4px',
                            backgroundColor: '#fff',
                            height: '40px',
                            marginLeft: '50px',
                            color: '#333', // Set text color for the dropdown
                        }}
                    >
                        <option value="yes">Email</option>
                        <option value="no">Text</option>
                        <option value="custom">Call</option>
                    </select>
                </div>

                {/* Email Address Field */}
                <div style={{ flex: 1 }}>
                    <label 
                        style={{ display: 'block', marginBottom: '8px', textAlign: 'left', marginLeft: '-200px' }}
                    >
                        Email Address*
                    </label>
                    <input
                        type="email"
                        placeholder="Enter Email Address"
                        style={{
                            display: 'block',
                            width: '120%',
                            padding: '8px',
                            border: '1px solid #ccc',
                            borderRadius: '4px',
                            backgroundColor: '#fff',
                            height: '40px',
                            marginLeft: '-200px',
                        }}
                    />
                </div>
            </div>

            

            {/* Add Screening Questions Section */}
            <div style={{ marginBottom: '40px' }}>
                <h3 style={{ textAlign: 'left', marginBottom: '20px' }}>Add Screening Questions</h3>
                <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
                    <button
                        onClick={() => handleButtonClick('Background Check')}
                        style={qualifications.includes('Background Check') ? activeButtonStyle : buttonStyle}
                    >
                        + Background Check
                    </button>
                    <button
                        onClick={() => handleButtonClick('Driver\'s License')}
                        style={qualifications.includes('Driver\'s License') ? activeButtonStyle : buttonStyle}
                    >
                        + Driver's License
                    </button>
                    <button
                        onClick={() => handleButtonClick('Drug Test')}
                        style={qualifications.includes('Drug Test') ? activeButtonStyle : buttonStyle}
                    >
                        + Drug Test
                    </button>
                    <button
                        onClick={() => handleButtonClick('Criminal Background Check')}
                        style={qualifications.includes('Criminal Background Check') ? activeButtonStyle : buttonStyle}
                    >
                        + Criminal Background
                    </button>
                    <button
                        onClick={() => handleButtonClick('Skills Test')}
                        style={qualifications.includes('Skills Test') ? activeButtonStyle : buttonStyle}
                    >
                        + Skills Test
                    </button>
                </div>
            </div>

            {/* Qualification Setting Section */}
            <div style={{ marginBottom: '40px', border: '1px solid #ddd', padding: '20px', borderRadius: '8px' }}>
                <h3 style={{ textAlign: 'left', marginBottom: '20px' }}>Qualification Setting</h3>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
                    <input
                        type="checkbox"
                        id="filterOut"
                        checked={filterOutChecked} // Make it controlled
                        onChange={(e) => setFilterOutChecked(e.target.checked)} // Handle state change
                        style={filterOutChecked ? checkboxCheckedStyle : checkboxStyle}
                    />
                    <label htmlFor="filterOut" style={{ marginLeft: '10px' }}>
                        Filter out and send rejections to applicants who don't meet any must-have qualifications.
                    </label>
                </div>
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
        </div>
    );
}
