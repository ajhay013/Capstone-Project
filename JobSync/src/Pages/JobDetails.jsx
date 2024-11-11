import React from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { FaCalendarAlt, FaBriefcase, FaGraduationCap, FaMoneyBillWave, FaMapMarkerAlt, FaBookmark } from 'react-icons/fa';
import { FaLink, FaLinkedin, FaFacebook, FaTwitter, FaEnvelope } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const JobPosting = () => {
  return (
    <div>
      <Container className="mt-5 pt-5 job-posting custom-container">
        <Row className="mb-4">
          <Col md={8}>
  
            <JobDetails />
          </Col>
          <Col md={4}>
            
            <FavoritesAndApplyButton />
          
            <SalaryAndLocation />
           
            <JobOverview />
          </Col>
        </Row>
      </Container>

    </div>
  );
};

const JobDetails = () => {
  return (
    <div className="text-start">
      <Row className="align-items-center no-margin mt-5">
        <Col xs={3} className="no-padding">
          <img 
            src='./src/assets/google.png'
            alt="Senior UX Designer" 
            className="img-fluid no-margin"
            style={{ margin: '20px 0', width: '75%', height: 'auto', padding: '0' }}
          />
        </Col>
        <Col xs={9} className="no-padding" style={{ padding: '0'}}>
          <h1 className="no-margin text-start">Senior UX Designer</h1>
          <span className="company-name no-margin text-start">at Google</span> 
          <span className="badge bg-success ms-2 no-margin">FULL-TIME</span> 
          <span className="badge bg-primary ms-2 no-margin">Featured</span>
        </Col>
      </Row>
      <p className="job-description mt-4">Join our vibrant team and apply your creativity and expertise in UI/UX design...</p>
      <p className="job-location">Join our vibrant team and apply your creativity and expertise in UI/UX design in a supportive and dynamic environment...</p>
      <JobRequirements />
      <JobResponsibilities />
    </div>
  );
};

