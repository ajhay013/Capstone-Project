import React, { useState, useEffect, useRef } from 'react';
import { postToEndpoint } from '../components/apiService';
import 'bootstrap/dist/css/bootstrap.min.css';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { useAuth } from '../AuthContext'; 
import { FaUsers, FaEllipsisV, FaBullhorn, FaEye, FaClock, FaCheck, FaTimes } from 'react-icons/fa';

const JobRow = ({ job, handleShowModal }) => {
    const statusColor = job.status === 'Active' ? '#5bbc80' : '#dc3545';
    return (
        <tr className="border-bottom">
            {/* Job details */}
            <td style={{ textAlign: 'left' }}>
                <div>
                    <h6 className="mb-0" style={{ padding: '5px', textAlign: 'left', color: '#444444' }}>{job.jobTitle}</h6>
                    <small className="text-muted" style={{ marginLeft: '6px' }}>{job.jobType}</small>
                </div>
            </td>

            {/* Status */}
            <td className="text-center">
                <span style={{ color: statusColor, padding: '10px', fontSize: '14px', fontWeight: '700', display: 'inline-block', marginTop: '5px', textAlign: 'center' }}>
                    {job.status === 'Active' ? <FaCheck className="me-2" /> : <FaTimes className="me-2" />}
                    {job.status}
                </span>
            </td>

            {/* Applications */}
            <td className="text-center">
                <div className="d-flex justify-content-center align-items-center" style={{ marginTop: '15px', display: 'inline-block', color: '#656565', fontWeight: '600', fontSize: '14px' }}>
                    <FaUsers className="me-2" />
                    {job.applications}<span className="ms-1">Applicants</span>
                </div>
            </td>

            {/* Actions */}
            <td className="text-center">
                <div className="d-flex justify-content-center align-items-center">
                    <button className="btn btn-sm btn-light text-primary" style={{marginLeft:'auto', width: '60%', fontWeight: '500', marginTop: '5px', background: '#ddf2ff', padding: '10px', borderRadius: '6px' }}>View Details</button>
                    <button className="btn btn-sm btn-light text-primary fw-bold ms-2" style={{ marginTop: '7px' }} onClick={(e) => handleShowModal(job, e)}>
                        <FaEllipsisV />
                    </button>
                </div>
            </td>
        </tr>
    );
};

const PostedJobTable = () => {
    const { user } = useAuth(); 
    const [jobs, setJobs] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedJob, setSelectedJob] = useState(null);
    const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });
    const [showPromoteModal, setShowPromoteModal] = useState(false);
    const [promotionDate, setPromotionDate] = useState(''); 
    const modalRef = useRef();

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const response = await postToEndpoint('/getPostJobs.php', { employer_id: user.id });
                if (response.data?.jobs) {
                    setJobs(response.data.jobs);
                } else {
                    console.error('No jobs found or an error occurred:', response.data.error);
                }
            } catch (error) {
                console.error('Error fetching jobs:', error);
            }
        };
    
        fetchJobs();
    }, []);

    const handleShowModal = (job, event) => {
        setSelectedJob(job);
        const buttonRect = event.target.getBoundingClientRect();
        setModalPosition({
            top: buttonRect.bottom + window.scrollY,
            left: buttonRect.left + window.scrollX,
        });
        setShowModal(true);
    };

    const handleOutsideClick = (event) => {
        if (modalRef.current && !modalRef.current.contains(event.target)) {
            setShowModal(false);
        }
    };

   {/* Scroll Disable/Enable Logic */}
