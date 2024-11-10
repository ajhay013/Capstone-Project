import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaBookmark, FaArrowRight } from 'react-icons/fa';

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

const ApplicantRow = ({ applicant }) => (
    <tr key={applicant.id} className="border-bottom">
        <td style={{ textAlign: 'left' }}>
            <div className="d-flex align-items-center">
                <img src={applicant.image} alt={applicant.name} className="rounded-circle me-2" style={{ width: '50px', height: '50px' }} />
                <div>
                    <h6 className="mb-0">{applicant.name}</h6>
                    <small className="text-muted">{applicant.desiredPosition}</small>
                </div>
            </div>
        </td>
        <td style={{ textAlign: 'right' }}> {/* Align actions to the right */}
            <div className="d-flex align-items-center justify-content-end">
                <FaBookmark className="me-2" />
                <button className="btn btn-sm btn-light text-primary fw-bold" style={{width: '30%', fontWeight: '500', marginTop: '5px', background: '#ddf2ff', padding: '10px', borderRadius: '6px' }}>View Profile <FaArrowRight className="ms-1" /></button>
            </div>
        </td>
    </tr>
);

function ApplicantsTable() {
    return (
        <div className="container-fluid px-0">
            <div className="table-responsive">
                <table className="table" style={{ width: '100%', tableLayout: 'fixed' }}>
                    <tbody>
                        {applicantData.map((applicant) => (
                            <ApplicantRow applicant={applicant} key={applicant.id} />
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ApplicantsTable;
