import React, { useState } from 'react';
import { Container, Row, Col, Button, Card, Modal } from 'react-bootstrap';
import { FaCalendarAlt, FaBriefcase, FaGraduationCap, FaMoneyBillWave, FaMapMarkerAlt, FaBookmark, FaArrowRight } from 'react-icons/fa';
import { FaLink, FaLinkedin, FaFacebook, FaTwitter, FaEnvelope } from 'react-icons/fa';
import ReactQuill from 'react-quill';


const JobPosting = () => {
  const [modalShow, setModalShow] = useState(false);
  const [jobTitle, setJobTitle] = useState("Senior UX Designer");

  const handleShowModal = () => setModalShow(true);
  const handleCloseModal = () => setModalShow(false);

  return (
    <div>
      <Container className="mt-5 pt-5 job-posting custom-container">
        <Row className="mb-4">
          <Col md={8}>
            <JobDetails />
          </Col>
          <Col md={4}>
            <FavoritesAndApplyButton handleShowModal={handleShowModal} setJobTitle={setJobTitle} />
            <SalaryAndLocation />
            <JobBenefits />
            <JobOverview />
          </Col>
        </Row>
      </Container>

      <ApplyModal 
        show={modalShow} 
        onHide={handleCloseModal} 
        jobTitle={jobTitle} 
      />
    </div>
  );
};

const JobDetails = () => {
  return (
    <Container style={{ border: '1px solid #e0e0e0', padding: '20px', borderRadius: '8px' ,  height: 'auto' , width: '120%' , marginLeft: '-150px' }} className="mt-5">
      <div className="text-start">
        <Row className="align-items-center no-margin m-0">
          <Col xs={3} className="no-padding">
            <img 
              src='./src/assets/google.png'
              alt="Senior UX Designer" 
              className="img-fluid no-margin"
              style={{ margin: '20px 0', width: '75%', height: 'auto', padding: '0' }}
            />
          </Col>
          <Col xs={9} className="no-padding" style={{ padding: '0' }}>
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
    </Container>
  );
};


