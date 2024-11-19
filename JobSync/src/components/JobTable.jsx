import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import JobDetailsModal from '../components/jobdetailsmodal';

const jobData = [
    {
        id: 1,
        logo: '../../src/assets/riot.png',
        name: 'Visual Designer',
        location: 'New York, NY',
        jobType: 'Full-time',
        salary: '₱ 100,000',
        dateApplied: 'Dec 7, 2019 23:26',
        status: 'Active',
    },
    {
        id: 2,
        logo: '../../src/assets/riot.png',
        name: 'Product Manager',
        location: 'San Francisco, CA',
        jobType: 'Part-time',
        salary: '₱ 80,000',
        dateApplied: 'Feb 2, 2019 19:28',
        status: 'Active',
    },
    {
        id: 3,
        logo: '../../src/assets/riot.png',
        name: 'Graphic Designer',
        location: 'Caloocan City',
        jobType: 'Freelance',
        salary: '₱ 60,000',
        dateApplied: 'Feb 2, 2019 19:28',
        status: 'Expired',
    },
    {
        id: 4,
        logo: '../../src/assets/riot.png',
        name: 'Software Engineer',
        location: 'New York, NY',
        jobType: 'Full-time',
        salary: '₱ 100,000',
        dateApplied: 'Dec 7, 2019 23:26',
        status: 'Active',
    },
    {
        id: 5,
        logo: '../../src/assets/riot.png',
        name: 'Product Manager',
        location: 'San Francisco, CA',
        jobType: 'Part-time',
        salary: '₱ 80,000',
        dateApplied: 'Feb 2, 2019 19:28',
        status: 'Active',
    },
    {
        id: 6,
        logo: '../../src/assets/riot.png',
        name: 'Graphic Designer',
        location: 'Caloocan City',
        jobType: 'Freelance',
        salary: '₱ 60,000',
        dateApplied: 'Dec 7, 2019 23:26',
        status: 'Expired',
    },
    {
        id: 7,
        logo: '../../src/assets/riot.png',
        name: 'Software Engineer',
        location: 'New York, NY',
        jobType: 'Full-time',
        salary: '₱ 100,000',
        dateApplied: 'Dec 7, 2019 23:26',
        status: 'Active',
    },
    {
        id: 8,
        logo: '../../src/assets/riot.png',
        name: 'Product Manager',
        location: 'San Francisco, CA',
        jobType: 'Part-time',
        salary: '₱ 80,000',
        dateApplied: 'Feb 2, 2019 19:28',
        status: 'Active',
    },
    {
        id: 9,
        logo: '../../src/assets/riot.png',
        name: 'Graphic Designer',
        location: 'Caloocan City',
        jobType: 'Freelance',
        salary: '₱ 60,000',
        dateApplied: 'Dec 7, 2019 23:26',
        status: 'Expired',
    },
    {
        id: 10,
        logo: '../../src/assets/riot.png',
        name: 'Graphic Designer',
        location: 'Caloocan City',
        jobType: 'Freelance',
        salary: '₱ 60,000',
        dateApplied: 'Dec 7, 2019 23:26',
        status: 'Expired',
    },
];

const JobRow = ({ job, onViewDetails }) => {
    const statusColor = (() => {
        switch (job.status) {
            case 'Active':
                return '#5bbc80'; 
            case 'Expired':
                return '#dc3545'; 
            default:
                return '#000000'; 
        }
    })();

    return (
        <tr key={job.id} className="border-bottom">
            <td>
                <div className="d-flex align-items-center">
                    <img
                        src={job.logo}
                        alt="Job Logo"
                        className="me-3"
                        style={{ width: '50px', height: '50px' }}
                    />
                    <div>
                        <div className="d-flex justify-content-between align-items-center flex-wrap">
                            <h6 className="mb-0" style={{ padding: '5px' }}>{job.name}</h6>
                            <span className="badge"
                                  style={{
                                    background: '#cde8ff',
                                    padding: '7px 13px',
                                    color: '#656565',
                                    fontWeight: '700',
                                    borderRadius: '50px',
                                    fontSize: '12px'
                                  }}
                            >{job.jobType}</span>
                        </div>
                        <div className="d-flex align-items-center flex-wrap">
                            <i className="fas fa-location-dot text-muted me-1"></i>
                            <small className="text-muted me-2">{job.location}</small>
                            <span className="ms-auto">{job.salary}</span>
                        </div>
                    </div>
                </div>
            </td>
            <td><span 
                style={{
                    marginTop: '15px',
                    display: 'inline-block',
                    color: '#656565',
                    fontWeight: '600',
                    fontSize: '14px'
                }}
            >{job.dateApplied}</span></td>
            <td>
                <span
                    style={{
                        color: statusColor,
                        padding: '10px',
                        fontSize: '14px',
                        fontWeight: '700',
                        display: 'inline-block', 
                        marginTop: '5px',
                        textAlign: 'center', 
                    }}
                >
                    {job.status}
                </span>
            </td>
            <td>
                <button 
                    className="btn btn-sm btn-light text-primary" 
                    style={{
                        width: '73%',
                        fontWeight: '500',
                        marginTop: '5px',
                        background: '#ddf2ff',
                        padding: '10px',
                        borderRadius: '6px'
                    }}
                    onClick={() => onViewDetails(job.id)} // Call the function to open modal
                >
                    View Details
                </button>
            </td>
        </tr>
    );
};

function AppliedJobsTable() {
    const [showModal, setShowModal] = useState(false);

    const handleViewDetails = (jobId) => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    return (
        <div className="container-fluid px-0">
            <div className="table-responsive">
                <table className="table" style={{ width: '100%', minWidth: '1000px' }}>
                    <thead className="thead-light">
                        <tr>
                            <th style={{color: '#676767', background: '#ebebebc2'}}>Job</th>
                            <th style={{color: '#676767', background: '#ebebebc2'}}>Date Applied</th>
                            <th style={{color: '#676767', background: '#ebebebc2'}}>Status</th>
                            <th style={{color: '#676767', background: '#ebebebc2'}}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {jobData.map((job) => (
                            <JobRow job={job} key={job.id} onViewDetails={handleViewDetails} />
                        ))}
                    </tbody>
                </table>
            </div>
            {/* Render the JobDetailsModal */}
            <JobDetailsModal show={showModal} handleClose={handleCloseModal} />
        </div>
    );
}

export default AppliedJobsTable;