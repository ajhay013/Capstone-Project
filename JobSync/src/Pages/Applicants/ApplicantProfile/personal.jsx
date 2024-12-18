import React, { useState, useRef, useEffect } from 'react';
import { Modal, Form, Row, Col, Button, Container } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faFileLines, faDownload, faEllipsisV, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FaArrowLeft } from 'react-icons/fa';
import { postToEndpoint, getFromEndpoint } from '../../../components/apiService';
import { useAuth } from '../../../AuthContext';
import Swal from 'sweetalert2';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

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
  const [nationality, setNationality] = useState('');
  const [showModal, setShowModal] = useState(false); 

  const [cvName, setCvName] = useState(''); 
  const [isFileUploaded, setIsFileUploaded] = useState(false); 

  const [initialValues, setInitialValues] = useState({});
  const [profilePictureChanged, setProfilePictureChanged] = useState(false);

  const handleModalClose = () => setShowModal(false);
  const handleModalShow = () => setShowModal(true);

  const handleCvUpload = (e) => {
    const file = e.target.files[0];
    setCvFile(file);
    setIsFileUploaded(true);
  };

  const triggerFileInput = () => {
    if (cvInputRef.current) {
      cvInputRef.current.click();
    }
  };

  const handleCvNameChange = (e) => {
    setCvName(e.target.value);
  };

  const handleModalSubmit = () => {
    if (cvName && isFileUploaded) {
      setShowModal(false); 
    }
  };

  useEffect(() => {
    const fetchApplicantInfo = async () => {
      if (user?.id) {
        try {
          const response = await postToEndpoint('/getApplicantinfo.php', { applicant_id: user.id });
          if (response.data) {
            const { profile, firstname, middlename, lastname, suffix, experience, education, gender, marital_status, contact, birthplace, headline, birthday, nationality } = response.data;
  
            setProfile(profile || null);
            setFirstname(firstname || '');
            setMiddlename(middlename || '');
            setLastname(lastname || '');
            setSuffix(suffix || '');
            setExperience(experience || '');
            setEducation(education || '');
            setGender(gender || '');
            setMaritalStatus(marital_status || '');
            setContact(contact || '');
            setBirthplace(birthplace || '');
            setHeadline(headline || '');
            setBirthday(birthday || '');
            setNationality(nationality || '');
            setInitialValues({
              firstname,
              middlename,
              lastname,
              suffix,
              experience,
              education,
              gender,
              maritalStatus: marital_status,
              contact,
              birthplace,
              headline,
              birthday,
              nationality
            });
          }
        } catch (error) {
          console.error('Error fetching applicant info:', error);
        }
      }
    };
    fetchApplicantInfo();
    const intervalId = setInterval(fetchApplicantInfo, 500000);
    return () => clearInterval(intervalId);
  }, [user]);
  

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setProfileImage(file);
      setProfilePictureChanged(true);
    }
  };

  const isFormChanged = () => {
    return (
      initialValues.firstname !== firstname ||
      initialValues.middlename !== middlename ||
      initialValues.lastname !== lastname ||
      initialValues.suffix !== suffix ||
      initialValues.experience !== experience ||
      initialValues.education !== education ||
      initialValues.gender !== gender ||
      initialValues.maritalStatus !== maritalStatus ||
      initialValues.contact !== contact ||
      initialValues.birthplace !== birthplace ||
      initialValues.headline !== headline ||
      initialValues.birthday !== birthday ||
      initialValues.nationality !== nationality ||
      profilePictureChanged 
    );
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
        return; 
      } else {
        profilePictureBase64 = profileImage.split(',')[1]; 
      }
    } else if (profileUrl) {
      profilePictureBase64 = null; 
    }
  
    sendPayload(profilePictureBase64);
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
      nationality,
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
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true,
        allowOutsideClick: false,
        allowEscapeKey: false
      });
    }
  };

  const handleModalSubmitmodal = async () => {
    if (!cvName || !cvFile) {
      Swal.fire({
        icon: 'warning',
        title: 'Oops!',
        text: 'Please provide a CV name and select a file to upload.',
        confirmButtonText: 'OK',
      });
      return;
    }
  
    const formData = new FormData();
    formData.append('applicant_id', user.id);
    formData.append('cv_name', cvName);
    formData.append('file', cvFile);
  
    try {
      const response = await postToEndpoint('/InsertResume.php', formData, {
        'Content-Type': 'multipart/form-data',
      });
  
      if (response.data.success) {
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
        handleModalClose();
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops!',
          text: response.data.message,
          showConfirmButton: false,
          timer: 1500,
          timerProgressBar: true,
          allowOutsideClick: false,
          allowEscapeKey: false
        });
      }
    } catch (error) {
      console.error('Upload failed:', error);
      Swal.fire({
        icon: 'error',
        title: 'Oops!',
        text: 'An error occurred while uploading the CV.',
        confirmButtonText: 'OK',
      });
    }
  };

  const [cvDetails, setCvDetails] = useState(null);
  
  useEffect(() => {
    let intervalId;
    const fetchResume = async () => {
      try {
        if (user && user.id) {
          const response = await getFromEndpoint(`/FetchResume.php?applicant_id=${user.id}`);
    
          if (response.data.success) {
            setCvDetails(response.data.data);
          } else {
            console.log('No resumes found for this applicant.');
          }
        } else {
          console.log('User ID is missing.');
        }
      } catch (error) {
        console.error('Error fetching resumes:', error);
      }
    };
    if (user && user.id) {
      fetchResume();
      intervalId = setInterval(fetchResume, 100); 
    }
    return () => {
      clearInterval(intervalId); 
    };
  }, [user]);

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
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Others">Others</option>
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
              <option value="Single">Single</option>
              <option value="Married">Married</option>
              <option value="Divorced">Divorced</option>
              <option value="Widowed">Widowed</option>
              <option value="Separated">Separated</option>
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
          <Col md={4}>
            <Form.Label style={{ display: 'block', textAlign: 'left', marginBottom: '10px' }}>Nationality</Form.Label>
            <Form.Select
              className="register1"
              value={nationality}
              onChange={(e) => setNationality(e.target.value)}
            >
              <option value="" disabled>
                Select your nationality
              </option>
              {/* Africa */}
              <optgroup label="Africa">
                <option value="Afghan">Afghan</option>
                <option value="Algerian">Algerian</option>
                <option value="Angolan">Angolan</option>
                <option value="Beninese">Beninese</option>
                <option value="Burundian">Burundian</option>
                <option value="Cameroonian">Cameroonian</option>
                <option value="Congolese">Congolese</option>
                <option value="Egyptian">Egyptian</option>
                <option value="Eritrean">Eritrean</option>
                <option value="Ethiopian">Ethiopian</option>
                <option value="Gabonese">Gabonese</option>
                <option value="Gambian">Gambian</option>
                <option value="Ghanaian">Ghanaian</option>
                <option value="Guinean">Guinean</option>
                <option value="Ivorian">Ivorian</option>
                <option value="Kenyan">Kenyan</option>
                <option value="Liberian">Liberian</option>
                <option value="Libyan">Libyan</option>
                <option value="Madagascan">Madagascan</option>
                <option value="Malawian">Malawian</option>
                <option value="Malian">Malian</option>
                <option value="Mauritanian">Mauritanian</option>
                <option value="Mauritian">Mauritian</option>
                <option value="Moroccan">Moroccan</option>
                <option value="Mozambican">Mozambican</option>
                <option value="Namibian">Namibian</option>
                <option value="Nigerian">Nigerian</option>
                <option value="Rwandan">Rwandan</option>
                <option value="Senegalese">Senegalese</option>
                <option value="Sierra Leonean">Sierra Leonean</option>
                <option value="Somali">Somali</option>
                <option value="South African">South African</option>
                <option value="Sudanese">Sudanese</option>
                <option value="Tanzanian">Tanzanian</option>
                <option value="Togolese">Togolese</option>
                <option value="Ugandan">Ugandan</option>
                <option value="Zambian">Zambian</option>
                <option value="Zimbabwean">Zimbabwean</option>
              </optgroup>
              {/* Asia */}
              <optgroup label="Asia">
                <option value="Afghan">Afghan</option>
                <option value="Armenian">Armenian</option>
                <option value="Azerbaijani">Azerbaijani</option>
                <option value="Bahraini">Bahraini</option>
                <option value="Bangladeshi">Bangladeshi</option>
                <option value="Bhutanese">Bhutanese</option>
                <option value="Bruneian">Bruneian</option>
                <option value="Cambodian">Cambodian</option>
                <option value="Chinese">Chinese</option>
                <option value="Filipino">Filipino</option>
                <option value="Georgian">Georgian</option>
                <option value="Indian">Indian</option>
                <option value="Indonesian">Indonesian</option>
                <option value="Iranian">Iranian</option>
                <option value="Iraqi">Iraqi</option>
                <option value="Israeli">Israeli</option>
                <option value="Japanese">Japanese</option>
                <option value="Jordanian">Jordanian</option>
                <option value="Kazakh">Kazakh</option>
                <option value="Korean">Korean</option>
                <option value="Kuwaiti">Kuwaiti</option>
                <option value="Kyrgyzstani">Kyrgyzstani</option>
                <option value="Laotian">Laotian</option>
                <option value="Lebanese">Lebanese</option>
                <option value="Malaysian">Malaysian</option>
                <option value="Maldivian">Maldivian</option>
                <option value="Mongolian">Mongolian</option>
                <option value="Nepali">Nepali</option>
                <option value="Pakistani">Pakistani</option>
                <option value="Palauan">Palauan</option>
                <option value="Qatari">Qatari</option>
                <option value="Saudi">Saudi</option>
                <option value="Singaporean">Singaporean</option>
                <option value="Sri Lankan">Sri Lankan</option>
                <option value="Syrian">Syrian</option>
                <option value="Taiwanese">Taiwanese</option>
                <option value="Thai">Thai</option>
                <option value="Turkish">Turkish</option>
                <option value="Turkmenistani">Turkmenistani</option>
                <option value="Uzbek">Uzbek</option>
                <option value="Yemeni">Yemeni</option>
              </optgroup>
              {/* Europe */}
              <optgroup label="Europe">
                <option value="Albanian">Albanian</option>
                <option value="Andorran">Andorran</option>
                <option value="Austrian">Austrian</option>
                <option value="Belarusian">Belarusian</option>
                <option value="Belgian">Belgian</option>
                <option value="Bosnian">Bosnian</option>
                <option value="Bulgarian">Bulgarian</option>
                <option value="Croatian">Croatian</option>
                <option value="Cypriot">Cypriot</option>
                <option value="Czech">Czech</option>
                <option value="Danish">Danish</option>
                <option value="Estonian">Estonian</option>
                <option value="Finnish">Finnish</option>
                <option value="French">French</option>
                <option value="German">German</option>
                <option value="Greek">Greek</option>
                <option value="Hungarian">Hungarian</option>
                <option value="Icelandic">Icelandic</option>
                <option value="Irish">Irish</option>
                <option value="Italian">Italian</option>
                <option value="Latvian">Latvian</option>
                <option value="Lithuanian">Lithuanian</option>
                <option value="Luxembourger">Luxembourger</option>
                <option value="Maltese">Maltese</option>
                <option value="Moldovan">Moldovan</option>
                <option value="Monacan">Monacan</option>
                <option value="Montenegrin">Montenegrin</option>
                <option value="Norwegian">Norwegian</option>
                <option value="Polish">Polish</option>
                <option value="Portuguese">Portuguese</option>
                <option value="Romanian">Romanian</option>
                <option value="Russian">Russian</option>
                <option value="Serbian">Serbian</option>
                <option value="Slovakian">Slovakian</option>
                <option value="Slovenian">Slovenian</option>
                <option value="Spanish">Spanish</option>
                <option value="Swedish">Swedish</option>
                <option value="Swiss">Swiss</option>
              </optgroup>
              {/* Americas */}
              <optgroup label="Americas">
                <option value="American">American</option>
                <option value="Argentine">Argentine</option>
                <option value="Barbadian">Barbadian</option>
                <option value="Belizean">Belizean</option>
                <option value="Bolivian">Bolivian</option>
                <option value="Brazilian">Brazilian</option>
                <option value="Canadian">Canadian</option>
                <option value="Chilean">Chilean</option>
                <option value="Colombian">Colombian</option>
                <option value="Costa Rican">Costa Rican</option>
                <option value="Cuban">Cuban</option>
                <option value="Dominican Republic">Dominican Republic</option>
                <option value="Ecuadorian">Ecuadorian</option>
                <option value="El Salvadoran">El Salvadoran</option>
                <option value="Grenadian">Grenadian</option>
                <option value="Guatemalan">Guatemalan</option>
                <option value="Haitian">Haitian</option>
                <option value="Honduran">Honduran</option>
                <option value="Jamaican">Jamaican</option>
                <option value="Mexican">Mexican</option>
                <option value="Nicaraguan">Nicaraguan</option>
                <option value="Panamanian">Panamanian</option>
                <option value="Paraguayan">Paraguayan</option>
                <option value="Peruvian">Peruvian</option>
                <option value="Puerto Rican">Puerto Rican</option>
                <option value="Saint Lucian">Saint Lucian</option>
                <option value="Saint Vincent and the Grenadines">Saint Vincent and the Grenadines</option>
                <option value="Surinamese">Surinamese</option>
                <option value="Trinidadian">Trinidadian</option>
                <option value="Uruguayan">Uruguayan</option>
                <option value="Venezuelan">Venezuelan</option>
              </optgroup>
              {/* Oceania */}
              <optgroup label="Oceania">
                <option value="Australian">Australian</option>
                <option value="Fijian">Fijian</option>
                <option value="Kiribati">Kiribati</option>
                <option value="Marshallese">Marshallese</option>
                <option value="Micronesian">Micronesian</option>
                <option value="Nauruan">Nauruan</option>
                <option value="New Zealander">New Zealander</option>
                <option value="Palauan">Palauan</option>
                <option value="Papua New Guinean">Papua New Guinean</option>
                <option value="Samoan">Samoan</option>
                <option value="Solomon Islander">Solomon Islander</option>
                <option value="Tongan">Tongan</option>
                <option value="Tuvaluan">Tuvaluan</option>
              </optgroup>
            </Form.Select>

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
          Your Cv/Resume
        </Form.Label>
        {cvDetails && cvDetails.length > 0 && (
  cvDetails.map((cv, index) => (
    <Col 
      md={4} 
      className="d-flex flex-column" 
      key={cv.resumeId || index} // Use resumeId if available, fallback to index
    >
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
          marginBottom: '10px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', width: '100%', flexDirection: 'row', position: 'relative', top: '15px' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              top: '8px',
              position: 'relative',
              width: '40px',
              height: '40px',
              borderRadius: '4px',
              marginTop: '5px',
            }}
          >
            <FontAwesomeIcon icon={faFileLines} size="xl" style={{ color: '#47a0ff', width: '25px', height: '29px' }} />
          </div>
          <span
            style={{
              fontSize: '16px',
              fontWeight: 'bold',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              maxWidth: 'calc(100% - 100px)',
              cursor: 'default'
            }}
          >
            {cv.resumeName}
          </span>
        </div>
        <div
          className="dropdown"
          style={{ position: 'relative', alignSelf: 'flex-end', top: '-10px' }}
        >
          <FontAwesomeIcon
            icon={faEllipsisV}
            size="lg"
            style={{ cursor: 'pointer', color: 'gray', width: '20px' }}
            id="dropdownMenuButton"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          />
          <ul
            className="dropdown-menu"
            aria-labelledby="dropdownMenuButton"
            style={{ minWidth: '150px' }}
          >
            <li>
              <button
                className="dropdown-item d-flex align-items-center text-danger"
                onClick={() => handleDeleteResume(cv.resumeId)}
                style={{
                  fontWeight: '500',
                  fontSize: '14px'
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#cfe7ff';
                  e.target.style.color = '#0955b7';
                  e.target.style.fontWeight = '500';
                  e.target.style.fontSize = '14px';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = 'transparent';
                  e.target.style.color = '#212529';
                  e.target.style.borderRadius = '0';
                }}
              >
                <FontAwesomeIcon
                  icon={faTrashAlt}
                  className="me-2"
                />
                Delete
              </button>
            </li>
          </ul>
        </div>
        <a href={`src/api/${cv.resumePath}`} target="_blank" rel="noopener noreferrer" style={{ position: 'relative', left: '50px', top: '-20px' }}>
          <FontAwesomeIcon icon={faDownload} size="lg" style={{ color: '#0955b7', marginRight: '10px', width: '13px' }} />
          <small style={{ fontWeight: '400', color: '#0955b7' }}>Download Cv/Resume</small>
        </a>
      </div>
    </Col>
  ))
)}

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
                    border: '1px solid #007bff',
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
                  Add Cv/Resume
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
                Browse file. Only pdf
              </div>
            </div>
        </Col>
      </Row>

    <Row className="mt-3">
      <Col md={12} className="d-flex" style={{justifyContent: 'space-between'}}>    
        {/* Save Changes Button */}
        <Button variant="primary"  onClick={() => {
                window.history.back();
                window.scrollTo({ top: 0});
            }} className="mt-3" style={{width: '185px', height: '55px', color: '#0d6efd', background: 'transparent'}}>
          <FaArrowLeft style={{fontSize: '14px', marginRight: '12px'}}/> Back
        </Button>
        <Button variant="primary"  onClick={handleSaveChanges}  disabled={!isFormChanged()} className="mt-3" style={{width: '185px', height: '55px'}}>
          Save Changes
        </Button>
      </Col>
    </Row>
      </Form>
      <Modal show={showModal} onHide={handleModalClose} centered>
        <Modal.Header closeButton style={{paddingLeft: '1.5rem', paddingRight: '1.5rem', fontSize: '10px'}}>
          <Modal.Title>Add Cv/Resume</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{paddingLeft: '1.5rem', paddingRight: '1.5rem'}}>
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
                icon={faFileLines}
                size="lg"
                style={{ color: '#007bff', marginBottom: '10px' }}
              />
              <div style={{ fontSize: '16px', fontWeight: 'bold', color: '#007bff' }}>
                {cvFile.name}
              </div>
            </div>
          ) : (
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
                onClick={triggerFileInput} 
              />
            </div>
          )}

          <input
            type="file"
            accept=".pdf"
            ref={cvInputRef}
            style={{ display: 'none' }} 
            onChange={handleCvUpload}
          />
        </Modal.Body>
        <Modal.Footer style={{paddingLeft: '1.5rem', paddingRight: '1.5rem', justifyContent: 'space-between'}}>
          <Button onClick={handleModalClose} style={{height: '38px', fontSize: '12px', borderRadius: '3px', width: '75px', color: '#156ad7', background: '#bce0ff', border: 'none', fontWeight: '700'}}>
            Close
          </Button>
          <Button
            onClick={handleModalSubmitmodal} 
            disabled={!cvName || !cvFile} 
            style={{width: '120px', height: '38px', fontSize: '12px', borderRadius: '3px', background: '#156ad7', fontWeight: '500'}}
          >
            Add Cv/Resume
          </Button>
        </Modal.Footer>
      </Modal>

    </Container>

    
  );
}
