import React from 'react';
import ApplicantsSidebar from '../../../components/applicantsidebar';
import AppliedJobsTable from '../../../components/JobTable';
import SearchBar2 from '../../../components/searchbar2'; 

export default function AppliedJobs() {
    return (
        <>
            <div className="d-flex">
                <div className="sidebar" style={{ width: '100%' }}>
                    <ApplicantsSidebar />
                </div>

                <div className="flex-grow-1 p-3" style={{ marginTop: '60px', marginRight: '194px', width: '120%' }}>
                    <div className="mt-0 mb-3"> 
                        <SearchBar2 placeholder="Search applied jobs..." /> 
                    </div>

                    <h2
                        className="mb-3 text-left"
                        style={{
                            fontSize: '16px',
                            color: '#333',
                            fontWeight: '500',
                            marginTop: '25px',
                            textAlign: 'left',
                        }}
                    >
                        Applied Jobs (10)
                    </h2>
                    
                    <AppliedJobsTable />
                </div>
            </div>
        </>
    );
}
