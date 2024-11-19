import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Card, Modal } from 'react-bootstrap';
import { FaCalendarAlt, FaBriefcase, FaGraduationCap, FaMoneyBillWave, FaMapMarkerAlt, FaRegBookmark, FaArrowRight, FaBusinessTime, FaSuitcase } from 'react-icons/fa';
import { FaLink, FaLinkedin, FaFacebook, FaTwitter, FaEnvelope } from 'react-icons/fa';
import ReactQuill from 'react-quill';
import { useParams } from 'react-router-dom';
import { getFromEndpoint } from '../components/apiService';
import DOMPurify from 'dompurify'; 
import 'react-quill/dist/quill.snow.css';


const JobPosting = () => {
  const [modalShow, setModalShow] = useState(false);
  const [jobTitle, setJobTitle] = useState("Senior UX Designer");

  const handleShowModal = () => setModalShow(true);
  const handleCloseModal = () => setModalShow(false);
  const { job_id } = useParams();
  const [job, setJob] = useState(null);


  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const response = await getFromEndpoint(`/get_jobs.php?job_id=${job_id}`);
        if (response.data && response.data.length > 0) {
          const jobData = response.data[0];
  
          console.log("Raw selectedBenefits:", jobData.selectedBenefits);
  
          if (jobData.selectedBenefits && jobData.selectedBenefits.trim() !== '') {
            jobData.selectedBenefits = jobData.selectedBenefits.split(',')
              .map(item => item.trim())
              .filter(item => item && item !== ' ');
  
            console.log("Cleaned selectedBenefits:", jobData.selectedBenefits);
          } else {
            jobData.selectedBenefits = null;
          }
  
          setJob(jobData);
        } else {
          console.error("No job data found");
        }
      } catch (error) {
        console.error("Error fetching job details:", error);
      }
    };
  
    fetchJobDetails();
  }, [job_id]);
  
  
  
  
