import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaLink } from 'react-icons/fa';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import ReactQuill from 'react-quill'; 
import 'react-quill/dist/quill.snow.css'; 
import DatePicker from 'react-datepicker'; 
import 'react-datepicker/dist/react-datepicker.css'; 
import MyNavbar1 from '../../components/navbar1'; 

const FoundingInfo = () => {
  const [organizationType, setOrganizationType] = useState('');
  const [industryType, setIndustryType] = useState('');
  const [teamSize, setTeamSize] = useState('');
  const [yearOfEstablishment, setYearOfEstablishment] = useState(null);
  const [companyWebsite, setCompanyWebsite] = useState('');
  const [companyVision, setCompanyVision] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ organizationType, industryType, teamSize, yearOfEstablishment, companyWebsite, companyVision });
  };

  return (
    <>
      <MyNavbar1 /> 

      <Container
        fluid
        className="text-start" // Align text to the left
        style={{
          margin: '0',
          padding: '0',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          marginTop: '56px'
        }}
      >
        <Form onSubmit={handleSubmit} style={{ padding: '20px', width: '100%' }}>

          {/* Organization, Industry, and Team Size Fields */}
          <Row className="mb-4" style={{ margin: '0' }}>
            <Col xs={12} md={4}>
              <Form.Group controlId="formOrganizationType">
                <Form.Label>Organization Type</Form.Label>
                <Form.Select
                  value={organizationType}
                  onChange={(e) => setOrganizationType(e.target.value)}
                >
                  <option value="">Select organization type</option>
                  <option value="Private">Private</option>
                  <option value="Public">Public</option>
                  <option value="Non-profit">Non-profit</option>
                </Form.Select>
              </Form.Group>
            </Col>

            <Col xs={12} md={4}>
              <Form.Group controlId="formIndustryType">
                <Form.Label>Industry Type</Form.Label>
                <Form.Select
                  value={industryType}
                  onChange={(e) => setIndustryType(e.target.value)}
                >
                  <option value="">Select industry type</option>
                  <option value="Technology">Technology</option>
                  <option value="Healthcare">Healthcare</option>
                  <option value="Finance">Finance</option>
                </Form.Select>
              </Form.Group>
            </Col>

            <Col xs={12} md={4}>
              <Form.Group controlId="formTeamSize">
                <Form.Label>Team Size</Form.Label>
                <Form.Select
                  value={teamSize}
                  onChange={(e) => setTeamSize(e.target.value)}
                >
                  <option value="">Select team size</option>
                  <option value="1-10">1-10</option>
                  <option value="11-50">11-50</option>
                  <option value="51-200">51-200</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>

          {/* Year of Establishment and Company Website Fields */}
          <Row className="mb-4" style={{ margin: '0' }}>
            <Col xs={12} md={4}>
              <Form.Group controlId="formYearOfEstablishment">
                <Form.Label>Year of Establishment</Form.Label>
                <DatePicker
                  selected={yearOfEstablishment}
                  onChange={(date) => setYearOfEstablishment(date)}
                  showYearPicker
                  dateFormat="yyyy"
                  placeholderText="Select year"
                  className="form-control"
                />
              </Form.Group>
            </Col>

            <Col xs={12} md={4}>
              <Form.Group controlId="formCompanyWebsite">
                <Form.Label>Company Website</Form.Label>
                <div className="input-group">
                  <span className="input-group-text"><FaLink /></span>
                  <Form.Control
                    type="url"
                    value={companyWebsite}
                    onChange={(e) => setCompanyWebsite(e.target.value)}
                    placeholder="Enter website URL"
                  />
                </div>
              </Form.Group>
            </Col>
          </Row>

          {/* Company Vision Field */}
          <Row className="mb-4" style={{ margin: '0' }}>
            <Col xs={12}>
              <Form.Group controlId="formCompanyVision">
                <Form.Label>Company Vision</Form.Label>
                <ReactQuill 
                  value={companyVision}
                  onChange={setCompanyVision}
                  placeholder="Write your vision here..."
                  style={{ height: '200px', marginBottom: '30px', width: '100%' }}
                />
              </Form.Group>
            </Col>
          </Row>

          {/* Back and Submit Buttons */} 
          <Row>
            <Col className="text-start">
              <Button variant="secondary" style={{ marginRight: '10px', width: '200px' }}>
                Back
              </Button>
              <Button variant="primary" type="submit" style={{ width: '200px' }}>
                Save & Next <FontAwesomeIcon icon={faArrowRight} />
              </Button>
            </Col>
          </Row>

        </Form>
      </Container>
    </>
  );
};

export default FoundingInfo;
