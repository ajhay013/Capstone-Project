import React, { useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import JobCards from '../components/jobcards';

export default function FindJob() {
  const [jobSearch, setJobSearch] = useState('');
  const [locationSearch, setLocationSearch] = useState('');

  // Handle the search
  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Searching for jobs:", jobSearch, "in location:", locationSearch);
    // Here, you could trigger an API request or filter the job data based on the inputs
  };

  return (
    <>
      <Container className="my-5" style={{ maxWidth: "1200px", width: "100%" }}>
        {/* Combined Search Section with Icons Inside Fields */}
        <Row className="mb-5" style={{ marginTop: "100px" }}>
          <Col md={12}>
            <form onSubmit={handleSearch} className="d-flex mb-4">
              {/* Job Search Input */}
              <div className="input-group" style={{ maxWidth: "600px", flexGrow: "1" }}>
                <div className="input-group-prepend">
                  <span
                    className="input-group-text"
                    style={{
                      border: "none",
                      backgroundColor: "transparent",
                      color: "#0A65CC",
                      padding: "15px",
                      fontSize: "18px",
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
                    paddingLeft: "45px",
                    fontSize: "16px",
                    borderRadius: "10px 0 0 10px",
                    paddingRight: "10px",
                    height: "45px",
                  }}
                />
              </div>

              {/* Location Search Input */}
              <div className="input-group" style={{ maxWidth: "600px", flexGrow: "1" }}>
                <div className="input-group-prepend">
                  <span
                    className="input-group-text"
                    style={{
                      border: "none",
                      backgroundColor: "transparent",
                      color: "#0A65CC",
                      padding: "15px",
                      fontSize: "18px",
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
                    paddingLeft: "45px",
                    fontSize: "16px",
                    borderRadius: "0 10px 10px 0",
                    paddingRight: "10px",
                    height: "45px",
                  }}
                />
              </div>

              {/* Find Job Button on the Right */}
              <Button
                variant="primary"
                className="ms-2"
                style={{ fontSize: "16px", height: "40px", width: "150px" }}
                type="submit"
              >
                Find Job
              </Button>
            </form>
          </Col>
        </Row>
      </Container>

      {/* Job Cards Section */}
      <JobCards jobSearch={jobSearch} locationSearch={locationSearch} />
    </>
  );
}
