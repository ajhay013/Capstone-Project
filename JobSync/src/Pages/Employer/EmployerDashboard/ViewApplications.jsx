import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import EmployerSidebar from '../../../components/EmployerSidebar';
import { FaSearch, FaArrowLeft } from 'react-icons/fa';
import Pagination from '../../../components/Pagination';
import { postToEndpoint } from '../../../components/apiService';

export default function ViewApplications() {
  const { job_id, jobTitle } = useParams();
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const fetchApplied = async () => {
        try {
            const response = await postToEndpoint('/getApplicantApplied.php', { job_id });
            if (response.data?.jobs) {
                setApplications(response.data.jobs);
            } else {
                console.error('No jobs found or an error occurred:', response.data.error);
            }
        } catch (error) {
            console.error('Error fetching jobs:', error);
        }
    };

    fetchApplied();
}, [job_id]);

  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const navigate = useNavigate();

  const filteredApplications = applications.filter((app) => {
    const matchesFilter = filter === "All" || app.applied_status === filter;
    const matchesSearch = [app.firstname, app.middlename, app.lastname]
      .filter(Boolean)
      .some((name) => name.toLowerCase().includes(search.toLowerCase()));
    return matchesFilter && matchesSearch;
  });

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
              Applications for {jobTitle}
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
              {["All", "Pending", "On hold", "To Interview", "Rejected"].map((status) => (
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
                  <th style={{ color: '#8a8a8a', background: '#d4e0e9c2', width: '80px', fontWeight: '500' }}>ID</th>
                  <th style={{ color: '#8a8a8a', background: '#d4e0e9c2', fontWeight: '500' }}>Name</th>
                  <th style={{ color: '#8a8a8a', background: '#d4e0e9c2', fontWeight: '500' }}>Date Applied</th>
                  <th style={{ color: '#8a8a8a', background: '#d4e0e9c2', width: '110px', fontWeight: '500' }}>Contact</th>
                  <th style={{ color: '#8a8a8a', background: '#d4e0e9c2', fontWeight: '500' }}>Status</th>
                  <th style={{ color: '#8a8a8a', background: '#d4e0e9c2', fontWeight: '500' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentApplications.length > 0 ? (
                  currentApplications.map((app, index) => (
                    <tr key={app.application_id} style={{height: '70px'}}>
                      <td style={{paddingTop: '20px'}}>{index + 1}</td>
                      <td style={{ paddingTop: '20px' }}>
                        <Link
                          to={`/applicantdetails/${app.application_id}/${app.firstname}/${app.lastname}/${app.job_id}`}
                          style={{
                            textDecoration: 'none',
                            color: '#007BFF',
                            fontWeight: '400',
                            transition: 'color 0.3s',
                          }}
                          onMouseEnter={(e) => (e.target.style.color = '#373839')}
                          onMouseLeave={(e) => (e.target.style.color = '#007BFF')}
                        >
                          {app.firstname} {app.middlename || ''} {app.lastname}
                        </Link>
                      </td>
                      <td style={{paddingTop: '20px', fontSize: '15px', color: '#373839'}}>
                        {new Date(app.applied_at).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </td>
                      <td style={{paddingTop: '18px'}}>
                        <button className="btn btn-sm btn-link">
                          <i className="far fa-envelope" style={{ fontSize: '20px', color: '#ff5353' }}></i>
                        </button>
                        <button className="btn btn-sm btn-link">
                          <i className="far fa-comment-dots" style={{ fontSize: '20px', color: '' }}></i>
                        </button>
                      </td>
                      <td style={{paddingTop: '18px'}}>
                        <span className={`badge ${app.applied_status === "Interview"
                          ? "bg-success"
                          : app.applied_status === "Pending"
                            ? "bg-warning"
                            : app.applied_status === "On hold"
                              ? "bg-info"
                              : "bg-danger"}`} style={{padding:'8px 38px', borderRadius: '50px'}}>
                          {app.applied_status}
                        </span>
                      </td>
                      <td style={{paddingTop: '18px'}}>
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