if (!job) return (
  <div className="d-flex justify-content-center">
    <div className="spinner-border" role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
  </div>
);
    const sanitizedDescription = DOMPurify.sanitize(job.jobDescription);

  const JobBenefits = ({ selectedBenefits }) => {
    if (!selectedBenefits || selectedBenefits.length === 0) {
      return <p>No benefits listed for this job.</p>;
    }
  
    return (
      <div className="d-flex flex-wrap gap-2 mt-3">
        {selectedBenefits.map((benefit, index) => (
          <span
            key={index}
            className="badge"
            style={{ padding: '10px', borderRadius: '5px', fontSize: '14px', color: '#1978db', background: '#d3eeff' }}
          >
            {benefit}
          </span>
        ))}
      </div>
    );
  };
  
  
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };
  
  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href); 
    alert("Link copied to clipboard!");
  };
  console.log("Selected Benefits:", job.selectedBenefits);

  
  return (
    <div>
      <Container className="mt-5 pt-5 job-posting custom-container" style={{ minWidth: '10%' }}>
        <Row className="mb-4">
          <Col md={7}>
            <Container style={{padding: '16px', height: 'auto', width: '100%', marginLeft: '-40px' }}>
              <div className="text-start">
                <Row className="align-items-center no-margin m-0">
                  <Col xs={3} className="no-padding">
                    <img
                      src={job.logo || './src/assets/default-logo.png'}
                      alt={job.jobTitle}
                      className="img-fluid no-margin"
                      style={{ margin: '20px 0', width: '75%', height: 'auto', padding: '0', marginLeft: '18px' }}
                    />
                  </Col>
                  <Col xs={9} className="no-padding" style={{ padding: '0' }}>
                    <h1 className="no-margin text-start">{job.jobTitle}</h1>
                    <span className="company-name no-margin text-start" style={{fontSize: '18px', fontWeight: '500'}}>at {job.company_name}</span>
                    <span className="badge ms-2 no-margin" style={{padding: '9px', textTransform: 'uppercase', borderRadius: '3px', fontSize: '10px', background: '#119d5c'}}>{job.jobType}</span>
                  </Col>
                </Row>
                <h4 className="mt-4" style={{marginLeft: '20px', color: '#616161'}}>Job Description</h4>
                <p className="job-description mt-4" style={{marginLeft: '20px'}} dangerouslySetInnerHTML={{ __html: sanitizedDescription }} />
              </div>
            </Container>
          </Col>
          <Col md={5}>
            <FavoritesAndApplyButton handleShowModal={handleShowModal} setJobTitle={setJobTitle} />
            <Card className="salary-location mt-4" style= {{ width: '110%', padding: '15px' }}>
                <Card.Body>
                  <Row className="text-center gx-4">
                    <Col xs={12} md={6} className="d-flex flex-column align-items-center border-end">
                      <FaMoneyBillWave
                        style={{ color: '#0A65CC', width: '30px', height: '30px' }}
                      />
                      <strong className="mt-2" style={{fontSize: '19px', fontWeight: '500'}}>Salary</strong>
                      <div style={{ color: '#0BA02C', fontSize: '18px' , fontWeight: '500' }}>₱{job.minSalary} - ₱{job.maxSalary}</div>
                      <div style={{ color: '#868686', fontSize: '14px' , fontWeight: '500' }}>{job.salaryType} Salary</div>
                    </Col>
                    <Col xs={12} md={6} className="d-flex flex-column align-items-center">
                      <FaMapMarkerAlt
                        style={{ color: '#0A65CC', width: '30px', height: '30px' }}
                      />
                      <strong className="mt-2"style={{fontSize: '19px', fontWeight: '500'}}>Job Location</strong>
                      <div style={{ color: '#868686', fontSize: '15px', fontWeight: '500'}}>{job.city}</div>
                    </Col>
                    
                  </Row>
                </Card.Body>
              </Card>
              
              <Card className="job-benefits mt-4 mx-auto" style={{ width: '110%', padding: '20px' }}>
                <Card.Body>
                  <h4 className="text-start" style={{ fontSize: '22px' }}>Job Benefits</h4>
                  <JobBenefits selectedBenefits={job.selectedBenefits} />
                </Card.Body>
              </Card>

            <Card className="job-overview mt-4 mx-auto" style={{ width: '110%', padding: '20px'}}>
              <Card.Body>
                <h4 className="text-start" style={{ fontSize: '22px'}}>Job Overview</h4> 
                <Row className="text-start mt-3" style={{ fontWeight: '500'}}> 
                <Col xs={4}>
                  <FaCalendarAlt className="me-2" style={{ color: '#0A65CC', width: '30px', height: '25px' }} />
                  <div style={{ color: '#767F8C', marginTop: '10px', marginBottom: '3px' }}>Job Posted</div>
                  <div>{formatDate(job.job_created_at)}</div>
                </Col>
                  <Col xs={4}>
                    <FaBusinessTime className="me-2" style={{ color: '#0A65CC', width: '30px', height: '25px' }}/>
                    <div style={{ color: '#767F8C', marginTop: '10px', marginBottom: '3px'}}>Job Expires</div>
                    <div>{formatDate(job.expirationDate)}</div>
                  </Col>
                  <Col xs={4}>
                    <FaSuitcase className="me-2" style={{ color: '#0A65CC', width: '30px', height: '25px' }}/>
                    <div style={{ color: '#767F8C', marginTop: '10px', marginBottom: '3px'}}>Job Level</div>
                    <div>{job.jobLevel}</div>
                  </Col>
                </Row>
                <Row className="text-start mt-3" style={{ fontWeight: '500'}}> 
                  <Col xs={4}>
                    <FaBriefcase className="me-2" style={{ color: '#0A65CC', width: '30px', height: '25px' }} />
                    <div style={{ color: '#767F8C', marginTop: '10px', marginBottom: '3px'}}>Experience</div>
                    <div>{job.experience}</div>
                  </Col>
                  <Col xs={4}>
                    <FaGraduationCap className="me-2" style={{ color: '#0A65CC', width: '30px', height: '25px' }}/>
                    <div style={{ color: '#767F8C', marginTop: '10px', marginBottom: '3px'}}>Education</div>
                    <div>{job.education}</div>
                  </Col>
                </Row>
                <hr className='text-muted'/>
                <div className="mt-4">
                  <h5 style={{ textAlign: 'left' }}>Share this Job:</h5>
                  <div className="d-flex justify-content-start align-items-center" style={{marginTop: '-16px'}}>
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
                <hr className='text-muted' style={{marginTop: '20px'}}/>
                <div className="mt-4">
                  <h5 style={{ textAlign: 'left' }}>Address</h5>
                  <div className="d-flex justify-content-center align-items-center" style={{ textAlign: 'center' }}>
                    <div
                      style={{
                        minWidth: '100%',
                        color: '#5b5b5b',
                        fontSize: '15px',
                        fontWeight: '500',
                        paddingLeft: '30px', 
                        paddingRight: '30px', 
                      }}
                    >
                      {job.address}
                    </div>
                  </div>
                </div>
              </Card.Body>  
            </Card>
            <div className="mt-4">
              <iframe 
                title="Google Map"
                src="https://www.google.com/maps/embed?pb=!1m18..."
                width="110%" 
                height="300" 
                style={{ border: 0 }} 
                allowFullScreen="" 
                loading="lazy"
              />
            </div>
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




const FavoritesAndApplyButton = ({ handleShowModal, setJobTitle }) => {
  return (
    <div className="d-flex mb-2 mt-5 ms-auto" style={{width: '110%', width: '236px'}}>
      <Button
        variant="light"
        size="lg"
        className="me-1 d-flex align-items-center justify-content-center"
        style={{ height: '55px', borderRadius: '5px', background: '#d7ecff' }}
      >
        <FaRegBookmark style={{ color: '#0A65CC' }} />
      </Button>
      <Button
        variant="primary"
        size="lg"
        className="ms-2 d-flex align-items-center justify-content-center"
        style={{ backgroundColor: '#0A65CC', borderRadius: '5px', color: 'white', width: '220px', height: '55px', fontSize: '16px' , marginRight: '-110px', fontWeight: '500'}}
        onClick={() => {
          setJobTitle("Senior UX Designer");
          handleShowModal();
        }}
      >
        Apply Now <FaArrowRight style={{ marginLeft: '15px' }} />
      </Button>
    </div>
  );
};


const ApplyModal = ({ show, onHide, jobTitle }) => {
  const [resume, setResume] = useState(null);
  const [coverLetter, setCoverLetter] = useState("");

  const handleCoverLetterChange = (value) => {
    setCoverLetter(value);
  };

  const handleSubmit = () => {
    alert("Job application submitted!");
    onHide();
  };

  
  const modules = {
    toolbar: [
        [{ 'header': [null, '3'] }],
        [{ 'font': [] }],
        [{ 'size': ['small', 'medium', 'large'] }],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
        [{ 'align': [] }],
        ['bold', 'italic', 'underline', 'strike'],
        ['link'],
        ['blockquote', 'code-block'],
        [{ 'color': [] }, { 'background': [] }],
        ['clean'],
    ],
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
            theme='snow'
            placeholder="Write your cover letter here..." 
            modules={modules}
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

export default JobPosting;
