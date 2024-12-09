import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const JobCards = ({ jobs, applicantId }) => {
    const [bookmarkedJobs, setBookmarkedJobs] = useState([]);
    const navigate = useNavigate(); 

    useEffect(() => {
        const fetchBookmarkedJobs = async () => {
            try {
                const response = await axios.get('http://localhost:80/capstone-project/jobsync/src/api/getFavoriteJobs.php', {
                    params: { applicant_id: applicantId },
                });

                if (response.data.success) {
                    setBookmarkedJobs(response.data.bookmarkedJobs); 
                }
            } catch (error) {
                console.error('Error fetching bookmarked jobs:', error);
            }
        };

        if (applicantId) {
            fetchBookmarkedJobs();
        }
    }, [applicantId]);

    const handleBookmarkClick = async (jobId) => {
        if (!applicantId) {
            navigate('/candidate_login');
            return;
        }
    
        try {
            const isBookmarked = bookmarkedJobs.includes(jobId);
    
            const endpoint = isBookmarked
                ? 'http://localhost:80/capstone-project/jobsync/src/api/deleteFavoriteJob.php'
                : 'http://localhost:80/capstone-project/jobsync/src/api/saveFavoriteJob.php';
    
            const response = await axios.post(endpoint, {
                applicant_id: applicantId,
                job_id: jobId,
            });
    
            if (response.data.success) {
                if (isBookmarked) {
                    setBookmarkedJobs((prevBookmarkedJobs) =>
                        prevBookmarkedJobs.filter((id) => id !== jobId)
                    );
                } else {
                    setBookmarkedJobs((prevBookmarkedJobs) => [...prevBookmarkedJobs, jobId]);
                }
            } else {
                alert(response.data.message || 'An error occurred.');
            }
        } catch (error) {
            console.error('Error adding/removing job from favorites:', error);
            alert('An error occurred while updating the job favorites.');
        }
    };
    if (!jobs || jobs.length === 0) {
        return(
            <div className='my-5 container' style={{width: '1190px', height: '27vh'}}>
                    <h5 style={{marginTop: '135px', fontWeight: '400', color: '#4d4d4d'}}>This employer has not posted any job openings at this time.</h5>
            </div>
        );
    }

    return (
        <div style={{ width: '1215px' }}>
            <div className="row justify-content-center">
                {Array.isArray(jobs) && jobs.length > 0 ? (
                    jobs.map((job, index) => (
                        <div className="col-12 col-md-6 col-lg-4 mb-4" key={index}>
                            <div
                                className="border p-4 position-relative job-container"
                                style={{
                                    border: '1px solid #e6e6e6',
                                    borderRadius: '10px',
                                    boxShadow: '0 6px 15px rgba(0, 0, 0, 0.1)',
                                    maxWidth: '100%',
                                    transition: 'transform 0.3s, box-shadow 0.3s',
                                    cursor: 'pointer',
                                    background: 'linear-gradient(90deg, rgba(239,246,255,1) 1%, rgba(255,255,255,1) 100%)'
                                }}
                                onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.02)')}
                                onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                            >
                                <Link to={`/jobdetails/${job.job_id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                    <h5 className="mb-3 font-weight-bold text-start text-dark">{job.jobTitle}</h5>
                                    <p className="text-start mb-3">
                                        <span
                                            style={{
                                                color: '#28a745',
                                                fontWeight: '500',
                                                backgroundColor: '#e0f3e3',
                                                borderRadius: '5px',
                                                padding: '5px 8px',
                                                fontSize: 'small',
                                                textTransform: 'uppercase'
                                            }}
                                        >
                                            {job.jobType}
                                        </span>
                                        <span className="ml-2 text-muted" style={{ fontSize: '14px' }}>
                                            Salary: ₱{job.minSalary} - ₱{job.maxSalary}
                                        </span>
                                    </p>
                                    <div className="d-flex align-items-center mb-3">
                                        <img
                                            src={job.logo}
                                            alt="Logo"
                                            style={{ width: '50px', height: '50px', marginRight: '15px', borderRadius: '8px' }}
                                        />
                                        <div>
                                            <p className="mb-1 text-start font-weight-bold">{job.company_name}</p>
                                            <div className="d-flex align-items-center text-muted">
                                                <i className="fas fa-location-dot" style={{ marginRight: '5px' }}></i>
                                                <p className="mb-0">{job.city}</p>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                                
                                <i
                                    className={`fa-bookmark position-absolute ${
                                        bookmarkedJobs.includes(job.job_id) ? 'fas text-primary' : 'far'
                                    }`}
                                    style={{ right: '15px', top: '15px', fontSize: '20px', cursor: 'pointer',  color: '#bbbbbb' }}
                                    onClick={() => handleBookmarkClick(job.job_id)}
                                ></i>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No jobs available.</p>
                )}
            </div>
        </div>
    );
};

export default JobCards;
