import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaUsers } from 'react-icons/fa';

const jobData = [
    {
        id: 1,
        name: 'Software Engineer',
        jobType: 'Full-time',
        status: 'Active',
        applications: 24,
    },
    {
        id: 2,
        name: 'Product Manager',
        jobType: 'Part-time',
        status: 'Pending',
        applications: 18,
    },
    {
        id: 3,
        name: 'Graphic Designer',
        jobType: 'Freelance',
        status: 'Expired',
        applications: 12,
    },
    {
        id: 4,
        name: 'Data Scientist',
        jobType: 'Full-time',
        status: 'Active',
        applications: 30,
    },
    {
        id: 5,
        name: 'UI/UX Designer',
        jobType: 'Part-time',
        status: 'Pending',
        applications: 15,
    },
    {
        id: 6,
        name: 'Project Coordinator',
        jobType: 'Freelance',
        status: 'Expired',
        applications: 20,
    },
    {
        id: 7,
        name: 'Backend Developer',
        jobType: 'Full-time',
        status: 'Active',
        applications: 22,
    },
    {
        id: 8,
        name: 'Marketing Specialist',
        jobType: 'Part-time',
        status: 'Pending',
        applications: 17,
    },
    {
        id: 9,
        name: 'Content Writer',
        jobType: 'Freelance',
        status: 'Expired',
        applications: 8,
    },
    {
        id: 10,
        name: 'Sales Manager',
        jobType: 'Full-time',
        status: 'Active',
        applications: 25,
    },
];

const JobRow = ({ job }) => (
    <tr key={job.id} className="border-bottom">
        <td style={{ textAlign: 'left' }}>
            <div>
                <h6 className="mb-0" style={{ padding: '5px' }}>{job.name}</h6>
                <small className="text-muted">{job.jobType}</small>
            </div>
        </td>
        <td className="text-center">
            <span
                className={`badge ${job.status === 'Active' ? 'bg-success' : job.status === 'Pending' ? 'bg-warning' : 'bg-secondary'}`}
            >
                {job.status}
            </span>
        </td>
        <td className="text-center">
            <div className="d-flex justify-content-center align-items-center">
                <FaUsers className="me-2" />
                {job.applications}<span className="ms-1">Applicants</span>
            </div>
        </td>
        <td className="text-center">
            <button className="btn btn-sm btn-light text-primary fw-bold">View Application</button>
        </td>
    </tr>
);

function PostedJobTable() {
    return (
        <div className="container-fluid px-0">
            <div className="table-responsive">
                <table className="table" style={{ width: '100%', tableLayout: 'fixed' }}>
                    <thead className="thead-light">
                        <tr>
                            <th className="bg-light text-start">Jobs</th>
                            <th className="bg-light text-center">Status</th>
                            <th className="bg-light text-center">Applications</th>
                            <th className="bg-light text-center">Actions</th>
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

export default PostedJobTable;
