import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import React, { useState, useEffect } from 'react'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faUser, faBuilding, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate, useLocation } from 'react-router-dom'; 
import { postToEndpoint } from '../components/apiService';
import { useAuth } from '../AuthContext';
import { useGoogleLogin } from '@react-oauth/google';

function SignInForm() { 
    const navigate = useNavigate();
    const location = useLocation();
    const { user, login } = useAuth(); 

    const referrer = location.state?.from || '/applicants/overview';

    const [inputs, setInputs] = useState({ email: '', password: '' });
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [isEmailCorrect, setIsEmailCorrect] = useState(false);
    const [isPasswordCorrect, setIsPasswordCorrect] = useState(false);
    const [formType, setFormType] = useState('candidate');
    const [isRemembered, setIsRemembered] = useState(false);
    const [passwordVisible, setPasswordVisible] = useState(false); 
    const [loading, setLoading] = useState(false);
    const [loadingPage, setLoadingPage] = useState(true);
    const [genericError, setGenericError] = useState('');
    useEffect(() => {
        const timer = setTimeout(() => {
            setLoadingPage(false); 
        }, 500); 
    
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        if (user) {
            navigate(referrer); 
        }

        const savedEmail = localStorage.getItem('email');
        const savedPassword = localStorage.getItem('password');
        if (savedEmail && savedPassword) {
            setInputs({ email: savedEmail, password: savedPassword });
            setIsRemembered(true); 
        }
    }, [user, navigate, referrer]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setInputs((values) => ({ ...values, [name]: value }));

        if (name === 'email') {
            setEmailError('');
            setIsEmailCorrect(false);
        }
        if (name === 'password') {
            setPasswordError('');
            setIsPasswordCorrect(false);
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setLoading(true);
        const loginData = new URLSearchParams({
            email: inputs.email,
            password: inputs.password,
            formType 
        });
    
        postToEndpoint('/login.php', loginData, {
            'Content-Type': 'application/x-www-form-urlencoded'
        })
            .then(response => {
                setLoading(false); 
                if (response.data.success) {
                    const userData = {
                        id: response.data.applicant_id,
                        firstname: response.data.firstname,
                        profilePicture: response.data.profile_picture,
                        userType: response.data.userType
                    };
                    login(userData); 
    
                    if (isRemembered) {
                        localStorage.setItem('email', inputs.email);
                        localStorage.setItem('password', inputs.password);
                    } else {
                        localStorage.removeItem('email');
                        localStorage.removeItem('password');
                    }
    
                    navigate(referrer); 
                } else {
                    const errorMessage = response.data.error || '';
                    if (errorMessage.includes('email')) {
                        setEmailError("Incorrect email");
                        setIsEmailCorrect(false);
                    } else if (errorMessage.includes('password')) {
                        setPasswordError("Incorrect password");
                        setIsPasswordCorrect(false);
                    } else {
                        setGenericError(response.data.error || "Login failed. Please try again.");
                    }
                }
            })
            .catch(error => {
                setLoading(false); 
                console.error("Error submitting the form:", error);
                setGenericError("An error occurred while submitting the form. Please try again.");
            });
    };
    
    const renderFormFields = () => (
        <>
            {genericError && <small style={{position: 'relative', color: '#dc3545', bottom: '10px'}}>{genericError}</small>}
            <div className="mb-3">
                <input
                    type="email"
                    name='email'
                    className={`form-control register ${emailError ? 'border border-danger' : isEmailCorrect ? 'border border-success' : ''}`}
                    placeholder="Email"
                    onChange={handleChange}
                    value={inputs.email}
                    required
                />
                {emailError && <small className="text-danger">{emailError}</small>}
            </div>
            <div className="mb-3">
                <div className="position-relative">
                    <input
                        type={passwordVisible ? 'text' : 'password'}
                        name='password'
                        className={`form-control register ${passwordError ? 'border border-danger' : isPasswordCorrect ? 'border border-success' : ''}`}
                        placeholder="Password"
                        onChange={handleChange}
                        value={inputs.password}
                        required
                    />
                    <div
                        className="position-absolute"
                        style={{
                            right: '18px',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            color: '#696969',
                            cursor: 'pointer',
                            zIndex: 2, 
                            pointerEvents: 'auto',
                        }}
                        onClick={() => setPasswordVisible(!passwordVisible)}
                    >
                        <FontAwesomeIcon icon={passwordVisible ? faEyeSlash : faEye} />
                    </div>
                </div>
                {passwordError && <small className="text-danger mt-2">{passwordError}</small>}
            </div>

            <div className="d-flex justify-content-between mb-3">
                <div className="form-check">
                    <input 
                        type="checkbox" 
                        className="form-check-input" 
                        checked={isRemembered} 
                        onChange={() => setIsRemembered(!isRemembered)} 
                    />
                    <label className="form-check-label">Remember Me</label>
                </div>
                <Link to="/forgot-password" style={{ textDecoration: 'underline', color: '#0A65CC' }}>Forgot Password?</Link>
            </div>
            <div className="d-flex justify-content-center">
                <button type="submit" className="btn btn-success btn-custom" style={{ backgroundColor: '#0A65CC', width: '700px', marginTop: '20px' }}>
                    Sign In <FontAwesomeIcon style={{marginLeft: '10px'}} icon={faArrowRight} />
                </button>
            </div>
            <div className='text-muted' style= {{marginTop: '10px'}}>or</div>
            <div className="d-flex justify-content-center">
                <button
                    type='button'
                    onClick={loginGoogle}
                    className="btn btn-primary btn-custom"
                    style={{ backgroundColor: '#ffffff', width: '588px', marginTop: '20px', color: 'black'}}
                >
                    <img
                        src="../src/assets/google.png" 
                        alt="Google Logo"
                        style={{ width: '20px', marginRight: '10px' }}
                    />
                    Sign in with Google
                </button>
            </div>

        </>
    );
    const loginGoogle = useGoogleLogin({
        onSuccess: async (credentialResponse) => {
            if (credentialResponse?.access_token) {
                const accessToken = credentialResponse.access_token;
    
                setLoading(true); 
                setTimeout(async () => {
                    try {
                        const response = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
                            headers: {
                                Authorization: `Bearer ${accessToken}`,
                            }
                        });
    
                        if (response.ok) {
                            const userProfile = await response.json();
                            const { email, family_name, given_name, picture } = userProfile;
    
                            try {
                                const postResponse = await postToEndpoint('/googleLogin.php', {
                                    email,
                                    family_name: family_name || "",
                                    given_name,
                                    profile_picture: picture,
                                    formType
                                });
    
                                if (postResponse.data.success) {
                                    login({
                                        id: postResponse.data.applicant_id,
                                        firstname: postResponse.data.firstname,
                                        profile_picture: postResponse.data.profile_picture,
                                        userType: postResponse.data.userType,
                                    });
    
                                    navigate(referrer);
                                } else {
                                    console.error('Failed to save user');
                                }
                            } catch (error) {
                                console.error("Error saving user to database:", error);
                            }
                        } else {
                            console.error("Failed to fetch user profile:", response.status);
                        }
                    } catch (error) {
                        console.error("Error fetching user profile:", error);
                    } finally {
                        setLoading(false);
                    }
                }, 2000); 
            } else {
                console.error("Access token not available");
            }
        },
        onError: () => {
            console.log('Login Failed');
        }
    });
    
    return (
        <>
        {loadingPage && (
            <div id="preloader">
            </div>
        )}

        {loading && (
            <div id="preloader">
            </div>
        )}
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-6 mt-5">
                    <h3 className="mb-3 text-start">Sign In</h3>
                    <h4 className="mb-4 text-start" style={{ fontSize: '15px' }}>
                        Don't have an account? <Link to="/registration" style={{ textDecoration: 'none', color: '#0A65CC' }}>Create Account</Link>
                    </h4>
                    <div className="d-flex justify-content-center mb-4">
                        <div className="d-flex flex-column align-items-center mb-4" style={{ backgroundColor: '#F1F2F4', padding: '26px', borderRadius: '10px', width: '580px' }}>
                            <h5 className="text-center mb-3">Sign In as</h5>
                            <div className="d-flex justify-content-center">
                                <button 
                                    className={`btn btn-primary mx-1 custom-button ${formType === 'candidate' ? 'active' : ''}`}
                                    style={{ backgroundColor: formType === 'candidate' ? '#042852' : 'white', color: formType === 'candidate' ? 'white' : 'black', width: '270px', borderColor: 'black' }} 
                                    onClick={() => setFormType('candidate')}
                                >
                                    <FontAwesomeIcon icon={faUser} /> Candidate
                                </button>
                                <Link to="/employer_login">
                                    <button 
                                        className={`btn btn-primary mx-1 custom-button ${formType === 'employer' ? 'active' : ''}`}
                                        style={{ backgroundColor: formType === 'employer' ? '#042852' : 'white', color: formType === 'employer' ? 'white' : 'black', width: '270px', borderColor: 'black' }} 
                                    >
                                        <FontAwesomeIcon icon={faBuilding} /> Employer
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <form onSubmit={handleSubmit}>
                        {renderFormFields()}
                    </form>
                </div>
                <div className="col-md-6 d-none d-md-block">
                    <div 
                        style={{
                            position: 'relative',
                            marginTop: '0px',
                            width: '130%',
                        }}
                    >
                        <img 
                            src="src/assets/our-services.jpg" 
                            alt="Registration Visual" 
                            className="img-fluid"
                            style={{ 
                                height: '100%', 
                                width: '100%', 
                                objectFit: 'cover'
                            }}
                        />
                        <div
                            style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                height: '100%',
                                width: '100%',
                                background: 'linear-gradient(rgba(10, 22, 101, 0.4), rgba(0, 8, 42, 0.7))',
                                zIndex: 1
                            }}
                        ></div>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
}

export default SignInForm;
