import React, { useState, useRef, useEffect } from 'react';
import { Modal, Form, Row, Col, Button, Container } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faFileAlt } from '@fortawesome/free-solid-svg-icons';
import { postToEndpoint } from '../../../components/apiService';
import { useAuth } from '../../../AuthContext';
import Swal from 'sweetalert2';


export default function Personal() {
  const [profileImage, setProfileImage] = useState(null);
  const [cvFile, setCvFile] = useState(null);
  const fileInputRef = useRef(null);
  const cvInputRef = useRef(null);
  const [experience, setExperience] = useState('');
  const [education, setEducation] = useState('');
  const [gender, setGender] = useState('');
  const [maritalStatus, setMaritalStatus] = useState('');
  const [birthday, setBirthday] = useState('');
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [firstname, setFirstname] = useState('');
  const [middlename, setMiddlename] = useState('');
  const [lastname, setLastname] = useState('');
  const [suffix, setSuffix] = useState('');
  const [contact, setContact] = useState('');
  const [birthplace, setBirthplace] = useState('');
  const [headline, setHeadline] = useState('');
  const [showModal, setShowModal] = useState(false); 

  const [cvName, setCvName] = useState(''); // Store the resume name input
  const [isFileUploaded, setIsFileUploaded] = useState(false); // Track if file is uploaded

  // Toggle modal visibility
  const handleModalClose = () => setShowModal(false);
  const handleModalShow = () => setShowModal(true);

  // Handle file upload
  const handleCvUpload = (e) => {
    const file = e.target.files[0];
    setCvFile(file);
    setIsFileUploaded(true);
  };

  // Trigger file input click when the plus icon is clicked
  const triggerFileInput = () => {
    if (cvInputRef.current) {
      cvInputRef.current.click(); // This will open the file picker
    }
  };

  // Handle CV name input change
  const handleCvNameChange = (e) => {
    setCvName(e.target.value);
  };

  // Handle modal submission (saving CV name and showing file upload option)
  const handleModalSubmit = () => {
    if (cvName && isFileUploaded) {
      setShowModal(false); // Close the modal after submitting
    }
  };



  useEffect(() => {
    const fetchApplicantInfo = async () => {
      if (user?.id) {
        try {
          const response = await postToEndpoint('/getApplicantinfo.php', {
            applicant_id: user.id,
          });

          if (response.data) {
            const {
              profile,
              firstname,
              middlename,
              lastname,
              suffix,
              experience,
              education,
              gender,
              marital_status,
              contact,
              birthplace,
              headline,
              birthday,
            } = response.data;

            setProfile(profile || null);
            setFirstname(firstname || '');
            setContact(contact || '');
            setMiddlename(middlename || '');
            setLastname(lastname || '');
            setSuffix(suffix || '');
            setExperience(experience || '');
            setEducation(education || '');
            setGender(gender || '');
            setMaritalStatus(marital_status || '');
            setBirthplace(birthplace || '');
            setHeadline(headline || '');
            setBirthday(birthday || '');
          }
        } catch (error) {
          console.error('Error fetching applicant info:', error);
        }
      }
    };
    fetchApplicantInfo();
  }, [user]);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setProfileImage(file);
      const reader = new FileReader();
      reader.onloadend = () => setProfile(file);
      reader.readAsDataURL(file); 
    }
  };
  

  const handleButtonClick = () => fileInputRef.current.click();

  const handleSaveChanges = async () => {
    if (!user?.id) return;
  
    let profilePictureBase64 = null;
  
    if (profileImage) {
      if (profileImage instanceof File) {
        const reader = new FileReader();
        reader.onload = () => {
          profilePictureBase64 = reader.result.split(',')[1];
          sendPayload(profilePictureBase64);
        };
        reader.readAsDataURL(profileImage);
      } else {
        profilePictureBase64 = profileImage.split(',')[1];
        sendPayload(profilePictureBase64);
      }
    } else {
      sendPayload(profilePictureBase64);
    }
  };
  
  const sendPayload = async (profilePictureBase64) => {
    const payload = {
      applicant_id: user.id,
      firstname,
      middlename,
      lastname,
      suffix,
      gender,
      contact,
      headline,
      birthday,
      birthplace,
      marital_status: maritalStatus,
      experience,
      education,
      profile_picture: profilePictureBase64,
    };
  
    try {
      const response = await postToEndpoint('/updateApplicantInfo.php', payload);
      if (response?.data?.success) {
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: response.data.message,
          showConfirmButton: false,
          timer: 1500,
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
          timer: 1500,
          timerProgressBar: true,
          allowOutsideClick: false,
          allowEscapeKey: false
        });
      }
    } catch (error) {
      console.error('Error saving changes:', error);
      Swal.fire({
        icon: 'error',
        title: 'An error occurred',
        text: 'An error occurred while saving changes.',
            owConfirmButton: false,
            mer: 1500,
            timerProgressBar: true,
            allowOutsideClick: false,
            allowEscapeKey: false
      });
    }
  };
  
  const profileUrl = profileImage ? (typeof profileImage === 'string' ? profileImage : URL.createObjectURL(profileImage)) : profile;

  return (
    <Container fluid="md" className="pb-5" style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: '1rem' }}>
  <Form>
    <h4 style={{ marginBottom: '50px', fontSize: '28px', textAlign: 'left' }}>Basic Information</h4>

    {/* Profile Picture and Basic Info Fields */}
    <Row className="gy-3 profile-container mb-4">
      <Col md={3} className="text-center">
        <div
          className="p-3 rounded"
          style={{ border: '1px solid #ccc', width: '245px', margin: '0 auto 15px auto' }}
        >
          <div className="mb-2">Profile Picture</div>
          <div
            className="profile-image-container"
            style={{
              width: '180px',
              height: '180px',
              borderRadius: '50%',
              overflow: 'hidden',
              backgroundColor: '#f0f0f0',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              margin: '0 auto',
              marginLeft: '16px',
            }}
          >
            {profileUrl ? (
              <img
                src={profileUrl}
                alt="Profile Preview"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            ) : (
              <span>No Image Uploaded</span>
            )}
          </div>
          <Button variant="outline-primary" className="mt-2" style={{marginLeft: '5px'}} onClick={handleButtonClick}>
            Browse photo
          </Button>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            style={{ display: 'none' }}
            ref={fileInputRef}
          />
        </div>
      </Col>
      <Col md={9}>
        <Row style={{ marginBottom: '16px'  }}>
          <Col md={6}>
            <Form.Label style={{ display: 'block', textAlign: 'left', fontWeight: '500'}}>Title/Headline</Form.Label>
            <Form.Control 
                className="register1" 
                placeholder="Ex. Web Developer..." 
                value={headline} 
                onChange={(e) => setHeadline(e.target.value)} 
            />
          </Col>
        </Row>
        <hr />
        <Row className="gy-3" style={{ marginLeft: '-10px' }}>
          {/** Align fields in 3 columns */}
          <Col md={4}>
            <Form.Label style={{ display: 'block', textAlign: 'left', marginBottom: '10px' }}>First Name</Form.Label>
            <Form.Control 
                  className="register1" 
                  placeholder="First Name" 
                  value={firstname} 
                  onChange={(e) => setFirstname(e.target.value)} 
              />
          </Col>
          <Col md={4}>  
            <Form.Label style={{ display: 'block', textAlign: 'left', marginBottom: '10px' }}>Middle Name <span className='text-muted'>(Optional)</span></Form.Label>
            <Form.Control 
                className="register1" 
                placeholder="Middle Name" 
                value={middlename} 
                onChange={(e) => setMiddlename(e.target.value)} 
            />
          </Col>
          <Col md={4}>
            <Form.Label style={{ display: 'block', textAlign: 'left', marginBottom: '10px' }}>Last Name</Form.Label>
            <Form.Control 
                className="register1" 
                placeholder="Last Name" 
                value={lastname} 
                onChange={(e) => setLastname(e.target.value)} 
            />
          </Col>
          <Col md={4}>  
            <Form.Label style={{ display: 'block', textAlign: 'left', marginBottom: '10px' }}>Suffix <span className='text-muted'>(Optional)</span></Form.Label>
            <Form.Control 
                className="register1" 
                placeholder="Suffix" 
                value={suffix} 
                onChange={(e) => setSuffix(e.target.value)} 
            />
          </Col>
          <Col md={4}>
            <Form.Label style={{ display: 'block', textAlign: 'left', marginBottom: '10px' }}>Contact Number</Form.Label>
            <Form.Control 
                className="register1" 
                placeholder="Contact Number" 
                value={contact} 
                onChange={(e) => setContact(e.target.value)} 
            />
          </Col>
          <Col md={4}>
            <Form.Label style={{ display: 'block', textAlign: 'left', marginBottom: '10px' }}>Experience</Form.Label>
            <Form.Select
              className="register1"
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
            >
              <option value="" disabled>Experience</option>
              <option value="Intern">Internship</option>
              <option value="Entry level">Entry Level (0-2 years)</option>
              <option value="Mid level">Mid Level (2-5 years)</option>
              <option value="Senior level">Senior Level (5-10 years)</option>
              <option value="Expert level">Expert Level (10+ years)</option>
            </Form.Select>
          </Col>
          <Col md={4}>
            <Form.Label style={{ display: 'block', textAlign: 'left', marginBottom: '10px' }}>Educational Attainment</Form.Label>
            <Form.Select
              className="register1"
              value={education}
              onChange={(e) => setEducation(e.target.value)}
            >
              <option value="" disabled>
                Education
              </option>
              <option value="High School Diploma">High School Diploma</option>
              <option value="Associate Degree">Associate Degree</option>
              <option value="Bachelor's Degree">Bachelor's Degree</option>
              <option value="Master's Degree">Master's Degree</option>
              <option value="doctorate">Doctorate (PhD, EdD, etc.)</option>
              <option value="professional">Professional Certification</option>
            </Form.Select>
          </Col>

          <Col md={4}>
            <Form.Label style={{ display: 'block', textAlign: 'left', marginBottom: '10px' }}>Gender</Form.Label>
            <Form.Select
              className="register1"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            >
              <option value="" disabled>
                Gender
              </option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="others">Others</option>
            </Form.Select>
          </Col>

          <Col md={4}>
            <Form.Label style={{ display: 'block', textAlign: 'left', marginBottom: '10px' }}>Marital Status</Form.Label>
            <Form.Select
              className="register1"
              value={maritalStatus}
              onChange={(e) => setMaritalStatus(e.target.value)}
            >
              <option value="" disabled>
                Status
              </option>
              <option value="single">Single</option>
              <option value="married">Married</option>
              <option value="divorced">Divorced</option>
              <option value="widowed">Widowed</option>
              <option value="separated">Separated</option>
            </Form.Select>
          </Col>
          <Col md={4}>
          <Form.Label style={{ display: 'block', textAlign: 'left', marginBottom: '10px' }}>Date of Birth</Form.Label>
          <div className="d-flex align-items-center">
          <Form.Control 
                type="date" 
                className="register1" 
                value={birthday} 
                onChange={(e) => setBirthday(e.target.value)} 
            />
            <i className="bi bi-calendar" style={{ fontSize: '20px', marginLeft: '10px' }}></i>
          </div>
        </Col>
        <Col md={4}>
            <Form.Label style={{ display: 'block', textAlign: 'left', marginBottom: '10px' }}>Place of Birth</Form.Label>
            <Form.Control 
                className="register1" 
                placeholder="Place of Birth" 
                value={birthplace} 
                onChange={(e) => setBirthplace(e.target.value)} 
            />
          </Col>
          
        </Row>
      </Col>
    </Row>

        <hr />
     <Row className="gy-3 profile-container">
        {/* CV Uploaded Section */}
        <Form.Label
          style={{
            display: 'block',
            textAlign: 'left',
            marginBottom: '8px',
            fontWeight: '500',
            fontSize: '18px',
          }}
        >
          Upload CV/Resume
        </Form.Label>
        <Col md={4}>
          {cvFile && isFileUploaded ? (
            // If CV file is uploaded and the modal was completed
            <>
              <div
                style={{
                  border: '1px solid #ccc',
                  padding: '20px',
                  borderRadius: '8px',
                  position: 'relative',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'flex-start',
                  width: '100%',
                  height: '90px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <FontAwesomeIcon icon={faFileAlt} size="lg" style={{ color: '#007bff' }} />
                  <span style={{ fontSize: '16px', fontWeight: 'bold' }}>
                    {cvName}
                  </span>
                </div>
              </div>
            </>
          ) : (
            // If no CV file is uploaded yet
            <>
              <div
                style={{
                  border: '1px solid #ccc',
                  padding: '20px',
                  borderRadius: '8px',
                  position: 'relative',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'flex-start',
                  width: '100%',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: '8px',
                  }}
                >
                  <div
                    onClick={handleModalShow}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '40px',
                      height: '40px',
                      border: '2px solid #007bff',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      marginTop: '5px',
                    }}
                  >
                    <FontAwesomeIcon icon={faPlus} size="lg" style={{ color: '#007bff' }} />
                  </div>
                  <span
                    style={{
                      fontWeight: 'bold',
                      fontSize: '16px',
                      color: '#000',
                      marginTop: '-10px',
                      marginLeft: '10px',
                    }}
                  >
                    Upload CV
                  </span>
                </div>
                <div
                  style={{
                    fontSize: '14px',
                    color: '#6c757d',
                    marginTop: '-18px',
                    marginLeft: '58px',
                  }}
                >
                  Browse file
                </div>
              </div>
            </>
          )}
        </Col>

        {cvFile && (
          <Col md={4}>
            <div
              style={{
                border: '1px solid #ccc',
                padding: '20px',
                borderRadius: '8px',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'flex-start',
                width: '100%',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: '8px',
                }}
              >
                <div
                  onClick={handleModalShow}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '40px',
                    height: '40px',
                    border: '2px solid #007bff',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    marginTop: '5px',
                  }}
                >
                  <FontAwesomeIcon icon={faPlus} size="lg" style={{ color: '#007bff' }} />
                </div>
                <span
                  style={{
                    fontWeight: 'bold',
                    fontSize: '16px',
                    color: '#000',
                    marginTop: '-10px',
                    marginLeft: '10px',
                  }}
                >
                  Update CV
                </span>
              </div>
              <div
                style={{
                  fontSize: '14px',
                  color: '#6c757d',
                  marginTop: '-18px',
                  marginLeft: '58px',
                }}
              >
                Browse file
              </div>
            </div>
          </Col>
        )}
      </Row>



      

 
    {/* Save Changes and Back Buttons */}
    <Row className="mt-3">
      <Col md={12} className="d-flex justify-content-end">    
        {/* Save Changes Button */}
        <Button variant="primary"  onClick={handleSaveChanges} className="mt-3" style={{width: '185px', height: '55px'}}>
          Save Changes
        </Button>
      </Col>
    </Row>


      </Form>

      <Modal show={showModal} onHide={handleModalClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Upload CV</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="cvName" style={{ marginBottom: '20px' }}>
            <Form.Label>Cv/Resume Name</Form.Label>
            <Form.Control
              className='register1'
              type="text"
              value={cvName}
              onChange={handleCvNameChange}
              placeholder="Enter the name for your resume"
            />
          </Form.Group>

          {/* Display file name if uploaded */}
          <Form.Label>Upload Cv/Resume</Form.Label>
          {cvFile ? (
            <div
              style={{
                textAlign: 'center',
                padding: '40px',
                border: '1px dashed #007bff',
                borderRadius: '8px',
                marginBottom: '20px',
              }}
            >
              <FontAwesomeIcon
                icon={faFileAlt}
                size="lg"
                style={{ color: '#007bff', marginBottom: '10px' }}
              />
              <div style={{ fontSize: '16px', fontWeight: 'bold', color: '#007bff' }}>
                {cvFile.name}
              </div>
            </div>
          ) : (
            // Display plus icon if no file is uploaded
            <div
              style={{
                textAlign: 'center',
                padding: '40px',
                border: '1px dashed #007bff',
                borderRadius: '8px',
                marginBottom: '20px',
              }}
            >
              <FontAwesomeIcon
                icon={faPlus}
                size="2x"
                style={{ color: '#007bff', cursor: 'pointer' }}
                onClick={triggerFileInput} // Open file picker when clicked
              />
            </div>
          )}

          {/* Hidden file input */}
          <input
            type="file"
            accept=".pdf"
            ref={cvInputRef}
            style={{ display: 'none' }} // Hide the input field
            onChange={handleCvUpload}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={handleModalSubmit} // Submit modal after entering CV name
            disabled={!cvName || !cvFile} // Disable button if no name or file
          >
            Upload
          </Button>
        </Modal.Footer>
      </Modal>

    </Container>

    
  );
}
