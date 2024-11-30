import React, { useState, useRef } from 'react';
import { Form, Row, Col, Button, Container } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';  
import { faPlus, faFileAlt } from '@fortawesome/free-solid-svg-icons';
import '../../../responsive.css';

export default function Personal() {
  const [profileImage, setProfileImage] = useState(null);
  const [cvFile, setCvFile] = useState(null);
  const fileInputRef = useRef(null);
  const cvInputRef = useRef(null);
  const [biography, setBiography] = useState('');

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setProfileImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleButtonClick = () => fileInputRef.current.click();
  const handleCvUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setCvFile(file);
    }
  };

  const handleBiographyChange = (value) => {
    setBiography(value); // Update biography state on change
  };



  const modules = {
    toolbar: [
      [{ header: [null, '3'] }],
      [{ font: [] }],
      [{ size: ['small', 'medium', 'large'] }],
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ align: [] }],
      ['bold', 'italic', 'underline', 'strike'],
      ['link'],
      [{ color: [] }, { background: [] }],
      ['clean'],
    ],
  };

  return (
    <Container fluid="md" className="py-5" style={{ display: 'flex', justifyContent: 'flex-end' }}>
  <Form>
    <h4 style={{ marginBottom: '50px', fontSize: '28px', textAlign: 'left' }}>Basic Information</h4>

    {/* Profile Picture and Basic Info Fields */}
    <Row className="gy-3 profile-container mb-4">
      <Col md={3} className="text-center">
        <div
          className="p-3 rounded"
          style={{ border: '1px solid #ccc', width: '210px', margin: '0 auto 15px auto' }}
        >
          <div className="mb-2">Profile Picture</div>
          <div
            className="profile-image-container"
            style={{
              width: '150px',
              height: '150px',
              borderRadius: '50%',
              overflow: 'hidden',
              backgroundColor: '#f0f0f0',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              margin: '0 auto',
              marginLeft: '10px',
            }}
          >
            {profileImage ? (
              <img
                src={profileImage}
                alt="Profile Preview"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            ) : (
              <span>No Image Uploaded</span>
            )}
          </div>
          <Button variant="outline-primary" className="mt-2" onClick={handleButtonClick}>
            Browse photo
          </Button>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            style={{ display: 'none' }}
            ref={fileInputRef}
          />
        </div>
      </Col>
      <Col md={9}>
        <Row className="gy-3" style={{ marginLeft: '-10px' }}>
          {/** Align fields in 3 columns */}
          <Col md={4}>
            <Form.Label style={{ display: 'block', textAlign: 'left', marginBottom: '8px' }}>First Name</Form.Label>
            <Form.Control placeholder="First Name" />
          </Col>
          <Col md={4}>  
            <Form.Label style={{ display: 'block', textAlign: 'left', marginBottom: '8px' }}>Middle Name</Form.Label>
            <Form.Control placeholder="Middle Name" />
          </Col>
          <Col md={4}>
            <Form.Label style={{ display: 'block', textAlign: 'left', marginBottom: '8px' }}>Last Name</Form.Label>
            <Form.Control placeholder="Last Name" />
          </Col>
          <Col md={4}>
            <Form.Label style={{ display: 'block', textAlign: 'left', marginBottom: '8px' }}>Title/Headline</Form.Label>
            <Form.Control placeholder="Title/Headline" />
          </Col>
          <Col md={4}>
            <Form.Label style={{ display: 'block', textAlign: 'left', marginBottom: '8px' }}>Experience</Form.Label>
            <Form.Select>
            <option value="intern">Internship</option>
            <option value="entry-level">Entry Level (0-2 years)</option>
            <option value="mid-level">Mid Level (2-5 years)</option>
            <option value="senior-level">Senior Level (5-10 years)</option>
            <option value="expert-level">Expert Level (10+ years)</option>
            </Form.Select>
          </Col>
          <Col md={4}>
            <Form.Label style={{ display: 'block', textAlign: 'left', marginBottom: '8px' }}>Educational Attainment</Form.Label>
            <Form.Select>
            <option>Education</option>
            <option value="high-school">High School Diploma</option>
            <option value="associate">Associate Degree</option>
            <option value="bachelor">Bachelor's Degree</option>
            <option value="master">Master's Degree</option>
            <option value="doctorate">Doctorate (PhD, EdD, etc.)</option>
            <option value="professional">Professional Certification</option>
            </Form.Select>
          </Col>

          <Col md={4}>
            <Form.Label style={{ display: 'block', textAlign: 'left', marginBottom: '8px' }}>Gender</Form.Label>
            <Form.Select>
            <option>Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="others">Others</option>
            </Form.Select>
          </Col>

          <Col md={4}>
            <Form.Label style={{ display: 'block', textAlign: 'left', marginBottom: '8px' }}>Marital Status</Form.Label>
            <Form.Select>
            <option>Status</option>
            <option value="single">Single</option>
            <option value="married">Married</option>
            <option value="divorced">Divorced</option>
            <option value="widowed">Widowed</option>
            <option value="seperated">Separated</option>
            </Form.Select>
          </Col>
          <Col md={4}>
  <Form.Label style={{ display: 'block', textAlign: 'left', marginBottom: '8px' }}>Date of Birth</Form.Label>
  <div className="d-flex align-items-center">
    <Form.Control type="date" />
    <i className="bi bi-calendar" style={{ fontSize: '20px', marginLeft: '8px' }}></i>
  </div>
</Col>
          
          
        </Row>
      </Col>
    </Row>



        <Row className="gy-3 profile-container mb-4">
          {/* CV Upload Section */}
          <Col md={4}>
            <Form.Label style={{ display: 'block', textAlign: 'left', marginBottom: '8px' }}>CV Upload</Form.Label>
            <div
              style={{
                border: '1px solid #ccc',
                padding: '20px',
                borderRadius: '8px',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'flex-start',
                height: '70%',
              }}
            >
              {/* Display uploaded CV file */}
              {cvFile ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <FontAwesomeIcon icon={faFileAlt} size="lg" style={{ color: '#007bff' }} />
                  <span style={{ fontSize: '16px', fontWeight: 'bold' }}>{cvFile.name}</span>
                </div>
              ) : (
                <>
                  <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '8px' }}>
                    <div
                      onClick={() => cvInputRef.current.click()}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '40px',
                        height: '40px',
                        border: '2px solid #007bff',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        marginTop: '5px',
                      }}
                    >
                      <FontAwesomeIcon icon={faPlus} size="lg" style={{ color: '#007bff' }} />
                    </div>
                    <span style={{ fontWeight: 'bold', fontSize: '16px', color: '#000', marginTop: '-10px' }}>
                      Upload CV
                    </span>
                  </div>
                  {/* The "Browse file or Drop here" text */}
                  <div
                    style={{
                      fontSize: '14px',
                      color: '#6c757d',
                      marginTop: '-18px', // Adjusted to be closer
                      marginLeft: '48px', // Adjusted for proper alignment
                    }}
                  >
                    Browse file or Drop here
                  </div>
                </>
              )}
              {/* File Input */}
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleCvUpload}
                ref={cvInputRef}
                style={{ display: 'none' }}
              />
            </div>
          </Col>
        </Row>

 
{/* Save Changes and Back Buttons */}
<Row className="mt-5">
  <Col md={12} className="d-flex justify-content-end">
    {/* Back Button */}
    <Button 
      variant="outline-secondary" 
      className="mt-3" 
      style={{ 
        backgroundColor: 'white', 
        color: 'black', 
        borderColor: 'black', 
        marginRight: '10px',
        width: '100px'
      }}
      onMouseEnter={(e) => e.target.style.backgroundColor = '#DDDDDD'}
      onMouseLeave={(e) => e.target.style.backgroundColor = 'white'}
    >
      Back
    </Button>
    
    {/* Save Changes Button */}
    <Button variant="primary" className="mt-3">
      Save Changes
    </Button>
  </Col>
</Row>


      </Form>
    </Container>
  );
}
