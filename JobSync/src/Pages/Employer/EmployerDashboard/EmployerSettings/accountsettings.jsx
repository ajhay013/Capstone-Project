import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Form, Button, Row, Col, Image, InputGroup } from 'react-bootstrap';
import { FaMapMarkerAlt, FaEnvelope, FaPhoneAlt, FaEye, FaEyeSlash , FaTimes } from 'react-icons/fa';

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

  const handleLogoChange = (e) => setLogo(URL.createObjectURL(e.target.files[0]));
  const handleBannerChange = (e) => setBanner(URL.createObjectURL(e.target.files[0]));

  const handlePasswordToggle = () => setShowPassword(!showPassword);

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
        <Form onSubmit={handleSubmit} style={{ padding: '20px', width: '100%' }}>

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
                  <Form.Control className='register1'
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
                  <Form.Control className='register1'
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
                  <Form.Control className='register1'
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

          {/* Change Password Section */}
          <div className="mt-5">
            <h4>Change Password</h4>
            
            <Row className="mb-4">
              <Col xs={12} md={4}>
                <Form.Group controlId="formCurrentPassword">
                  <Form.Label>Current Password</Form.Label>
                  <InputGroup style={{width: '100%'}}>
                    <Form.Control className='register1'
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Enter current password"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                    />
                    <InputGroup.Text onClick={handlePasswordToggle} style={{ cursor: 'pointer' , marginLeft: '160px'  }}>
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </InputGroup.Text>
                  </InputGroup>
                </Form.Group>
              </Col>
              <Col xs={12} md={4}>
                <Form.Group controlId="formNewPassword">
                  <Form.Label>New Password</Form.Label>
                  <InputGroup style={{width: '100%'}}>
                    <Form.Control className='register1'
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Enter new password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                    />
                    <InputGroup.Text onClick={handlePasswordToggle} style={{ cursor: 'pointer' , marginLeft: '150px' }}>
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </InputGroup.Text>
                  </InputGroup>
                </Form.Group>
              </Col>
              <Col xs={12} md={4}>
                <Form.Group controlId="formConfirmNewPassword">
                  <Form.Label>Confirm New Password</Form.Label>
                  <InputGroup style={{width: '100%'}}>
                    <Form.Control className='register1'
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Confirm new password"
                      value={confirmNewPassword}
                      onChange={(e) => setConfirmNewPassword(e.target.value)}
                    />
                    <InputGroup.Text onClick={handlePasswordToggle} style={{ cursor: 'pointer' , marginLeft: '160px' }}>
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </InputGroup.Text>
                  </InputGroup>
                </Form.Group>
              </Col>
            </Row>

            {/* New Button Below Password Fields */}
            <Row>
              <Col>
                <Button type="submit" style={{ width: '200px', backgroundColor: '#0A65CC', marginTop: '20px', height: '48px' }}>
                  Change Password
                </Button>
              </Col>
            </Row>
          </div>

          {/* Delete Account Section */}
          <div className="mt-4">
            <h4>Delete Account</h4>
            <p style={{ color: '#757575', textAlign: 'justify' }}>
              If you delete you JobSync account, you will no longer be able to get information about the matched jobs,
              following employers, and job alert, shortlisted and more. You will be abandoned from all the services of JobSync.com
            </p>
            <Row>
              <Col>
                <Button
                  type="button"
                  style={{ width: '200px', backgroundColor: '#D9534F' , borderColor: '#D9534F', height: '48px' }}
                  onClick={() => alert('Account will be deleted')}
                >
                  <FaTimes style={{ marginRight: '8px' }} /> 
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
