import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import JobDetailsModal from '../components/jobdetailsmodal';
import Pagination from '../components/Pagination'; 
import { useAuth } from '../AuthContext'; 
import axios from 'axios';
import { postToEndpoint } from '../components/apiService';

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
        <tr key={job.job_id} className="border-bottom">
            <td style={{padding: '17px'}}>
                <div className="d-flex align-items-center">
                    <img
                        src={job.logo}
                        alt="Job Logo"
                        className="me-3"
                        style={{ width: '50px', height: '50px' }}
                    />
                    <div>
                        <div className="d-flex align-items-center flex-wrap">
                            <h6 className="mb-0" style={{ padding: '5px', color: '#373737' }}>{job.jobTitle}</h6>
                            <span className="badge"
                                  style={{
                                    background: '#cde8ff',
                                    padding: '7px 13px',
                                    color: '#0076df',
                                    fontWeight: '600',
                                    borderRadius: '50px',
                                    fontSize: '11px',
                                    marginLeft: '7px'
                                  }}
                            >{job.jobType}</span>
                        </div>
                        <div className="d-flex align-items-center flex-wrap">
                            <i className="fas fa-location-dot me-1" style={{color: '#4198e5'}}></i>
                            <small className="text-muted me-2">{job.city}</small> <span className='text-muted'>|</span>
                            <span className="text-muted" style={{marginLeft: '10px'}}>₱{job.minSalary} - ₱{job.maxSalary}</span>
                        </div>
                    </div>
                </div>
            </td>
            <td style={{ padding: '17px' }}>
            <span
                style={{
                    marginTop: '15px',
                    display: 'inline-block',
                    color: '#656565',
                    fontWeight: '600',
                    fontSize: '14px',
                }}
            >
                {new Intl.DateTimeFormat('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: false,
                }).format(new Date(job.applied_at))}
            </span>
        </td>
            <td style={{padding: '17px'}}>
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
            <td style={{padding: '17px'}}>
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
                    onClick={() => onViewDetails(job.job_id)}
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
    const [applied, setAppliedJobs] = useState([]);
    const [selectedJobId, setSelectedJobId] = useState(null);
    const { user } = useAuth();

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedJobId(null);
    };

    const totalItems = applied.length;

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentJobs = applied.slice(indexOfFirstItem, indexOfLastItem);

    useEffect(() => {
        const fetchAppliedJobs = async () => {
            try {
                const response = await postToEndpoint('/getAppliedJobs.php', { applicant_id: user.id });
                console.log(response.data);
                if (response.data && !response.data.error) {
                    setAppliedJobs(response.data);
                } else {
                    console.error('Error in response:', response.data.error);
                }
            } catch (error) {
                console.error('Error fetching applicant profiles:', error);
            }
        };

        if (user) {
            fetchAppliedJobs();
        }
    }, [user]);

    const handleViewDetails = (job_id) => {
        setSelectedJobId(job_id); // Store the job ID
        setShowModal(true);
    };

    return (
        <div className="container-fluid px-0 d-flex flex-column" style={{ minHeight: '100vh' }}>
            <div className="flex-grow-1 table-responsive">
                <table className="table" style={{ width: '100%', minWidth: '1000px' }}>
                    <thead className="thead-light">
                        <tr>
                            <th style={{ color: '#676767', background: '#ebebebc2', fontWeight: '500', fontSize: '13px' }}>JOB</th>
                            <th style={{ color: '#676767', background: '#ebebebc2', fontWeight: '500', fontSize: '13px' }}>DATE APPLIED</th>
                            <th style={{ color: '#676767', background: '#ebebebc2', fontWeight: '500', fontSize: '13px' }}>STATUS</th>
                            <th style={{ color: '#676767', background: '#ebebebc2', fontWeight: '500', fontSize: '13px' }}>ACTION</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentJobs.map((applied) => (
                            <JobRow job={applied} key={applied.job_id} onViewDetails={handleViewDetails} />
                        ))}
                    </tbody>
                </table>
            </div>
            {totalItems > itemsPerPage && (
                <div className="d-flex justify-content-center py-3">
                    <Pagination
                        currentPage={currentPage}
                        itemsPerPage={itemsPerPage}
                        totalItems={totalItems}
                        paginate={paginate}
                    />
                </div>
            )}
            <JobDetailsModal 
                show={showModal} 
                handleClose={handleCloseModal} 
                job_id={selectedJobId}
            />
        </div>
    );
}

export default AppliedJobsTable;
