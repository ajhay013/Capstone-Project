import React from 'react';
import EmployerSidebar from '../../../components/EmployerSidebar';
import PostedJobTable from '../../../components/PostedJobTable';

export default function MyJobs() {
    return (
        <div className="d-flex">
            <div className="sidebar" style={{ width: '20%', minWidth: '250px' }}>
                <EmployerSidebar /> 
            </div>
            <div className="content" style={{ width: '80%' , marginTop: '60px', textAlign: 'left' , marginLeft: '30px' }}>
                <h2 style={{fontSize: '24px', color: '#333', fontWeight: 'bold', marginBottom: '20px', marginTop: '25px', textAlign: 'left' , marginLeft: '15px'}}>My Jobs (10)</h2>
                <PostedJobTable />
            </div>
        </div>
    );
}
