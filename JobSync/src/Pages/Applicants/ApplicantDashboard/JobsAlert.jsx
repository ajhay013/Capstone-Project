import React from 'react';
import AppliedJobsList from '../../../components/FavJobTable';
import ApplicantsSidebar from '../../../components/applicantsidebar';

export default function JobsAlert() {
    return (
        <div className="d-flex">
            <div className="sidebar" style={{ width: '20%', minWidth: '250px' }}>
                <ApplicantsSidebar /> 
            </div>
            <div className="content" style={{ width: '100vw' , marginTop: '60px', textAlign: 'left' }}>
                <h2 style={{fontSize: '17px', color: '#333', fontWeight: '500', marginBottom: '20px', marginTop: '25px', textAlign: 'left' , marginLeft: '20px'}}>
                        Job Alerts <span style={{color: '#656565', fontSize: '14px'}}>(10)</span></h2>
                <AppliedJobsList />
            </div>
        </div>
    );
}
