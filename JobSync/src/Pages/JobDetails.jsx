import React from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { FaCalendarAlt, FaBriefcase, FaGraduationCap, FaMoneyBillWave, FaMapMarkerAlt, FaBookmark } from 'react-icons/fa';
import { FaLinkedin, FaFacebook, FaTwitter, FaEnvelope } from 'react-icons/fa';

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

// Job Details Component
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
      <Button variant="primary" size="lg" className="ms-2" style={{ backgroundColor: '#0A65CC', color: 'white' }}>
        Apply Now
      </Button>
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
        <h4>Job Overview</h4>
        <Row className="text-center">
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
        <Row className="text-center mt-3">
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

// Share Job Component
const ShareJob = () => {
  return (
    <div className="mt-4">
      <h5>Share this Job:</h5>
      <div className="d-flex justify-content-between">
        <Button variant="link" aria-label="Share on LinkedIn">
          <FaLinkedin className="me-2" style={{ color: '#0A65CC', width: '20px', height: '20px' }} />
          LinkedIn
        </Button>
        <Button variant="link" aria-label="Share on Facebook">
          <FaFacebook className="me-2" style={{ color: '#0A65CC', width: '20px', height: '20px' }} />
          Facebook
        </Button>
        <Button variant="link" aria-label="Share on Twitter">
          <FaTwitter className="me-2" style={{ color: '#0A65CC', width: '20px', height: '20px' }} />
          Twitter
        </Button>
        <Button variant="link" aria-label="Share via Email">
          <FaEnvelope className="me-2" style={{ color: '#0A65CC', width: '20px', height: '20px' }} />
          Email
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
        src="https://www.google.com/maps/embed?pb=!1m18..." // Ensure the src is correct
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
