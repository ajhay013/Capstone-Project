import React, { useState } from "react";
import { Container, Row, Col, Button, Pagination } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";

const JobBoard = () => {
  // State for job search and location input
  const [jobSearch, setJobSearch] = useState("");
  const [locationSearch, setLocationSearch] = useState("");

  // Sample job data
  const jobs = Array.from({ length: 15 }, (_, i) => ({
    id: i + 1,
    company: "Lebron James",
    location: "Caloocan City",
    positions: 3,
  }));

  // Handle the search
  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Searching for jobs:", jobSearch, "in location:", locationSearch);
    // Here, you could trigger an API request or filter the job data based on the inputs
  };

  return (
    <Container className="my-5" style={{ maxWidth: "1200px", width: "100%" }}>
      {/* Combined Search Section with Icons Inside Fields */}
      <Row className="mb-5">
        <Col md={12}>
          <form onSubmit={handleSearch} className="d-flex mb-4 mt-4">
            {/* Job Search Input */}
            <div className="input-group" style={{ maxWidth: "600px", flexGrow: "1" , marginTop: "25px"}}>
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
            <div className="input-group" style={{ maxWidth: "600px", flexGrow: "1" , marginTop: "25px"}}>
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
            <Button variant="primary" className="ms-2" style={{ fontSize: "16px", height: "40px", width: "150px" , marginTop: "25px" }} type="submit">
              Find Job
            </Button>
          </form>
        </Col>
      </Row>

      {/* Popular Searches */}
      <Row className="mb-5">
        <Col>
          <span className="me-2">Popular searches:</span>
          {["Front-end", "Back-end", "Development", "PHP", "Laravel", "Bootstrap", "Developer", "Team Lead", "Product Testing", "Javascript"].map((search, index) => (
            <Button variant="outline-secondary" size="sm" className="me-2 mb-2" key={index}>
              {search}
            </Button>
          ))}
        </Col>
      </Row>

      {/* Job Grid */}
      <Row className="gy-5">
        {jobs.map((job) => (
          <Col md={4} key={job.id}>
            <div className="border p-4 rounded bg-light text-center" style={{ maxWidth: "100%", width: "100%" }}>
              <Row className="align-items-center">
                {/* Job Image */}
                <Col md={4} className="d-flex justify-content-center p-0">
                  <img src="./src/assets/riot.png" alt="Company Logo" className="img-fluid rounded-circle" />
                </Col>

                {/* Job Info */}
                <Col md={8}>
                  <div className="d-flex align-items-center mb-2" style={{ justifyContent: "flex-start" }}>
                    {/* Company Name and Featured Badge */}
                    <div className="d-flex align-items-center">
                      <span>{job.company}</span>
                      <span className="badge bg-danger ms-2" style={{ fontSize: "12px" }}>Featured</span>
                    </div>
                  </div>
                  <div className="text-muted mb-3 d-flex align-items-center">
                    {/* Location Icon and Location */}
                    <FontAwesomeIcon icon={faMapMarkerAlt} className="me-2" />
                    <span>{job.location}</span>
                  </div>
                </Col>
              </Row>

              {/* Open Position Button */}
              <Button className="mt-2" style={{ padding: "5px 10px", width: '100%' , color: '#0A65CC' , backgroundColor: '#add1ff' , border: 'none' }}>
                Open Position ({job.positions})
              </Button>
            </div>
          </Col>
        ))}
      </Row>

      {/* Pagination */}
      <Row className="mt-5">
        <Col className="d-flex justify-content-center">
          <Pagination>
            <Pagination.Prev />
            {[1, 2, 3, 4, 5].map((number) => (
              <Pagination.Item key={number} active={number === 1}>
                {number}
              </Pagination.Item>
            ))}
            <Pagination.Next />
          </Pagination>
        </Col>
      </Row>
    </Container>
  );
};

export default JobBoard;
