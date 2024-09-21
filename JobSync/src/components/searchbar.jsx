import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from '../assets/logo3.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import ph from '../assets/ph.png'


function SearchJobs() {

    const [selected, setSelected] = useState("Philippines");
  
    const handleSelect = (value) => {
      setSelected(value);
    };
  
  return (
    <header className="job-sync-header p-3 border-bottom">
      <div className="container">
        <div className="d-flex flex-wrap justify-content-between align-items-center">
          {/* Logo */}
          <div className="logo d-flex align-items-center mb-2 mb-md-0">
            <img src={logo} alt="JobSync Logo" width="58" height="50" />
            <span className="ms-2 fw-bold fs-4">JobSync</span>
          </div>
    
          {/* Search Bar */}
          <div className="search-bar flex-grow-1 d-flex justify-content-center mb-2 mb-md-0">
          <div className="custom-select" style={{ position: 'relative', maxWidth: '200px' }}>
            <div className="selected-option" style={{ display: 'flex', alignItems: 'center', border: '1px solid #dee2e6', borderRadius: '10px 0px 0px 10px', background: '#fff', padding: '10px', cursor: 'pointer'}}>
              <img src={ph} alt="Philippines" style={{ width: '27px', marginRight: '10px', marginLeft: '5px' }} />
              {selected}
            </div>
            <div className="options" style={{ display: 'none', position: 'absolute', top: '100%', left: '0', right: '0', border: '1px solid #dee2e6', background: '#fff', zIndex: 1 }}>
              <div className="option" onClick={() => handleSelect("Philippines")} style={{ display: 'flex', alignItems: 'center', padding: '10px', cursor: 'pointer' }}>
                <img src={ph} alt="Philippines" style={{ width: '20px', marginRight: '10px' }} />
              </div>
              {/* Add more options as needed */}
            </div>
          </div>
              <div className="input-group" style={{ maxWidth: '800px' }}>
                <div className="input-group-prepend">
                  <span className="input-group-text" style={{ border: 'none', background: 'transparent', color: '#0A65CC' }}>
                    <FontAwesomeIcon icon={faSearch} />
                  </span>
                </div>
                <input
                  type="text"
                  className="form-control search-input"
                  placeholder="Job title, keyword, company"
                  style={{ paddingLeft: '45px' }} // Adjust padding to make room for the icon
                />
              </div>

          </div>

          <div className="actions d-flex align-items-center">
          <Link to="/registration" className="btn btn-outline-custom me-2 custom-btn">
            Sign In
          </Link>
          <button className="btn btn-primary custom-btn" type="button">
            Post A Job
          </button>


          </div>
        </div>
      </div>
    </header>
  );
}

export default SearchJobs;
