import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import { FaCalendarAlt, FaBuilding, FaUsers, FaIndustry, FaGlobe, FaPhone, FaEnvelope, FaArrowRight } from 'react-icons/fa';
import { useParams } from "react-router-dom";
import DOMPurify from 'dompurify'; 
import JobCards from '../../components/jobcards';
import Pagination from '../../components/Pagination';
import { useAuth } from '../../AuthContext'; 
import { getFromEndpoint } from '../../components/apiService';

const CompanyProfileModal = () => {
  const { user } = useAuth(); 
  const { employerId } = useParams();
  const [companyProfile, setCompanyProfile] = useState(null);
  const [error, setError] = useState(null);
  const [showJobs, setShowJobs] = useState(false); 
  const [jobs, setJobs] = useState([]); 
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; 
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const decodedEmployerId = decodeURIComponent(employerId);  

    const fetchCompanyData = async () => {
      if (!decodedEmployerId) {
        setError("No Employer ID provided.");
        return;
      }

      try {
        const response = await getFromEndpoint("/getCompanyProfile.php", { employerId: decodedEmployerId });

        if (response.data && response.data.status === "success" && response.data.data) {
          setCompanyProfile(response.data.data);
        } else {
          setError("Invalid data format received from the API.");
        }
      } catch (error) {
        console.error("Error fetching company data:", error);
        setError("Error fetching company data.");
      }
    };

    fetchCompanyData();
  }, [employerId]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await getFromEndpoint('/getOpenPosition.php', { company_name: employerId });

        if (response.data.status === 'success') {
          setJobs(response.data.data);
        } else {
          console.log("No jobs found for this employer.");
        }
      } catch (error) {
        console.error('There was an error fetching the jobs!', error);
        console.log("Error fetching jobs.");
      } finally {
        setLoading(false);
      }
    };

    if (employerId) {
      fetchJobs();
    }
  }, [employerId]);

  const indexOfLastJob = currentPage * itemsPerPage;
  const indexOfFirstJob = indexOfLastJob - itemsPerPage;
  const currentJobs = jobs.slice(indexOfFirstJob, indexOfLastJob);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const shouldShowPagination = jobs.length > 0;

  if (!employerId) {
    return <p>No employer ID provided.</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!companyProfile) {
    return <div id="preloader"></div>;
  }

  const sanitizedDescription = DOMPurify.sanitize(companyProfile.about_us);

  const decodeHtmlEntities = (text) => {
    const textarea = document.createElement("textarea");
    textarea.innerHTML = text;
    return textarea.value;
  };

  const stripHtmlTags = (html) => html.replace(/<[^>]*>/g, "");
  const cleanText = (text) => stripHtmlTags(decodeHtmlEntities(text));
  return (
    <>
      {/* Banner Section */}
      <Card 
        className="mb-3 shadow" 
        style={{
          marginTop: '4.7rem', 
          width: '110%', 
          position: 'relative',
          left: '50%',
          transform: 'translateX(-50%)'
        }}
      >
        <Card.Img
          variant="top"
          src={companyProfile.banner}
          alt="Company Banner"
          style={{
            width: "100%", 
            height: "250px",
            objectFit: "cover", 
          }}
        />
      </Card>

      {/* Company Information Section */}
      <Container style={{ marginTop: "-70px", width: "98%" }}>
        <Card className="shadow" style={{height: '113px'}}>
          <Card.Body>
            <Row className="align-items-center">
              <Col xs="auto" className="d-flex align-items-center">
                <img
                  src={companyProfile.logo}
                  alt="Company Logo"
                  className="mr-3 rounded-circle"
                  width="75"
                  height="75"
                />
                <div style={{textAlign: 'left', marginLeft: '12px'}}>
                  <h3 className="mb-0">{companyProfile.company_name}</h3>
                  <p className="text-muted mb-0">{companyProfile.industry}</p>
                </div>
              </Col>
              <Col className="text-end" style={{marginRight: '10px'}}>
                <Button 
                  variant="primary" 
                  style={{ width: '220px', height: '50px', borderRadius: '3px' }} 
                  onClick={() => setShowJobs(!showJobs)} 
                >
                  {showJobs ? 'View Profile' : 'View Open Position'}
                  <FaArrowRight style={{ marginLeft: '10px' }} />
                </Button>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Container>

            {showJobs ? (
            <Container className="my-5">
                {loading ? <p>Loading...</p> : <JobCards jobs={currentJobs}  {...(user?.id && { applicantId: user.id })}/>}
                {shouldShowPagination && (
                    <Pagination
                      currentPage={currentPage}
                      itemsPerPage={itemsPerPage}
                      totalItems={jobs.length}
                      paginate={paginate}
                    />
                  )}
            </Container>
            ) : (
            <Container className="my-5">
            <Row className="mt-4">
              <Col md={8}>
                {/* Single Card for Description, Benefits, Vision, and Share Profile */}
                <Card className="mb-4" style={{border: 'none'}}>
                  <Card.Body style={{padding: '30px', paddingTop: '0'}}>
                    {/* Description Section */}
                    <h4 className="text-start">About us</h4>
                    <p className="text-start text-justify" dangerouslySetInnerHTML={{ __html: sanitizedDescription }} />
                    <div className="my-4"></div>

                    {/* Company Benefits Section */}
                    {/* <h5 className="text-start">Company Benefits</h5>
                    <ul className="text-start text-justify">
                      <li>In hac habitasse platea dictumst.</li>
                      <li>Sed aliquet, arcu eget pretium bibendum, odio enim rutrum arcu.</li>
                      <li>Vestibulum id vestibulum odio.</li>
                      <li>Etiam libero ante accumsan id tellus venenatis rhoncus vulputate velit.</li>
                      <li>Nam condimentum sit amet ipsum id malesuada.</li>
                    </ul> */}

                    {/* Add space between sections */}
                    <div className="my-4"></div>

                    {/* Company Vision Section */}
                    <h5 className="text-start">Company Vision</h5>
                      <p className="text-start text-justify">{cleanText(companyProfile.company_vision)}</p>

                    {/* Add space between sections */}
                    <div className="my-4"></div>

                    {/* Share Profile Section */}
                    <h6 className="text-start">Share Profile:</h6>
                    <div className="d-flex justify-content-start">
                      <Button variant="outline-primary" className="mr-2" style={{ marginRight: '8px' }}>
                        <i className="fab fa-facebook mr-2"></i> Facebook
                      </Button>
                      <Button variant="outline-primary" className="mr-2" style={{ marginRight: '8px' }}>
                        <i className="fab fa-twitter mr-2"></i> Twitter
                      </Button>
                      <Button variant="outline-primary">
                        <i className="fab fa-pinterest mr-2"></i> Pinterest
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>

              {/* Right Column */}
              <Col md={4}>
                {/* Company Info Section inside a Card */}
                <Card className="mb-4" style={{borderColor: '#5cccff',}}>
                  <Card.Body style={{padding: '26px'}}>
                    <Row>
                      <Col xs={12} md={6} className="mb-3 text-start">
                        <div className="d-flex flex-column align-items-start">
                          <FaCalendarAlt size={20} style={{ color: '#007bff' }} />
                          <p className="mb-0" style={{ color: '#757575' }}>Founded In</p>
                          <p className="mb-0" style={{ color: '#18191C', fontWeight: '500' }}>{companyProfile.year_establishment}</p>
                        </div>
                      </Col>

                      <Col xs={12} md={6} className="mb-3 text-start">
                        <div className="d-flex flex-column align-items-start">
                          <FaBuilding size={20} style={{ color: '#007bff' }} />
                          <p className="mb-0" style={{ color: '#757575' }}>Organization</p>
                          <p className="mb-0" style={{ color: '#18191C', fontSize: '15px', fontWeight: '500' }}>{companyProfile.organization}</p>
                        </div>
                      </Col>
                    </Row>

                    <Row>
                      <Col xs={12} md={6} className="mb-3 text-start">
                        <div className="d-flex flex-column align-items-start">
                          <FaUsers size={20} style={{ color: '#007bff' }} />
                          <p className="mb-0" style={{ color: '#757575' }}>Team Size</p>
                          <p className="mb-0" style={{ color: '#18191C', fontWeight: '500' }}>{companyProfile.team_size}</p>
                        </div>
                      </Col>

                      <Col xs={12} md={6} className="mb-3 text-start">
                        <div className="d-flex flex-column align-items-start">
                          <FaIndustry size={20} style={{ color: '#007bff' }} />
                          <p className="mb-0" style={{ color: '#757575' }}>Industry</p>
                          <p className="mb-0" style={{ color: '#18191C', fontWeight: '500' }}>{companyProfile.industry}</p>
                        </div>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>

                {/* Contact Information Section */}
                <Card className="mb-4" style={{borderColor: '#5cccff',}}>
                  <Card.Body style={{ padding: '20px' }}>
                    <h5 className="text-start mb-4">Contact Information</h5>

                    {/* Website Information */}
                    <div className="d-flex flex-column p-3" style={{ borderRadius: '8px', marginBottom: '10px' }}>
                      <div className="d-flex align-items-center">
                        <FaGlobe size={25} style={{ color: '#007bff'}} />
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                          <h6 className="mb-0" style={{ textAlign: 'left', marginLeft: '15px' }}>Website</h6>
                          <p className="mb-0" style={{ marginLeft: '15px'}}><a href={companyProfile.company_website} target="_blank">{companyProfile.company_website}</a></p>
                        </div>
                      </div>
                    </div>

                    {/* Phone Information */}
                    <div className="d-flex flex-column p-3" style={{ borderRadius: '8px', marginBottom: '10px' }}>
                      <div className="d-flex align-items-center">
                        <FaPhone size={25} style={{ color: '#007bff'}} />
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                          <h6 className="mb-0" style={{ textAlign: 'left', marginLeft: '15px' }}>Phone</h6>
                          <p className="mb-0" style={{ marginLeft: '15px'}}>{companyProfile.contact_number}</p>
                        </div>
                      </div>
                    </div>

                    {/* Email Information */}
                    <div className="d-flex flex-column p-3" style={{ borderRadius: '8px', marginBottom: '10px' }}>
                      <div className="d-flex align-items-center">
                        <FaEnvelope size={25} style={{ color: '#007bff'}} />
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                          <h6 className="mb-0" style={{ textAlign: 'left', marginLeft: '15px' }}>Email</h6>
                          <p className="mb-0" style={{ marginLeft: '15px'}}>{companyProfile.company_email}</p>
                        </div>
                      </div>
                    </div>
                  </Card.Body>
                </Card>

                  {/* Follow Us Section */}
                  <Card className="mb-4" style={{borderColor: '#5cccff',}}>
                  <Card.Body>
                    <h6 className="text-start">Follow us on:</h6>
                    <div className="d-flex" style={{ paddingTop: '5px' }}>
                      <Button variant="outline-primary" className="mr-2" style={{ marginRight: '8px' }}>
                        <i className="fab fa-facebook"></i>
                      </Button>
                      <Button variant="outline-primary" className="mr-2" style={{ marginRight: '8px' }}>
                        <i className="fab fa-twitter"></i>
                      </Button>
                      <Button variant="outline-primary" className="mr-2" style={{ marginRight: '8px' }}>
                        <i className="fab fa-instagram"></i>
                      </Button>
                      <Button variant="outline-primary">
                        <i className="fab fa-linkedin"></i>
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              
              </Col>
            </Row>
            </Container>     
            )}
    </>
  );
};

export default CompanyProfileModal;
