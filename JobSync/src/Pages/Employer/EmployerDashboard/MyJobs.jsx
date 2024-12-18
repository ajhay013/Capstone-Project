import React, { useState, useEffect } from 'react';
import EmployerSidebar from '../../../components/EmployerSidebar';
import PostedJobTable from '../../../components/PostedJobTable';
import { useAuth } from '../../../AuthContext'; 
import { postToEndpoint } from '../../../components/apiService';


export default function MyJobs() {
    const { user } = useAuth(); 
    const [jobs, setJobs] = useState([]); 

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const response = await postToEndpoint('/countPostjobs.php', { employer_id: user.id });
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
    }, [user.id]); 

    return (
        <div className="d-flex">
            <div className="sidebar" style={{ width: '20%', minWidth: '250px' }}>
                <EmployerSidebar /> 
            </div>
            <div className="flex-grow-1 p-3" style={{ marginTop: '60px', marginRight: '194px', width: '120%' }}>
            <nav aria-label="breadcrumb" style={{marginTop: '-28px'}}>
                <ol className="breadcrumb">
                <li className="breadcrumb-item">
                    <a href="/employer/myjobs" style={{textDecoration: 'none', color: '#757575' }} >My Jobs</a>
                </li>
                </ol> 
            </nav>
                <h2 className="mb-3 text-left" style={{ fontSize: '20px', color: '#575757', fontWeight: '600', marginBottom: '20px', marginTop: '25px', textAlign: 'left', marginLeft: '15px' }}>
                    My Jobs {jobs.total_jobs > 0 ? `(${jobs.total_jobs})` : ''}
                </h2>
                <PostedJobTable /> 
            </div>
        </div>
    );
}
