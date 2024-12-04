import React, { useState, useEffect } from 'react';
import { Col, Row, Form, Button, Container } from 'react-bootstrap';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { postToEndpoint } from '../../../components/apiService';
import { useAuth } from '../../../AuthContext';
export default function AddressInfo() {
  const [biography, setBiography] = useState('');
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');
  const [barangay, setBarangay] = useState('');
  const [postal, setPostal] = useState('');
  const { user } = useAuth();

  useEffect(() => {
    const fetchApplicantInfo = async () => {
      if (user?.id) {
        try {
          const response = await postToEndpoint('/getApplicantinfo.php', {
            applicant_id: user.id,
          });
  
          if (response.data) {
            const {
              biography,
              city,
              address,
              barangay,
              postal,

            } = response.data;
            setBiography(biography || '');
            setCity(city || '');
            setAddress(address || '');
            setBarangay(barangay || '');
            setPostal(postal || '');

          }
        } catch (error) {
          console.error('Error fetching applicant info:', error);
        }
      }
    };
    fetchApplicantInfo();
  }, [user]); 

  const handleBiographyChange = (value) => {
    setBiography(value); 
  };

  return (
    <Container
      fluid="md"
      className="pb-5"
      style={{
        maxWidth: '1200px',
        background: '#fbfbfb',
        borderRadius: '8px',
        padding: '2rem',
        paddingLeft: '10px',
        paddingTop: '16px',
        display: 'flex',
        justifyContent: 'flex-end',
      }}
    >
      <Form style={{ width: '100%' }}>
        <h4 style={{ marginBottom: '30px', fontSize: '28px', textAlign: 'left' }}>Address Information</h4>

        {/* Address and City Fields */}
        <Row className="gy-3 mb-4">
          <Col md={6}>
            <Form.Label style={{ textAlign: 'left', display: 'block' }}>Address</Form.Label>
            <Form.Control
              className="register1"
              type="text"
              placeholder="Enter your address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </Col>
          <Col md={6}>
            <Form.Label style={{ textAlign: 'left', display: 'block' }}>City</Form.Label>
            <Form.Control
              className="register1"
              type="text"
              placeholder="Enter your city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              
            />
          </Col>
        </Row>

        {/* Barangay and Postcode Fields */}
        <Row className="gy-3 mb-4">
          <Col md={6}>
            <Form.Label style={{ textAlign: 'left', display: 'block' }}>Barangay</Form.Label>
            <Form.Control
              className="register1"
              type="text"
              placeholder="Enter your barangay"
              value={barangay}
              onChange={(e) => setBarangay(e.target.value)}

            />
          </Col>
          <Col md={6}>
            <Form.Label style={{ textAlign: 'left', display: 'block' }}>Postcode</Form.Label>
            <Form.Control
              className="register1"
              type="text"
              placeholder="Enter your postcode"
              value={postal}
              onChange={(e) => setPostal(e.target.value)}
            />
          </Col>
        </Row>

        {/* Biography Field */}
        <hr className="my-4" />
        <Row>
          <Col md={12}>
            <Form.Label
              style={{
                textAlign: 'left',
                display: 'block',
                fontSize: '24px',
                fontWeight: '500',
              }}
            >
              Biography
            </Form.Label>
            <div style={{textAlign: 'left', textWrap: 'balance', marginBottom: '10px'}}>
            <small style={{fontStyle: 'italic'}}>Note: Make sure to include a well-written biography that showcases your unique abilities, experiences, and accomplishments, offering prospective employers a compelling reason to consider you for the position.</small>
            </div>
            <ReactQuill
              value={biography}
              onChange={handleBiographyChange}
              modules={{
                toolbar: [
                  ['bold', 'italic', 'underline'],
                  [{ list: 'ordered' }, { list: 'bullet' }],
                ],
              }}
              style={{ minHeight: '150px', textAlign: 'left' }}
              placeholder="Enter your biography..."
            />
          </Col>
        </Row>

        {/* Save Changes Button */}
        <Row className="mt-5">
          <Col md={12} className="d-flex justify-content-end">
            <Button
              type='submit'
              variant="primary"
              className="mt-3"
              style={{ width: '185px', height: '55px' }}
            >
              Save Changes
            </Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
}
