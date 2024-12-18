import React from 'react';
import ApplicantsSidebar from '../../../components/applicantsidebar';
import JobAlers from '../../../components/JobAlertTable';

export default function JobsAlert() {
    return (
        <div className="d-flex">
            <div className="sidebar" style={{ width: '20%', minWidth: '250px' }}>
                <ApplicantsSidebar /> 
            </div>
            <div className="content" style={{ width: '100vw' , marginTop: '60px', textAlign: 'left' }}>
                <h2 style={{fontSize: '17px', color: '#333', fontWeight: '500', marginBottom: '20px', marginTop: '25px', textAlign: 'left' , marginLeft: '20px'}}>
                        Job Alerts <span style={{color: '#656565', fontSize: '14px'}}>(10)</span></h2>
                <JobAlers />
            </div>
        </div>
    );
}
