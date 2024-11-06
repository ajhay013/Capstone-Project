// src/components/applicants/PasswordSettings.jsx
import React, { useState } from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';

export default function PasswordSettings() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  return (
    <Form className="px-4">
      <h4>Change Password</h4>
      
      <Row className="gy-3">
        <Col md={6} lg={5} xl={4}>
          <Form.Group controlId="currentPassword" className="mb-3">
            <Form.Label>Current Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter current password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
          </Form.Group>
        </Col>
      </Row>
      
      <Row className="gy-3">
        <Col md={6} lg={5} xl={4}>
          <Form.Group controlId="newPassword" className="mb-3">
            <Form.Label>New Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </Form.Group>
        </Col>
      </Row>
      
      <Row className="gy-3">
        <Col md={6} lg={5} xl={4}>
          <Form.Group controlId="confirmNewPassword" className="mb-3">
            <Form.Label>Confirm New Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm new password"
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
            />
          </Form.Group>
        </Col>
      </Row>
      
      <Button variant="primary" type="submit" className="w-100 mt-3">Update Password</Button>
    </Form>
  );
}
