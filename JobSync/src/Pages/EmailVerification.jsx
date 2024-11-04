import React, { useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import { postToEndpoint } from '../components/apiService';
import '../css/Specific.css';

function EmailVerification() {
    const location = useLocation();
    const navigate = useNavigate();
    const { email, formType } = location.state || {};
    const [verificationCode, setVerificationCode] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false); 

    const handleVerify = (event) => {
        event.preventDefault();
        setLoading(true);
    
        const formData = new URLSearchParams();
        formData.append('email', email);
        formData.append('verification_code', verificationCode);
        formData.append('formType', formType);
    
        postToEndpoint('/verify_code.php', formData) 
            .then(response => {
                setLoading(false);
                setMessage(response.data.message);
                if (response.data.status === 1) {
                    setError(false);
                    setErrorMessage('');
                    Swal.fire({
                        icon: 'success',
                        title: 'Email Verified!',
                        text: 'Your email has been successfully verified.',
                        showConfirmButton: false,
                        timer: 2000,
                        timerProgressBar: true,
                        allowOutsideClick: false,
                        allowEscapeKey: false
                    }).then(() => {
                        navigate('/');
                    });
                } else {
                    setError(true);
                    setErrorMessage(response.data.message);
                }
            })
            .catch(() => {
                setLoading(false);
                setError(true);
                setErrorMessage("Verification failed. Please try again.");
            });
    };

    const handleInputChange = (e) => {
        setVerificationCode(e.target.value);
        if (error) {
            setError(false);
            setErrorMessage('');
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center" style={{ marginBottom: '6.5rem', padding: 0 }}>
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
                            className={`form-control ${error ? 'is-invalid' : ''}`}
                            style={{ height: '50px', borderRadius: '10px', textAlign: 'center', fontSize: 'x-large', letterSpacing: '7px' }}
                            placeholder="xxxxxx"
                            value={verificationCode}
                            onChange={handleInputChange}
                            maxLength={6}
                            required
                        />
                        {error && <div className="invalid-feedback">{errorMessage}</div>}
                    </div>
                    <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '10px' }} disabled={loading}>
                        {loading ? (
                            <span>
                                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                Verifying...
                            </span>
                        ) : (
                            <span>
                                Verify my Account <FontAwesomeIcon icon={faArrowRight} className="ms-2" />
                            </span>
                        )}
                    </button>
                </form>
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
