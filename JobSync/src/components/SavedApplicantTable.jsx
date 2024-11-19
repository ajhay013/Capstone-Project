import React, { useState, useRef, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaBookmark, FaArrowRight, FaEllipsisV, FaEnvelope, FaDownload, FaComment } from 'react-icons/fa';

const applicantData = [
    {
        id: 1,
        name: 'John Doe',
        desiredPosition: 'Marketing Officer',
        image: '../../src/assets/berns.jpg', 
    },
    {
        id: 2,
        name: 'Jane Smith',
        desiredPosition: 'UI/UX Designer',
        image: '../../src/assets/berns.jpg', 
    },
    {
        id: 3,
        name: 'Mike Johnson',
        desiredPosition: 'Software Engineer',
        image: '../../src/assets/berns.jpg', 
    },
    {
        id: 4,
        name: 'Emily Davis',
        desiredPosition: 'Graphic Designer',
        image: '../../src/assets/berns.jpg', 
    },
    {
        id: 5,
        name: 'David Wilson',
        desiredPosition: 'Data Analyst',
        image: '../../src/assets/berns.jpg', 
    },
    {
        id: 6,
        name: 'Sophia Brown',
        desiredPosition: 'Project Manager',
        image: '../../src/assets/berns.jpg', 
    },
    {
        id: 7,
        name: 'James Taylor',
        desiredPosition: 'Backend Developer',
        image: '../../src/assets/berns.jpg', 
    },
    {
        id: 8,
        name: 'Olivia Martinez',
        desiredPosition: 'Front-end Developer',
        image: '../../src/assets/berns.jpg', 
    },
    {
        id: 9,
        name: 'Lucas Anderson',
        desiredPosition: 'Sales Representative',
        image: '../../src/assets/berns.jpg', 
    },
    {
        id: 10,
        name: 'Mia Thomas',
        desiredPosition: 'Content Writer',
        image: '../../src/assets/berns.jpg', 
    },
];

const ApplicantRow = ({ applicant, handleShowModal }) => (
    <tr key={applicant.id} className="border-bottom">
        <td style={{ textAlign: 'left', padding: '15px' }}>
            <div className="d-flex align-items-center">
                <img src={applicant.image} alt={applicant.name} className="rounded-circle me-2" style={{ width: '50px', height: '50px' }} />
                <div>
                    <h6 className="mb-0">{applicant.name}</h6>
                    <small className="text-muted">{applicant.desiredPosition}</small>
                </div>
            </div>
        </td>
        <td style={{ textAlign: 'right' }}>
            <div className="d-flex align-items-center justify-content-end">
                <FaBookmark className="me-2" style={{color: '#096fc8', height: '21px'}}/>
                <button className="btn btn-sm btn-light text-primary"  style={{marginLeft: '13px', width: '40%', fontWeight: '500', marginTop: '5px', background: '#ddf2ff', padding: '13px', borderRadius: '6px' }}>
                    View Profile <FaArrowRight className="ms-1" />
                </button>
                <button className="btn btn-sm btn-light text-primary fw-bold ms-2" style={{ marginTop: '7px' }} onClick={(event) => handleShowModal(applicant, event)}>
                        <FaEllipsisV />
                </button>
            </div>
            
        </td>
    </tr>
);


const ApplicantsTable = () => {
    const [showModal, setShowModal] = useState(false);
    const [selectedApplicant, setSelectedApplicant] = useState(null);
    const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });
    const modalRef = useRef();

    const handleShowModal = (applicant, event) => {
        setSelectedApplicant(applicant);
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
        console.log(`${option} for applicant: ${selectedApplicant.name}`);
        setShowModal(false);
    };

    return (
        <div className="container-fluid px-0">
            <div className="table-responsive">
                <table className="table" style={{ width: '100%', tableLayout: 'fixed' }}>
                    <tbody>
                        {applicantData.map((applicant) => (
                            <ApplicantRow key={applicant.id} applicant={applicant} handleShowModal={handleShowModal} />
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
                onClick={() => handleOptionClick('Send Email')}
            >
                <FaEnvelope className="me-2" /> Send Email
            </button>
        </li>
        <li className="mb-1">
            <button
                className="btn btn-sm w-100 text-start text-muted text-decoration-none"
                style={{ padding: '4px 8px', transition: 'background-color 0.2s' }}
                onMouseOver={(e) => e.target.style.backgroundColor = '#d1ecf1'}
                onMouseOut={(e) => e.target.style.backgroundColor = 'transparent'}
                onClick={() => handleOptionClick('Send Message')}
            >
                <FaComment className="me-2" /> Send Message
            </button>
        </li>
        <li>
            <button
                className="btn btn-sm w-100 text-start text-muted text-decoration-none"
                style={{ padding: '4px 8px', transition: 'background-color 0.2s' }}
                onMouseOver={(e) => e.target.style.backgroundColor = '#d1ecf1'}
                onMouseOut={(e) => e.target.style.backgroundColor = 'transparent'}
                onClick={() => handleOptionClick('Download CV')}
            >
                <FaDownload className="me-2" /> Download CV
            </button>
        </li>
    </ul>
</div>

                </div>
            )}
        </div>
    );
};

export default ApplicantsTable;
