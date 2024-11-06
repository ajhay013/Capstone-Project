import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const jobData = [
    {
        id: 1,
        logo: '../../src/assets/riot.png',
        name: 'Software Engineer',
        location: 'New York, NY',
        jobType: 'Full-time',
        salary: '$100,000',
        dateApplied: '2024-10-20',
        status: 'Active',
    },
    {
        id: 2,
        logo: '../../src/assets/riot.png',
        name: 'Product Manager',
        location: 'San Francisco, CA',
        jobType: 'Part-time',
        salary: '$80,000',
        dateApplied: '2024-10-15',
        status: 'Pending',
    },
    {
        id: 3,
        logo: '../../src/assets/riot.png',
        name: 'Graphic Designer',
        location: 'Caloocan City',
        jobType: 'Freelance',
        salary: '$60,000',
        dateApplied: '2024-09-30',
        status: 'Expired',
    },
    {
        id: 4,
        logo: '../../src/assets/riot.png',
        name: 'Software Engineer',
        location: 'New York, NY',
        jobType: 'Full-time',
        salary: '$100,000',
        dateApplied: '2024-10-20',
        status: 'Active',
    },
    {
        id: 5,
        logo: '../../src/assets/riot.png',
        name: 'Product Manager',
        location: 'San Francisco, CA',
        jobType: 'Part-time',
        salary: '$80,000',
        dateApplied: '2024-10-15',
        status: 'Pending',
    },
    {
        id: 6,
        logo: '../../src/assets/riot.png',
        name: 'Graphic Designer',
        location: 'Caloocan City',
        jobType: 'Freelance',
        salary: '$60,000',
        dateApplied: '2024-09-30',
        status: 'Expired',
    },
    {
        id: 7,
        logo: '../../src/assets/riot.png',
        name: 'Software Engineer',
        location: 'New York, NY',
        jobType: 'Full-time',
        salary: '$100,000',
        dateApplied: '2024-10-20',
        status: 'Active',
    },
    {
        id: 8,
        logo: '../../src/assets/riot.png',
        name: 'Product Manager',
        location: 'San Francisco, CA',
        jobType: 'Part-time',
        salary: '$80,000',
        dateApplied: '2024-10-15',
        status: 'Pending',
    },
    {
        id: 9,
        logo: '../../src/assets/riot.png',
        name: 'Graphic Designer',
        location: 'Caloocan City',
        jobType: 'Freelance',
        salary: '$60,000',
        dateApplied: '2024-09-30',
        status: 'Expired',
    },
    {
        id: 10,
        logo: '../../src/assets/riot.png',
        name: 'Graphic Designer',
        location: 'Caloocan City',
        jobType: 'Freelance',
        salary: '$60,000',
        dateApplied: '2024-09-30',
        status: 'Expired',
    },
];

const JobRow = ({ job }) => (
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
                        <span className="badge bg-primary">{job.jobType}</span>
                    </div>
                    <div className="d-flex align-items-center flex-wrap">
                        <i className="fas fa-location-dot text-muted me-1"></i>
                        <small className="text-muted me-2">{job.location}</small>
                        <span className="ms-auto">{job.salary}</span>
                    </div>
                </div>
            </div>
        </td>
        <td>{job.dateApplied}</td>
        <td>
            <span
                className={`badge ${job.status === 'Active' ? 'bg-success' : job.status === 'Pending' ? 'bg-warning' : 'bg-secondary'}`}
            >
                {job.status}
            </span>
        </td>
        <td>
            <button className="btn btn-sm btn-light text-primary fw-bold">View Details</button>
        </td>
    </tr>
);

function AppliedJobsTable() {
    return (
        <div className="container-fluid px-0">
            <div className="table-responsive">
                <table className="table" style={{ width: '100%', minWidth: '1000px' }}>
                    <thead className="thead-light">
                        <tr>
                            <th className="w-30 bg-light">Job</th>
                            <th className="bg-light">Date Applied</th>
                            <th className="bg-light">Status</th>
                            <th className="bg-light">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {jobData.map((job) => (
                            <JobRow job={job} key={job.id} />
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default AppliedJobsTable;