useEffect(() => {
    if (showPromoteModal) {
        document.body.style.overflow = 'hidden';  
    } else {
        document.body.style.overflow = 'auto';  
    }
    return () => {
        document.body.style.overflow = 'auto';  
    };
}, [showPromoteModal]);

    const handleOptionClick = (option) => {
        if (option === 'Promote Job') {
            setShowPromoteModal(true);  
        }
        console.log(`${option} for job: ${selectedJob.name}`);
        setShowModal(false);
    };

    const handlePromoteSubmit = () => {
        console.log(`Promoting job: ${selectedJob.name}`);
        setShowPromoteModal(false);  
    };

    return (
        <div className="container-fluid px-0">
            <div className="table-responsive">
                <table className="table" style={{ width: '100%', minWidth: '1000px' }}>
                    <thead className="thead-light">
                        <tr>
                            <th style={{ color: '#676767', background: '#ebebebc2' }}>Jobs</th>
                            <th style={{ color: '#676767', background: '#ebebebc2' }}>Status</th>
                            <th style={{ color: '#676767', background: '#ebebebc2' }}>Applications</th>
                            <th style={{ color: '#676767', background: '#ebebebc2' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                    {jobs.map((job) => (
                        <JobRow key={`${job.id}-${job.jobTitle}`} job={job} handleShowModal={handleShowModal} />
                    ))}
                    </tbody>
                </table>
            </div>

           {/* Main modal */}
{showModal && (
    <div
        ref={modalRef}
        className="modal-content"
        style={{
            position: 'absolute',
            top: `${modalPosition.top}px`,
            left: `${modalPosition.left}px`,
            zIndex: 950,
            minWidth: '120px',  
            maxWidth: '160px', 
            padding: '5px', 
            borderRadius: '8px',
            backgroundColor: '#fff',
            border: '1px solid #ccc',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        }}
    >
        <div className="modal-body p-0">
            <ul className="list-unstyled mb-0">
                <li className="mb-1">
                    <button className="btn btn-sm w-100 text-start text-muted text-decoration-none" style={{ padding: '4px 8px', transition: 'background-color 0.2s' }} onMouseOver={(e) => e.target.style.backgroundColor = '#d1ecf1'} onMouseOut={(e) => e.target.style.backgroundColor = 'transparent'} onClick={() => handleOptionClick('Promote Job')}>
                        <FaBullhorn className="me-2" /> Promote Job
                    </button>
                </li>
                <li className="mb-1">
                    <button className="btn btn-sm w-100 text-start text-muted text-decoration-none" style={{ padding: '4px 8px', transition: 'background-color 0.2s' }} onMouseOver={(e) => e.target.style.backgroundColor = '#d1ecf1'} onMouseOut={(e) => e.target.style.backgroundColor = 'transparent'} onClick={() => handleOptionClick('View Detail')}>
                        <FaEye className="me-2" /> View Detail
                    </button>
                </li>
                <li>
                    <button className="btn btn-sm w-100 text-start text-muted text-decoration-none" style={{ padding: '4px 8px', transition: 'background-color 0.2s' }} onMouseOver={(e) => e.target.style.backgroundColor = '#d1ecf1'} onMouseOut={(e) => e.target.style.backgroundColor = 'transparent'} onClick={() => handleOptionClick('Make it Expire')}>
                        <FaClock className="me-2" /> Make it Expire
                    </button>
                </li>
            </ul>
        </div>
    </div>
)}

{/* Promote modal */}
{showPromoteModal && (
    <div
        className="modal-overlay"
        style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000,
        }}
    >
        <div
            className="modal-content"
            style={{
                width: '450px',
                padding: '20px',
                borderRadius: '8px',
                backgroundColor: '#fff',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                position: 'relative',
            }}
        >
            {/* Close Button */}
            <button
                className="btn-close"
                onClick={() => setShowPromoteModal(false)}
                style={{
                    position: 'absolute',
                    top: '10px', 
                    right: '10px', 
                    border: 'none',
                    fontSize: '20px',
                    cursor: 'pointer',
                    zIndex: 1100, 
                }}
                aria-label="Close"
            >
             
            </button>

            {/* Modal Header */}
            <h5 className="mb-3 text-center">Promote Job: {selectedJob?.jobTitle}</h5>

            {/* Calendar and Date Field */}
            <div
                className="calendar-container"
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    width: '100%',
                }}
            >
                {/* Calendar */}
                <DatePicker
                    selected={promotionDate}
                    onChange={(date) => setPromotionDate(date)}
                    className="form-control"
                    dateFormat="MM/dd/yyyy"
                    showPopperArrow={false}
                    open={true}
                    inline
                />
                {/* Selected Date Field */}
                <input
                    type="text"
                    value={promotionDate ? promotionDate.toLocaleDateString() : ''}
                    readOnly
                    className="form-control mt-3"
                    style={{ textAlign: 'center' }}
                    placeholder="Selected date will appear here"
                />
            </div>

            {/* Action Button */}
            <div className="d-flex justify-content-center mt-3 w-100">
                <button className="btn btn-sm btn-primary" onClick={handlePromoteSubmit}>Promote</button>
            </div>
        </div>
    </div>
)}

        </div>
    );
};

export default PostedJobTable;
