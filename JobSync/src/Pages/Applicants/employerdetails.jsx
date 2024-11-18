import React from "react";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import { FaCalendarAlt, FaBuilding, FaUsers, FaIndustry, FaGlobe, FaPhone, FaEnvelope } from 'react-icons/fa';

const CompanyProfileModal = () => {
  return (
    <>
      {/* Banner Section */}
      <Card className="mb-3 shadow">
        <Card.Img
          variant="top"
          src="./src/assets/riotbanner.jpg"
          alt="Company Banner"
          style={{
            width: "100%", 
            height: "250px",
            objectFit: "cover", 
            marginTop: "30px",
          }}
        />
      </Card>

      {/* Company Information Section */}
      <Container style={{ marginTop: "-60px", width: "90%" }}>
        <Card className="mb-3 shadow">
          <Card.Body>
            <Row className="align-items-center">
              <Col xs="auto" className="d-flex align-items-center">
                <img
                  src="./src/assets/riot.png"
                  alt="Company Logo"
                  className="mr-3 rounded-circle"
                  width="50"
                  height="50"
                />
                <div>
                  <h3 className="mb-0" style={{ marginRight: "px" }}>Riot Games</h3>
                  <p className="text-muted mb-0" style={{ marginLeft: "10px"}} >Information Technology (IT)</p>
                </div>
              </Col>
              <Col className="text-right" style={{ marginLeft: "50%" }}>
                <Button variant="primary">View Open Position</Button>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Container>

      {/* Grouped Sections inside One Card */}
      <Container className="my-5">
        <Row className="mt-4">
          <Col md={8}>
            {/* Single Card for Description, Benefits, Vision, and Share Profile */}
            <Card className="mb-4">
              <Card.Body>
                {/* Description Section */}
                <h5 className="text-start">Description</h5>
                <p className="text-start text-justify">
                  Join our vibrant team and apply your creativity and expertise in UI/UX design in a supportive and dynamic environment. Our workplace culture is centered around mutual respect and a commitment to a healthy work/life balance.
                  Join our vibrant team and apply your creativity and expertise in UI/UX design in a supportive and dynamic environment. Our workplace culture is centered around mutual respect and a commitment to a healthy work/life balance.
                </p>

                {/* Add space between sections */}
                <div className="my-4"></div>

                {/* Company Benefits Section */}
                <h5 className="text-start">Company Benefits</h5>
                <ul className="text-start text-justify">
                  <li>In hac habitasse platea dictumst.</li>
                  <li>Sed aliquet, arcu eget pretium bibendum, odio enim rutrum arcu.</li>
                  <li>Vestibulum id vestibulum odio.</li>
                  <li>Etiam libero ante accumsan id tellus venenatis rhoncus vulputate velit.</li>
                  <li>Nam condimentum sit amet ipsum id malesuada.</li>
                </ul>

                {/* Add space between sections */}
                <div className="my-4"></div>

                {/* Company Vision Section */}
                <h5 className="text-start">Company Vision</h5>
                <p className="text-start text-justify">
                  Praesent ultrices mauris at nisl euismod, ut venenatis augue blandit...
                </p>

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
            <Card className="mb-4">
              <Card.Body>
                <Row>
                  <Col xs={12} md={6} className="mb-3 text-start">
                    <div className="d-flex flex-column align-items-start">
                      <FaCalendarAlt size={20} style={{ color: '#007bff' }} />
                      <p className="mb-0" style={{ color: '#757575' }}>Founded In</p>
                      <p className="mb-0" style={{ color: '#18191C', fontWeight: 'bold' }}>14 June, 2021</p>
                    </div>
                  </Col>

                  <Col xs={12} md={6} className="mb-3 text-start">
                    <div className="d-flex flex-column align-items-start">
                      <FaBuilding size={20} style={{ color: '#007bff' }} />
                      <p className="mb-0" style={{ color: '#757575' }}>Organization Type</p>
                      <p className="mb-0" style={{ color: '#18191C', fontSize: '15px', fontWeight: 'bold' }}>Private Company</p>
                    </div>
                  </Col>
                </Row>

                <Row>
                  <Col xs={12} md={6} className="mb-3 text-start">
                    <div className="d-flex flex-column align-items-start">
                      <FaUsers size={20} style={{ color: '#007bff' }} />
                      <p className="mb-0" style={{ color: '#757575' }}>Team Size</p>
                      <p className="mb-0" style={{ color: '#18191C', fontWeight: 'bold' }}>120-200 Candidates</p>
                    </div>
                  </Col>

                  <Col xs={12} md={6} className="mb-3 text-start">
                    <div className="d-flex flex-column align-items-start">
                      <FaIndustry size={20} style={{ color: '#007bff' }} />
                      <p className="mb-0" style={{ color: '#757575' }}>Industry Type</p>
                      <p className="mb-0" style={{ color: '#18191C', fontWeight: 'bold' }}>Technology</p>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
            </Card>

            {/* Contact Information Section */}
            <Card className="mb-4">
              <Card.Body style={{ padding: '20px' }}>
                <h5 className="text-start mb-4">Contact Information</h5>

                {/* Website Information */}
                <div className="d-flex flex-column p-3" style={{ borderRadius: '8px', marginBottom: '10px' }}>
                  <div className="d-flex align-items-center">
                    <FaGlobe size={25} style={{ color: '#007bff'}} />
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <h6 className="mb-0" style={{ marginBottom: '5px', marginRight: '100px' }}>Website</h6>
                      <p className="mb-0" style={{ marginLeft: '15px'}}><a href="https://www.estherhoward.com">www.estherhoward.com</a></p>
                    </div>
                  </div>
                </div>

                {/* Phone Information */}
                <div className="d-flex flex-column p-3" style={{ borderRadius: '8px', marginBottom: '10px' }}>
                  <div className="d-flex align-items-center">
                    <FaPhone size={25} style={{ color: '#007bff'}} />
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <h6 className="mb-0" style={{ marginBottom: '5px', marginRight: '55px' }}>Phone</h6>
                      <p className="mb-0" style={{ marginLeft: '15px'}}>+1 202-555-0141</p>
                    </div>
                  </div>
                </div>

                {/* Email Information */}
                <div className="d-flex flex-column p-3" style={{ borderRadius: '8px', marginBottom: '10px' }}>
                  <div className="d-flex align-items-center">
                    <FaEnvelope size={25} style={{ color: '#007bff'}} />
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <h6 className="mb-0" style={{ marginBottom: '5px', marginRight: '130px' }}>Email</h6>
                      <p className="mb-0" style={{ marginLeft: '20px'}}>esther.howard@gmail.com</p>
                    </div>
                  </div>
                </div>
              </Card.Body>
            </Card>

              {/* Follow Us Section */}
              <Card className="mb-4">
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
    </>
  );
};

export default CompanyProfileModal;
