import React from 'react';
import AppliedJobsList from '../../../components/FavJobTable';
import ApplicantsSidebar from '../../../components/applicantsidebar';

export default function FavoriteJobs() {
    return (
        <div className="d-flex">
            <div className="sidebar" style={{ width: '20%', minWidth: '250px' }}>
                <ApplicantsSidebar /> 
            </div>
            <div className="content" style={{ width: '80%' , marginTop: '60px', textAlign: 'left' }}>
                <h2 style={{fontSize: '24px', color: '#333', fontWeight: 'bold', marginBottom: '20px', marginTop: '25px', textAlign: 'left' , marginLeft: '20px'}}>Favorite Jobs (10)</h2>
                <AppliedJobsList />
            </div>
        </div>
    );
}
