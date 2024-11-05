import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-quill/dist/quill.snow.css';
import { Container, Form, Button, Row, Col, Image } from 'react-bootstrap';
import ReactQuill from 'react-quill';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight , faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import MyNavbar1 from '../../components/navbar1';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

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

const CompanyProfile = () => {
  const [logo, setLogo] = useState(null);
  const [banner, setBanner] = useState(null);
  const [companyName, setCompanyName] = useState('');
  const [aboutUs, setAboutUs] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [mapLocation, setMapLocation] = useState({ lat: 0, lng: 0 }); 

  const handleLogoChange = (e) => setLogo(URL.createObjectURL(e.target.files[0]));
  const handleBannerChange = (e) => setBanner(URL.createObjectURL(e.target.files[0]));

  const handleMapClick = (event) => {
    setMapLocation({
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ logo, banner, companyName, aboutUs, contactNumber, emailAddress, mapLocation });
  };

  return (
    <Container
      fluid
      className="text-start"
      style={{
        margin: '0',
        padding: '0',
        width: '100%',
        paddingTop: '56px'
      }}
    >
      <Form onSubmit={handleSubmit} style={{ padding: '20px', width: '100%' , marginBottom: '350px' }}>
       

        <Row className="mb-4">
          <Col xs={12}>
            <Form.Group controlId="formContactNumber">
              <Form.Label>
                Contact Number <span style={{ color: 'red' }}>*</span>
              </Form.Label>
              <Form.Control
                type="tel"
                placeholder="Enter contact number"
                value={contactNumber}
                onChange={(e) => setContactNumber(e.target.value)}
                style={{ padding: '10px', width: '100%' }}
              />
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-4">
          <Col xs={12}>
            <Form.Group controlId="formEmailAddress">
              <Form.Label>
                Email Address <span style={{ color: 'red' }}>*</span>
              </Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email address"
                value={emailAddress}
                onChange={(e) => setEmailAddress(e.target.value)}
                style={{ padding: '10px', width: '100%' }}
              />
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-4">
          <Col xs={12}>
            <Form.Label>
              Select Location on Map <span style={{ color: 'red' }}>*</span>
            </Form.Label>
            <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
              <GoogleMap
                mapContainerStyle={{ height: '400px', width: '100%' }}
                center={mapLocation}
                zoom={10}
                onClick={handleMapClick}
              >
                <Marker position={mapLocation} />
              </GoogleMap>
            </LoadScript>
          </Col>
        </Row>

        <Row>
          <Col>
          <Button variant="secondary" style={{ marginRight: '10px', width: '200px' , backgroundColor: 'white', color: 'black' }}>
              <FontAwesomeIcon icon={faArrowLeft} /> Back 
              </Button>
            <Button type="submit" style={{ width: '200px', backgroundColor: '#0A65CC' }}>
              Save & Next <FontAwesomeIcon icon={faArrowRight} />
            </Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
};

function CompanyContactPage() {
  return (
    <div>
      <MyNavbar1 />
      <CompanyProfile />
    </div>
  );
};

export default CompanyContactPage;
