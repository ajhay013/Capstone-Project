// src/components/Filter.js

import React from 'react';
import { Button, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

const Filter = ({
  showFilter,
  handleFilter,
  activeFilters,
  removeFilter,
  industry,
  jobType,
  salaryRange,
  selectedSalaryRange,
  presetRanges,
  handleIndustryChange,
  handleJobTypeChange,
  handleSalaryRangeChange,
  handlePresetSalarySelect,
}) => {
  return (
    <div>
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
            <h5 style={{ textAlign: 'left', fontSize: '20px' }}>Active Filters</h5>
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

        {/* Industry Filter */}
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
          <Form.Label style={{ textAlign: 'left', width: '100%' , marginTop: '35px' , fontWeight : 'bold' }}>Job Type</Form.Label>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            {['Full Time', 'Part-Time', 'Internship', 'Temporary'].map((type) => (
              <Form.Check
                key={type}
                type="radio"
                label={type}
                name="jobType"
                value={type}
                checked={jobType === type}
                onChange={handleJobTypeChange}
                style={{ marginBottom: '10px' }}
              />
            ))}
          </div>
        </Form.Group>

        {/* Salary Filter */}
        <Form.Group controlId="salaryRange" className="mb-3">
          <Form.Label style={{ fontWeight: 'bold' }}>Salary Range</Form.Label>
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
          <Form.Label style={{ fontWeight: 'bold' }}>Salary Range</Form.Label>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            {presetRanges.map((range) => (
              <Form.Check
                key={range.label}
                type="radio"
                label={range.label}
                name="salaryRange"
                value={range.label}
                checked={selectedSalaryRange === range.label}
                onChange={() => handlePresetSalarySelect(range.range)}  // Call handlePresetSalarySelect with range
                className="mb-2"
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
    </div>
  );
};

export default Filter;
