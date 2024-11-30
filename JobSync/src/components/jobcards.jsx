import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { Link } from 'react-router-dom';

const JobCards = ({ jobs }) => {
    if (!jobs || jobs.length === 0) {
        return <p>No jobs available.</p>;
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
                                    className="far fa-bookmark position-absolute"
                                    style={{ right: '15px', top: '15px', fontSize: '20px', color: '#bbbbbb' }}
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
