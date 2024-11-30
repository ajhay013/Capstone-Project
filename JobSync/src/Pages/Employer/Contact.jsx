import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-quill/dist/quill.snow.css';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import MyNavbar1 from '../../components/navbar1';
import { Link } from 'react-router-dom';
import { useAuth } from '../../AuthContext';
import { postToEndpoint } from '../../components/apiService';
import { useNavigate } from 'react-router-dom';

const CompanyProfile = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [contactNumber, setContactNumber] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [location, setLocation] = useState('');
  const [contactError, setContactError] = useState('');
  const [loading, setLoading] = useState(false); 
  const [city, setCity] = useState('');


  const isFormValid = contactNumber && emailAddress && location;

  const handleContactChange = (e) => {
    const value = e.target.value;
    const contactRegex = /^[1-9]\d{0,9}$/;

    if (value.length === 10) {
      setContactError('');
    } else if (!contactRegex.test(value) && value !== '') {
      setContactError("Contact number must be 10 digits long and cannot start with 0");
    } else {
      setContactError(''); 
    }

    setContactNumber(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    try {
      const response = await postToEndpoint('/companyContact.php', {
        employer_id: user?.id,
        contactNumber,
        emailAddress,
        location,
        city,  
      });
  
      setLoading(false);
  
      if (response.data.success) {
        navigate('/complete');
      } else {
        alert('Failed to save data');
      }
    } catch (error) {
      setLoading(false);
      console.error('Error saving data:', error);
      alert('An error occurred while saving data');
    }
  };
  


  return (
    <Container
      fluid
      className="text-start"
      style={{
        margin: '0',
        padding: '0',
        width: '100%',
        paddingTop: '28px'
      }}
    >
      <Form onSubmit={handleSubmit} style={{ padding: '20px', width: '100%', marginBottom: '350px' }}>
        
        <Row className="mb-4">
          <Col xs={12}>
            <Form.Group controlId="formLocation">
              <Form.Label>
                <strong>Address <span style={{ color: 'red' }}>*</span></strong>
              </Form.Label>
              <Form.Control
                className="register1"
                type="text"
                placeholder="Enter company address"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                style={{ padding: '10px', width: '100%' }}
              />
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-4">
          <Col xs={12}>
            <Form.Group controlId="formCity">
              <Form.Label>
                <strong>City <span style={{ color: 'red' }}>*</span></strong>
              </Form.Label>
              <Form.Control
                className="register1"
                type="text"
                placeholder="Enter city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                style={{ padding: '10px', width: '100%' }}
              />
            </Form.Group>
          </Col>
        </Row>

        
        <Row className="mb-4">
          <Col xs={12}>
            <Form.Group controlId="formContactNumber">
              <Form.Label>
                <strong>Contact Number <span style={{ color: 'red' }}>*</span></strong>
              </Form.Label>
              <Form.Control
                className="register1"
                placeholder="Enter contact number"
                value={contactNumber}
                onChange={handleContactChange}
                style={{ padding: '10px', width: '100%' }}
                type="text"
                onKeyDown={(e) => {
                  if (contactNumber.length === 0 && e.key === '0') {
                    e.preventDefault();
                  }
                  if (!/[0-9]/.test(e.key) && e.key !== 'Backspace') {
                    e.preventDefault();
                  }
                }}
                maxLength={10}
                required
              />
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-4">
          <Col xs={12}>
            <Form.Group controlId="formEmailAddress">
              <Form.Label>
                <strong>Company Email Address <span style={{ color: 'red' }}>*</span></strong>
              </Form.Label>
              <Form.Control
                className="register1"
                type="email"
                placeholder="Enter email address"
                value={emailAddress}
                onChange={(e) => setEmailAddress(e.target.value)}
                style={{ padding: '10px', width: '100%' }}
              />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col>
            <Link to="/employer/socialmedia">
              <Button
                variant="secondary"
                style={{
                  marginRight: '10px',
                  width: '200px',
                  backgroundColor: 'white',
                  color: 'black',
                  height: '50px',
                }}
              >
                <FontAwesomeIcon icon={faArrowLeft} /> Previous
              </Button>
            </Link>
            <Button
              type="submit"
              style={{ width: '200px', backgroundColor: '#0A65CC', height: '50px' }}
              disabled={!isFormValid} // Disable button if form is not valid
            >
              Finish Editing <FontAwesomeIcon icon={faArrowRight} />
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
}

export default CompanyContactPage;
