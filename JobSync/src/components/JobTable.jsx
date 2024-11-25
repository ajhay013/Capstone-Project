import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import JobDetailsModal from '../components/jobdetailsmodal';
import Pagination from '../components/Pagination'; // Import Pagination

const jobData = [
    { id: 1, logo: '../../src/assets/riot.png', name: 'Visual Designer', location: 'New York, NY', jobType: 'Full-time', salary: '₱ 100,000', dateApplied: 'Dec 7, 2019 23:26', status: 'Active' },
    { id: 2, logo: '../../src/assets/riot.png', name: 'Product Manager', location: 'San Francisco, CA', jobType: 'Part-time', salary: '₱ 80,000', dateApplied: 'Feb 2, 2019 19:28', status: 'Active' },
    { id: 3, logo: '../../src/assets/riot.png', name: 'Graphic Designer', location: 'Caloocan City', jobType: 'Freelance', salary: '₱ 60,000', dateApplied: 'Feb 2, 2019 19:28', status: 'Expired' },
    { id: 4, logo: '../../src/assets/riot.png', name: 'Software Engineer', location: 'New York, NY', jobType: 'Full-time', salary: '₱ 100,000', dateApplied: 'Dec 7, 2019 23:26', status: 'Active' },
    { id: 5, logo: '../../src/assets/riot.png', name: 'Product Manager', location: 'San Francisco, CA', jobType: 'Part-time', salary: '₱ 80,000', dateApplied: 'Feb 2, 2019 19:28', status: 'Active' },
    { id: 6, logo: '../../src/assets/riot.png', name: 'Graphic Designer', location: 'Caloocan City', jobType: 'Freelance', salary: '₱ 60,000', dateApplied: 'Dec 7, 2019 23:26', status: 'Expired' },
    { id: 7, logo: '../../src/assets/riot.png', name: 'Software Engineer', location: 'New York, NY', jobType: 'Full-time', salary: '₱ 100,000', dateApplied: 'Dec 7, 2019 23:26', status: 'Active' },
    { id: 8, logo: '../../src/assets/riot.png', name: 'Product Manager', location: 'San Francisco, CA', jobType: 'Part-time', salary: '₱ 80,000', dateApplied: 'Feb 2, 2019 19:28', status: 'Active' },
    { id: 9, logo: '../../src/assets/riot.png', name: 'Graphic Designer', location: 'Caloocan City', jobType: 'Freelance', salary: '₱ 60,000', dateApplied: 'Dec 7, 2019 23:26', status: 'Expired' },
    { id: 10, logo: '../../src/assets/riot.png', name: 'Graphic Designer', location: 'Caloocan City', jobType: 'Freelance', salary: '₱ 60,000', dateApplied: 'Dec 7, 2019 23:26', status: 'Expired' },
    { id: 11, logo: '../../src/assets/riot.png', name: 'UI/UX Designer', location: 'Los Angeles, CA', jobType: 'Full-time', salary: '₱ 90,000', dateApplied: 'Jan 15, 2020 10:45', status: 'Active' },
    { id: 12, logo: '../../src/assets/riot.png', name: 'Data Scientist', location: 'Chicago, IL', jobType: 'Freelance', salary: '₱ 85,000', dateApplied: 'Mar 9, 2020 12:30', status: 'Expired' },
    { id: 13, logo: '../../src/assets/riot.png', name: 'Marketing Manager', location: 'San Francisco, CA', jobType: 'Part-time', salary: '₱ 75,000', dateApplied: 'Jul 6, 2020 14:15', status: 'Active' },
    { id: 14, logo: '../../src/assets/riot.png', name: 'Web Developer', location: 'New York, NY', jobType: 'Full-time', salary: '₱ 95,000', dateApplied: 'Oct 22, 2020 16:50', status: 'Active' },
    { id: 15, logo: '../../src/assets/riot.png', name: 'HR Specialist', location: 'Dallas, TX', jobType: 'Part-time', salary: '₱ 70,000', dateApplied: 'Feb 11, 2020 18:40', status: 'Active' },
    { id: 16, logo: '../../src/assets/riot.png', name: 'Software Developer', location: 'Austin, TX', jobType: 'Freelance', salary: '₱ 85,000', dateApplied: 'Mar 19, 2020 11:12', status: 'Expired' },
    { id: 17, logo: '../../src/assets/riot.png', name: 'Graphic Designer', location: 'Caloocan City', jobType: 'Freelance', salary: '₱ 60,000', dateApplied: 'Dec 7, 2020 23:26', status: 'Expired' },
    { id: 18, logo: '../../src/assets/riot.png', name: 'Front-end Developer', location: 'Los Angeles, CA', jobType: 'Full-time', salary: '₱ 100,000', dateApplied: 'Sep 13, 2020 10:00', status: 'Active' },
    { id: 19, logo: '../../src/assets/riot.png', name: 'Backend Engineer', location: 'San Francisco, CA', jobType: 'Freelance', salary: '₱ 80,000', dateApplied: 'Dec 12, 2020 17:20', status: 'Active' },
    { id: 20, logo: '../../src/assets/riot.png', name: 'SEO Specialist', location: 'Chicago, IL', jobType: 'Part-time', salary: '₱ 65,000', dateApplied: 'Oct 8, 2020 14:05', status: 'Expired' },
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
                    onClick={() => onViewDetails(job.id)}
                >
                    View Details
                </button>
            </td>
        </tr>
    );
};

function AppliedJobsTable() {
    const [showModal, setShowModal] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const handleViewDetails = (jobId) => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const totalItems = jobData.length;

    // Pagination function
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // Get current jobs to display based on the page
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentJobs = jobData.slice(indexOfFirstItem, indexOfLastItem);

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
                        {currentJobs.map((job) => (
                            <JobRow job={job} key={job.id} onViewDetails={handleViewDetails} />
                        ))}
                    </tbody>
                </table>
            </div>
            {/* Pagination */}
            <Pagination 
                currentPage={currentPage} 
                itemsPerPage={itemsPerPage} 
                totalItems={totalItems} 
                paginate={paginate} 
            />
            {/* Render the JobDetailsModal */}
            <JobDetailsModal show={showModal} handleClose={handleCloseModal} />
        </div>
    );
}

export default AppliedJobsTable;
