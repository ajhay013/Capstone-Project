import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Pagination from './Pagination'; // Assuming Pagination is in the same folder

const jobData = [
    {
        id: 1,
        logo: '../../src/assets/riot.png',
        name: 'Software Engineer',
        location: 'New York, NY',
        jobType: 'Full-time',
        salary: '$100,000',
        dateApplied: '2024-10-20',
        status: 'Active',
    },
    {
        id: 2,
        logo: '../../src/assets/google.png',
        name: 'Data Scientist',
        location: 'San Francisco, CA',
        jobType: 'Full-time',
        salary: '$120,000',
        dateApplied: '2024-10-21',
        status: 'Active',
    },
    {
        id: 3,
        logo: '../../src/assets/google.png',
        name: 'Product Manager',
        location: 'Seattle, WA',
        jobType: 'Full-time',
        salary: '$115,000',
        dateApplied: '2024-10-22',
        status: 'Active',
    },
    {
        id: 4,
        logo: '../../src/assets/google.png',
        name: 'UX Designer',
        location: 'Menlo Park, CA',
        jobType: 'Contract',
        salary: '$95,000',
        dateApplied: '2024-10-23',
        status: 'Active',
    },
    {
        id: 5,
        logo: '../../src/assets/google.png',
        name: 'Cloud Engineer',
        location: 'Redmond, WA',
        jobType: 'Part-time',
        salary: '$80,000',
        dateApplied: '2024-10-24',
        status: 'Active',
    },
    {
        id: 6,
        logo: '../../src/assets/google.png',
        name: 'AI Researcher',
        location: 'Austin, TX',
        jobType: 'Full-time',
        salary: '$130,000',
        dateApplied: '2024-10-25',
        status: 'Active',
    },
    {
        id: 7,
        logo: '../../src/assets/google.png',
        name: 'Sales Engineer',
        location: 'Chicago, IL',
        jobType: 'Full-time',
        salary: '$90,000',
        dateApplied: '2024-10-26',
        status: 'Active',
    },
    {
        id: 8,
        logo: '../../src/assets/google.png',
        name: 'Frontend Developer',
        location: 'Boston, MA',
        jobType: 'Full-time',
        salary: '$105,000',
        dateApplied: '2024-10-27',
        status: 'Active',
    },
    {
        id: 9,
        logo: '../../src/assets/google.png',
        name: 'Backend Developer',
        location: 'Los Angeles, CA',
        jobType: 'Contract',
        salary: '$110,000',
        dateApplied: '2024-10-28',
        status: 'Active',
    },
    {
        id: 10,
        logo: '../../src/assets/google.png',
        name: 'System Administrator',
        location: 'Atlanta, GA',
        jobType: 'Part-time',
        salary: '$75,000',
        dateApplied: '2024-10-29',
        status: 'Active',
    },
    {
        id: 11,
        logo: '../../src/assets/google.png',
        name: 'System Administrator',
        location: 'Atlanta, GA',
        jobType: 'Part-time',
        salary: '$75,000',
        dateApplied: '2024-10-29',
        status: 'Active',
    },
    {
        id: 12,
        logo: '../../src/assets/google.png',
        name: 'System Administrator',
        location: 'Atlanta, GA',
        jobType: 'Part-time',
        salary: '$75,000',
        dateApplied: '2024-10-29',
        status: 'Active',
    },
];

const JobRow = ({ job }) => (
  <div className="d-flex justify-content-between align-items-start p-3 border-bottom">
    <div className="d-flex align-items-start">
      <img
        src={job.logo}
        alt="Job Logo"
        className="me-3"
        style={{ width: '50px', height: '50px' }}
      />
      <div>
        <div className="d-flex justify-content-between align-items-start mb-2">
          <h6 className="mb-0 me-3" style={{color: '#373737'}}>{job.name}</h6>
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
          <span className="me-2">{job.location}</span> | 
          <span className="ms-2">{job.salary}</span>
        </small>
      </div>
    </div>
    <div className="d-flex align-items-center">
      <i className="fas fa-bookmark me-3" style={{ cursor: 'pointer' }}></i>
      <button className="btn btn-primary btn-sm"
      style={{ width: '150px',
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
        Apply Now <i className="fas fa-arrow-right" style={{marginLeft: '10px'}}></i>
      </button>
    </div>
  </div>
);

function FavoriteJobs() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Number of jobs per page

  const indexOfLastJob = currentPage * itemsPerPage;
  const indexOfFirstJob = indexOfLastJob - itemsPerPage;
  const currentJobs = jobData.slice(indexOfFirstJob, indexOfLastJob);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container-fluid p-0" style={{marginLeft: '16px'}}>
      {currentJobs.map((job) => (
        <JobRow job={job} key={job.id} />
      ))}
      <Pagination
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        totalItems={jobData.length}
        paginate={paginate}
      />
    </div>
  );
}

export default FavoriteJobs;
