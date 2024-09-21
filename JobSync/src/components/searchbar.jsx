import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from '../assets/logo3.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';



function JobSyncHeader() {
  return (
    <header className="job-sync-header p-3 bg-light border-bottom">
      <div className="container">
        <div className="d-flex flex-wrap justify-content-between align-items-center">
          {/* Logo */}
          <div className="logo d-flex align-items-center mb-2 mb-md-0">
            <img src={logo} alt="JobSync Logo" width="58" height="50" />
            <span className="ms-2 fw-bold fs-4">JobSync</span>
          </div>

          {/* Search Bar */}
          <div className="search-bar flex-grow-1 d-flex justify-content-center mb-2 mb-md-0">
          <select className="form-select" value="Philippines" disabled>
                <option value="Philippines">Philippines</option>
              </select>
              <button className="search" type="submit">
                <FontAwesomeIcon icon={faSearch} />
              </button>
            <div className="input-group" style={{ maxWidth: '800px' }}>
              <input
                type="text"
                className="form-control seach-input"
                placeholder="Job title, keyword, company"
              />

            </div>
          </div>

          {/* Actions */}
          <div className="actions d-flex align-items-center">
          <button className="btn btn-outline-custom me-2 custom-btn" type="button">
            Sign In
          </button>
          <button className="btn btn-primary custom-btn" type="button">
            Post A Job
          </button>


          </div>
        </div>
      </div>
    </header>
  );
}

export default JobSyncHeader;
