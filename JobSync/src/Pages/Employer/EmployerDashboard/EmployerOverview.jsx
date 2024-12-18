import React, {useState, useEffect } from 'react';
import EmployerSidebar from '../../../components/EmployerSidebar';
import PostedJobTable from '../../../components/PostedJobTable';
import { FaBriefcase, FaUser, FaEnvelope, FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../AuthContext'
import { postToEndpoint } from '../../../components/apiService';

export default function EmployerOverview() {
    const { user } = useAuth(); 
    const [counts, setJobCounts] = useState([]);
      
    useEffect(() => {
        const fetchCounts = async () => {
            try {
                const response = await postToEndpoint('/getCountJobs.php', { employer_id: user.id });
                console.log(response.data.counts);
                if (response.data.counts) {
                    setJobCounts(response.data.counts);
                } else {
                    console.error('No jobs found or an error occurred:', response.data.error);
                }
            } catch (error) {
                console.error('Error fetching jobs:', error);
            }
        };
        const intervalId = setInterval(() => {
            fetchCounts();
        }, 100); 
        fetchCounts();
        return () => clearInterval(intervalId);
    }, [user.id]);

    return (
        <>
            <div className="d-flex">
                <EmployerSidebar />
                <div className="flex-grow-1 p-4" style={{ marginTop: '60px', marginLeft: '-10px' }}>
                    {/* Open Jobs, Saved Applicants, and Messages Cards */}
                    <div className="row mb-4 justify-content-between">
                        {/* Open Jobs Card */}
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
                                        <p className="fs-3" style={{marginBottom: '18px'}}>{counts[0]?.job_post_count}</p>
                                        <h6 style={{fontSize: '16px', color: '#2d2d2d'}}>Open Jobs</h6>
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

                        {/* Saved Applicants Card */}
                        <div className="col-md-1 mb-3">
                            <div
                                className="border rounded shadow-sm p-3"
                                style={{
                                    height: '120px',
                                    width: '310px', 
                                    backgroundColor: '#ffd4bb',
                                    color: 'black',
                                    margin: '0 5px', 
                                }}
                            >
                                <div className="d-flex justify-content-between align-items-center">
                                    <div>
                                        <p className="fs-3" style={{marginBottom: '18px'}}>5</p>
                                        <h6 style={{fontSize: '16px', color: '#2d2d2d'}}>Saved Applicants</h6>
                                    </div>
                                    <div
                                        style={{
                                            backgroundColor: '#E7F0FA',
                                            padding: '7px',
                                            borderRadius: '8px',
                                            width: '55px'
                                        }}
                                    >
                                        <FaUser size={40} style={{ color: '#FF8616', width: '48%' }} />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Messages Card */}
                        <div className="col-md-4 mb-3">
                            <div
                                className="border rounded shadow-sm p-3"
                                style={{
                                    height: '120px',
                                    width: '310px', 
                                    backgroundColor: '#d7ffd4',
                                    color: 'black',
                                    margin: '0 5px', 
                                }}
                            >
                                <div className="d-flex justify-content-between align-items-center">
                                    <div>
                                        <p className="fs-3" style={{marginBottom: '18px'}}>8</p>
                                        <h6 style={{fontSize: '16px', color: '#2d2d2d'}}>Messages</h6>
                                    </div>
                                    <div
                                        style={{
                                            backgroundColor: '#E7F0FA',
                                            padding: '8px',
                                            borderRadius: '8px',
                                        }}
                                    >
                                        <FaEnvelope size={40} style={{ color: '#169E5D', width: '48%' }} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="d-flex justify-content-between align-items-center mb-2">
                        <h3 style={{ fontSize: '15px', fontWeight: '500', color: '#333', marginBottom: '-20px' }}>Recently Posted Jobs</h3>
                        <Link to = '/employer/myjobs'>
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
                        </Link>
                    </div>

                    <PostedJobTable />
                </div>
            </div>
        </>
    );
}
