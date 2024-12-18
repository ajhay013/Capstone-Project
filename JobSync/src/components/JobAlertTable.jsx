import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Pagination from './Pagination';
import { useAuth } from '../AuthContext'; 
import { getFromEndpoint } from '../components/apiService';
import { Link } from 'react-router-dom';

function JobAlers() {
  const { user } = useAuth(); 
  const [jobs, setJobs] = useState([]);  
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; 

  useEffect(() => {
      if (!user || !user.id) {
          console.error('Applicant ID is required');
          return;
      }
  
      const fetchAlertJobs = async () => {
          try {
              const response = await getFromEndpoint('/getAlertJob.php');
              const fetchedJobs = Array.isArray(response.data) ? response.data : response.data.favoriteJobs || [];
              setJobs(fetchedJobs); 
          } catch (error) {
              console.error('There was an error fetching the jobs data!', error);
          }
      };
  
      fetchAlertJobs(); 
  }, [user]); 

  const calculateDaysLeft = (expirationDate) => {
    if (!expirationDate) return '';
    const today = new Date();
    const timeDifference = new Date(expirationDate) - today;
    const daysLeft = Math.ceil(timeDifference / (1000 * 3600 * 24));

    if (daysLeft === 1) {
        return '1 Day';
    } else if (daysLeft > 0) {
        return `${daysLeft} Days`;
    } 
    return null;
};


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

                  {job.freshness === 'New' ? (
                  <span
                    className="badge" 
                    style={{
                      background: '#cde8ff',
                      padding: '7px 13px',
                      color: '#0076df',
                      fontWeight: '600',
                      borderRadius: '50px',
                      fontSize: '11px',
                      marginLeft: '6px'
                    }}
                  >
                    {job.freshness}
                  </span>
                  ) : ('')}
                </div>
                <small className="d-flex align-items-center mb-1" style={{color: '#7e7b7b'}}>
                  <i className="fas fa-map-marker-alt me-1" style={{color: '#3c88cc'}}></i>
                  <span className="me-2">{job.city}</span> 
                  <i className="fas fa-peso-sign ms-1" style={{color: '#9ea0a2'}}></i>
                  <span className="ms-2">₱{job.minSalary}</span>
                  <span className="ms-2">-</span>
                  <span className="ms-2">₱{job.maxSalary}</span>
                  
                    {calculateDaysLeft(job.expirationDate) ? (
                      <>
                      <span className="ms-2">
                        <i className="far fa-calendar ms-1 me-2" style={{color: '#7eb5e9', fontSize: '15px'}}></i>
                        {`${calculateDaysLeft(job.expirationDate)} Remaining`}
                      </span>
                      </>
                    ) : (
                      <>
                      <span className="ms-2" style={{ color: '#d70e0e'}}>
                        <i className="far fa-times-circle ms-1 me-2" style={{fontSize: '16px'}}></i>
                        Job {job.status}
                      </span>
                      </>
                    )}
                </small>
                
              </div>
            </div>
            <div className="d-flex align-items-center">
              <i className="fas fa-bookmark me-3" style={{ cursor: 'pointer' }}></i>
              {calculateDaysLeft(job.expirationDate) ? (
                <>
            <Link to={`/jobdetails/${job.job_id}`}>
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
            </Link>
                </>
              ) : (
                <>
              <button className="btn btn-primary btn-sm"
              style={{
                width: '150px',
                height: '46px',
                fontWeight: '500',
                marginTop: '5px',
                background: '#e7ebed',
                color: '#848484',
                padding: '10px',
                borderRadius: '3px',
                fontSize:'13px',
                border: 'none'
              }}
              >
                Deadline Expired
                </button>
                </>
              )}
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

export default JobAlers;
