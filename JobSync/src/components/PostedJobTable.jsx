import React, { useState, useRef, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaUsers, FaEllipsisV, FaBullhorn, FaEye, FaClock } from 'react-icons/fa';

const jobData = [
    { id: 1, name: 'Software Engineer', jobType: 'Full-time', status: 'Active', applications: 24 },
    { id: 2, name: 'Product Manager', jobType: 'Part-time', status: 'Pending', applications: 18 },
    { id: 3, name: 'Graphic Designer', jobType: 'Freelance', status: 'Expired', applications: 12 },
    { id: 4, name: 'Data Scientist', jobType: 'Full-time', status: 'Active', applications: 30 },
    { id: 5, name: 'UI/UX Designer', jobType: 'Part-time', status: 'Pending', applications: 15 },
    { id: 6, name: 'Project Coordinator', jobType: 'Freelance', status: 'Expired', applications: 20 },
    { id: 7, name: 'Backend Developer', jobType: 'Full-time', status: 'Active', applications: 22 },
    { id: 8, name: 'Marketing Specialist', jobType: 'Part-time', status: 'Pending', applications: 17 },
    { id: 9, name: 'Content Writer', jobType: 'Freelance', status: 'Expired', applications: 8 },
    { id: 10, name: 'Sales Manager', jobType: 'Full-time', status: 'Active', applications: 25 },
];

const JobRow = ({ job, handleShowModal }) => (
    <tr key={job.id} className="border-bottom">
        <td style={{ textAlign: 'left' }}>
            <div>
                <h6 className="mb-0" style={{ padding: '5px' }}>{job.name}</h6>
                <small className="text-muted">{job.jobType}</small>
            </div>
        </td>
        <td className="text-center">
            <span className={`badge ${job.status === 'Active' ? 'bg-success' : job.status === 'Pending' ? 'bg-warning' : 'bg-secondary'}`}>
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
            <div className="d-flex justify-content-center align-items-center">
                <button className="btn btn-sm btn-light text-primary fw-bold">View Application</button>
                <button className="btn btn-sm btn-light text-primary fw-bold ms-2" onClick={(e) => handleShowModal(job, e)}>
                    <FaEllipsisV />
                </button>
            </div>
        </td>
    </tr>
);

const PostedJobTable = () => {
    const [showModal, setShowModal] = useState(false);
    const [selectedJob, setSelectedJob] = useState(null);
    const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });
    const modalRef = useRef();

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

    useEffect(() => {
        if (showModal) {
            document.addEventListener('mousedown', handleOutsideClick);
        } else {
            document.removeEventListener('mousedown', handleOutsideClick);
        }
        return () => document.removeEventListener('mousedown', handleOutsideClick);
    }, [showModal]);

    const handleOptionClick = (option) => {
        console.log(`${option} for job: ${selectedJob.name}`);
        setShowModal(false);
    };

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
                            <JobRow key={job.id} job={job} handleShowModal={handleShowModal} />
                        ))}
                    </tbody>
                </table>
            </div>

            {showModal && (
                <div
                ref={modalRef}
                className="modal-content"
                style={{
                    position: 'absolute',
                    top: `${modalPosition.top}px`,
                    left: `${modalPosition.left}px`,
                    zIndex: 950,
                    minWidth: '150px',
                    maxWidth: '200px',
                    padding: '3px',
                    borderRadius: '8px',
                    backgroundColor: '#fff',
                    border: '1px solid #ccc',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                }}
            >
                    <div className="modal-body p-0">
    <ul className="list-unstyled mb-0">
        <li className="mb-1">
            <button 
                className="btn btn-sm w-100 text-start text-muted text-decoration-none"
                style={{ padding: '4px 8px', transition: 'background-color 0.2s' }}
                onMouseOver={(e) => e.target.style.backgroundColor = '#d1ecf1'}
                onMouseOut={(e) => e.target.style.backgroundColor = 'transparent'}
                onClick={() => handleOptionClick('Promote Job')}
            >
                <FaBullhorn className="me-2" /> Promote Job
            </button>
        </li>
        <li className="mb-1">
            <button 
                className="btn btn-sm w-100 text-start text-muted text-decoration-none"
                style={{ padding: '4px 8px', transition: 'background-color 0.2s' }}
                onMouseOver={(e) => e.target.style.backgroundColor = '#d1ecf1'}
                onMouseOut={(e) => e.target.style.backgroundColor = 'transparent'}
                onClick={() => handleOptionClick('View Detail')}
            >
                <FaEye className="me-2" /> View Detail
            </button>
        </li>
        <li>
            <button 
                className="btn btn-sm w-100 text-start text-muted text-decoration-none"
                style={{ padding: '4px 8px', transition: 'background-color 0.2s' }}
                onMouseOver={(e) => e.target.style.backgroundColor = '#d1ecf1'}
                onMouseOut={(e) => e.target.style.backgroundColor = 'transparent'}
                onClick={() => handleOptionClick('Make it Expire')}
            >
                <FaClock className="me-2" /> Make it Expire
            </button>
        </li>
    </ul>
</div>



                </div>
            )}
        </div>
    );
};

export default PostedJobTable;
