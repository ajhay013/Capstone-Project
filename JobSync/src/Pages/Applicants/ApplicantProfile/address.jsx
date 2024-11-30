import React, { useState } from 'react';
import { Col, Row, Form, Button } from 'react-bootstrap';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export default function AddressInfo() {
  const [biography, setBiography] = useState('');

  const handleBiographyChange = (value) => {
    setBiography(value); // Update biography state on change
  };

  return (
    <>
      {/* Global style reset */}
      <style>
        {`
          body, html {
            margin: 0;
            padding: 0;
            width: 100%;
          }
          #root {
            margin: 0;
            padding: 0;
            width: 100%;
          }
        `}
      </style>

      {/* Main form wrapper */}
      <div style={{ margin: 0, padding: 0, width: '100%', position: 'absolute', marginLeft: '20px', marginTop: '-100px' }}>
        <Form style={{ width: '100%', margin: 0 }}>
          <h4 style={{ marginBottom: '20px', fontSize: '28px', textAlign: 'left' }}>
            Address Information
          </h4>

          <Row className="gy-3" style={{ marginBottom: '15px' }}>
            {/* Address Field */}
            <Col md={6} style={{ padding: '0 15px', textAlign: 'left' }}>
              <Form.Label style={{ display: 'block', marginBottom: '5px' }}>Address</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your address"
                style={{ width: '100%' }}
              />
            </Col>

            {/* City Field */}
            <Col md={6} style={{ padding: '0 15px', textAlign: 'left' }}>
              <Form.Label style={{ display: 'block', marginBottom: '5px' }}>City</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your city"
                style={{ width: '100%' }}
              />
            </Col>
          </Row>

          <Row className="gy-3" style={{ marginBottom: '15px' }}>
            {/* Barangay Field */}
            <Col md={6} style={{ padding: '0 15px', textAlign: 'left' }}>
              <Form.Label style={{ display: 'block', marginBottom: '5px' }}>Barangay</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your barangay"
                style={{ width: '100%' }}
              />
            </Col>

            {/* Postcode Field */}
            <Col md={6} style={{ padding: '0 15px', textAlign: 'left' }}>
              <Form.Label style={{ display: 'block', marginBottom: '5px' }}>Postcode</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your postcode"
                style={{ width: '100%' }}
              />
            </Col>
          </Row>

          {/* Biography Field */}
          <Row className="gy-3" style={{ marginBottom: '20px', marginTop: '40px' }}>
            <Col md={12} style={{ padding: '0 15px', textAlign: 'left' }}>
              <Form.Label style={{ display: 'block', marginBottom: '5px' }}>Biography</Form.Label>
              <ReactQuill
                value={biography}
                onChange={handleBiographyChange}
                modules={{
                  toolbar: [['bold', 'italic', 'underline'], [{ list: 'ordered' }, { list: 'bullet' }]],
                }}
                style={{ width: '100%' }}
                placeholder="Enter your biography..."
              />
            </Col>
          </Row>

          {/* Save Changes and Back Buttons */}
<Row className="mt-5">
  <Col md={12} className="d-flex justify-content-end">
    {/* Back Button */}
    <Button 
      variant="outline-secondary" 
      className="mt-3" 
      style={{ 
        backgroundColor: 'white', 
        color: 'black', 
        borderColor: 'black', 
        marginRight: '10px',
        width: '100px'
      }}
      onMouseEnter={(e) => e.target.style.backgroundColor = '#DDDDDD'}
      onMouseLeave={(e) => e.target.style.backgroundColor = 'white'}
    >
      Back
    </Button>
    
    {/* Save Changes Button */}
    <Button variant="primary" className="mt-3">
      Save Changes
    </Button>
  </Col>
</Row>

        </Form>
      </div>
    </>
  );
}
