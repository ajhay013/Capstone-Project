import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Pagination from './Pagination';
import { useAuth } from '../AuthContext'; 
import { getFromEndpoint } from '../components/apiService';

function FavoriteJob() {
  const { user } = useAuth(); 
  const [jobs, setJobs] = useState([]);  
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; 

  useEffect(() => {
      if (!user || !user.id) {
          console.error('Applicant ID is required');
          return;
      }
  
      const fetchFavoriteJobs = async () => {
          try {
              const response = await getFromEndpoint('/getAllFavoriteJob.php', { applicant_id: user.id });
              const fetchedJobs = Array.isArray(response.data) ? response.data : response.data.favoriteJobs || [];
              setJobs(fetchedJobs); 
          } catch (error) {
              console.error('There was an error fetching the jobs data!', error);
          }
      };
  
      fetchFavoriteJobs(); 
  }, [user]); 

  const indexOfLastJob = currentPage * itemsPerPage;
  const indexOfFirstJob = indexOfLastJob - itemsPerPage;
  const currentJobs = Array.isArray(jobs) ? jobs.slice(indexOfFirstJob, indexOfLastJob) : []; 

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container-fluid p-0" style={{ marginLeft: '16px' }}>
      {currentJobs.length > 0 ? (
        currentJobs.map((job, index) => (
          <div key={job.id || index} className="d-flex justify-content-between align-items-start p-3 border-bottom">

            <div className="d-flex align-items-start">
              <img
                src={job.logo}
                alt="Job Logo"
                className="me-3"
                style={{ width: '50px', height: '50px' }}
              />
              <div>
                <div className="d-flex align-items-start mb-2">
                  <h6 className="mb-0 me-3" style={{color: '#373737'}}>{job.jobTitle}</h6>
                  <span
                    className="badge" 
                    style={{
                      background: '#cde8ff',
                      padding: '7px 13px',
                      color: '#0076df',
                      fontWeight: '600',
                      borderRadius: '50px',
                      fontSize: '11px'
                    }}
                  >
                    {job.jobType}
                  </span>
                </div>
                <small className="text-muted d-flex align-items-center mb-1">
                  <i className="fas fa-map-marker-alt me-1"></i>
                  <span className="me-2">{job.city}</span> | 
                  <span className="ms-2">₱{job.minSalary}</span>
                  <span className="ms-2">-</span>
                  <span className="ms-2">₱{job.maxSalary}</span>
                </small>
              </div>
            </div>
            <div className="d-flex align-items-center">
              <i className="fas fa-bookmark me-3" style={{ cursor: 'pointer' }}></i>
              <button className="btn btn-primary btn-sm"
              style={{
                width: '150px',
                height: '46px',
                fontWeight: '500',
                marginTop: '5px',
                background: '#ddf2ff',
                color: '#0064ff',
                padding: '10px',
                borderRadius: '3px',
                fontSize:'13px',
                border: 'none'
              }}
              >
                View Details <i className="fas fa-arrow-right" style={{ marginLeft: '10px' }}></i>
              </button>
            </div>
          </div>
        ))
      ) : (
        <p>No favorite jobs found.</p>  
      )}
      
      <Pagination
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        totalItems={jobs.length}
        paginate={paginate}
      />
    </div>
  );
}

export default FavoriteJob;
