import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import { Button, Row, Col, Container } from "react-bootstrap";
import FindApplicantTable from "../../components/findapplicanttable";
import Pagination from "../../components/Pagination";

export default function FindApplicant() {
  const [jobSearch, setJobSearch] = useState("");
  const [locationSearch, setLocationSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; 
  const [applicants, setApplicants] = useState([]);

  // Temporary example data
  const exampleApplicants = Array.from({ length: 100 }, (_, index) => ({
    id: index + 1,
    name: `Applicant ${index + 1}`,
    skills: `Skill ${index + 1}`,
  }));

  // Filtered data based on search
  const filteredApplicants = exampleApplicants.filter(
    (applicant) =>
      applicant.name.toLowerCase().includes(jobSearch.toLowerCase()) ||
      applicant.skills.toLowerCase().includes(jobSearch.toLowerCase())
  );

  // Paginated data for the current page
  const paginatedApplicants = filteredApplicants.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Searching for:", jobSearch, locationSearch);
    setApplicants(filteredApplicants); // Update applicant data
  };

  return (
    <div className="container-fluid d-flex flex-column min-vh-100" style={{ marginRight: "450px" }}>
      {/* Search Bar with Find Job Button */}
      <div style={{ backgroundColor: "#f1f2f4", width: "100vw", margin: "0", padding: "0", position: 'absolute', left: '0', height: '180px' }}>
        <div style={{background: 'white', height: '69px', marginTop: '79px', width: '61%', borderRadius: '10px', marginLeft: '378px'}}>
          <div className="my-5 mx-auto" style={{ maxWidth: "1145px", width: "100%", position: 'absolute', right: '0', left: '0', top: '-10px'}}>
            <Row className="mb-5">
              <Col md={12}>
                <form onSubmit={handleSearch} className="d-flex mb-4 mt-4">
                  {/* Job Search Input */}
                  <div
                    className="input-group"
                    style={{ maxWidth: "600px", flexGrow: "1", marginTop: "25px" }}
                  >
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
                      placeholder="Applicant Name, Skills, or Job Title"
                      value={jobSearch}
                      onChange={(e) => setJobSearch(e.target.value)}
                      style={{
                        paddingLeft: "50px",
                        fontSize: "16px",
                        borderRadius: "10px 0 0 10px",
                        paddingRight: "10px",
                        height: "50px",
                        border: 'none'
                      }}
                    />
                  </div>

                  {/* Location Search Input */}
                  <div
                    className="input-group"
                    style={{ maxWidth: "600px", flexGrow: "1", marginTop: "25px" }}
                  >
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
                        paddingLeft: "50px",
                        fontSize: "16px",
                        borderRadius: "0 10px 10px 0",
                        paddingRight: "10px",
                        height: "50px",
                        borderLeft: 'groove',
                        borderRightColor: '#ffffff',
                        borderTopColor: '#ffffff',
                        borderBottomColor: '#ffffff'
                      }}
                    />
                  </div>

                  {/* Find Job Button on the Right */}
                  <Button
                    className="ms-2"
                    style={{
                      fontSize: "16px",
                      height: "47px",
                      width: "145px",
                      marginTop: "28px",
                      marginRight: '-4px',
                      background: '#0a65cc',
                      color: 'white',
                      fontWeight: '500'
                    }}
                    type="submit"
                  >
                    Find 
                  </Button>
                </form>
              </Col>
            </Row>
          </div>
        </div>  
      </div>


      {/* Main content area */}
      <div className="d-flex flex-grow-1 ms-3" style={{marginTop: '260px'}}>
        {/* Sidebar */}
        <div
          className="sidebar border p-3"
          style={{
            width: "350px",
            borderRadius: "10px",
            marginTop: '-35px',
            height: '356px',
            boxShadow: "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px",
          }}
        >
          <div className="filter-group mb-4">
            <h4>Location Radius:</h4>
            <input type="range" className="form-range" min="0" max="100" />
            <p className="mt-2">32 miles</p>
          </div>
          <div className="filter-group">
            <h4>Gender</h4>
            <div className="form-check d-flex align-items-center mb-2">
              <input
                className="form-check-input"
                type="radio"
                name="gender"
                value="all"
                id="gender-all"
                defaultChecked
              />
              <label className="form-check-label ms-2" htmlFor="gender-all">
                All
              </label>
            </div>
            <div className="form-check d-flex align-items-center mb-2">
              <input
                className="form-check-input"
                type="radio"
                name="gender"
                value="male"
                id="gender-male"
              />
              <label className="form-check-label ms-2" htmlFor="gender-male">
                Male
              </label>
            </div>
            <div className="form-check d-flex align-items-center mb-2">
              <input
                className="form-check-input"
                type="radio"
                name="gender"
                value="female"
                id="gender-female"
              />
              <label className="form-check-label ms-2" htmlFor="gender-female">
                Female
              </label>
            </div>
            <div className="form-check d-flex align-items-center mb-2">
              <input
                className="form-check-input"
                type="radio"
                name="gender"
                value="others"
                id="gender-others"
              />
              <label className="form-check-label ms-2" htmlFor="gender-others">
                Others
              </label>
            </div>
          </div>
        </div>
       

        {/* Main Content with Table */}
        <div className="main-content flex-grow-1 ms-3">
          <Container>
            <FindApplicantTable applicants={paginatedApplicants} />
            <Pagination
              currentPage={currentPage}
              itemsPerPage={itemsPerPage}
              totalItems={filteredApplicants.length}
              paginate={paginate}
            />
          </Container>
        </div>
      </div>
    </div>
  );
}
