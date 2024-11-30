import React, { useState, useRef } from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';
import ApplicantsSidebar from '../../../components/applicantsidebar';

export default function ApplicantSettings() {
  const [biography, setBiography] = useState('');
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
        <ApplicantsSidebar />
      </div>

      <div style={{ flex: 1, padding: 0, marginRight: '220px', marginTop: '35px' }}>
        <h3 className="px-4 pt-3">Settings</h3>
        <div className="px-4">
          <h4 style={{ textAlign: 'left' }}><i className="bi bi-lock"></i> Password Settings</h4>
          <Form style={{ marginTop: '30px', marginRight: '466px' }}>
            <h4>Change Password</h4>
            <Row className="mb-4">
              <Col md={6}>
                <Form.Group controlId="currentPassword">
                  <Form.Label>Current Password</Form.Label>
                  <Form.Control type="password" placeholder="Enter current password" style={{ width: '350%' }} />
                </Form.Group>
              </Col>
            </Row>
            <Row className="mb-4">
              <Col md={6}>
                <Form.Group controlId="newPassword">
                  <Form.Label>New Password</Form.Label>
                  <Form.Control type="password" placeholder="Enter new password" style={{ width: '350%' }} />
                </Form.Group>
              </Col>
            </Row>
            <Row className="mb-4">
              <Col md={6}>
                <Form.Group controlId="confirmNewPassword">
                  <Form.Label>Confirm New Password</Form.Label>
                  <Form.Control type="password" placeholder="Confirm new password" style={{ width: '350%' }} />
                </Form.Group>
              </Col>
            </Row>
            <Button variant="primary" type="submit">Save Changes</Button>
          </Form>
        </div>
      </div>
    </div>
  );
}
