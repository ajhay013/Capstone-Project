import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { FaBirthdayCake, FaFlag, FaUser, FaVenusMars, FaBriefcase, FaGraduationCap, FaGlobe, FaMapMarkerAlt, FaPhone, FaEnvelope, FaDownload, FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaBookmark } from 'react-icons/fa';

const ViewProfileModal = ({ show, handleClose, applicant }) => {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const iconStyle = { color: '#007bff', fontSize: '1.5em' };

  const handleBookmarkClick = () => {
    setIsBookmarked(!isBookmarked); // Toggle active state
  };

  return (
    <Modal show={show} onHide={handleClose} size="xl" centered>
      <Modal.Header closeButton>
        <Modal.Title>Applicant Profile</Modal.Title>
      </Modal.Header>

      <Modal.Body style={{ padding: '30px' }}>
        <div className="d-flex">
          {/* Left Section */}
          <div className="border-end pe-3" style={{ minWidth: '330px' }}>
            {/* Picture, Name, and Job Title */}
            <div className="d-flex align-items-center mb-4">
              {/* Circular Picture Container */}
              <div
                style={{
                  width: '80px',
                  height: '80px',
                  borderRadius: '50%',
                  overflow: 'hidden',
                  backgroundColor: '#f0f0f0',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: '15px',
                }}
              >
                <img
                  src={applicant?.picture || '../../src/assets/berns.jpg'}
                  alt="Applicant"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>

              {/* Name and Job Title */}
              <div>
                <h5 className="mb-1">{applicant?.name || 'John Doe'}</h5>
                <p className="text-muted mb-0">{applicant?.jobTitle || 'Graphic Designer'}</p>
              </div>
            </div>

            {/* Biography */}
            <h6>Biography</h6>
            <p style={{ textAlign: 'justify' }}>
            I am a passionate and creative graphic designer with over 6 years of experience in developing visually compelling designs across various digital and print platforms. My expertise includes branding, illustration, UI/UX design, and visual communication. 
            I thrive on transforming complex ideas into simple, impactful visuals that resonate with diverse audiences. 
            I have a strong background in Adobe Creative Suite and web design tools, and I am always eager to explore new design trends and technologies. Outside of my professional work, I enjoy photography and digital art, which allows me to bring a fresh perspective to my design projects.
            </p>

            {/* Cover Letter */}
            <h6 className="mt-4">Cover Letter</h6>
            <p style={{ textAlign: 'justify' }}>
            Dear Hiring Manager,

            I am writing to express my interest in the Graphic Designer position at [Company Name] as advertised. With a proven track record in designing engaging and innovative visual content, I am confident in my ability to contribute effectively to your creative team.

            Over the past six years, I have honed my skills in graphic design, specializing in brand development, digital content creation, and UI/UX design. I am particularly drawn to this role at [Company Name] because of your reputation for creative excellence and innovation in the design industry. 
            I am excited about the opportunity to collaborate with a team that values creativity and pushes boundaries to deliver visually impactful work.

            At my current position with [Current Company], I have successfully led several design projects, including logo creation, website layouts, and digital marketing materials, which have helped increase brand recognition and drive engagement. My expertise in Adobe Creative Suite and front-end web design allows me to tackle any project from concept to execution, ensuring high-quality results every time.
            I am enthusiastic about the chance to bring my passion for design and my technical skills to [Company Name]. I would love the opportunity to discuss how my experience and skills align with your needs further. Thank you for considering my application.
                
            Sincerely,
            John Cena
            </p>

            {/* Social Media */}
            <h6 className="mt-4">Follow Me on Social Media</h6>
            <div className="d-flex gap-3 mt-2">
              {[FaFacebook, FaTwitter, FaInstagram, FaLinkedin].map((Icon, index) => (
                <Icon key={index} style={{ color: '#007bff', fontSize: '1.8em', cursor: 'pointer' }} />
              ))}
            </div>
          </div>

          {/* Right Section */}
          <div className="flex-grow-1 ms-5">
            {/* Bookmark and Send Email Buttons */}
            <div className="d-flex justify-content-end mb-3" style={{ gap: '10px' }}>
              <Button
                variant="outline-primary"
                style={{
                  width: '50px',
                  height: '45px',
                  fontSize: '15px',
                  padding: '0',
                  color: isBookmarked ? '#fff' : '#757575',
                  border: isBookmarked ? '1px solid #007bff' : '1px solid #757575',
                  backgroundColor: isBookmarked ? '#007bff' : 'transparent',
                }}
                onClick={handleBookmarkClick}
              >
                <FaBookmark style={{ width: '20px', height: '20px', color: isBookmarked ? '#fff' : '#757575' }} />
              </Button>
              <Button
                variant="outline-primary"
                style={{
                  width: '200px',
                  height: '45px',
                  fontSize: '15px',
                  padding: '0',
                  color: 'white',
                  backgroundColor: '#0A65CC',
                }}
              >
                <FaEnvelope style={{ color: 'white', marginRight: '5px' }} /> Send Email
              </Button>
            </div>

            {/* Personal Information */}
            <div className="p-3 border mb-4" style={{ borderRadius: '8px', width: '120%', marginLeft: '-40px' }}>
              <h6>Personal Information</h6>
              <div className="d-flex w-100 justify-content-between" style={{ gap: '20px' }}>
                {/* Left-Aligned Items (Date of Birth, Marital Status, and Experience) */}
                <div className="d-flex flex-column gap-3" style={{ flex: '1' }}>
                  {[ 
                    { icon: <FaBirthdayCake />, label: 'Date of Birth', value: 'January 1, 1990' },
                    { icon: <FaUser />, label: 'Marital Status', value: 'Single' },
                    { icon: <FaBriefcase />, label: 'Experience', value: '5 Years' },
                  ].map((info, index) => (
                    <div key={index} className="d-flex flex-column align-items-start gap-2">
                      {React.cloneElement(info.icon, { style: { fontSize: '24px', color: '#0A65CC' } })}
                      <div>
                        <h6 className="mb-0">{info.label}</h6>
                        <p className="mb-0">{info.value}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Right-Aligned Items (Nationality, Gender, and Education) */}
                <div className="d-flex flex-column gap-3" style={{ flex: '1' }}>
                  {[ 
                    { icon: <FaFlag />, label: 'Nationality', value: 'Filipino' },
                    { icon: <FaVenusMars />, label: 'Gender', value: 'Female' },
                    { icon: <FaGraduationCap />, label: 'Education', value: 'Bachelor of Arts in Design' },
                  ].map((info, index) => (
                    <div key={index} className="d-flex flex-column align-items-start gap-2">
                      {React.cloneElement(info.icon, { style: { fontSize: '24px', color: '#0A65CC' } })}
                      <div>
                        <h6 className="mb-0">{info.label}</h6>
                        <p className="mb-0">{info.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Download Resume */}
            <div className="p-3 border mb-4" style={{ borderRadius: '8px', width: '120%', marginLeft: '-40px' }}>
              <h6>Download Resume</h6>
              <Button variant="outline-primary" className="mt-2 d-flex align-items-center gap-2">
                <FaDownload style={iconStyle} />
                Download Resume
              </Button>
            </div>

            {/* Contact Information */}
            <div className="p-3 border" style={{ borderRadius: '8px', width: '120%', marginLeft: '-40px' }}>
              <h6>Contact Information</h6>
              {[ 
                { icon: <FaGlobe />, label: 'Website', value: 'www.example.com' },
                { icon: <FaMapMarkerAlt />, label: 'Location', value: 'Pasig City, Philippines' },
                { icon: <FaPhone />, label: 'Phone', value: '+63 912 345 6789' },
                { icon: <FaEnvelope />, label: 'Email', value: 'applicant@example.com' },
              ].map((contact, index) => (
                <div key={index} className="d-flex align-items-center gap-2 mt-3">
                  {React.cloneElement(contact.icon, { style: iconStyle })}
                  <div>
                    <h6 className="mb-0">{contact.label}</h6>
                    <p className="mb-0">{contact.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ViewProfileModal;
