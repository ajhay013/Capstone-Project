import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Form, Button, Row, Col, InputGroup, Dropdown, DropdownButton } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faArrowLeft, faPlus, faTimes } from '@fortawesome/free-solid-svg-icons';
import MyNavbar1 from '../../components/navbar1';
import { Link } from 'react-router-dom';
import facebookIcon from '../../assets/fb.png';
import instagramIcon from '../../assets/ig.png';
import youtubeIcon from '../../assets/yt.png';
import twitterIcon from '../../assets/tw.png';

// Define platform options with image imports
const platformOptions = [
  { name: 'Facebook', icon: facebookIcon },
  { name: 'Instagram', icon: instagramIcon },
  { name: 'YouTube', icon: youtubeIcon },
  { name: 'Twitter', icon: twitterIcon },
  { name: 'Other', icon: null },
];

const CompanyProfile = () => {
  const [socialLinks, setSocialLinks] = useState([
    { platform: 'Facebook', link: '' },
    { platform: 'Instagram', link: '' },
    { platform: 'YouTube', link: '' },
    { platform: 'Twitter', link: '' },
  ]);

  const handleSocialLinkChange = (index, field, value) => {
    const updatedLinks = socialLinks.map((socialLink, i) =>
      i === index ? { ...socialLink, [field]: value } : socialLink
    );
    setSocialLinks(updatedLinks);
  };

  const addSocialLink = () => {
    setSocialLinks([...socialLinks, { platform: 'Other', link: '' }]);
  };

  const handleDeleteSocialLink = (index) => {
    const updatedLinks = socialLinks.filter((_, i) => i !== index);
    setSocialLinks(updatedLinks);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(socialLinks);
  };

  return (
    <Container
      fluid
      className="text-start"
      style={{
        margin: 0,
        padding: 0,
        width: '100%',
        paddingTop: '56px',
      }}
    >
      <Form onSubmit={handleSubmit} style={{ padding: '20px', width: '140%', marginBottom: '350px' }}>
        {socialLinks.map((socialLink, index) => {
          const selectedOption = platformOptions.find((option) => option.name === socialLink.platform);
          return (
            <Row className="mb-4" key={index}>
              <Col>
                <InputGroup>
                  <DropdownButton
                    as={InputGroup.Prepend}
                    variant="outline-secondary"
                    title={
                      <>
                        {selectedOption?.icon && (
                          <img
                            src={selectedOption.icon}
                            alt={selectedOption.name}
                            style={{ marginRight: '8px', width: '20px' }}
                          />
                        )}
                        {socialLink.platform}
                      </>
                    }
                    id={`dropdown-custom-components-${index}`}
                    onSelect={(value) => handleSocialLinkChange(index, 'platform', value)}
                    style={{
                      width: '150px',
                      border: 'none',
                      boxShadow: 'none',
                    }}
                    className="no-hover"
                  >
                    {platformOptions.map((option) => (
                      <Dropdown.Item
                        key={option.name}
                        eventKey={option.name}
                        style={{
                          backgroundColor: 'transparent',
                          border: 'none',
                          padding: '8px 16px',
                        }}
                        onMouseEnter={(e) => (e.target.style.backgroundColor = 'transparent')}
                        onMouseLeave={(e) => (e.target.style.backgroundColor = 'transparent')}
                      >
                        {option.icon && (
                          <img
                            src={option.icon}
                            alt={option.name}
                            style={{ marginRight: '8px', width: '25px' }}
                          />
                        )}
                        {option.name}
                      </Dropdown.Item>
                    ))}
                  </DropdownButton>

                  <Form.Control
                    type="url"
                    placeholder={`Enter ${socialLink.platform} link`}
                    value={socialLink.link}
                    onChange={(e) => handleSocialLinkChange(index, 'link', e.target.value)}
                    style={{ flexGrow: 1 }}
                  />
                  
                  {/* Delete button (X icon) */}
                  <Button
                    variant="outline-danger"
                    onClick={() => handleDeleteSocialLink(index)}
                    style={{
                      marginLeft: '10px',
                      height: '38px',
                      width: '38px',
                      padding: 0,
                      borderRadius: '30%',
                      backgroundColor: '#f8d7da',
                    }}
                  >
                    <FontAwesomeIcon icon={faTimes} />
                  </Button>
                </InputGroup>
              </Col>
            </Row>
          );
        })}

        <Button
          variant="secondary"
          onClick={addSocialLink}
          className="mb-4"
          style={{ width: '70%', backgroundColor: '#757575' }}
        >
          <FontAwesomeIcon icon={faPlus} /> Add New Social Link
        </Button>

        <Row>
          <Col>
            <Link to="/employer/foundinginfo">
              <Button
                variant="secondary"
                style={{ marginRight: '10px', width: '200px', backgroundColor: 'white', color: 'black', height: '50px' }}
              >
                <FontAwesomeIcon icon={faArrowLeft} /> Back
              </Button>
            </Link>
            <Button type="submit" style={{ width: '200px', backgroundColor: '#0A65CC', height: '50px' }}>
              Save & Next <FontAwesomeIcon icon={faArrowRight} />
            </Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
};

const CompanySocialMedia = () => (
  <div>
    <MyNavbar1 />
    <CompanyProfile />
  </div>
);

export default CompanySocialMedia;
