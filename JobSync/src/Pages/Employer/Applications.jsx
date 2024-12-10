import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaSearch, FaDownload, FaEnvelope, FaCommentDots } from 'react-icons/fa';
import Pagination from '../../components/Pagination';

export default function Applications() {
  const { jobId } = useParams();
  const [applications, setApplications] = useState([
      { id: 1, name: "Ajhay Ramos Arendayen", date: "September 25, 2024", status: "To Interview", jobTitle: "Front-end Developer" },
    { id: 2, name: "Christian Dave Bernal", date: "September 27, 2024", status: "Pending", jobTitle: "Backend Developer" },
    { id: 3, name: "Desiree Galanaga", date: "June 13, 2024", status: "On hold", jobTitle: "UI/UX Designer" },
    { id: 4, name: "Ricky James Molina", date: "December 13, 2024", status: "On hold", jobTitle: "Project Manager" },
    { id: 5, name: "Maria Clara Hidalgo", date: "October 5, 2024", status: "To Interview", jobTitle: "Data Scientist" },
    { id: 6, name: "Juan Pablo Cruz", date: "August 23, 2024", status: "Rejected", jobTitle: "HR Specialist" },
    { id: 7, name: "Sophia Evangeline Torres", date: "November 10, 2024", status: "Pending", jobTitle: "Marketing Manager" },
    { id: 8, name: "Daniela Francisco", date: "September 15, 2024", status: "To Interview", jobTitle: "Front-end Developer" },
    { id: 9, name: "Luis Alberto Garcia", date: "October 1, 2024", status: "On hold", jobTitle: "System Administrator" },
    { id: 10, name: "Benjamin Ortiz", date: "July 19, 2024", status: "Pending", jobTitle: "DevOps Engineer" },
    { id: 11, name: "Ajhay Ramos Arendayen", date: "September 25, 2024", status: "To Interview", jobTitle: "Front-end Developer" },
    { id: 12, name: "Christian Dave Bernal", date: "September 27, 2024", status: "Pending", jobTitle: "Backend Developer" },
    { id: 13, name: "Desiree Galanaga", date: "June 13, 2024", status: "On hold", jobTitle: "UI/UX Designer" },
    { id: 14, name: "Ricky James Molina", date: "December 13, 2024", status: "On hold", jobTitle: "Project Manager" },
    { id: 15, name: "Maria Clara Hidalgo", date: "October 5, 2024", status: "To Interview", jobTitle: "Data Scientist" },
    { id: 16, name: "Juan Pablo Cruz", date: "August 23, 2024", status: "Rejected", jobTitle: "HR Specialist" },
    { id: 17, name: "Sophia Evangeline Torres", date: "November 10, 2024", status: "Pending", jobTitle: "Marketing Manager" },
    { id: 18, name: "Daniela Francisco", date: "September 15, 2024", status: "To Interview", jobTitle: "Front-end Developer" },
    { id: 19, name: "Luis Alberto Garcia", date: "October 1, 2024", status: "On hold", jobTitle: "System Administrator" },
    { id: 20, name: "Benjamin Ortiz", date: "July 19, 2024", status: "Pending", jobTitle: "DevOps Engineer" },
  ]);

  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [selectedJob, setSelectedJob] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Filter logic
  const filteredApplications = applications.filter((app) => {
    const matchesFilter = filter === "All" || app.status === filter;
    const matchesJob = selectedJob === "All" || app.jobTitle === selectedJob;
    const matchesSearch = app.name.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesJob && matchesSearch;
  });

  // Pagination Logic
  const indexOfLastApplication = currentPage * itemsPerPage;
  const indexOfFirstApplication = indexOfLastApplication - itemsPerPage;
  const currentApplications = filteredApplications.slice(indexOfFirstApplication, indexOfLastApplication);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container mt-5" style={{ paddingLeft: '0', paddingRight: '0' }}>

      <div className="input-group mb-4" style={{ width: '60%' , marginTop: '100px'}}>
        <span className="input-group-text" id="search-icon" style={{ borderRadius: '20px', marginRight: '10px', color: '#0A65CC', zIndex: '1' }}>
          <FaSearch />
        </span>
        <input
          type="text"
          className="form-control"
          placeholder="Search by applicant name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ borderRadius: '20px', paddingLeft: '50px'}}
        />
      </div>
      <div className="d-flex flex-wrap align-items-center mb-4" style={{ padding: '10px', borderRadius: '5px' }}>
  {/* Showing Applicants Section */}
  <div className="me-3">
    <p className="mb-0" style={{ fontSize: '16px', fontWeight: '500' }}>
      Showing <span style={{ fontWeight: '600', color: '#0A65CC' }}>{currentApplications.length}</span> applicant(s)
    </p>
    <p style={{ fontSize: '14px', color: 'gray', margin: '0' }}>Based on your preferences</p>
  </div>

  {/* Job Filter Dropdown */}
  <div className="me-3">
    <select
      className="form-select btn-sm"
      value={selectedJob}
      onChange={(e) => setSelectedJob(e.target.value)}
      style={{ width: '200px', borderRadius: '20px', marginBottom: '5px', backgroundColor: '#dddddd' , height: '35px'}}
    >
      <option value="All">All Jobs</option>
      {["Front-end Developer", "Backend Developer", "UI/UX Designer", "Project Manager", "Data Scientist"].map((job) => (
        <option key={job} value={job}>{job}</option>
      ))}
    </select>
  </div>

  {/* Filter Buttons */}
  <div className="d-flex flex-wrap">
    {["All", "Pending", "To Interview", "On hold", "Rejected"].map((status) => (
      <button
        key={status}
        className={`btn btn-sm me-2 ${filter === status ? "btn-dark" : "btn-outline-secondary"}`}
        style={{
          color: filter === status ? '#fff' : '#000',
          width: '120px',
          marginBottom: '5px',
          borderRadius: '20px',
          backgroundColor: filter === status ? '' : '#dddddd',
        }}
        onClick={() => setFilter(status)}
      >
        {status}
      </button>
    ))}
  </div>
</div>

      {/* Applications Table */}
      <div className="table-responsive" style={{ minHeight: '300px', overflow: 'auto' }}>
        <table className="table table-striped" style={{ width: '100%', tableLayout: 'fixed' }}>
          <thead className="thead-light">
            <tr>
              <th style={{ color: '#676767', background: '#ebebebc2' }}>ID</th>
              <th style={{ color: '#676767', background: '#ebebebc2' }}>Name</th>
              <th style={{ color: '#676767', background: '#ebebebc2' }}>Date Applied</th>
              <th style={{ color: '#676767', background: '#ebebebc2' }}>Job</th>
              <th style={{ color: '#676767', background: '#ebebebc2' }}>Contact</th>
              <th style={{ color: '#676767', background: '#ebebebc2' }}>Status</th>
              <th style={{ color: '#676767', background: '#ebebebc2' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentApplications.length > 0 ? (
              currentApplications.map((app) => (
                <tr key={app.id} style={{ height: '60px' }}>
                  <td>{app.id}</td>
                  <td>{app.name}</td>
                  <td>{app.date}</td>
                  <td>{app.jobTitle}</td>
                  <td>
                    <button className="btn btn-sm btn-link">
                      <FaEnvelope style={{ fontSize: '25px' }} />
                    </button>
                    <button className="btn btn-sm btn-link">
                      <FaCommentDots style={{ fontSize: '25px' }} />
                    </button>
                  </td>
                  <td>
                    <span className={`badge ${app.status === "To Interview"
                      ? "bg-success"
                      : app.status === "Pending"
                        ? "bg-warning"
                        : app.status === "On hold"
                          ? "bg-info"
                          : "bg-danger"}`}>
                      {app.status}
                    </span>
                  </td>
                  <td>
                    <button className="btn btn-link btn-sm" style={{ textDecoration: 'none' }}>
                      <FaDownload style={{ fontSize: '16px' }} /> Download CV/Resume
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center">No applications found</td>
              </tr>
            )}

            {/* Add empty rows if data is less than the itemsPerPage */}
            {Array.from({ length: itemsPerPage - currentApplications.length }).map((_, index) => (
              <tr key={`empty-row-${index}`} style={{ height: '60px' }}>
                <td colSpan="7"></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <Pagination
        itemsPerPage={itemsPerPage}
        totalItems={filteredApplications.length}
        paginate={paginate}
        currentPage={currentPage}
      />
    </div>
  );
}
