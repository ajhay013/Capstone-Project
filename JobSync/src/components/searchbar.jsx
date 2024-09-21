import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBriefcase, faBuilding, faUser, faPlus } from '@fortawesome/free-solid-svg-icons';

function JobSyncHeader() {
  return (
    <header className="job-sync-header p-3 bg-light border-bottom">
      <div className="container">
        <div className="d-flex flex-wrap justify-content-between align-items-center">
          {/* Logo */}
          <div className="logo d-flex align-items-center mb-2 mb-md-0">
            <img src="react.svg" alt="JobSync Logo" width="50" height="50" />
            <span className="ms-2 fw-bold fs-4">JobSync</span>
          </div>

          {/* Search Bar */}
          <div className="search-bar flex-grow-1 d-flex justify-content-center mb-2 mb-md-0">
            <div className="input-group" style={{ maxWidth: '600px' }}>
              <select className="form-select" value="Philippines" disabled>
                <option value="Philippines">Philippines</option>
              </select>
              <input
                type="text"
                className="form-control"
                placeholder="Job title, keyword, company"
              />
              <button className="btn btn-primary" type="submit">
                Search
              </button>
            </div>
          </div>

          {/* Actions */}
          <div className="actions d-flex align-items-center">
            {/* Link to Registration Form */}
            <Link to="/regform" className="btn btn-outline-primary me-2">
              Sign In
            </Link>
            <button className="btn btn-success" type="button">
              Post A Job
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default JobSyncHeader;
