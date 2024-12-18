import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../AuthContext';
import { postToEndpoint } from '../../../components/apiService';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Form, Button, Row, Col, InputGroup, Dropdown, DropdownButton } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTimes } from '@fortawesome/free-solid-svg-icons';
import facebookIcon from '../../../assets/fb.png';
import instagramIcon from '../../../assets/ig.png';
import youtubeIcon from '../../../assets/yt.png';
import twitterIcon from '../../../assets/tw.png';
import tiktokIcon from '../../../assets/tiktok.png';
import dribbleIcon from '../../../assets/dribble.png';
import githubIcon from '../../../assets/github.png';
import redditIcon from '../../../assets/reddit1.png';
import freelancerIcon from '../../../assets/freelancer1.png';
import Swal from 'sweetalert2';
import { FaArrowLeft } from 'react-icons/fa';


const initialPlatformOptions = [
  { name: 'Facebook', icon: facebookIcon },
  { name: 'Instagram', icon: instagramIcon },
  { name: 'YouTube', icon: youtubeIcon },
  { name: 'Twitter', icon: twitterIcon },
  { name: 'Tiktok', icon: tiktokIcon },
  { name: 'Dribble', icon: dribbleIcon },
  { name: 'Github', icon: githubIcon },
  { name: 'Reddit', icon: redditIcon },
  { name: 'Freelancer', icon: freelancerIcon },
];

export default function Socmedlinks() {
  const { user } = useAuth();
  const [socialLinks, setSocialLinks] = useState([]);
  const [platformOptions, setPlatformOptions] = useState(initialPlatformOptions);
  const [initialLinks, setInitialLinks] = useState([]);
  const [isFetching, setIsFetching] = useState(false); 

  useEffect(() => {
    const fetchSocialLinks = async () => {
      try {
        const response = await postToEndpoint('/getapplicantSocialmedia.php', { applicant_id: user.id });
        if (response.data && response.data.success) {
          const fetchedLinks = Object.keys(response.data.data).map((platform) => {
            const link = response.data.data[platform];
            return link ? { platform, link } : null;
          }).filter(Boolean);

          setSocialLinks(fetchedLinks);
          setInitialLinks(fetchedLinks);
        } else {
          console.error('Failed to fetch social media data');
        }
      } catch (error) {
        console.error('Error fetching social media data:', error);
      }
    };

    const intervalId = setInterval(() => {
      if (!isFetching) {
        setIsFetching(true);
        fetchSocialLinks();
        setIsFetching(false);
      }
    }, 30000); 

    fetchSocialLinks();

    return () => clearInterval(intervalId);
  }, [user.id, isFetching]);

  const handleSocialLinkChange = (index, field, value) => {
    const updatedLinks = socialLinks.map((socialLink, i) =>
      i === index ? { ...socialLink, [field]: value } : socialLink
    );
    setSocialLinks(updatedLinks);
  };

  const addSocialLink = () => {
    const selectedPlatforms = socialLinks.map(link => link.platform);
    const availablePlatform = platformOptions.find(option => !selectedPlatforms.includes(option.name));

    if (availablePlatform) {
      setSocialLinks([...socialLinks, { platform: availablePlatform.name, link: '' }]);
    }
  };

  const handleDeleteSocialLink = (index) => {
    const updatedLinks = socialLinks.filter((_, i) => i !== index);
    setSocialLinks(updatedLinks);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      applicant_id: user.id,
      socialLinks,
    };

    try {
      const response = await postToEndpoint('/applicantSocialmedia.php', payload);
      if (response && response.data && response.data.success) {
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: response.data.message,
          showConfirmButton: false,
          timer: 1000,
          timerProgressBar: true,
          allowOutsideClick: false,
          allowEscapeKey: false
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: response.data?.message || 'Something went wrong.',
          showConfirmButton: false,
          timer: 1000,
          timerProgressBar: true,
          allowOutsideClick: false,
          allowEscapeKey: false
        });
      }
    } catch (error) {
      console.error('Error saving social links:', error);
      Swal.fire({
        icon: 'error',
        title: 'An error occurred',
        text: 'An error occurred while saving changes.',
            owConfirmButton: false,
            mer: 1000,
            timerProgressBar: true,
            allowOutsideClick: false,
            allowEscapeKey: false
      });
    }
  };

  const isFormChanged = () => {
    return JSON.stringify(socialLinks) !== JSON.stringify(initialLinks);
  };

  const areInputsEmpty = () => {
    return socialLinks.some(link => !link.link.trim());
  };

  const getUpdatedPlatformOptions = (selectedPlatforms) => {
    return platformOptions.map((option) => ({
      ...option,
      disabled: selectedPlatforms.includes(option.name),
    }));
  };

  return (
    <Container fluid className="text-start"
    style={{
      margin: '0',
      padding: '0',
      width: '100%',
    }}>
      <Form onSubmit={handleSubmit} style={{ padding: '20px', width: '95%', height: socialLinks.length === 0 || socialLinks.length === 1 || socialLinks.length === 2 || socialLinks.length === 3 || socialLinks.length === 4 ? '630px' : 'auto', display: 'flex', flexDirection: 'column' }}>
        <h4 style={{ marginBottom: '25px', fontSize: '28px', textAlign: 'left' }}>Social Media Accounts</h4>
        <small style={{marginBottom: '25px',}}>We recommend adding 3 or more social media accounts</small>
        {/* Social Links Mapping */}
        {socialLinks.map((socialLink, index) => {
          const selectedOption = platformOptions.find((option) => option.name === socialLink.platform);
          const updatedPlatformOptions = getUpdatedPlatformOptions(socialLinks.map(link => link.platform));

          return (
            <Row className="mb-4" key={index}>
              <Col>
                <InputGroup className="register" style={{ width: '100%' }}>
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
                    style={{ width: '150px', border: 'none', boxShadow: 'none' }}
                  >
                    {updatedPlatformOptions.map((option) => (
                      <Dropdown.Item
                        key={option.name}
                        eventKey={option.name}
                        disabled={option.disabled}
                        style={{
                          backgroundColor: 'transparent',
                          border: 'none',
                          padding: '8px 16px',
                        }}
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
          style={{
            width: '70%',
            backgroundColor: '#757575',
            display: 'block',
            margin: '0 auto',
            alignContent: 'center',
            height: '50px',
            marginBottom: 'auto',
          }}
        >
          <FontAwesomeIcon icon={faPlus} /> Add New Social Link
        </Button>

        <Row className="mt-3" style={{ marginTop: 'auto' }}>
          <Col md={12} className="d-flex" style={{justifyContent: 'space-between'}}>
            <Button variant="primary"  onClick={() => {
                  window.history.back();
                  window.scrollTo({ top: 0});
              }} className="mt-3" style={{width: '185px', height: '55px', color: '#0d6efd', background: 'transparent'}}>
            <FaArrowLeft style={{fontSize: '14px', marginRight: '12px'}}/> Back
          </Button>
            <Button
              type="submit"
              variant="primary"
              className="mt-3"
              style={{ width: '185px', height: '55px' }}
              disabled={!isFormChanged() || areInputsEmpty()}
            >
              Save Changes
            </Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
}
