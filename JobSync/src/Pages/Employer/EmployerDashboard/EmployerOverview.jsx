import React from 'react';
import EmployerSidebar from '../../../components/EmployerSidebar';
import PostedJobTable from '../../../components/PostedJobTable';
import { FaBriefcase, FaUser, FaEnvelope, FaArrowRight } from 'react-icons/fa';

export default function EmployerOverview() {
    return (
        <>
            <div style={{ display: 'flex' }}>
                <EmployerSidebar />
                <div className="flex-grow-1 p-4" style={{ marginTop: '60px', marginLeft: '-10px' }}>
                    {/* Open Jobs, Saved Applicants, and Messages Cards */}
                    <div className="row mb-4 justify-content-between">
                        {/* Open Jobs Card */}
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
                                        <p className="fs-4">10</p>
                                        <h5>Open Jobs</h5>
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

                        {/* Saved Applicants Card */}
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
                                        <p className="fs-4">5</p>
                                        <h5>Saved Applicants</h5>
                                    </div>
                                    <div
                                        style={{
                                            backgroundColor: '#E7F0FA',
                                            padding: '10px',
                                            borderRadius: '8px',
                                        }}
                                    >
                                        <FaUser size={40} style={{ color: '#FF8616' }} />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Messages Card */}
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
                                        <p className="fs-4">8</p>
                                        <h5>Messages</h5>
                                    </div>
                                    <div
                                        style={{
                                            backgroundColor: '#E7F0FA',
                                            padding: '10px',
                                            borderRadius: '8px',
                                        }}
                                    >
                                        <FaEnvelope size={40} style={{ color: '#169E5D' }} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Heading above Applied Jobs Table with Custom View All button */}
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <h3 style={{ fontSize: '24px', fontWeight: 'bold', color: '#333' }}>Recently Posted Jobs</h3>
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
                    <PostedJobTable />
                </div>
            </div>
        </>
    );
}
