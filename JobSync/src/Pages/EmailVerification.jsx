import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

function EmailVerification() {
    const location = useLocation();
    const navigate = useNavigate();
    const { email } = location.state || {};

    if (!email) {
        return <div>Error: Email not provided!</div>;
    }

    const [verificationCode, setVerificationCode] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleVerify = (event) => {
        event.preventDefault();
    
        const formData = new URLSearchParams();
        formData.append('email', email);
        formData.append('verification_code', verificationCode);
    
        axios.post('http://localhost:80/capstone-project/jobsync/src/api/verify_code.php', formData)
        .then(response => {
            setMessage(response.data.message);
            if (response.data.status === 1) {
                setTimeout(() => navigate('/'), 2000);
            }
        })
        .catch(error => {
            console.error("There was an error verifying the code!", error);
            setError("Verification failed. Please try again.");
        });
    };
    

    return (
        <div className="container mt-5">
            <h3>Email Verification</h3>
            <p>We’ve sent a verification email to <b>{email}</b> to verify your email address and activate your account</p>
            <form onSubmit={handleVerify}>
                <div className="mb-3">
                    <input 
                        type="text" 
                        name="verification_code"
                        className="form-control" 
                        placeholder="Enter your verification code" 
                        value={verificationCode}
                        onChange={(e) => setVerificationCode(e.target.value)} 
                        required 
                    />
                </div>
                <button type="submit" className="btn btn-primary">Verify</button>
            </form>
            {message && <p className="text-success">{message}</p>}
            {error && <p className="text-danger">{error}</p>}
        </div>
    );
}

export default EmailVerification;
