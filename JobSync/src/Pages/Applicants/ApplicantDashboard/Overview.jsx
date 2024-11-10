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
                    <div className="col-md-1 mb-3">
                        <div
                            className="border rounded shadow-sm p-3"
                            style={{
                                height: '120px',
                                width: '310px',
                                backgroundColor: '#b8e2fe',
                                color: 'black',
                                margin: '0 5px', 
                            }}
                        >
                            <div className="d-flex justify-content-between align-items-center">
                                <div>
                                    <p className="fs-3">5</p>
                                    <h6 style={{fontSize: '16px', color: '#2d2d2d'}}>Applied Jobs</h6>
                                </div>
                                <div
                                    style={{
                                        backgroundColor: '#E7F0FA',
                                        padding: '8px',
                                        borderRadius: '8px',
                                    }}
                                >
                                    <FaBriefcase size={40} style={{ color: '#0A65CC', width: '58%' }} />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Favorite Jobs Card */}
                    <div className="col-md-1 mb-3">
                        <div
                            className="border rounded shadow-sm p-3"
                            style={{
                                height: '120px',
                                width: '310px', // Increased width
                                backgroundColor: '#ffd4bb',
                                color: 'black',
                                margin: '0 5px', // Reduced margin
                            }}
                        >
                            <div className="d-flex justify-content-between align-items-center">
                                <div>
                                    <p className="fs-3">3</p>
                                    <h6 style={{fontSize: '16px', color: '#2d2d2d'}}>Favorite Jobs</h6>
                                </div>
                                <div
                                    style={{
                                        backgroundColor: '#E7F0FA',
                                        padding: '10px',
                                        borderRadius: '8px',
                                        width: '55px'
                                    }}
                                >
                                    <FontAwesomeIcon icon={farBookmark} size="2x" style={{ color: '#FF8616', width: '48%' }} />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Job Alerts Card */}
                    <div className="col-md-4 mb-3">
                        <div
                            className="border rounded shadow-sm p-3"
                            style={{
                                height: '120px',
                                width: '310px', // Increased width
                                backgroundColor: '#d7ffd4',
                                color: 'black',
                                margin: '0 5px', // Reduced margin
                            }}
                        >
                            <div className="d-flex justify-content-between align-items-center">
                                <div>
                                    <p className="fs-3">2</p>
                                    <h6 style={{fontSize: '16px', color: '#2d2d2d'}}>Job Alerts</h6>
                                </div>
                                <div
                                    style={{
                                        backgroundColor: '#E7F0FA',
                                        padding: '9px',
                                        borderRadius: '8px',
                                    }}
                                >
                                    <FaBell size={40} style={{ color: '#169E5D', width: '48%' }} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Heading above Applied Jobs Table with Custom View All button */}
                <div className="d-flex justify-content-between align-items-center mb-2">
                    <h3 style={{ fontSize: '15px', fontWeight: '500', color: '#333', marginBottom: '-20px' }}>Recently Applied</h3>
                    <button
                        className="btn"
                        style={{
                            color: '#4b4b4b',
                            fontWeight: '500',
                            padding: '0.5rem 1.5rem',
                            display: 'flex',
                            alignItems: 'center',
                        }}
                    >
                        View All <FaArrowRight style={{ marginLeft: '8px' }} />
                    </button>
                </div>
                <AppliedJobsTable />
            </div>
        </div>
    );
}
