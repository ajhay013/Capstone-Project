import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-quill/dist/quill.snow.css';
import { Container, Form, Button, Row, Col, Image } from 'react-bootstrap';
import ReactQuill from 'react-quill';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import MyNavbar1 from '../../components/navbar1';


// File Upload Component
const FileUpload = ({ label, required, onChange, imageSrc }) => (
  <Form.Group controlId={`form${label.replace(" ", "")}`} className="text-start">
    <Form.Label>
      {label} {required && <span style={{ color: 'red' }}>*</span>}
    </Form.Label>
    <Form.Control type="file" accept="image/*" onChange={onChange} />
    {imageSrc && (
      <Image
        src={imageSrc}
        alt={label}
        className="mt-3"
        thumbnail
        style={{
          width: label === "Upload Company Logo" ? '150px' : '100%',
          height: 'auto',
        }}
      />
    )}
  </Form.Group>
);

// CompanyProfile Component
const CompanyProfile = () => {
  const [logo, setLogo] = useState(null);
  const [banner, setBanner] = useState(null);
  const [companyName, setCompanyName] = useState('');
  const [aboutUs, setAboutUs] = useState('');

  const handleLogoChange = (e) => setLogo(URL.createObjectURL(e.target.files[0]));
  const handleBannerChange = (e) => setBanner(URL.createObjectURL(e.target.files[0]));

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ logo, banner, companyName, aboutUs });
  };

  return (
    <Container
      fluid
      className="text-start"
      style={{
        margin: '0',
        padding: '0',
        width: '100%',
        paddingTop: '56px',
      }}
    >
      <Form onSubmit={handleSubmit} style={{ padding: '20px', width: '100%' }}>
        {/* Company Logo and Banner Upload */}
        <Row className="mb-4">
          <Col xs={12} md={6}>
            <FileUpload label="Upload Company Logo" required onChange={handleLogoChange} imageSrc={logo} />
          </Col>
          <Col xs={12} md={6}>
            <FileUpload label="Upload Company Banner" required onChange={handleBannerChange} imageSrc={banner} />
          </Col>
        </Row>

        {/* Company Name */}
        <Row className="mb-4">
          <Col xs={12}>
            <Form.Group controlId="formCompanyName">
              <Form.Label>
                Company Name <span style={{ color: 'red' }}>*</span>
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter company name"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                style={{ padding: '10px', width: '100%' }}
              />
            </Form.Group>
          </Col>
        </Row>

        {/* About Us Section */}
        <Row className="mb-4">
          <Col xs={12}>
            <Form.Group controlId="formAboutUs">
              <Form.Label>
                About Us <span style={{ color: 'red' }}>*</span>
              </Form.Label>
              <ReactQuill
                theme="snow"
                value={aboutUs}
                onChange={setAboutUs}
                placeholder="Tell us about your company"
                style={{ height: '200px', marginBottom: '30px', width: '100%' }}
              />
            </Form.Group>
          </Col>
        </Row>

        {/* Submit Button */}
        <Row>
          <Col>
            <Button type="submit" style={{ width: '200px', backgroundColor: '#0A65CC' }}>
              Save & Next <FontAwesomeIcon icon={faArrowRight} />
            </Button>
          </Col> 
        </Row>
      </Form>
    </Container>
  );
};

// Main Component
const CompanyProfilePage = () => (
  <div>
    <MyNavbar1 />
    <CompanyProfile />
  </div>
);

export default CompanyProfilePage;
