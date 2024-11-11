import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-quill/dist/quill.snow.css';
import { Container, Form, Button, Row, Col, Image, Card } from 'react-bootstrap';
import ReactQuill from 'react-quill';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import MyNavbar1 from '../../components/navbar1';
import { useAuth } from '../../AuthContext';
import { postToEndpoint } from '../../components/apiService';
import { useNavigate } from 'react-router-dom';

// FileUpload Component
const FileUpload = ({ label, required, onChange }) => (
  <Form.Group controlId={`form${label.replace(" ", "")}`} className="text-start">
    <Form.Label>
      {label} {required && <span style={{ color: 'red' }}>*</span>}
    </Form.Label>
    <Form.Control type="file" accept="image/*" onChange={onChange} />
  </Form.Group>
);

// CompanyProfile Component
const CompanyProfile = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [logo, setLogo] = useState(null);
  const [banner, setBanner] = useState(null);
  const [companyName, setCompanyName] = useState('');
  const [aboutUs, setAboutUs] = useState('');

  // Fetch Company Info on Component Mount
  useEffect(() => {
    const fetchCompanyInfo = async () => {
      if (user?.id) {
        try {
          const response = await postToEndpoint('/getCompanyInfo.php', {
            employer_id: user.id,
          });
          if (response.data) {
            const { company_name, about_us, logo, banner } = response.data;
            setCompanyName(company_name);
            setAboutUs(about_us);
            setLogo(logo || null);
            setBanner(banner || null);
          }
        } catch (error) {
          console.error('Error fetching company info:', error);
        }
      }
    };

    fetchCompanyInfo();
  }, [user]);

  // Handle File Changes
  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) setLogo(file);
  };

  const handleBannerChange = (e) => {
    const file = e.target.files[0];
    if (file) setBanner(file);
  };

  // Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('logo', logo);
    formData.append('banner', banner);
    formData.append('companyName', companyName);
    formData.append('aboutUs', aboutUs);
    formData.append('employer_id', user?.id);

    try {
      const response = await postToEndpoint('/companyprofile.php', formData, {
        'Content-Type': 'multipart/form-data',
      });
      console.log('Data saved successfully:', response.data);
      navigate('/employer/foundinginfo');
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

  // Generate URLs for Image Previews
  const logoUrl = logo instanceof File ? URL.createObjectURL(logo) : logo;
  const bannerUrl = banner instanceof File ? URL.createObjectURL(banner) : banner;

  return (
    <Container fluid className="d-flex justify-content-center" style={{ padding: '0', paddingTop: '20px' }}>
      <Form onSubmit={handleSubmit} style={{ maxWidth: '800px', width: '100%' }} className="p-4">
        <Row className="mb-4">
          <Col xs={12} md={6}>
            <strong><FileUpload label="Upload Company Logo" required onChange={handleLogoChange} /></strong>
          </Col>
          <Col xs={12} md={6}>
            <strong><FileUpload label="Upload Company Banner" required onChange={handleBannerChange} /></strong>
          </Col>
        </Row>

        <Row className="mb-4">
          <Col xs={12} md={6}>
            <Card
              className="p-3 mb-4 text-center"
              style={{
                width: '200px',
                height: '200px',
                borderRadius: '50%',
                display: 'flex',
                marginLeft: '60px',
                justifyContent: 'center',
                alignItems: 'center',
                overflow: 'hidden',
              }}
            >
              {logoUrl ? (
                <Image
                  src={logoUrl}
                  alt="Company Logo Preview"
                  thumbnail
                  style={{
                    width: '100%',
                    height: '100%',
                    borderRadius: '50%',
                    border: 'none' ,
                    objectFit: 'cover',
                    objectPosition: 'center',
                  }}
                />
              ) : (
                <div className="text-center text-muted" style={{ padding: '20px', fontSize: '14px' }}>
                  No image uploaded
                </div>
              )}
            </Card>
          </Col>
          <Col xs={12} md={6}>
            <Card
              className="p-3 mb-4 text-center"
              style={{
                width: '100%',
                height: '200px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                overflow: 'hidden',
              }}
            >
              {bannerUrl ? (
                <Image
                  src={bannerUrl}
                  alt="Company Banner Preview"
                  thumbnail
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                    objectPosition: 'center',
                  }}
                />
              ) : (
                <div className="text-center text-muted" style={{ padding: '20px', fontSize: '14px' }}>
                  No image uploaded
                </div>
              )}
            </Card>
          </Col>
        </Row>

        <Row className="mb-4">
          <Col xs={12}>
            <Form.Group controlId="formCompanyName" className="text-start">
              <Form.Label>
                <strong>Company Name <span style={{ color: 'red' }}>*</span></strong>
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter company name"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                style={{ padding: '10px', width: '100%' }}
              />
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-4">
          <Col xs={12}>
            <Form.Group controlId="formAboutUs" className="text-start">
              <Form.Label>
                <strong>About Us <span style={{ color: 'red' }}>*</span></strong>
              </Form.Label>
              <ReactQuill
                theme="snow"
                value={aboutUs}
                onChange={setAboutUs}
                placeholder="Tell us about your company"
                style={{ height: '200px', marginBottom: '30px', width: '100%' }}
              />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col className="text-start">
            <Button type="submit" style={{ width: '200px', backgroundColor: '#0A65CC', marginTop: '3px', height: '50px' }}>
              Save & Next <FontAwesomeIcon icon={faArrowRight} />
            </Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
};

// CompanyProfilePage Component (Wrapper)
const CompanyProfilePage = () => (
  <div>
    <MyNavbar1 />
    <CompanyProfile />
  </div>
);

export default CompanyProfilePage;
