import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { Link } from 'react-router-dom';

const FindJob = () => {
    const jobs = [
        {
            title: 'Software Developer',
            type: 'Part-Time',
            salary: '$20/hour',
            company: 'Google Inc.',
            location: 'Manila, Philippines',
            logo: './src/assets/google.png',
        },
        {
            title: 'Job Title 2',
            type: 'Fulltime',
            salary: '$20/hour',
            company: 'Company Name 2',
            location: 'Location 2',
            logo: './src/assets/google.png',
        },
        {
            title: 'Job Title 3',
            type: 'Internship',
            hours: '200-400hrs',
            company: 'Company Name 3',
            location: 'Location 3',
            logo: './src/assets/google.png',
        },
        {
            title: 'Job Title 4',
            type: 'Internship',
            hours: '200-400hrs',
            company: 'Company Name 4',
            location: 'Location 4',
            logo: './src/assets/google.png',
        },
        {
            title: 'Job Title 5',
            type: 'Internship',
            hours: '200-400hrs',
            company: 'Company Name 5',
            location: 'Location 5',
            logo: './src/assets/google.png',
        },
        {
            title: 'Job Title 6',
            type: 'Internship',
            hours: '200-400hrs',
            company: 'Company Name 6',
            location: 'Location 6',
            logo: './src/assets/google.png',
        },
        {
            title: 'Job Title 7',
            type: 'Internship',
            hours: '200-400hrs',
            company: 'Company Name 6',
            location: 'Location 6',
            logo: './src/assets/google.png',
        },
        {
            title: 'Job Title 8',
            type: 'Internship',
            hours: '200-400hrs',
            company: 'Company Name 6',
            location: 'Location 6',
            logo: './src/assets/google.png',
        },
        {
            title: 'Job Title 9',
            type: 'Internship',
            hours: '200-400hrs',
            company: 'Company Name 6',
            location: 'Location 6',
            logo: './src/assets/google.png',
        },
    ];

    return (
        <div>
            <div className="container mt-5" style={{ width: '100%', maxWidth: '1200px', margin: '20px auto' }}>
                <div className="row">
                    {jobs.map((job, index) => (
                        <div className="col-md-4 mb-4 custom-job-container" key={index}>
                            <Link to="/jobdetails" style={{ textDecoration: 'none', color: 'inherit' }}>
                                <div className="border p-3 position-relative job-container" style={{
                                    border: '1px solid #F1F2F4',
                                    borderRadius: '15px',
                                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                                }}>
                                    <h5 className="mb-2 font-weight-bold text-start">{job.title}</h5>
                                    <p className="text-start">
                                        <span style={{
                                            color: '#0BA02C', fontWeight: 'bold', backgroundColor: '#A8D9A0',
                                            borderRadius: '5px', padding: '2px 5px'
                                        }}>
                                            {job.type}
                                        </span> | {job.salary ? `Salary: ${job.salary}` : `Hours: ${job.hours}`}
                                    </p>
                                    <div className="d-flex align-items-center">
                                        <img src={job.logo} alt="Company Logo" style={{ width: '50px', height: '50px', marginRight: '10px' }} />
                                        <div>
                                            <p className="text-start">{job.company}</p>
                                            <div className="d-flex align-items-center">
                                                <i className="fas fa-location-dot" style={{ color: 'gray', marginRight: '5px', marginBottom: '15px' }}></i>
                                                <p>{job.location}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <i className="fas fa-bookmark position-absolute" style={{ right: '15px', bottom: '15px', fontSize: '20px', color: '#555' }}></i>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FindJob;
