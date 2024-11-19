import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faMapMarkerAlt, faFilter, faTimes } from '@fortawesome/free-solid-svg-icons';
import JobCards from '../components/jobcards';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { getFromEndpoint } from '../components/apiService';

export default function FindJob() {
  const [jobSearch, setJobSearch] = useState('');
  const [locationSearch, setLocationSearch] = useState('');
  const [showFilter, setShowFilter] = useState(false);

  // Filter state variables
  const [industry, setIndustry] = useState('Business');
  const [jobType, setJobType] = useState('Full Time');
  const [salaryRange, setSalaryRange] = useState([70000, 120000]);
  const [selectedSalaryRange, setSelectedSalaryRange] = useState('');
  const [activeFilters, setActiveFilters] = useState([]);

  const presetRanges = [
    { label: '₱10 - ₱100', range: [10, 100] },
    { label: '₱100 - ₱1,000', range: [100, 1000] },
    { label: '₱1,000 - ₱10,000', range: [1000, 10000] },
    { label: '₱10,000 - ₱100,000', range: [10000, 100000] },
    { label: '₱100,000 Up', range: [100000, 200000] },
    { label: 'Custom', range: salaryRange },
  ];

  const handleSalaryRangeChange = (newRange) => {
    setSalaryRange(newRange);
    setSelectedSalaryRange('Custom');
    addFilter('Salary', `₱${newRange[0]} - ₱${newRange[1]}`);
  };

  const handlePresetSalarySelect = (range) => {
    setSalaryRange(range);
    setSelectedSalaryRange(range === salaryRange ? 'Custom' : range);
    addFilter('Salary', `₱${range[0]} - ₱${range[1]}`);
  };
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await getFromEndpoint('/get_jobs.php');
        setJobs(response.data);
      } catch (error) {
        console.error('There was an error fetching the jobs!', error);
      }
    };

    fetchJobs();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Searching for jobs:', jobSearch, 'in location:', locationSearch);
  };

  const handleFilter = () => {
    setShowFilter(!showFilter);
  };

  const addFilter = (type, value) => {
    setActiveFilters((prevFilters) => {
      const existingFilterIndex = prevFilters.findIndex((filter) => filter.type === type);
      if (existingFilterIndex !== -1) {
        const updatedFilters = [...prevFilters];
        updatedFilters[existingFilterIndex] = { type, value };
        return updatedFilters;
      } else {
        return [...prevFilters, { type, value }];
      }
    });
  };

  const removeFilter = (type) => {
    setActiveFilters((prevFilters) => prevFilters.filter((filter) => filter.type !== type));
  };

  const handleIndustryChange = (e) => {
    const value = e.target.value;
    setIndustry(value);
    addFilter('Industry', value);
  };

  const handleJobTypeChange = (e) => {
    const value = e.target.value;
    setJobType(value);
    addFilter('Job Type', value);
  };

  const marginTop = 
  jobs.length > 0 && jobs.length <= 3 ? '-272px' : 
  jobs.length >= 4 && jobs.length <= 6 ? '-50px' : 
  '115px';

  return (
    <>
      <Container style={{ width: '1209px' }}>
        <Row className="mb-3" style={{ marginTop }}>
          <Col md={12}>
            <form onSubmit={handleSearch} className="d-flex mb-4">
              {/* Job Search Input */}
              <div className="input-group" style={{ maxWidth: '600px', flexGrow: '1' }}>
                <div className="input-group-prepend">
                  <span
                    className="input-group-text"
                    style={{
                      border: 'none',
                      backgroundColor: 'transparent',
                      color: '#0A65CC',
                      padding: '15px',
                      fontSize: '18px',
                    }}
                  >
                    <FontAwesomeIcon icon={faSearch} />
                  </span>
                </div>
                <input
                  type="text"
                  className="form-control search-input"
                  placeholder="Job title, keyword, company"
                  value={jobSearch}
                  onChange={(e) => setJobSearch(e.target.value)}
                  style={{
                    paddingLeft: '45px',
                    fontSize: '16px',
                    borderRadius: '10px 0 0 10px',
                    paddingRight: '10px',
                    height: '45px',
                  }}
                />
              </div>

              {/* Location Search Input */}
              <div className="input-group" style={{ maxWidth: '600px', flexGrow: '1' }}>
                <div className="input-group-prepend">
                  <span
                    className="input-group-text"
                    style={{
                      border: 'none',
                      backgroundColor: 'transparent',
                      color: '#0A65CC',
                      padding: '15px',
                      fontSize: '18px',
                    }}
                  >
                    <FontAwesomeIcon icon={faMapMarkerAlt} />
                  </span>
                </div>
                <input
                  type="text"
                  className="form-control search-input"
                  placeholder="City, state, or zip code"
                  value={locationSearch}
                  onChange={(e) => setLocationSearch(e.target.value)}
                  style={{
                    paddingLeft: '45px',
                    fontSize: '16px',
                    borderRadius: '0 10px 10px 0',
                    paddingRight: '10px',
                    height: '45px',
                  }}
                />
              </div>

              <Button
                variant="secondary"
                className="ms-2 d-flex align-items-center justify-content-center"
                style={{ fontSize: '16px', height: '40px', width: '150px' }}
                onClick={handleFilter}
              >
                <FontAwesomeIcon icon={faFilter} className="me-2" />
                Filter
              </Button>

              <Button
                variant="primary"
                className="ms-2"
                style={{ fontSize: '16px', height: '40px', width: '150px' }}
                type="submit"
              >
                Find Job
              </Button>
            </form>
          </Col>
        </Row>
      </Container>

      {/* Filter Overlay */}
      <div
        className={`filter-overlay ${showFilter ? 'show' : ''}`}
        style={{
          position: showFilter ? 'fixed' : 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          zIndex: showFilter ? '1030' : '-1',
          transition: 'background-color 0.3s ease-in-out',
        }}
        onClick={handleFilter}
      ></div>

      {/* Filter Sidebar */}
      <div
        className={`filter-section ${showFilter ? 'show' : ''}`}
        style={{
          position: 'fixed',
          top: '0',
          left: showFilter ? '0' : '-300px',
          height: '100vh',
          width: '300px',
          backgroundColor: '#f8f9fa',
          boxShadow: '2px 0 5px rgba(0, 0, 0, 0.2)',
          transition: 'left 0.3s ease-in-out',
          zIndex: '1040',
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Filter Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '20px',
          }}
        >
          <h4 style={{ textAlign: 'left', margin: '0' }}>Filter Options</h4>
          <Button
            variant="link"
            onClick={handleFilter}
            style={{
              fontSize: '20px',
              color: '#000',
              textDecoration: 'none',
              padding: '0',
            }}
          >
            <FontAwesomeIcon icon={faTimes} />
          </Button>
        </div>

        {/* Active Filters */}
        {activeFilters.length > 0 && (
          <div>
            <h5 style={{ textAlign: 'left' , fontSize: '20px' }}>Active Filters</h5>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
              {activeFilters.map((filter, index) => (
                <div
                  key={index}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '5px 10px',
                    backgroundColor: '#f0f0f0',
                    borderRadius: '20px',
                    boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.1)',
                    fontSize: '14px',
                    color: '#333',
                  }}
                >
                  <span style={{ marginRight: '8px' }}>
                    {filter.type}: {filter.value}
                  </span>
                  <Button
                    variant="link"
                    onClick={() => removeFilter(filter.type)}
                    style={{
                      fontSize: '14px',
                      color: '#d9534f',
                      padding: '0',
                      border: 'none',
                      background: 'transparent',
                    }}
                  >
                    <FontAwesomeIcon icon={faTimes} />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}

        <Form.Group controlId="industryFilter">
          <Form.Label style={{ textAlign: 'left', width: '100%' , marginTop: '20px' , fontWeight: 'bold' }}>Industry</Form.Label>
            <Form.Control as="select" value={industry} onChange={handleIndustryChange}>
              <option>All Category</option>
              <option>IT</option>
              <option>Healthcare</option>
              <option>Business</option>
              <option>Engineering</option>
              <option>Marketing</option>
              <option>Finance</option>
              <option>Education</option>
              <option>Creative Arts</option>
              <option>Retail</option>
              <option>Human Resources</option>
              <option>Manufacturing</option>
              <option>Logistics</option>
            </Form.Control>
        </Form.Group>

        {/* Job Type Filter */}
        <Form.Group controlId="jobTypeSelect" className="mb-3">
          <Form.Label style= {{ textAlign: 'left', width: '100%' , marginTop: '35px' , fontWeight : 'bold' }}>Job Type</Form.Label>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            <Form.Check
              type="radio"
              label="Full Time"
              name="jobType"
              value="Full Time"
              checked={jobType === 'Full Time'}
              onChange={handleJobTypeChange}
              style={{ marginBottom: '10px' }}
            />
            <Form.Check
              type="radio"
              label="Part-Time"
              name="jobType"
              value="Part-Time"
              onChange={handleJobTypeChange}
              style={{ marginBottom: '10px' }}
            />
            <Form.Check
              type="radio"
              label="Internship"
              name="jobType"
              value="Internship"
              onChange={handleJobTypeChange}
              style={{ marginBottom: '10px' }}
            />
            <Form.Check
              type="radio"
              label="Temporary"
              name="jobType"
              value="Temporary"
              onChange={handleJobTypeChange}
              style={{ marginBottom: '10px' }}
            />
          </div>
        </Form.Group>

        {/* Salary Filter */}
        <Form.Group controlId="salaryRange" className="mb-3">
          <Form.Label style={{ fontWeight: 'bold'}}>Salary Range</Form.Label>
          <Slider
            range
            min={0}
            max={200000}
            step={1000}
            value={salaryRange}
            onChange={handleSalaryRangeChange}
          />
          <div className="d-flex justify-content-between">
            <span>₱{salaryRange[0]}</span>
            <span>₱{salaryRange[1]}</span>
          </div>
        </Form.Group>

       {/* Preset Salary Ranges */}
        <Form.Group controlId="salaryRangeSelect" className="mb-3">
          <Form.Label style={{ fontWeight: 'bold'}}>Salary Range</Form.Label>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            {presetRanges.map((range) => (
      <Form.Check
        key={range.label}
        type="radio"
        label={range.label}
        name="salaryRange"
        value={range.label}
        checked={selectedSalaryRange === range.label}
        onChange={() => handlePresetSalarySelect(range.range)}
        className="mb-2" 
        custom 
      />
    ))}
  </div>
      </Form.Group>

  
  {/* Apply Filters Button */}
  <div
    style={{
      position: 'absolute',    
      bottom: '20px',          
      left: '0',               
      right: '0',              
      display: 'flex',  
    }}
  >
    <Button
      variant="primary"
      style={{
        width: '40%',           
        fontSize: '16px',
        padding: '10px',
        marginLeft: '55%',
      }}
      onClick={handleFilter}
    >
      Apply Filters
    </Button>
  </div>
</div>

      {/* Job Listings */}
      <Container>
        <Row className="mt-5">
          <Col>
            <JobCards jobType={jobType} salaryRange={salaryRange} />
          </Col>
        </Row>
      </Container>
    </>
  );
}
