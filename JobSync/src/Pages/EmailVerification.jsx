// EmailVerification.js
import React, { useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

function EmailVerification() {
    const location = useLocation();
    const navigate = useNavigate();
    const { email, formType } = location.state || {};

    const [verificationCode, setVerificationCode] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleVerify = (event) => {
        event.preventDefault();

        const formData = new URLSearchParams();
        formData.append('email', email);
        formData.append('verification_code', verificationCode);
        formData.append('formType', formType);

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
        <div className="d-flex justify-content-center align-items-center" style={{marginBottom: '6.5rem', padding: 0 }}>
            <div className="container" style={{ maxWidth: '55%', margin: 0, padding: 0 }}>
                <h3 className="text-center" style={{ marginTop: 0 }}>Email Verification</h3>
                <p className="text-center" style={{ marginTop: 0 }}>
                    We’ve sent a verification email to <b>{email}</b> to verify your email address and activate your account.
                </p>
                <form onSubmit={handleVerify} style={{ margin: 0, padding: 0 }}>
                    <div className="mb-3">
                        <input
                            type="text"
                            name="verification_code"
                            className="form-control register"
                            placeholder="Enter your verification code"
                            value={verificationCode}
                            onChange={(e) => setVerificationCode(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '10px' }}>
                        Verify my Account <FontAwesomeIcon icon={faArrowRight} className="ms-2" />
                    </button>
                </form>
                {message && <p className="text-success text-center">{message}</p>}
                {error && <p className="text-danger text-center">{error}</p>}

                <p className="mt-3 text-center" style={{ marginTop: '10px' }}>
                    Didn't receive any code?{' '}
                    <Link to="/path-to-resend-page" className="text-primary">
                        Resend
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default EmailVerification;
