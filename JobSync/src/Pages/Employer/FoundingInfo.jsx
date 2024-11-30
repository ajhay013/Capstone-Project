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
import MyNavbar1 from '../../components/navbar1'; 
import { useAuth } from '../../AuthContext';
import { postToEndpoint } from '../../components/apiService';
import { Link, useNavigate } from 'react-router-dom'; 

function FoundingInfo() {
  const { user } = useAuth();
  const navigate = useNavigate();
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
  
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      await postToEndpoint('/foundingInfo.php', {
        employer_id: user?.id,
        organizationType,
        industryType,
        teamSize,
        yearOfEstablishment: yearOfEstablishment?.getFullYear(),
        companyWebsite,
        companyVision,
      });
      navigate('/employer/socialmedia');
    } catch (error) {
      console.error('Error saving data:', error);
      alert('Failed to save data');
    }
  };

  const isFormValid = () => {
    return (
      organizationType &&
      industryType &&
      teamSize &&
      yearOfEstablishment &&
      companyWebsite &&
      companyVision
    );
  };

  const modules = {
    toolbar: [
        [{ 'header': [null, '3'] }],
        [{ 'font': [] }],
        [{ 'size': ['small', 'medium', 'large'] }],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
        [{ 'align': [] }],
        ['bold', 'italic', 'underline'],
        ['link'],
        [{ 'color': [] }, { 'background': [] }],
        ['clean'],
      ],
  };

  return (
    <>
      <MyNavbar1 />
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
        <Form onSubmit={handleSubmit} style={{ padding: '20px', width: '100%' , marginBottom: '210px' }}>
          <Row className="mb-4" style={{ margin: '0' }}>
            <Col xs={12} md={4}>
              <Form.Group controlId="formOrganizationType">
                <strong><Form.Label>Organization Type <span style={{ color: 'red' }}>*</span></Form.Label></strong>
                <Form.Select className='register1'
                  value={organizationType}
                  onChange={(e) => setOrganizationType(e.target.value)}
                >
                  <option value="" disabled>Select organization type</option>
                  <option value="Private">Private</option>
                  <option value="Public">Public</option>
                  <option value="Non-profit">Non-profit</option>
                  <option value="Government-owned and Controlled Corporation (GOCC)">Government-owned and Controlled Corporation (GOCC)</option>
                  <option value="Cooperative">Cooperative</option>
                  <option value="Family-owned Business">Family-owned Business</option>
                  <option value="International Organization">International Organization</option>
                  <option value="State University/College">State University/College</option>
                </Form.Select>
              </Form.Group>
            </Col>

            <Col xs={12} md={4}>
              <Form.Group controlId="formIndustryType">
                <strong><Form.Label>Industry Type <span style={{ color: 'red' }}>*</span></Form.Label></strong>
                <Form.Select className='register1'
                  value={industryType}
                  onChange={(e) => setIndustryType(e.target.value)}
                >
                  <option value="" disabled>Select industry type</option>
                  <option value="Technology">Technology</option>
                  <option value="Healthcare">Healthcare</option>
                  <option value="Finance">Finance</option>
                  <option value="BPO (Business Process Outsourcing)">BPO (Business Process Outsourcing)</option>
                  <option value="Manufacturing">Manufacturing</option>
                  <option value="Retail">Retail</option>
                  <option value="Education">Education</option>
                  <option value="Tourism">Tourism</option>
                  <option value="Agriculture">Agriculture</option>
                  <option value="Real Estate">Real Estate</option>
                  <option value="Construction">Construction</option>
                  <option value="Transportation & Logistics">Transportation & Logistics</option>
                  <option value="Energy & Utilities">Energy & Utilities</option>
                  <option value="Telecommunications">Telecommunications</option>
                  <option value="Entertainment & Media">Entertainment & Media</option>
                  <option value="Food & Beverage">Food & Beverage</option>
                  <option value="Pharmaceuticals">Pharmaceuticals</option>
                  <option value="Automotive">Automotive</option>
                  <option value="Government">Government</option>
                  <option value="Non-profit">Non-profit</option>
                  <option value="Finance & Banking">Finance & Banking</option>
                  <option value="Insurance">Insurance</option>
                  <option value="Logistics">Logistics</option>
                  <option value="Mining">Mining</option>
                  <option value="Fashion & Apparel">Fashion & Apparel</option>
                  <option value="Wholesale">Wholesale</option>
                  <option value="Technology Services">Technology Services</option>
                  <option value="Health & Wellness">Health & Wellness</option>
                  <option value="Art & Culture">Art & Culture</option>
                  <option value="Legal Services">Legal Services</option>
                  <option value="Computer Games">Computer Games</option>
                </Form.Select>
              </Form.Group>
            </Col>

            <Col xs={12} md={4}>
              <Form.Group controlId="formTeamSize">
                <strong><Form.Label>Team Size <span style={{ color: 'red' }}>*</span></Form.Label></strong>
                <Form.Select className='register1'
                  value={teamSize}
                  onChange={(e) => setTeamSize(e.target.value)}
                >
                  <option value="" disabled>Select team size</option>
                  <option value="1-10 Employees">1-10 Employees</option>
                  <option value="11-50 Employees">11-50 Employees</option>
                  <option value="51-200 Employees">51-200 Employees</option>
                  <option value="201-500 Employees">201-500 Employees</option> 
                  <option value="501-1000 Employees">501-1000 Employees</option> 
                  <option value="1,000-5,000 Employees">1,000-5,000 Employees</option> 
                  <option value="Freelancers">Freelancers</option> 
                </Form.Select>
              </Form.Group>
            </Col>

          </Row>

          <Row className="mb-4" style={{ margin: '0' }}>
            <Col xs={12} md={4}>
              <Form.Group controlId="formYearOfEstablishment">
                <strong><Form.Label>Year of Establishment <span style={{ color: 'red' }}>*</span></Form.Label></strong>
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
                <strong><Form.Label>Company Website <span style={{ color: 'red' }}>*</span></Form.Label></strong>
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
                <strong><Form.Label>Company Vision <span style={{ color: 'red' }}>*</span></Form.Label></strong>
                <ReactQuill 
                  theme="snow"
                  value={companyVision}
                  onChange={setCompanyVision}
                  placeholder="Write your vision here..."
                  modules={modules}
                  style={{ height: '200px', marginBottom: '30px', width: '100%' }}
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col className="text-start">
              <Link to = '/employer/companyprofile'>
              <Button variant="secondary" style={{ marginRight: '10px', width: '200px' , backgroundColor: 'white', color: 'black', height: '50px' }}>
                <FontAwesomeIcon icon={faArrowLeft} /> Previous 
              </Button>
              </Link>
              <Button 
                variant="primary" 
                type="submit" 
                style={{ width: '200px', height: '50px' }} 
                disabled={!isFormValid()} 
              >
                Save & Next <FontAwesomeIcon icon={faArrowRight} />
              </Button>
            </Col>
          </Row>
        </Form>
      </Container>
    </>
  );
}

export default FoundingInfo;
