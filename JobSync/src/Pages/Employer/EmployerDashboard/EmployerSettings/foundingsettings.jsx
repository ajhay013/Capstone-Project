import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaLink } from 'react-icons/fa';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useAuth } from '../../../../AuthContext'; 
import { postToEndpoint } from '../../../../components/apiService';


export default function FoundingSettings() {
  const { user } = useAuth(); 
  const [organizationType, setOrganizationType] = useState('');
  const [industryType, setIndustryType] = useState('');
  const [teamSize, setTeamSize] = useState('');
  const [yearOfEstablishment, setYearOfEstablishment] = useState(null);
  const [companyWebsite, setCompanyWebsite] = useState('');
  const [companyVision, setCompanyVision] = useState('');

  useEffect(() => {
    const fetchFoundingInfo = async () => {
      if (user?.id) {
        try {
          const response = await postToEndpoint('/fetchfoundingInfo.php', {
            employer_id: user.id,
          });
  
          if (response.data) {
            const { organization, industry, team_size, year_establishment, company_vision, company_website } = response.data;
  
            setOrganizationType(organization || ''); 
            setIndustryType(industry || ''); 
            setTeamSize(team_size || '');
            setYearOfEstablishment(year_establishment ? new Date(year_establishment) : null); 
            setCompanyWebsite(company_website || ''); 
  
            if (company_vision) {
              const decodedVision = new DOMParser().parseFromString(company_vision, 'text/html').documentElement.textContent;
              const cleanedVision = decodedVision.replace(/<[^>]*>/g, '');  
              setCompanyVision(cleanedVision || '');  
            } else {
              setCompanyVision('');  
            }
          }
        } catch (error) {
          console.error('Error fetching founding info:', error);
        }
      }
    };
  
    fetchFoundingInfo();
  }, [user?.id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ organizationType, industryType, teamSize, yearOfEstablishment, companyWebsite, companyVision });
  };

  return (
    <>
      <Container
        fluid
        className="text-start"
        style={{
          margin: '0',
          padding: '0',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          paddingTop: '10px',
        }}
      >
        <Form onSubmit={handleSubmit} style={{ padding: '20px', width: '100%', marginBottom: '210px' }}>
          <Row className="mb-4" style={{ margin: '0' }}>
            <Col xs={12} md={4}>
              <Form.Group controlId="formOrganizationType">
                <Form.Label>Organization Type</Form.Label>
                <Form.Select className='register1'
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
                <Form.Select className='register1'
                  value={industryType}
                  onChange={(e) => setIndustryType(e.target.value)}
                >
                  <option value="">Select industry type</option>
                  <option value="Technology">Technology</option>
                  <option value="Healthcare">Healthcare</option>
                  <option value="Finance">Finance</option>
                  <option value="Education">Education</option>
                  <option value="Manufacturing">Manufacturing</option>
                  <option value="Retail">Retail</option>
                  <option value="Real Estate">Real Estate</option>
                  <option value="Hospitality">Hospitality</option>
                  <option value="Entertainment">Entertainment</option>
                  <option value="Energy">Energy</option>
                  <option value="Transportation">Transportation</option>
                </Form.Select>
              </Form.Group>
            </Col>

            <Col xs={12} md={4}>
              <Form.Group controlId="formTeamSize">
                <Form.Label>Team Size</Form.Label>
                <Form.Select className='register1'
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
                  className="form-control register1"
                />
              </Form.Group>
            </Col>

            <Col xs={12} md={6}>
              <Form.Group controlId="formCompanyWebsite">
                <Form.Label>Company Website</Form.Label>
                <div className="input-group" style={{width: '100%'}}>
                  <span className="input-group-text"><FaLink /></span>
                  <Form.Control
                    type="url"
                    value={companyWebsite}
                    onChange={(e) => setCompanyWebsite(e.target.value)}
                    placeholder="Enter website URL"
                    className="py-2 px-5 register1"
                    style={{borderTopLeftRadius: '10px', borderBottomLeftRadius: '10px'}}
                  />
                </div>
              </Form.Group>
            </Col>
          </Row>

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

          <Row>
            <Col className="d-flex justify-content-center">
              <Button variant="primary" type="submit" style={{ width: '200px' }}>
                Save Changes
              </Button>
            </Col>
            </Row>

        </Form>
      </Container>
    </>
  );
}