// Salary and Location Component
const SalaryAndLocation = () => {
  return (
    <Card className="salary-location mt-4" style= {{ width: '130%'}}>
      <Card.Body>
        <Row className="text-center gx-4">
          <Col xs={12} md={6} className="d-flex flex-column align-items-center border-end">
            <FaMoneyBillWave
              style={{ color: '#0A65CC', width: '30px', height: '30px' }}
            />
            <strong className="mt-2">Salary</strong>
            <div style={{ color: '#0BA02C', fontSize: '21px' , fontWeight: '500' }}>₱100,000 - ₱120,000</div>
          </Col>
          <Col xs={12} md={6} className="d-flex flex-column align-items-center">
            <FaMapMarkerAlt
              style={{ color: '#0A65CC', width: '30px', height: '30px' }}
            />
            <strong className="mt-2">Job Location</strong>
            <div>Manila, Philippines</div>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};



const FavoritesAndApplyButton = ({ handleShowModal, setJobTitle }) => {
  return (
    <div className="d-flex justify-content-end mb-2 mt-5 w-100 ms-auto">
      <Button
        variant="light"
        size="lg"
        className="me-2 d-flex align-items-center justify-content-center"
        style={{ height: '45px', borderColor: '#757575' , borderRadius: '5px' }}
      >
        <FaBookmark className="me-1" style={{ color: '#0A65CC' }} />
      </Button>
      <Button
        variant="primary"
        size="lg"
        className="ms-2 d-flex align-items-center justify-content-center"
        style={{ backgroundColor: '#0A65CC', borderRadius: '5px', color: 'white', width: '220px', height: '45px', fontSize: '17px' , marginRight: '-110px' }}
        onClick={() => {
          setJobTitle("Senior UX Designer");
          handleShowModal();
        }}
      >
        Apply Now <FaArrowRight style={{ marginLeft: '5px' }} />
      </Button>
    </div>
  );
};


// Apply Modal Component
const ApplyModal = ({ show, onHide, jobTitle }) => {
  const [resume, setResume] = useState(null);
  const [coverLetter, setCoverLetter] = useState("");

  const handleCoverLetterChange = (value) => {
    setCoverLetter(value);
  };

  const handleSubmit = () => {
    // Handle the application logic here (e.g., form submission, API call)
    alert("Job application submitted!");
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Apply Job: {jobTitle}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="mb-3">
          <label>Upload Resume</label>
          <input 
            type="file" 
            className="form-control" 
            onChange={(e) => setResume(e.target.files[0])} 
          />
        </div>

        <div className="mb-3">
          <label>Cover Letter</label>
          <ReactQuill 
            value={coverLetter} 
            onChange={handleCoverLetterChange} 
            placeholder="Write your cover letter here..." 
          />
        </div>

        <div className="d-flex justify-content-between mt-4">
          <Button variant="secondary" onClick={onHide}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSubmit} style={{ backgroundColor: '#0A65CC', color: 'white' }}>
            Apply Now <FaArrowRight />
          </Button>
        </div>
      </Modal.Body>
    </Modal>
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

// Job Benefits Component
const JobBenefit = ({ title, description }) => {
  return (
    <div
      className="benefit-item"
      style={{
        padding: '5px 10px',
        backgroundColor: '#ececec',
        color: '#0BA02C',
        borderRadius: '7px',
        fontWeight: '500',
      }}
    >
      <div className="me-2">{title}</div>
      <div>{description}</div>
    </div>
  );
};

const JobBenefits = () => {
  const benefits = [
    'Health Insurance',
    'Paid Time Off',
    'Retirement Plan',
    'Bonuses',
    'Stock Options',
    'Flexible Hours',
  ];

  return (
    <Card className="job-benefits mt-4 mx-auto" style={{ width: '130%' }}>
      <Card.Body>
        <h4 className="text-start" style={{ fontSize: '22px'}}>Job Benefits</h4>
        <div className="d-flex flex-wrap gap-2 mt-3">
          {benefits.map((benefit, index) => (
            <JobBenefit key={index} title={benefit} />
          ))}
        </div>
      </Card.Body>
    </Card>
  );
};

// Job Overview Component
const JobOverview = () => {
  return (
    <Card className="job-overview mt-4 mx-auto" style={{ width: '130%' }}>
      <Card.Body>
        <h4 className="text-start" style={{ fontSize: '22px'}}>Job Overview</h4> 
        <Row className="text-start mt-3" style={{ fontWeight: '500'}}> 
          <Col xs={4}>
            <FaCalendarAlt className="me-2" style={{ color: '#0A65CC', width: '30px', height: '25px' }}/>
            <div style={{ color: '#767F8C'}}>Job Posted</div>
            <div>29 Sept, 2024</div>
          </Col>
          <Col xs={4}>
            <FaCalendarAlt className="me-2" style={{ color: '#0A65CC', width: '30px', height: '25px' }}/>
            <div style={{ color: '#767F8C'}}>Job Expires</div>
            <div>14 Dec, 2024</div>
          </Col>
          <Col xs={4}>
            <FaBriefcase className="me-2" style={{ color: '#0A65CC', width: '30px', height: '25px' }}/>
            <div style={{ color: '#767F8C'}}>Job Level</div>
            <div>Senior Level</div>
          </Col>
        </Row>
        <Row className="text-start mt-3" style={{ fontWeight: '500'}}> 
          <Col xs={4}>
            <FaBriefcase className="me-2" style={{ color: '#0A65CC', width: '30px', height: '25px' }} />
            <div style={{ color: '#767F8C'}}>Experience</div>
            <div>1+ years</div>
          </Col>
          <Col xs={4}>
            <FaGraduationCap className="me-2" style={{ color: '#0A65CC', width: '30px', height: '25px' }}/>
            <div style={{ color: '#767F8C'}}>Education</div>
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
    navigator.clipboard.writeText(window.location.href); 
    alert("Link copied to clipboard!");
  };

  return (
    <div className="mt-4" style={{ backgroundColor: '#f8f9fa', padding: '20px', borderRadius: '8px' }}>
      <h5 style={{ textAlign: 'left' }}>Share this Job:</h5>
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
