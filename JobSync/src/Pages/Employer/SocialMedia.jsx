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
  const [facebookLink, setFacebookLink] = useState(''); // Initialize facebookLink state
  const [instagramLink, setInstagramLink] = useState(''); // Initialize instagramLink state
  const [youtubeLink, setYoutubeLink] = useState(''); // Initialize youtubeLink state
  const [twitterLink, setTwitterLink] = useState(''); // Initialize twitterLink state


  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ logo, banner, companyName, aboutUs, facebookLink, instagramLink, youtubeLink, twitterLink }); // Log all social media links
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
       

        {/* Social Media Links */}
        <Row className="mb-4">
          <Col xs={12}>
            <Form.Group controlId="formFacebookLink">
              <Form.Label>
                Facebook Link <span style={{ color: 'red' }}>*</span>
              </Form.Label>
              <Form.Control
                type="url"
                placeholder="Enter Facebook link"
                value={facebookLink}
                onChange={(e) => setFacebookLink(e.target.value)}
                style={{ padding: '10px', width: '100%' }}
              />
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-4"> 
          <Col xs={12}>
            <Form.Group controlId="formInstagramLink">
              <Form.Label>
                Instagram Link <span style={{ color: 'red' }}>*</span>
              </Form.Label>
              <Form.Control
                type="url"
                placeholder="Enter Instagram link"
                value={instagramLink}
                onChange={(e) => setInstagramLink(e.target.value)}
                style={{ padding: '10px', width: '100%' }}
              />
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-4">
          <Col xs={12}>
            <Form.Group controlId="formYoutubeLink">
              <Form.Label>
                YouTube Link <span style={{ color: 'red' }}>*</span>
              </Form.Label>
              <Form.Control
                type="url"
                placeholder="Enter YouTube link"
                value={youtubeLink}
                onChange={(e) => setYoutubeLink(e.target.value)}
                style={{ padding: '10px', width: '100%' }}
              />
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-4">
          <Col xs={12}>
            <Form.Group controlId="formTwitterLink">
              <Form.Label>
                Twitter Link <span style={{ color: 'red' }}>*</span>
              </Form.Label>
              <Form.Control
                type="url"
                placeholder="Enter Twitter link"
                value={twitterLink}
                onChange={(e) => setTwitterLink(e.target.value)}
                style={{ padding: '10px', width: '100%' }}
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
