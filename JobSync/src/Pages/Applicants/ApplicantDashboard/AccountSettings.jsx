import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Form, Button, Row, Col, Image, InputGroup } from 'react-bootstrap';
import { FaMapMarkerAlt, FaEnvelope, FaPhoneAlt, FaEye, FaEyeSlash, FaTimes, FaBriefcase } from 'react-icons/fa';

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



const AccountSettings = () => {
  const [logo, setLogo] = useState(null);
  const [banner, setBanner] = useState(null);
  const [contactNumber, setContactNumber] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [mapLocation, setMapLocation] = useState('');

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [profilePrivacy, setProfilePrivacy] = useState(true); 
  const [resumePrivacy, setResumePrivacy] = useState(false);

  const handleLogoChange = (e) => setLogo(URL.createObjectURL(e.target.files[0]));
  const handleBannerChange = (e) => setBanner(URL.createObjectURL(e.target.files[0]));

  const handlePasswordToggle = () => setShowPassword(!showPassword);

  const handleProfilePrivacyToggle = () => setProfilePrivacy(!profilePrivacy);
  const handleResumePrivacyToggle = () => setResumePrivacy(!resumePrivacy);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ logo, banner, contactNumber, emailAddress, mapLocation, currentPassword, newPassword, confirmNewPassword });
  };

  return (
    <div>
      <Container
        fluid
        className="text-start"
        style={{
          margin: '0',
          padding: '0',
          width: '100%',
          paddingTop: '15px',
        }}
      >
        <Form onSubmit={handleSubmit} style={{ padding: '20px'}}>

          {/* Map Location, Contact Number, Email Address */}
          <Row className="mb-4">
            <Col xs={12}>
              <Form.Group controlId="formMapLocation">
                <Form.Label>
                  Map Location <span style={{ color: 'red' }}>*</span>
                </Form.Label>
                <InputGroup>
                  <InputGroup.Text>
                    <FaMapMarkerAlt />
                  </InputGroup.Text>
                  <Form.Control
                    className='register1'
                    type="text"
                    placeholder="Enter map location"
                    value={mapLocation}
                    onChange={(e) => setMapLocation(e.target.value)}
                    style={{ paddingLeft: '40px' }} 
                  />
                </InputGroup>
              </Form.Group>
            </Col>
          </Row>

          {/* Contact Number */}
          <Row className="mb-4">
            <Col xs={12}>
              <Form.Group controlId="formContactNumber">
                <Form.Label>
                  Contact Number <span style={{ color: 'red' }}>*</span>
                </Form.Label>
                <InputGroup>
                  <InputGroup.Text>
                    <FaPhoneAlt />
                  </InputGroup.Text>
                  <Form.Control
                    className='register1'
                    type="tel"
                    placeholder="Enter contact number"
                    value={contactNumber}
                    onChange={(e) => setContactNumber(e.target.value)}
                    style={{ paddingLeft: '45px' }}
                  />
                </InputGroup>
              </Form.Group>
            </Col>
          </Row>

          {/* Email Address */}
          <Row className="mb-4">
            <Col xs={12}>
              <Form.Group controlId="formEmailAddress">
                <Form.Label>
                  Email Address <span style={{ color: 'red' }}>*</span>
                </Form.Label>
                <InputGroup>
                  <InputGroup.Text>
                    <FaEnvelope />
                  </InputGroup.Text>
                  <Form.Control
                    className='register1'
                    type="email"
                    placeholder="Enter email address"
                    value={emailAddress}
                    onChange={(e) => setEmailAddress(e.target.value)}
                    style={{ paddingLeft: '45px' }}
                  />
                </InputGroup>
              </Form.Group>
            </Col>
          </Row>

          {/* Save Changes Button */}
          <Row>
            <Col>
              <Button type="submit" style={{width: '200px', backgroundColor: '#0A65CC', height: '48px'}}>
                Save Changes
              </Button>
            </Col>
          </Row>

          {/* Horizontal Line */}
          <hr className="my-4" />

          {/* Notify Header and Checkboxes Section */}
          <Row>
            <Col xs={12}>
              <h5>Notification</h5>
            </Col>
          </Row>
          <Row>
            <Col xs={6}>
              <Form.Check className="mb-3" type="checkbox" label="Notify on job updates" />
              <Form.Check className="mb-3" type="checkbox" label="Notify on employer activity" />
              <Form.Check className="mb-3" type="checkbox" label="Notify on profile views" />
            </Col>
            <Col xs={6}>
              <Form.Check className="mb-3" type="checkbox" label="Notify on new job matches" />
              <Form.Check className="mb-3" type="checkbox" label="Notify on job alerts" />
            </Col>
          </Row>

          <hr className="my-4" />
          <Row>
          {/* Job Alerts Section */}
          <div style={{width: ''}}>
            <h4>Job Alerts</h4>
            <div className="d-flex">
              {/* Role Input */}
              <div className="mt-3">
                <Form.Label>Role</Form.Label>
                <InputGroup>
                  <InputGroup.Text>
                    <FaBriefcase style={{ color: '#0d6efd' }}/>
                  </InputGroup.Text>
                  <Form.Control
                    type="text"
                    className='register1'
                    placeholder="Your job roles"
                    style={{width: '500px', paddingLeft: '45px'}}
                  />
                </InputGroup>
              </div>

              {/* Location Input */}
              <div className="mt-3">
                <Form.Label>Location</Form.Label>
                <InputGroup>
                  <InputGroup.Text>
                    <FaMapMarkerAlt style={{ color: '#0d6efd' }}/>
                  </InputGroup.Text>
                  <Form.Control
                    type="text"
                    className='register1'
                    placeholder="City, state, country name"
                    style={{width: '500px', paddingLeft: '45px'}}
                  />
                </InputGroup>
              </div>
            </div>
          </div>
          </Row>
          <hr className="my-4" />

          {/* Profile Privacy Toggle */}
          <Row className="mb-4">
            <Col xs={6}>
              <h5>Profile Privacy</h5>
              <div className="d-flex align-items-center mt-4">
                <Form.Check
                  type="switch"
                  id="profile-privacy"
                  checked={profilePrivacy}
                  onChange={handleProfilePrivacyToggle}
                  label={profilePrivacy ? "YES" : "NO"}
                  style={{ marginRight: '10px' }}
                />
                <span>Your profile is {profilePrivacy ? "public" : "private"} now</span>
              </div>
            </Col>

            {/* Resume Privacy Toggle */}
            <Col xs={6}>
              <h5>Resume Privacy</h5>
              <div className="d-flex align-items-center mt-4">
                <Form.Check
                  type="switch"
                  id="resume-privacy"
                  checked={resumePrivacy}
                  onChange={handleResumePrivacyToggle}
                  label={resumePrivacy ? "YES" : "NO"}
                  style={{ marginRight: '10px' }}
                />
                <span>Your resume is {resumePrivacy ? "public" : "private"} now</span>
              </div>
            </Col>
          </Row>

          <hr className="my-4" />

          {/* Delete Account Section */}
          <div className="mt-4">
            <h4>Delete Account</h4>
            <p style={{ color: '#757575', textAlign: 'justify' }}>
              If you delete your JobSync account, you will no longer be able to get information about matched jobs,
              following employers, and job alerts, shortlisted, and more. You will be abandoned from all services of JobSync.com.
            </p>
            <Row>
              <Col>
                <Button
                  type="button"
                  style={{ width: '200px', backgroundColor: '#D9534F', height: '48px' , border: 'none' }}
                >
                  Delete Account
                </Button>
              </Col>
            </Row>
          </div>

        </Form>
      </Container>
    </div>
  );
};

export default AccountSettings;
