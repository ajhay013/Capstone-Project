import React from 'react';
import ApplicantsSidebar from '../../../components/applicantsidebar';
import AppliedJobsTable from '../../../components/JobTable';
import { FaBriefcase, FaBell, FaArrowRight } from 'react-icons/fa';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark as farBookmark } from '@fortawesome/free-regular-svg-icons';

export default function Overview() {
    return (
        <div className="d-flex">
            <ApplicantsSidebar />

            <div className="flex-grow-1 p-4" style={{ marginTop: '60px', marginLeft: '-10px' }}>
                {/* Applied Jobs, Favorite Jobs, and Job Alerts */}
                <div className="row mb-4 justify-content-between">
                    {/* Applied Jobs Card */}
                    <div className="col-md-3 mb-3">
                        <div
                            className="border rounded shadow-sm p-3"
                            style={{
                                height: '120px',
                                width: '280px', // Increased width
                                backgroundColor: '#b8e2fe',
                                color: 'black',
                                margin: '0 5px', // Reduced margin
                            }}
                        >
                            <div className="d-flex justify-content-between align-items-center">
                                <div>
                                    <p className="fs-4">5</p>
                                    <h5>Applied Jobs</h5>
                                </div>
                                <div
                                    style={{
                                        backgroundColor: '#E7F0FA',
                                        padding: '10px',
                                        borderRadius: '8px',
                                    }}
                                >
                                    <FaBriefcase size={40} style={{ color: '#0A65CC' }} />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Favorite Jobs Card */}
                    <div className="col-md-3 mb-3">
                        <div
                            className="border rounded shadow-sm p-3"
                            style={{
                                height: '120px',
                                width: '280px', // Increased width
                                backgroundColor: '#ffb78e',
                                color: 'black',
                                margin: '0 5px', // Reduced margin
                            }}
                        >
                            <div className="d-flex justify-content-between align-items-center">
                                <div>
                                    <p className="fs-4">3</p>
                                    <h5>Favorite Jobs</h5>
                                </div>
                                <div
                                    style={{
                                        backgroundColor: '#E7F0FA',
                                        padding: '10px',
                                        borderRadius: '8px',
                                    }}
                                >
                                    <FontAwesomeIcon icon={farBookmark} size="2x" style={{ color: '#FF8616' }} />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Job Alerts Card */}
                    <div className="col-md-3 mb-3">
                        <div
                            className="border rounded shadow-sm p-3"
                            style={{
                                height: '120px',
                                width: '280px', // Increased width
                                backgroundColor: '#b1fbab',
                                color: 'black',
                                margin: '0 5px', // Reduced margin
                            }}
                        >
                            <div className="d-flex justify-content-between align-items-center">
                                <div>
                                    <p className="fs-4">2</p>
                                    <h5>Job Alerts</h5>
                                </div>
                                <div
                                    style={{
                                        backgroundColor: '#E7F0FA',
                                        padding: '10px',
                                        borderRadius: '8px',
                                    }}
                                >
                                    <FaBell size={40} style={{ color: '#169E5D' }} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Heading above Applied Jobs Table with Custom View All button */}
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h3 style={{ fontSize: '24px', fontWeight: 'bold', color: '#333' }}>Recently Applied</h3>
                    <button
                        className="btn"
                        style={{
                            backgroundColor: '#007bff',
                            color: '#fff',
                            borderRadius: '20px',
                            fontWeight: '500',
                            padding: '0.5rem 1.5rem',
                            display: 'flex',
                            alignItems: 'center',
                        }}
                    >
                        View All <FaArrowRight style={{ marginLeft: '8px' }} />
                    </button>
                </div>

                {/* Applied Jobs Table */}
                <AppliedJobsTable />
            </div>
        </div>
    );
}
