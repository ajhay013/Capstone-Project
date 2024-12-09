import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import { Link } from 'react-router-dom';
import { getFromEndpoint } from '../components/apiService';
import Pagination from '../components/Pagination';

const FindEmployer = () => {
  const [jobSearch, setJobSearch] = useState("");
  const [locationSearch, setLocationSearch] = useState("");
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  useEffect(() => {
    const fetchCompanyData = async () => {
        try {
            const response = await getFromEndpoint('/viewCompany.php');
            setCompanies(response.data);
        } catch (error) {
            setError('Error fetching company data');
        } finally {
            setLoading(false);
        }
    };

    fetchCompanyData();
  }, []);

  const handleEmployerClick = (employerId) => {
    console.log("Employer ID clicked:", employerId);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Searching for jobs:", jobSearch, "in location:", locationSearch);
  };

  const indexOfLastCompany = currentPage * itemsPerPage;
  const indexOfFirstCompany = indexOfLastCompany - itemsPerPage;
  const currentCompanies = companies.slice(indexOfFirstCompany, indexOfLastCompany);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const height = companies.length > 3 ? 'auto' : '403px';

  return (
    <Container className="my-5" style={{ maxWidth: "1200px", width: "100%" }}>
      <Row>
        <Col md={12}>
          <form onSubmit={handleSearch} className="d-flex mb-4 mt-4">
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
                  paddingLeft: "45px",
                  fontSize: "16px",
                  borderRadius: "10px 0 0 10px",
                  paddingRight: "10px",
                  height: "45px",
                  
                }}
              />
            </div>

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
                    zIndex: '1'
                  }}
                >
                  <FontAwesomeIcon icon={faMapMarkerAlt}/>
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

            <Button variant="primary" className="ms-2" style={{ fontSize: "16px", height: "40px", width: "150px" , marginTop: "25px" }} type="submit">
              Find Job
            </Button>
          </form>
        </Col>
      </Row>

      <Row className="mb-5">
        <Col>
          <span className="me-2">Popular searches:</span>
          {["Front-end", "Back-end", "Development", "PHP", "Laravel", "Bootstrap", "Developer", "Team Lead", "Product Testing", "Javascript"].map((search) => (
            <Button variant="outline-secondary" size="sm" className="me-2 mb-2" key={search}>
              {search}
            </Button>
          ))}
        </Col>
      </Row>

      {/* Job Grid */}
      {loading ? (
            <div id="preloader">
            </div>
      ) : error ? (
        <div>{error}</div>
      ) : (
        <Row className="gy-5" style={{ width: '1215px', height }}>
          {currentCompanies.map((company) => (
            <Col md={4} key={`${company.id}-${company.company_name}`}>
              <div className="border p-4 rounded bg-light text-center" style={{ maxWidth: "100%", width: "100%" }}>
                <Row className="align-items-center">
                  {/* Job Image */}
                  <Col md={4} className="d-flex justify-content-center p-0">
                    <img src={company.logo} alt="Company Logo" className="img-fluid rounded-circle" width="90" />
                  </Col>

                  {/* Job Info */}
                  <Col md={8}>
                    <div className="d-flex align-items-center mb-2" style={{ justifyContent: "flex-start" }}>
                      <div className="d-flex align-items-center">
                        <span>{company.company_name}</span>
                        <span className="badge bg-danger ms-2" style={{ fontSize: "12px" }}>Featured</span>
                      </div>
                    </div>
                    <div className="text-muted mb-3 d-flex align-items-center">
                      <FontAwesomeIcon icon={faMapMarkerAlt} className="me-2" />
                      <span>{company.city}</span>
                    </div>
                  </Col>
                </Row>

                {/* Open Position Button */}
                <Link to={`/employerdetails/${encodeURIComponent(company.company_name)}`} onClick={() => handleEmployerClick(company.company_name)}>
                  <Button className="mt-2" style={{ padding: "5px 10px", width: '100%' , color: '#0A65CC' , backgroundColor: '#add1ff' , border: 'none' }}>
                    Open Position ({company.job_post_count})
                  </Button>
                </Link>
              </div>
            </Col>
          ))}
        </Row>
      )}

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        totalItems={companies.length}
        paginate={paginate}
      />
    </Container>
  );
};

export default FindEmployer;
