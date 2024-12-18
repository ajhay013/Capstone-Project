import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faMapMarkerAlt, faFilter } from '@fortawesome/free-solid-svg-icons';
import JobCards from '../components/jobcards';
import Pagination from '../components/Pagination';
import Filter from '../components/Filter'; 
import { getFromEndpoint } from '../components/apiService';
import { useAuth } from '../AuthContext'; 


export default function FindJob() {
  const { user } = useAuth(); 
  const [jobSearch, setJobSearch] = useState('');
  const [locationSearch, setLocationSearch] = useState('');
  const [showFilter, setShowFilter] = useState(false);
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

  const handleFilter = () => setShowFilter(!showFilter);

  const handleJobTypeChange = (e) => {
    const selectedJobType = e.target.value;
    setJobType(selectedJobType);

    const existingFilter = activeFilters.find(filter => filter.type === 'Job Type');
    if (existingFilter) {
      existingFilter.value = selectedJobType;
      setActiveFilters([...activeFilters]);
    } else {
      setActiveFilters([...activeFilters, { type: 'Job Type', value: selectedJobType }]);
    }
  };

  const handleSalaryRangeChange = (range) => {
    setSalaryRange(range);

    const existingFilter = activeFilters.find(filter => filter.type === 'Salary Range');
    if (existingFilter) {
      existingFilter.value = `₱${range[0]} - ₱${range[1]}`;
      setActiveFilters([...activeFilters]);
    } else {
      setActiveFilters([...activeFilters, { type: 'Salary Range', value: `₱${range[0]} - ₱${range[1]}` }]);
    }
  };

  const removeFilter = (filterType) => {
    setActiveFilters(activeFilters.filter((filter) => filter.type !== filterType));
  };

  const handleIndustryChange = (e) => {
    const selectedIndustry = e.target.value;
    setIndustry(selectedIndustry);

    const existingFilter = activeFilters.find(filter => filter.type === 'Industry');
    if (existingFilter) {
      existingFilter.value = selectedIndustry;
      setActiveFilters([...activeFilters]);
    } else {
      setActiveFilters([...activeFilters, { type: 'Industry', value: selectedIndustry }]);
    }
  };

  const handlePresetSalarySelect = (range) => {
    setSalaryRange(range);

    const formattedSalaryRange = `₱${range[0]} - ₱${range[1]}`;

    const existingFilter = activeFilters.find((filter) => filter.type === 'Salary Range');

    if (existingFilter) {
      existingFilter.value = formattedSalaryRange;
      setActiveFilters([...activeFilters]);
    } else {
      setActiveFilters([ ...activeFilters, { type: 'Salary Range', value: formattedSalaryRange } ]);
    }
  };

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true); 
        const response = await getFromEndpoint('/get_jobs.php');
        setJobs(response.data);
      } catch (error) {
        console.error('There was an error fetching the jobs!', error);
      } finally {
        setLoading(false); 
      }
    };

    fetchJobs();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Searching for jobs:', jobSearch, 'in location:', locationSearch);
  };

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  const indexOfLastJob = currentPage * itemsPerPage;
  const indexOfFirstJob = indexOfLastJob - itemsPerPage;

  const currentJobs = jobs.slice(indexOfFirstJob, indexOfLastJob);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const marginTop = 
  currentJobs.length >= 1 && currentJobs.length <= 3 ? '-122px' : 
  currentJobs.length >= 4 && currentJobs.length <= 6 ? '100px' : 
  '109px';
  const height = jobs.length > 0 ? 'auto' : '380px';

  return (
    <>
      <Container style={{ width: '1209px' }}>
        <Row className="mb-3" style={{ marginTop }}>
          <Col md={12}>
            <form onSubmit={handleSearch} className="d-flex">
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
                      zIndex: '1'
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
                    height: '50px',
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
                      zIndex: '1'
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
                    height: '50px',
                  }}
                />
              </div>

              <Button
                variant="secondary"
                className="ms-2 d-flex align-items-center justify-content-center"
                style={{ fontSize: '16px', height: '45px', width: '150px' }}
                onClick={handleFilter}
              >
                <FontAwesomeIcon icon={faFilter} className="me-2" />
                Filter
              </Button>

              <Button
                variant="primary"
                className="ms-2"
                style={{ fontSize: '16px', height: '45px', width: '150px' }}
                type="submit"
              >
                Find Job
              </Button>
            </form>
          </Col>
        </Row>
      </Container>
      <Filter
        showFilter={showFilter}
        handleFilter={handleFilter}
        activeFilters={activeFilters}
        removeFilter={removeFilter}
        industry={industry}
        jobType={jobType}
        salaryRange={salaryRange}
        selectedSalaryRange={selectedSalaryRange}
        presetRanges={presetRanges}
        handleIndustryChange={handleIndustryChange}
        handleJobTypeChange={handleJobTypeChange}
        handleSalaryRangeChange={handleSalaryRangeChange}
        handlePresetSalarySelect={handlePresetSalarySelect}
      />
      <Row>
        <Col>
          <span className="me-2">Popular searches:</span>
          {["Front-end", "Back-end", "Development", "PHP", "Laravel", "Bootstrap", "Developer", "Team Lead", "Product Testing", "Javascript"].map((search) => (
            <Button variant="outline-secondary" size="sm" className="me-2" key={search}>
              {search}
            </Button>
          ))}
        </Col>
      </Row>

      {/* Job Listings */}
      <Container style={{ height }}>
        <Row className="mt-5">
          <Col>
          {currentJobs.length > 0 ? (
            <JobCards jobs={currentJobs} jobType={jobType} salaryRange={salaryRange}  {...(user?.id && { applicantId: user.id })}/>
          ) : (
              <div
              style={{
                textAlign: 'center',
                marginTop: '50px',
                fontSize: '20px',
                color: '#777',
              }}
            >
              {jobSearch || locationSearch || activeFilters.length > 0
                ? 'No jobs match your search criteria. Please try adjusting your filters or search terms.'
                : 'Start your job search by entering a job title or location above!'}
            </div>
            )}
          </Col>
        </Row>
      {/* Pagination */}
      <Row>
          <Col className="d-flex justify-content-center">
            <Pagination
              currentPage={currentPage}
              itemsPerPage={itemsPerPage}
              totalItems={jobs.length}
              paginate={paginate}
            />
          </Col>
        </Row>
      </Container>
    </>
  );
}


