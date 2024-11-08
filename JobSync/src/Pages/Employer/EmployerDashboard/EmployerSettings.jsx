import React, { useState, useRef } from 'react';
import { Form, Row, Col, Button, Tabs, Tab } from 'react-bootstrap';
import 'react-quill/dist/quill.snow.css';
import EmployerSidebar from '../../../components/employersidebar';

export default function EmployerProfile() {
  const [profileImage, setProfileImage] = useState(null);
  const fileInputRef = useRef(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setProfileImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleButtonClick = () => fileInputRef.current.click();

  return (
    <div className="d-flex">
      <div className="sidebar" style={{ width: '20%', minWidth: '250px' }}>
        <EmployerSidebar />
      </div>

      <div style={{ flex: 1, padding: 0, marginRight: '220px', marginTop: '35px' }}>
        <h3 className="px-4 pt-3">Employer Profile</h3>
        <Tabs defaultActiveKey="companyProfile" className="mb-3 px-4">
          <Tab eventKey="companyProfile" title={<><i className="bi bi-building"></i> Company Profile</>}>
            <Form className="px-4" style={{ marginTop: '30px' }}>
              <h4>Basic Information</h4>
              <Row className="gy-3 profile-container mb-4">
                <Col md={3} className="text-center">
                  <div className="p-3 rounded" style={{ border: '1px solid #ccc', width: '210px', marginTop: '20px' }}>
                    <div className="mb-2">Profile Picture</div>
                    <div className="profile-image-container" style={{
                      width: '150px', height: '150px', borderRadius: '50%', overflow: 'hidden',
                      backgroundColor: '#f0f0f0', display: 'flex', justifyContent: 'center', alignItems: 'center',
                      margin: '0 auto' }}>
                      {profileImage ? (
                        <img src={profileImage} alt="Profile Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      ) : (
                        <span>No Image Uploaded</span>
                      )}
                    </div>
                    <Button variant="outline-primary" className="mt-2" onClick={handleButtonClick}>Browse photo</Button>
                    <input type="file" accept="image/*" onChange={handleImageUpload} style={{ display: 'none' }} ref={fileInputRef} />
                  </div>
                </Col>
                <Col md={9}>
                  <Row className="gy-3" style={{ marginLeft: '40px', marginTop: '4px' }}>
                    <Col md={6}><Form.Control placeholder="Company Name" /></Col>
                    <Col md={6}><Form.Control placeholder="Industry" /></Col>
                    <Col md={6}><Form.Control placeholder="Location" /></Col>
                    <Col md={6}><Form.Control placeholder="Size" /></Col>
                    <Col md={6}><Form.Control placeholder="Website" type="url" /></Col>
                  </Row>
                </Col>
              </Row>
            </Form>
          </Tab>

          <Tab eventKey="foundingInfo" title={<><i className="bi bi-calendar"></i> Founding Info</>}>
            <Form className="px-4" style={{ marginTop: '30px' }}>
              <h4>Founding Details</h4>
              <Row className="gy-3">
                <Col md={6}><Form.Control placeholder="Founding Date" type="date" /></Col>
                <Col md={6}><Form.Control placeholder="Founders" /></Col>
                <Col md={12}><Form.Control placeholder="Mission Statement" as="textarea" rows={3} /></Col>
              </Row>
            </Form>
          </Tab>

          <Tab eventKey="socialMediaInfo" title={<><i className="bi bi-link-45deg"></i> Social Media Info</>}>
            <Form className="px-4" style={{ marginTop: '30px' }}>
              <h4>Social Media Links</h4>
              <Row className="gy-3">
                <Col md={6}><Form.Control placeholder="LinkedIn Profile" type="url" /></Col>
                <Col md={6}><Form.Control placeholder="Facebook Page" type="url" /></Col>
                <Col md={6}><Form.Control placeholder="Twitter Handle" type="url" /></Col>
                <Col md={6}><Form.Control placeholder="Instagram Profile" type="url" /></Col>
              </Row>
            </Form>
          </Tab>

          <Tab eventKey="accountSettings" title={<><i className="bi bi-gear"></i> Account Settings</>}>
            <Form className="px-4" style={{ marginTop: '30px' }}>
              <h4>Account Details</h4>
              <Row className="mb-4">
                <Col md={6}>
                  <Form.Group controlId="currentPassword">
                    <Form.Label>Current Password</Form.Label>
                    <Form.Control type="password" placeholder="Enter current password" />
                  </Form.Group>
                </Col>
              </Row>
              <Row className="mb-4">
                <Col md={6}>
                  <Form.Group controlId="newPassword">
                    <Form.Label>New Password</Form.Label>
                    <Form.Control type="password" placeholder="Enter new password" />
                  </Form.Group>
                </Col>
              </Row>
              <Row className="mb-4">
                <Col md={6}>
                  <Form.Group controlId="confirmNewPassword">
                    <Form.Label>Confirm New Password</Form.Label>
                    <Form.Control type="password" placeholder="Confirm new password" />
                  </Form.Group>
                </Col>
              </Row>
              <Button variant="primary" type="submit">Save Changes</Button>
            </Form>
          </Tab>
        </Tabs>
      </div>
    </div>
  );
}
