import React, { useState, useEffect } from 'react';
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
import redditIcon from '../../assets/reddit.png';
import pinterestIcon from '../../assets/pinterest.png';
import whatsAppIcon from '../../assets/WhatsApp.png';
import telegramIcon from '../../assets/Telegram.png';
import WeChatIcon from '../../assets/WeChat.png';
import { useAuth } from '../../AuthContext';
import { postToEndpoint, getFromEndpoint } from '../../components/apiService';
import { useNavigate } from 'react-router-dom';

const platformOptions = [
  { name: 'Facebook', icon: facebookIcon },
  { name: 'Instagram', icon: instagramIcon },
  { name: 'YouTube', icon: youtubeIcon },
  { name: 'Twitter', icon: twitterIcon },
  { name: 'Pinterest', icon: pinterestIcon },
  { name: 'Reddit', icon: redditIcon },
  { name: 'WhatsApp Business', icon: whatsAppIcon },
  { name: 'Telegram', icon: telegramIcon },
  { name: 'WeChat', icon: WeChatIcon },
];

const CompanyProfile = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [socialLinks, setSocialLinks] = useState([]);

  useEffect(() => {
    const fetchSocialLinks = async () => {
        if (!user?.id) {
            console.error('User ID is missing');
            return;
        }
        try {
            const response = await getFromEndpoint(`/getSocialMedia.php?employer_id=${user.id}`);
            console.log('Fetched social links:', response.data);

            if (response.data.socialLinks) {
                setSocialLinks(response.data.socialLinks);
            }
        } catch (error) {
            console.error('Error fetching social links:', error);
        }
    };

    fetchSocialLinks();
}, [user]);


  const handleSocialLinkChange = (index, field, value) => {
    const updatedLinks = socialLinks.map((socialLink, i) =>
      i === index ? { ...socialLink, [field]: value } : socialLink
    );

    setSocialLinks(updatedLinks);
  };

  const addSocialLink = () => {
    setSocialLinks([...socialLinks, { platform: '', link: '' }]); 
  };

  const handleDeleteSocialLink = (index) => {
    const updatedLinks = socialLinks.filter((_, i) => i !== index);
    setSocialLinks(updatedLinks);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const selectedSocialLinks = socialLinks.filter(
      (socialLink) => socialLink.platform?.trim() && socialLink.link?.trim()
    );
  
    if (selectedSocialLinks.length === 0) {
      console.error('No valid social media links to save');
      return;
    }
    try {
      await postToEndpoint('/socialmedia.php', {
        employer_id: user?.id,
        socialLinks: selectedSocialLinks,
      });
      navigate('/employer/contact');
    } catch (error) {
      console.error('Error saving social links:', error);
    }
  };
  

  const isButtonEnabled = socialLinks.length > 0 && socialLinks.every(
    (socialLink) => socialLink.platform?.trim() && socialLink.link?.trim()
  );
  

  const selectedPlatforms = new Set(socialLinks.map((socialLink) => socialLink.platform));

  return (
    <Container fluid className="text-start" style={{ margin: 0, padding: 0, width: '100%', paddingTop: '56px' }}>
      <Form onSubmit={handleSubmit} style={{ padding: '20px', width: '100%', marginBottom: '350px' }}>
        {socialLinks.map((socialLink, index) => {
          const selectedOption = platformOptions.find((option) => option.name === socialLink.platform);
          return (
            <Row className="mb-4" key={index}>
              <Col>
                <InputGroup style={{ width: '100%' }} className="register1">
                <DropdownButton
                      as={InputGroup.Prepend}
                      variant="outline-secondary"
                      title={
                        <>
                          {selectedOption?.icon && (
                            <img src={selectedOption.icon} alt={selectedOption.name} style={{ marginRight: '8px', width: '20px' }} />
                          )}
                          {socialLink.platform || 'Select Platform'} 
                        </>
                      }
                      id={`dropdown-custom-components-${index}`}
                      onSelect={(value) => handleSocialLinkChange(index, 'platform', value)}
                    >
                    {platformOptions.map((option) => (
                      <Dropdown.Item
                        key={option.name}
                        eventKey={option.name}
                        disabled={selectedPlatforms.has(option.name)} 
                        style={{
                          backgroundColor: 'transparent',
                          border: 'none',
                          padding: '8px 16px',
                        }}
                      >
                        {option.icon && (
                          <img src={option.icon} alt={option.name} style={{ marginRight: '8px', width: '25px' }} />
                        )}
                        {option.name}
                      </Dropdown.Item>
                    ))}
                  </DropdownButton>

                  <Form.Control
                    type="url"
                    placeholder={`Enter ${socialLink.platform} link`}
                    value={socialLink.link || ''} 
                    onChange={(e) => handleSocialLinkChange(index, 'link', e.target.value)}
                    style={{ flexGrow: 1 }}
                  />

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

        <Button variant="secondary" onClick={addSocialLink} className="mb-4" style={{ width: '100%', backgroundColor: '#757575' }}>
          <FontAwesomeIcon icon={faPlus} /> Add New Social Link
        </Button>

        <Row>
          <Col>
            <Link to="/employer/foundinginfo">
              <Button
                variant="secondary"
                style={{ marginRight: '10px', width: '200px', backgroundColor: 'white', color: 'black', height: '50px' }}
              >
                <FontAwesomeIcon icon={faArrowLeft} /> Previous
              </Button>
            </Link>
            <Button
              type="submit"
              style={{ width: '200px', backgroundColor: '#0A65CC', height: '50px' }}
              disabled={!isButtonEnabled}
            >
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
