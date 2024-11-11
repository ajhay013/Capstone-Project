import React, { useState, useRef } from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';
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
        <h3 className="px-4 pt-3" style={{ textAlign: 'left' }}>Employer Profile</h3>
        <Form className="px-4" style={{ marginTop: '30px' }}>
          <Row className="gy-3 profile-container mb-4">
            <Col md={3} className="text-center" style={{ marginBottom: '20px' }}>
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
              <div className="gy-3" style={{ marginLeft: '60px', marginTop: '20px', marginRight: '200px', width: '100%' }}>
                <Form.Group controlId="firstName" style={{ marginBottom: '15px' }}>
                  <Form.Control placeholder="First Name" />
                </Form.Group>
                <Form.Group controlId="middleName" style={{ marginBottom: '15px' }}>
                  <Form.Control placeholder="Middle Name" />
                </Form.Group>
                <Form.Group controlId="lastName" style={{ marginBottom: '15px' }}>
                  <Form.Control placeholder="Last Name" />
                </Form.Group>
                <Form.Group controlId="position" style={{ marginBottom: '15px' }}>
                  <Form.Control placeholder="Position in Company" />
                </Form.Group>
                <Form.Group controlId="email" style={{ marginBottom: '15px' }}>
                  <Form.Control placeholder="Gmail" type="email" />
                </Form.Group>
              </div>
            </Col>
          </Row>
        </Form>
      </div>
    </div>
  );
}