// Salary and Location Component
const SalaryAndLocation = () => {
  return (
    <Card className="salary-location mt-4">
      <Card.Body>
        <Row className="text-center">
          <Col xs={6}>
            <FaMoneyBillWave className="me-2" style={{ color: '#0A65CC', width: '20px', height: '20px' }}/>
            <strong>Salary</strong> 
            <div>$100,000 - $120,000</div>
          </Col>
          <Col xs={6}>
            <FaMapMarkerAlt className="me-2" style={{ color: '#0A65CC', width: '20px', height: '20px' }}/>
            <strong>Location</strong> 
            <div>Manila, Philippines</div>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

// Favorites and Apply Button Component
const FavoritesAndApplyButton = () => {
  return (
    <div className="d-flex mb-2 mt-5" style={{ marginLeft: '180px'}}>
      <Button variant="light" size="lg" className="me-0">
        <FaBookmark className="me-1"  style={{ color: '#0A65CC' }}/>
      </Button>
      <Link to="/candidate_login">
      <Button variant="primary" size="lg" className="ms-2" style={{ backgroundColor: '#0A65CC', color: 'white' }}>
        Apply Now
      </Button>
      </Link>
    </div>
  );
};

// Job Requirements Component
const JobRequirements = () => {
  return (
    <div>
      <h4>Experience and Skills</h4>
      <div className="justify-text">
        <ul>
          <li>1+ years of professional experience in UI/UX design</li>
          <li>Proficiency in design tools such as Adobe XD and Figma</li>
          <li>Strong understanding of user-centered design (UCD) principles</li>
          <li>Experience in conducting user research and usability testing</li>
          <li>Ability to create wireframes, user flows, and prototypes</li>
          <li>Knowledge of responsive design and mobile UI/UX</li>
          <li>Excellent visual design skills with an understanding of user-system interaction</li>
          <li>Familiarity with Agile methodologies...</li>
        </ul>
      </div>
    </div>
  );
};

// Job Responsibilities Component
const JobResponsibilities = () => {
  return (
    <div>
      <h4>Responsibilities</h4>
      <div className="justify-text">
        <ul>
          <li>Lead the UI/UX design process from concept to completion</li>
          <li>Collaborate with product management and engineering teams...</li>
          <li>Conduct user research and evaluate user feedback...</li>
          <li>Develop wireframes, storyboards, user flows...</li>
          <li>Assess existing applications for UI/UX effectiveness</li>
        </ul>
      </div>
    </div>
  );
};

// Job Overview Component
const JobOverview = () => {
  return (
    <Card className="job-overview mt-4">
      <Card.Body>
        <h4 className="text-start">Job Overview</h4> {/* Align the header to the left */}
        <Row className="text-start mt-3"> {/* Align the row content to the left */}
          <Col xs={4}>
            <FaCalendarAlt className="me-2" style={{ color: '#0A65CC', width: '20px', height: '20px' }}/>
            <div><strong>Job Posted</strong></div>
            <div>29 Sept, 2024</div>
          </Col>
          <Col xs={4}>
            <FaCalendarAlt className="me-2" style={{ color: '#0A65CC', width: '20px', height: '20px' }}/>
            <div><strong>Job Expires</strong></div>
            <div>14 Dec, 2024</div>
          </Col>
          <Col xs={4}>
            <FaBriefcase className="me-2" style={{ color: '#0A65CC', width: '20px', height: '20px' }}/>
            <div><strong>Job Level</strong></div>
            <div>Senior Level</div>
          </Col>
        </Row>
        <Row className="text-start mt-3"> {/* Align the row content to the left */}
          <Col xs={4}>
            <FaBriefcase className="me-2" style={{ color: '#0A65CC', width: '20px', height: '20px' }} />
            <strong>Experience</strong>
            <div>1+ years</div>
          </Col>
          <Col xs={4}>
            <FaGraduationCap className="me-2" style={{ color: '#0A65CC', width: '20px', height: '20px' }}/>
            <strong>Education</strong> 
            <div>College Graduate</div>
          </Col>
        </Row>
        <ShareJob />
        <JobLocation />
      </Card.Body>
    </Card>
  );
};

const ShareJob = () => {
  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);  // Copies the current page URL
    alert("Link copied to clipboard!");
  };

  return (
    <div className="mt-4" style={{ backgroundColor: '#f8f9fa', padding: '20px', borderRadius: '8px' }}>
      <h5>Share this Job:</h5>
      <div className="d-flex justify-content-start align-items-center">
        {/* Copy Link Button */}
        <Button 
          variant="primary" 
          onClick={copyLink} 
          aria-label="Copy Link" 
          style={{ padding: '5px 15px', marginRight: '10px', backgroundColor: '#ddf2ff', color: '#0A65CC' , border: 'none' }}
        >
          <FaLink className="me-2" style={{ width: '20px', height: '20px' }} />
          Copy Link
        </Button>

        <Button variant="link" aria-label="Share on LinkedIn" style={{ padding: '0', maxWidth: '50px', marginRight: '10px' }}>
          <FaLinkedin className="me-0" style={{ color: '#0A65CC', width: '20px', height: '20px' }} />
        </Button>
        <Button variant="link" aria-label="Share on Facebook" style={{ padding: '0', maxWidth: '50px', marginRight: '10px' }}>
          <FaFacebook className="me-0" style={{ color: '#0A65CC', width: '20px', height: '20px' }} />
        </Button>
        <Button variant="link" aria-label="Share on Twitter" style={{ padding: '0', maxWidth: '50px', marginRight: '10px' }}>
          <FaTwitter className="me-0" style={{ color: '#0A65CC', width: '20px', height: '20px' }} />
        </Button>
        <Button variant="link" aria-label="Share via Email" style={{ padding: '0', maxWidth: '50px' }}>
          <FaEnvelope className="me-0" style={{ color: '#0A65CC', width: '20px', height: '20px' }} />
        </Button>
      </div>
    </div>
  );
};

// Job Location Component
const JobLocation = () => {
  return (
    <div className="mt-4">
      <h5>Location</h5>
      <iframe 
        title="Google Map"
        src="https://www.google.com/maps/embed?pb=!1m18..."
        width="100%" 
        height="300" 
        style={{ border: 0 }} 
        allowFullScreen="" 
        loading="lazy"
      />
    </div>
  );
};

export default JobPosting;
