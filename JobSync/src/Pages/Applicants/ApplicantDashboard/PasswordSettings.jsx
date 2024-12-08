import React, { useState } from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';

export default function PasswordSettings() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  return (
    <div style={{ padding: '0', marginTop: '35px', marginRight: '700px' }}>

      <div className="px-4">
        <Form style={{ marginTop: '30px' }}>
          <h4 className="text-start">Change Password</h4>

          <Row className="gy-3 justify-content-start" style={{ marginTop: '20px' }}>
            <Col style={{ maxWidth: '100%' }}>
              <Form.Group controlId="currentPassword" className="mb-3">
                <Form.Label className="text-start w-100 mb-3">Current Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter current password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  style={{ width: '100%' }}
                />
              </Form.Group>
            </Col>
          </Row>

          <Row className="gy-3 justify-content-start">
            <Col style={{ maxWidth: '100%' }}>
              <Form.Group controlId="newPassword" className="mb-3">
                <Form.Label className="text-start w-100 mt-4 mb-3">New Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter new password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  style={{ width: '100%' }}
                />
              </Form.Group>
            </Col>
          </Row>

          <Row className="gy-3 justify-content-start">
            <Col style={{ maxWidth: '100%' }}>
              <Form.Group controlId="confirmNewPassword" className="mb-3">
                <Form.Label className="text-start w-100 mt-4 mb-3">Confirm New Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Confirm new password"
                  value={confirmNewPassword}
                  onChange={(e) => setConfirmNewPassword(e.target.value)}
                  style={{ width: '100%' }}
                />
              </Form.Group>
            </Col>
          </Row>

          <div className="text-start">
            <Button variant="primary" type="submit" className="mt-5">
              Update Password
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}
