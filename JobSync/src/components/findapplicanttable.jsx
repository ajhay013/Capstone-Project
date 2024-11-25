import React, { useState, useRef, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaBookmark, FaArrowRight, FaEllipsisV, FaEnvelope, FaDownload, FaMapMarkerAlt } from 'react-icons/fa';

import ViewProfileModal from '../components/viewprofilemodal';

const applicantData = [
    {
        id: 1,
        name: 'John Doe',
        desiredPosition: 'Marketing Officer',
        location: 'New York, NY',
        image: '../../src/assets/user.png',
    },
    {
        id: 2,
        name: 'Jane Smith',
        desiredPosition: 'UI/UX Designer',
        location: 'Los Angeles, CA',
        image: '../../src/assets/user.png',
    },
    {
        id: 3,
        name: 'Mike Johnson',
        desiredPosition: 'Software Engineer',
        location: 'San Francisco, CA',
        image: '../../src/assets/user.png',
    },
    {
        id: 4,
        name: 'Emily Davis',
        desiredPosition: 'Graphic Designer',
        location: 'Chicago, IL',
        image: '../../src/assets/user.png',
    },
    {
        id: 5,
        name: 'David Wilson',
        desiredPosition: 'Data Analyst',
        location: 'Austin, TX',
        image: '../../src/assets/user.png',
    },
    {
        id: 6,
        name: 'Sophia Brown',
        desiredPosition: 'Project Manager',
        location: 'Seattle, WA',
        image: '../../src/assets/user.png',
    },
    {
        id: 7,
        name: 'James Taylor',
        desiredPosition: 'Backend Developer',
        location: 'Denver, CO',
        image: '../../src/assets/user.png',
    },
    {
        id: 8,
        name: 'Olivia Martinez',
        desiredPosition: 'Front-end Developer',
        location: 'Miami, FL',
        image: '../../src/assets/user.png',
    },
    {
        id: 9,
        name: 'Lucas Anderson',
        desiredPosition: 'Sales Representative',
        location: 'Dallas, TX',
        image: '../../src/assets/user.png',
    },
    {
        id: 10,
        name: 'Mia Thomas',
        desiredPosition: 'Content Writer',
        location: 'Boston, MA',
        image: '../../src/assets/user.png',
    },
];

const ApplicantRow = ({ applicant, handleShowModal }) => (
    <tr key={applicant.id} className="border-bottom">
        <td style={{ textAlign: 'left' }}>
            <div className="d-flex align-items-center">
                <img src={applicant.image} alt={applicant.name} className="rounded-circle me-2" style={{ width: '50px', height: '50px' }} />
                <div>
                    <h6 className="mb-0">{applicant.name}</h6>
                    <small className="text-muted">{applicant.desiredPosition}</small>
                    <div className="d-flex align-items-center mt-1">
                        <FaMapMarkerAlt className="me-2" style={{ color: '#6c757d' }} />
                        <small className="text-muted">{applicant.location}</small>
                    </div>
                </div>
            </div>
        </td>
        <td style={{ textAlign: 'right' }}>
            <div className="d-flex align-items-center justify-content-end">
                <FaBookmark className="me-2" />
                <button
                    className="btn btn-sm btn-light text-primary fw-bold"
                    onClick={() => handleShowModal(applicant)}
                >
                    View Profile <FaArrowRight className="ms-1" />
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
        setSelectedApplicant(applicant); // Set the selected applicant
        setShowModal(true); // Show modal
    };

    const handleCloseModal = () => {
        setShowModal(false); // Close the modal
    };

    const handleOutsideClick = (event) => {
        if (modalRef.current && !modalRef.current.contains(event.target)) {
            setShowModal(false); // Close modal if clicked outside
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

    return (
        <div className="container" style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '16px', marginTop: '-50px', boxShadow: "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px" }}>
            <h5 className="mb-3">Applicants List</h5>
            <div className="table-responsive">
                <table className="table" style={{ width: '100%', tableLayout: 'auto' }}>
                    <tbody>
                        {applicantData.map((applicant) => (
                            <ApplicantRow key={applicant.id} applicant={applicant} handleShowModal={handleShowModal} />
                        ))}
                    </tbody>
                </table>
            </div>

            {/* View Profile Modal */}
            <ViewProfileModal
                show={showModal}
                handleClose={handleCloseModal}
                applicant={selectedApplicant}
            />

        </div>
    );
};

export default ApplicantsTable;
