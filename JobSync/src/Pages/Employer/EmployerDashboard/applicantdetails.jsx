import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { FaArrowLeft, FaBirthdayCake, FaFlag, FaUser, FaVenusMars, FaBriefcase, FaGraduationCap, FaGlobe, FaMapMarkerAlt, FaPhone, FaEnvelope, 
    FaDownload, FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaTimesCircle , FaChevronLeft, FaChevronRight, FaRegArrowAltCircleRight  } from 'react-icons/fa';
import { postToEndpoint } from '../../../components/apiService';

export default function ProfilePage() {
        const [isBookmarked, setIsBookmarked] = useState(false);
        const [screeningAnswer, setScreeningAnswer] = useState([]);
        const iconStyle = { color: '#007bff', fontSize: '1.2rem' };
        const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
        const { application_id, job_id } = useParams();
        const [applications, setApplications] = useState([]);
        useEffect(() => {
          const fetchApplied = async () => {
              try {
                  const response = await postToEndpoint('/getApplicantAppliedDetails.php', { application_id, job_id });
                  if (response.data.jobs) {
                      setApplications(response.data.jobs);
                  } else {
                      console.error('No jobs found or an error occurred:', response.data.error);
                  }
              } catch (error) {
                  console.error('Error fetching jobs:', error);
              }
          };
      
          fetchApplied();
      }, [application_id, job_id]);
      
      useEffect(() => {
        const fetchQuestionAnswer = async () => {
            try {
                const response = await postToEndpoint('/getApplicantAnswer.php', { application_id, job_id });
                if (response.data.answer) {
                    setScreeningAnswer(response.data.answer);
                } else {
                    console.error('No jobs found or an error occurred:', response.data.error);
                }
            } catch (error) {
                console.error('Error fetching jobs:', error);
            }
        };
    
        fetchQuestionAnswer();
    }, [application_id, job_id]);
    
        const screeningQuestions = [
            {
              question: "Do you have experience in graphic design?",
              answer: "Yes",
              idealAnswer: "Yes"
            },
            {
              question: "Are you familiar with Adobe Creative Suite?",
              answer: "Yes",
              idealAnswer: "Yes"
            },
            {
              question: "Do you have experience with UI/UX design?",
              answer: "No",
              idealAnswer: "Yes"
            },
            {
              question: "Are you open to remote work?",
              answer: "Yes",
              idealAnswer: "Yes"
            }
          ];
          
          
    const handleBookmarkClick = () => {
    setIsBookmarked(!isBookmarked);
    };

    const handleNextQuestion = () => {
    if (currentQuestionIndex < screeningAnswer.length - 2) {
      setCurrentQuestionIndex(currentQuestionIndex + 2);
    }
    };

    const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 2);
    }
    };


  return (
    <div style={{ padding: '10px', marginTop: '90px', position: 'relative' }}>
        {/* Back Button */}
        <Button
            className="mb-3 no-hover-bg"
            onClick={() => {
                window.history.back();
                window.scrollTo({ top: 0});
            }}
            style={{
                position: 'relative',
                top: '0px',
                right: '0',
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                background: 'transparent',
                border: 'none',
                color: '#0d6efd'
            }}
        >
            <FaArrowLeft /> 
        </Button>
      <div className="d-flex">
        {/* Left Section */}
        <div className="borde-end" 
        style={{ minWidth: '930px', paddingRight: '5rem'}}>
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
                  src={applications[0]?.profile_picture_url}
                  alt="Applicant"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
          </div>


            {/* Name and Job Title */}
            <div style={{textAlign: 'left'}}>
              <h5 className="mb-1">{applications[0]?.firstname} {applications[0]?.middlename} {applications[0]?.lastname}</h5>
              <p className="text-muted mb-0">{applications[0]?.headline}</p>
            </div>
          </div>

          {/* Biography */}
          <h6 style={{ textAlign: 'left' }}>Biography</h6>
          <p style={{ textAlign: 'justify', paddingLeft: '16px' }}>
            {applications[0]?.biography.replace(/<[^>]*>?/gm, '')}
          </p>


          {/* Cover Letter */}
          {applications[0]?.coverLetter && (
            <div>
              <h6 className="mt-4" style={{ textAlign: 'left' }}>Cover Letter</h6>
              <p style={{ textAlign: 'justify', paddingLeft: '16px' }}>
                {applications[0]?.coverLetter.replace(/<[^>]*>?/gm, '')}
              </p>
            </div>
          )}


          {/* Social Media */}
          <h6 className="mt-4" style={{ textAlign: 'left' }}>Follow Me on Social Media</h6>
          <div className="d-flex gap-3 mt-2">
            {[FaFacebook, FaTwitter, FaInstagram, FaLinkedin].map((Icon, index) => (
              <Icon key={index} style={{ color: '#007bff', fontSize: '1.8em', cursor: 'pointer' }} />
            ))}
          </div>

          {/* Horizontal Line */}
          <hr style={{ marginTop: '20px', borderColor: '#d3d3d3' }} />

          {/* Screening Question */}
          <h6 className="mt-4" style={{ textAlign: 'left', fontSize: '18px' , marginBottom: '10px' }}>Screening Question</h6>
          <div className="d-flex align-items-center justify-content-between"  style={{background: 'linear-gradient(49deg, rgba(230,241,255,1) 0%, rgba(255,255,255,1) 52%, rgba(223,240,255,1) 100%)', height: '130px', borderRadius: '10px'}}>
          {/* Left Arrow Button */}
            <Button
              variant="outline-primary"
              onClick={handlePrevQuestion}
              style={{ marginRight: '10px', border: 'none', background: 'none', color: '#0d6efd', fontSize: '20px' }}
            >
            {currentQuestionIndex > 0 && (
              <FaChevronLeft />
            )}
            </Button>
          {/* Questions Display */}
          {Array.isArray(screeningAnswer) && screeningAnswer.length > 0 ? (
            <div className="d-flex" style={{ textAlign: 'left', flex: 1 }}>
              {/* First Question */}
              {screeningAnswer[currentQuestionIndex] && (
                <div style={{ flex: 1, paddingRight: '15px' }}>
                  <p>{screeningAnswer[currentQuestionIndex].question}</p>
                  <div style={{ marginTop: '-20px', display: 'flex', justifyContent: 'space-between' }}>
                    <div>
                      <p className='mb-0'><strong>Answer:</strong> {screeningAnswer[currentQuestionIndex].answer}</p>
                    </div>
                    <div>
                      <p className='mb-0'><strong>Ideal Answer:</strong> {screeningAnswer[currentQuestionIndex].ideal_answer}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Vertical Separator */}
              <div style={{ height: '70px', display: 'flex' }}>
                <div style={{ borderLeft: '1px solid #ccc', height: '100%' }}></div>
              </div>

              {/* Second Question */}
              {screeningAnswer[currentQuestionIndex + 1] && (
                <div style={{ flex: 1, paddingLeft: '15px' }}>
                  <p>{screeningAnswer[currentQuestionIndex + 1].question}</p>
                  <div style={{ marginTop: '-20px', display: 'flex', justifyContent: 'space-between' }}>
                    <div>
                      <p className='mb-0'><strong>Answer:</strong> {screeningAnswer[currentQuestionIndex + 1].answer}</p>
                    </div>
                    <div>
                      <p className='mb-0'><strong>Ideal Answer:</strong> {screeningAnswer[currentQuestionIndex + 1].ideal_answer}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <p>No questions available</p>
          )}

          {/* Right Arrow Button */}
            <Button
              onClick={handleNextQuestion}
              style={{ marginLeft: '10px', border: 'none', background: 'none', color: '#0d6efd', fontSize: '20px' }}
            >
            {currentQuestionIndex + 1 < screeningAnswer.length && (
              <FaChevronRight />
              )}
            </Button>
         
        </div>
        </div>
        {/* Right Section */}
        <div className="flex-grow-1" style={{marginLeft: '-40px'}}>
          {/* Bookmark and Send Email Buttons */}
          <div className="d-flex justify-content-end mb-3" style={{ gap: '10px', position: 'relative', left: '-38px' }}>
            <Button
              variant="outline-primary"
              style={{
                width: '50px',
                height: '48px',
                fontSize: '12px',
                padding: '0',
                color: '#e33657',
                border: '1px solid #0A65CC',
                backgroundColor: isBookmarked ? '#007bff' : 'transparent',
              }}
              onClick={handleBookmarkClick}
            >
              <FaEnvelope style={{ width: '20px', height: '17px', color: '#0A65CC' }} />
            </Button>
            <Button
              style={{
                width: '160px',
                height: '48px',
                fontSize: '15px',
                padding: '0',
                color: '#e33657',
                backgroundColor: 'transparent',
                textAlign: 'center',
                borderColor: '#e33657'
              }}
            >
              <FaTimesCircle style={{ color: '#e33657', marginRight: '5px', fontSize: '18px' }} /> Reject
            </Button>
            <Button
              variant="outline-primary"
              style={{
                width: '160px',
                height: '48px',
                fontSize: '13px',
                padding: '0',
                color: 'white',
                backgroundColor: '#0A65CC',
                textAlign: 'center'
              }}
            >
              <FaRegArrowAltCircleRight style={{ color: 'white', marginRight: '5px', fontSize: '20px' }} />Set {applications[0]?.applied_status === "to Interview"
                          ? "bg-success"
                          : applications[0]?.applied_status === "Pending"
                            ? "to On hold"
                            : applications[0]?.applied_status === "On hold"
                              ? "Interview"
                              : ""}
            </Button>
          </div>

          {/* Personal Information */}
          <div className="p-4 mb-4" style={{ borderRadius: '8px', width: '90%', border: '1px solid #afd0ec' }}>
            <h6 style={{ textAlign: 'left', marginBottom: '20px' }}>Personal Information</h6>
            <div className="d-flex w-100 justify-content-between" style={{ gap: '20px', textAlign: 'left' }}>
              {/* Left-Aligned Items (Date of Birth, Marital Status, and Experience) */}
              <div className="d-flex flex-column gap-3" style={{ flex: '1' }}>
                {[ 
                  { icon: <FaBirthdayCake />, label: 'Date of Birth', value: applications[0]?.birthday },
                  { icon: <FaUser />, label: 'Marital Status', value: applications[0]?.status },
                  { icon: <FaBriefcase />, label: 'Experience', value: applications[0]?.experience },
                ].map((info, index) => (
                  <div key={index} className="d-flex flex-column align-items-start gap-2">
                    {React.cloneElement(info.icon, { style: { fontSize: '20px', color: '#0A65CC' } })}
                    <div>
                      <h6 className="mb-0">{info.label}</h6>
                      <p className="mb-0" style={{fontSize: '15px', marginTop: '5px'}}>{info.label === 'Date of Birth' && info.value ? new Date(info.value).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      }) : info.value}</p>
                    </div>
                  </div>
                ))}
              </div>
              {/* Right-Aligned Items (Nationality, Gender, and Education) */}
              <div className="d-flex flex-column gap-3" style={{ flex: '1' }}>
                {[ 
                  { icon: <FaFlag />, label: 'Nationality', value: applications[0]?.nationality },
                  { icon: <FaVenusMars />, label: 'Gender', value: applications[0]?.gender },
                  { icon: <FaGraduationCap />, label: 'Education', value: applications[0]?.attainment },
                ].map((info, index) => (
                  <div key={index} className="d-flex flex-column align-items-start gap-2">
                    {React.cloneElement(info.icon, { style: { fontSize: '20px', color: '#0A65CC' } })}
                    <div>
                      <h6 className="mb-0">{info.label}</h6>
                      <p className="mb-0" style={{fontSize: '15px', marginTop: '5px'}}>{info.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Download Resume */}
          <div className="p-4 mb-4" style={{ borderRadius: '8px', width: '90%', border: '1px solid #afd0ec' }}>
            <h6 style={{ textAlign: 'left' }}>Download Resume</h6>
            {applications[0]?.resumePath ? (
              <Button 
                variant="outline-primary" 
                className="mt-2 d-flex align-items-center gap-2" 
                onClick={() => window.open(`/src/api/${applications[0]?.resumePath}`, '_blank')}
              >
                <FaDownload style={{ fontSize: '1rem' }} />
                Download Resume
              </Button>
            ) : (
              <p>No resume available</p>
            )}
          </div>
          {/* Contact Information */}
          <div className="p-4" style={{ borderRadius: '8px', width: '90%' , textAlign: 'left', border: '1px solid #afd0ec' }}>
            <h6 style={{ textAlign: 'left' }}>Contact Information</h6>
            {[ 
              { icon: <FaGlobe />, label: 'Address', value: applications[0]?.address },
              { icon: <FaMapMarkerAlt />, label: 'Location', value: applications[0]?.city },
              { icon: <FaPhone />, label: 'Phone', value: applications[0]?.contact ? `+63 ${applications[0]?.contact}` : 'N/A' },
              { icon: <FaEnvelope />, label: 'Email', value:  applications[0]?.email },
            ].map((contact, index) => (
              <div key={index} className="d-flex align-items-center gap-2 mt-3">
                {React.cloneElement(contact.icon, { color: '#007bff', fontSize: '1.3rem'})}
                <div>
                  <h6 className="mb-0" style={{ marginLeft: '5px'}}>{contact.label}</h6>
                  <p className="mb-0" style={{fontSize: '15px', marginTop: '5px', marginLeft: '5px' }}>{contact.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

