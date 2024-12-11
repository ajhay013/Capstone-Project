import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import EmployerSidebar from '../../../components/EmployerSidebar';
import { FaSearch, FaArrowLeft } from 'react-icons/fa';
import Pagination from '../../../components/Pagination';

export default function ViewApplications() {
  const { jobId } = useParams();
  const [applications, setApplications] = useState([
    { id: 1, name: "Ajhay Ramos Arendayen", date: "September 25, 2024", status: "To Interview" },
    { id: 2, name: "Christian Dave Bernal", date: "September 27, 2024", status: "Pending" },
    { id: 3, name: "Desiree Galanaga", date: "June 13, 2024", status: "On hold" },
    { id: 4, name: "Ricky James Molina", date: "December 13, 2024", status: "On hold" },
    { id: 5, name: "Maria Clara Hidalgo", date: "October 5, 2024", status: "To Interview" },
    { id: 6, name: "Juan Pablo Cruz", date: "August 23, 2024", status: "Rejected" },
    { id: 7, name: "Sophia Evangeline Torres", date: "November 10, 2024", status: "Pending" },
    { id: 8, name: "Daniela Francisco", date: "September 15, 2024", status: "To Interview" },
    { id: 9, name: "Luis Alberto Garcia", date: "October 1, 2024", status: "On hold" },
    { id: 10, name: "Benjamin Ortiz", date: "July 19, 2024", status: "Pending" },
    { id: 11, name: "Ajhay Ramos Arendayen", date: "September 25, 2024", status: "To Interview" },
    { id: 12, name: "Christian Dave Bernal", date: "September 27, 2024", status: "Pending" },
    { id: 13, name: "Desiree Galanaga", date: "June 13, 2024", status: "On hold" },
    { id: 14, name: "Ricky James Molina", date: "December 13, 2024", status: "On hold" },
    { id: 15, name: "Maria Clara Hidalgo", date: "October 5, 2024", status: "To Interview" },
    { id: 16, name: "Juan Pablo Cruz", date: "August 23, 2024", status: "Rejected" },
    { id: 17, name: "Sophia Evangeline Torres", date: "November 10, 2024", status: "Pending" },
    { id: 18, name: "Daniela Francisco", date: "September 15, 2024", status: "To Interview" },
    { id: 19, name: "Luis Alberto Garcia", date: "October 1, 2024", status: "On hold" },
    { id: 20, name: "Benjamin Ortiz", date: "July 19, 2024", status: "Pending" },
  ]);

  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const navigate = useNavigate();

  // Filter logic
  const filteredApplications = applications.filter((app) => {
    const matchesFilter = filter === "All" || app.status === filter;
    const matchesSearch = app.name.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  // Pagination Logic
  const indexOfLastApplication = currentPage * itemsPerPage;
  const indexOfFirstApplication = indexOfLastApplication - itemsPerPage;
  const currentApplications = filteredApplications.slice(indexOfFirstApplication, indexOfLastApplication);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="d-flex">
      <div className="sidebar" style={{ width: '20%', minWidth: '250px', marginLeft: '-1px' }}>
        <EmployerSidebar />
      </div>

      <div className="col-md-9" style={{ width: '100%' }}>
        <div className="container mt-5" style={{ paddingLeft: '0', paddingRight: '0' }}>

          <nav aria-label="breadcrumb" style={{ marginLeft: '20px' }}>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <a href="/employer/myjobs" style={{textDecoration: 'none', color: '#757575' }} >My Jobs</a>
              </li>
              <li className="breadcrumb-item active" aria-current="page" style={{ color: '#0A65CC', fontWeight: '500' }}>Applications</li>
            </ol> 
          </nav>

          <button
            className="btn btn-link"
            onClick={() => navigate('/employer/myjobs')}
            style={{ marginBottom: '25px', color: '#0A65CC', textAlign: 'left', padding: '0', display: 'block', marginLeft: '20px' }}
          >
            <FaArrowLeft />
          </button>

          <h2 className="mb-4 text-left" style={{ fontSize: '25px', color: 'black', fontWeight: '600', marginLeft: '20px' , textAlign: 'left' }}>
            Applications for {jobId}
          </h2>

          <div className="input-group mb-4" style={{ width: '60%', marginLeft: '20px' }}>
            <span className="input-group-text" id="search-icon" style={{ borderRadius: '20px', marginRight: '10px', color: '#0A65CC' }}>
              <FaSearch />
            </span>
            <input
              type="text"
              className="form-control"
              placeholder="Search by applicant name"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ borderRadius: '20px', paddingLeft: '50px' }}
            />
          </div>

          <div className="d-flex flex-wrap align-items-center mb-4" style={{ padding: '10px', borderRadius: '5px' }}>
            <div className="me-3">
              <p className="mb-0" style={{ fontSize: '16px', fontWeight: '500', marginLeft: '20px' }}>
                Showing <span style={{ fontWeight: '600', color: '#0A65CC' }}>{currentApplications.length}</span> applicant(s)
              </p>
              <p style={{ fontSize: '14px', color: 'gray', margin: '0', marginLeft: '20px' }}>Based on your preferences</p>
            </div>
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
          <div className="table-responsive">
            <table className="table table-striped" style={{ width: '100%', marginLeft: '20px', tableLayout: 'fixed', maxWidth: '970px' }}>
              <thead className="thead-light">
                <tr>
                  <th style={{ color: '#676767', background: '#ebebebc2', width: '80px' }}>ID</th>
                  <th style={{ color: '#676767', background: '#ebebebc2' }}>Name</th>
                  <th style={{ color: '#676767', background: '#ebebebc2' }}>Date Applied</th>
                  <th style={{ color: '#676767', background: '#ebebebc2', width: '110px' }}>Contact</th>
                  <th style={{ color: '#676767', background: '#ebebebc2' }}>Status</th>
                  <th style={{ color: '#676767', background: '#ebebebc2' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentApplications.length > 0 ? (
                  currentApplications.map((app) => (
                    <tr key={app.id}>
                      <td>{app.id}</td>
                      <td>
                        <Link 
                          to={`/applicantdetails/${app.id}`} 
                          style={{ textDecoration: 'none', color: '#0A65CC' }}
                        >
                          {app.name}
                        </Link>
                      </td>
                      <td>{app.date}</td>
                      <td>
                        <button className="btn btn-sm btn-link">
                          <i className="far fa-envelope" style={{ fontSize: '25px' }}></i>
                        </button>
                        <button className="btn btn-sm btn-link">
                          <i className="far fa-comment-dots" style={{ fontSize: '25px' }}></i>
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
                          Download CV/Resume <i className="fas fa-download"></i>
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center">No applications found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination Component */}
          <div style={{width: '80%'}}>
            <Pagination
              currentPage={currentPage}
              itemsPerPage={itemsPerPage}
              totalItems={filteredApplications.length}
              paginate={paginate}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
