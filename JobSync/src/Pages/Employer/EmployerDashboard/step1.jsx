import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import EmployerSidebar from '../../../components/EmployerSidebar';

export default function Step1ScreeningQuestions() {
    const [questions, setQuestions] = useState([]);
    const navigate = useNavigate(); // Initialize useNavigate

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
                    marginLeft: '-235px',
                }}
            >
                <EmployerSidebar />
            </div>

            {/* Main Content */}
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
                <h2 style={{ marginBottom: '20px', marginTop: '45px', textAlign: 'left' }}>Applicant Collection</h2>

                {/* Email Address Field */}
                <div style={{ marginBottom: '20px' }}>
                    <label
                        htmlFor="email"
                        style={{ display: 'block', marginBottom: '8px', textAlign: 'left' }}
                    >
                        Email Address*
                    </label>
                    <input
                        type="email"
                        id="email"
                        placeholder="Enter Email Address"
                        style={{
                            display: 'block',
                            width: '100%',
                            padding: '8px',
                            border: '1px solid #ccc',
                            borderRadius: '4px',
                            height: '40px',
                            backgroundColor: '#fff',
                        }}
                    />
                </div>

                {/* Qualification Setting Section */}
                <div
                    style={{
                        marginBottom: '20px',
                        border: '1px solid #ddd',
                        padding: '20px',
                        borderRadius: '8px',
                    }}
                >
                    <h3 style={{ textAlign: 'left', marginBottom: '20px' }}>Qualification Setting</h3>
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

                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
                    <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
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
                                backgroundColor: '#007bff', // Blue background
                                color: '#fff', // White text color
                                cursor: 'pointer',
                                fontSize: '16px',
                            }}
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
