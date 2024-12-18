import React, { useState, useRef, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaBookmark, FaArrowRight, FaEllipsisV, FaEnvelope, FaDownload, FaComment, FaArrowLeft } from 'react-icons/fa';

const applicantData = [
    {
        id: 1,
        name: 'John Doe',
        desiredPosition: 'Marketing Officer',
        image: '../../src/assets/profes.jpg',
    },
    {
        id: 2,
        name: 'Jane Smith',
        desiredPosition: 'UI/UX Designer',
        image: '../../src/assets/profes.jpg',
    },
    {
        id: 3,
        name: 'Mike Johnson',
        desiredPosition: 'Software Engineer',
        image: '../../src/assets/profes.jpg',
    },
    {
        id: 4,
        name: 'Emily Davis',
        desiredPosition: 'Graphic Designer',
        image: '../../src/assets/profes.jpg',
    },
    {
        id: 5,
        name: 'David Wilson',
        desiredPosition: 'Data Analyst',
        image: '../../src/assets/profes.jpg',
    },
    {
        id: 6,
        name: 'Sophia Brown',
        desiredPosition: 'Project Manager',
        image: '../../src/assets/profes.jpg',
    },
    {
        id: 7,
        name: 'James Taylor',
        desiredPosition: 'Backend Developer',
        image: '../../src/assets/profes.jpg',
    },
    {
        id: 8,
        name: 'Olivia Martinez',
        desiredPosition: 'Front-end Developer',
        image: '../../src/assets/profes.jpg',
    },
    {
        id: 9,
        name: 'Lucas Anderson',
        desiredPosition: 'Sales Representative',
        image: '../../src/assets/profes.jpg',
    },
    {
        id: 10,
        name: 'Mia Thomas',
        desiredPosition: 'Content Writer',
        image: '../../src/assets/profes.jpg',
    },
    {
        id: 11,
        name: 'Lebron James',
        desiredPosition: 'Tindero',
        image: '../../src/assets/profes.jpg',
    },
    {
        id: 12,
        name: 'Jason Tatum',
        desiredPosition: 'Mambabalut',
        image: '../../src/assets/profes.jpg',
    },
];

const ApplicantRow = ({ applicant, handleShowModal }) => (
    <tr key={applicant.id} className="border-bottom">
        <td style={{ textAlign: 'left', padding: '15px' }}>
            <div className="d-flex align-items-center">
                <img src={applicant.image} alt={applicant.name} className="rounded-circle me-2" style={{ width: '50px', height: '50px', objectFit: 'cover' }} />
                <div>
                    <h6 className="mb-0">{applicant.name}</h6>
                    <small className="text-muted">{applicant.desiredPosition}</small>
                </div>
            </div>
        </td>
        <td style={{ textAlign: 'right' }}>
            <div className="d-flex align-items-center justify-content-end">
                <FaBookmark className="me-2" style={{ color: '#096fc8', height: '21px' }} />
                <button className="btn btn-sm btn-light text-primary" style={{ marginLeft: '13px', width: '40%', fontWeight: '500', marginTop: '5px', background: '#ddf2ff', padding: '13px', borderRadius: '6px' }}>
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
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);

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

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentApplicants = applicantData.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="container-fluid px-0">
            <div className="table-responsive">
                <table className="table" style={{ width: '100%', tableLayout: 'fixed' }}>
                    <tbody>
                        {currentApplicants.map((applicant) => (
                            <ApplicantRow key={applicant.id} applicant={applicant} handleShowModal={handleShowModal} />
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination with left and right arrows */}
            <nav aria-label="Page navigation">
                <ul className="pagination justify-content-center">
                    <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`} style={{ borderRadius: '50%', margin: '0 5px', padding: '7px 15px' }}>
                        <button
                            className="page-link"
                            onClick={() => currentPage > 1 && paginate(currentPage - 1)} // Go to the previous page
                            style={{ backgroundColor: '#ebebebc2', color: '#0A65CC', borderRadius: '50%', fontWeight: '500', padding: '10px 15px' }}
                        >
                            <FaArrowLeft style={{marginTop: '-3px'}}/>
                        </button>
                    </li>

                    {Array.from({ length: Math.ceil(applicantData.length / itemsPerPage) }, (_, index) => (
                        <li key={index + 1} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`} style={{ borderRadius: '50%', margin: '0 5px' }}>
                            <button
                                className="page-link"
                                onClick={() => paginate(index + 1)}
                                style={{
                                    backgroundColor: currentPage === index + 1 ? '#0A65CC' : 'white',
                                    color: currentPage === index + 1 ? 'white' : 'black',
                                    borderRadius: '50%',
                                    fontWeight: '500',
                                    padding: '7px 15px',
                                }}
                            >
                                {index + 1}
                            </button>
                        </li>
                    ))}

                    <li className={`page-item ${currentPage === Math.ceil(applicantData.length / itemsPerPage) ? 'disabled' : ''}`} style={{ borderRadius: '50%', margin: '0 5px', padding: '7px 15px' }}>
                        <button
                            className="page-link"
                            onClick={() => currentPage < Math.ceil(applicantData.length / itemsPerPage) && paginate(currentPage + 1)} // Go to the next page
                            style={{ backgroundColor: '#ebebebc2', color: '#0A65CC', borderRadius: '50%', fontWeight: '500', padding: '10px 15px' }}
                        >
                            <FaArrowRight style={{marginTop: '-3px'}}/>
                        </button>
                    </li>
                </ul>
            </nav>

            {/* Modal */}
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
                                    onClick={() => handleOptionClick('Download Resume')}
                                >
                                    <FaDownload className="me-2" /> Download Resume
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
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ApplicantsTable;
