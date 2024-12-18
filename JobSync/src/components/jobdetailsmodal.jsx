import React, {useEffect, useState} from 'react';
import { Modal, Button } from 'react-bootstrap';
import { FaGraduationCap, FaBriefcase, FaUserTie, FaCalendarAlt, FaMapMarkerAlt, FaRegClock, FaComments, FaTag, FaMoneyBillWave, FaClock, FaUserClock, FaSuitcase } from 'react-icons/fa';
import { getFromEndpoint } from '../components/apiService';
import { useAuth } from '../AuthContext'; 
import DOMPurify from 'dompurify'; 

const JobDetailsModal = ({ show, handleClose, job_id }) => {
  const iconStyle = { color: '#0a60bb', fontSize: '1.5em' };
  const [job, setJob] = useState([]);
  const { user } = useAuth();
  useEffect(() => {
    const fetchJobDetails = async () => {
        try {
            const response = await getFromEndpoint(`/getSpecificJob.php?job_id=${job_id}&applicant_id=${user.id}`);
            if (response.data && response.data.length > 0) {
                const jobData = response.data[0];

                if (jobData.selectedBenefits && jobData.selectedBenefits.trim() !== '') {
                    jobData.selectedBenefits = jobData.selectedBenefits.split(',')
                        .map(item => item.trim())
                        .filter(item => item && item !== ' ');

                } else {
                    jobData.selectedBenefits = null;
                }
                setJob(jobData);
            } else {
                console.error("No job data found");
            }
        } catch (error) {
            console.error("Error fetching job details:", error);
        }
      };
      fetchJobDetails();
  }, [job_id]);

  const sanitizedDescription = DOMPurify.sanitize(job.jobDescription);

  const JobBenefits = ({ selectedBenefits }) => {
    if (!selectedBenefits || selectedBenefits.length === 0) {
        return <p>No benefits listed for this job.</p>;
    }
    return (
        <div className="d-flex flex-wrap gap-2 mt-3">
            {selectedBenefits.map((benefit, index) => (
                <span
                    key={index}
                    style={{ padding: '5px 10px', backgroundColor: 'transparent', border: '1px solid #007bff', color: '#007bff', borderRadius: '7px' }}
                >
                    {benefit}
                </span>
            ))}
        </div>
    );
  };

  return (
    <Modal show={show} onHide={handleClose} size="xl" centered>
      <Modal.Header closeButton>
        <Modal.Title>Job Details</Modal.Title>
      </Modal.Header>

      <Modal.Body style={{paddingRight: '2rem'}}>
        <div className="d-flex">
          {/* Left Section */}
          <div className="flex-grow-1 me-5 ps-4">
            <div className="d-flex align-items-center mb-3">
              <img
                src={job.logo || './src/assets/default-logo.png'}
                alt="Company Logo"
                className="me-2"
                style={{ width: '100px', height: 'auto' }}
              />
              <div>
                <h5 className="mb-0">{job.jobTitle}</h5>
                <small>{job.city}</small>
              </div>
            </div>

            {/* Job Description */}
            <h6 className="mt-4">Job Description</h6>
            <p className='mb-0' style={{ textAlign: 'justify'}} dangerouslySetInnerHTML={{ __html: sanitizedDescription }} />

            {/* Job Benefits */}
            <h6 className="mt-0">Job Benefits</h6>
            <div className="d-flex flex-wrap gap-2 mb-3">
              <JobBenefits selectedBenefits={job.selectedBenefits} />
            </div>

            {/* Google Maps Location */}
            <div className="mt-4">
              <iframe
                src="https://www.google.com/maps/embed?..."
                width="100%"
                height="288"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                title="Location Map"
              ></iframe>
            </div>
          </div>

          {/* Right Section */}
          <div className="border-start ps-3" style={{ minWidth: '330px' }}>
            {/* Apply Buttons */}
            <div className="d-flex mb-3">
            <Button
              variant="outline-primary"
              style={{ width: '200px', height: '45px', fontSize: '15px', padding: '0', backgroundColor: '#0A65CC' , color: 'white', border: 'none' }}
              className={`me-2 ${job.applied_status === "Interview"
                          ? "bg-success"
                          : job.applied_status === "Pending"
                          ? "bg-warning"
                          : job.applied_status === "On hold"
                          ? "bg-info"
                          : "bg-danger"}`}
            >
            <FaRegClock /> {job.applied_status}
            </Button>
              <Button
                variant="outline-primary"
                style={{ width: '200px', height: '45px', fontSize: '13px', padding: '0' }}
              >
                <FaComments style={iconStyle} /> Chat Employer
              </Button>
            </div>

            {/* Job Role and Tags */}
            <div className="mb-3">
              <div className="d-flex justify-content-start align-items-center p-4 border" style={{ border: '2px solid #ccc', borderRadius: '8px' }}>
                <div className="d-flex flex-column align-items-start me-4">
                  <FaUserTie style={iconStyle} className="mb-2" />
                  <h6 className="mb-0" style={{fontSize: '15px'}}>Job Role</h6>
                  <p className="mb-0 mt-1" style={{ fontSize: '14px', padding: '0', margin: '0' }}>{job.jobRole}</p>
                </div>
                <div className="d-flex flex-column align-items-start">
                  <FaTag style={iconStyle} className="mb-2" />
                  <h6 className="mb-0" style={{fontSize: '15px'}}>Tags</h6>
                  <p className="mb-0 mt-1" style={{ fontSize: '14px', padding: '0', margin: '0' }}>{job.jobTags}</p>
                </div>
              </div>
            </div>

            {/* Salary & Type */}
            <div className="d-flex flex-column p-4 border" style={{ border: '2px solid #ccc', borderRadius: '8px' }}>
              <div className="d-flex align-items-center">
                <FaMoneyBillWave style={iconStyle} className="me-3" />
                <div>
                  <h6 className="mb-0 " style={{fontSize: '15px'}}>Salary</h6>
                  <p className="mb-0 mt-1"  style={{fontSize: '14px'}}>₱{job.minSalary} - ₱{job.maxSalary}</p>
                </div>
              </div>

              <div className="d-flex align-items-center mt-3">
                <FaClock style={iconStyle} className="me-3" />
                <div>
                  <h6 className="mb-0" style={{fontSize: '15px'}}>Salary Type</h6>
                  <p className="mb-2 mt-1" style={{fontSize: '14px'}}>{job.salaryType}</p>
                </div>
              </div>

              <hr style={{ margin: '5px 0' }} />

              {/* Advance Information */}
              <div className="mb-0 mt-3">
                <h6 style={{fontSize: '17px'}}>Advance Information</h6>
                <ul className="list-unstyled">
                  {[
                    { icon: <FaGraduationCap style={iconStyle} className="me-3" />, title: 'Education', value: job.education },
                    { icon: <FaUserClock style={iconStyle} className="me-3" />, title: 'Experience', value: job.experience },
                    { icon: <FaBriefcase style={iconStyle} className="me-3" />, title: 'Job Type', value: job.jobType },
                    { icon: <FaSuitcase style={iconStyle} className="me-3" />, title: 'Job Level', value: job.jobLevel },
                    { 
                      icon: <FaCalendarAlt style={iconStyle} className="me-3" />, 
                      title: 'Expiration Date', 
                      value: new Date(job.expirationDate).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      }) 
                    }
                  ].map((item, index) => (
                    <div key={index}>
                      <li className="d-flex align-items-center mt-3">
                        {item.icon}
                        <div>
                          <h6 className="mb-0" style={{ fontSize: '15px' }}>{item.title}</h6>
                          <p className="mb-2 mt-1" style={{ fontSize: '14px' }}>{item.value}</p>
                        </div>
                      </li>
                      {index !== 4 && <hr style={{ margin: '5px 0' }} />}
                    </div>
                  ))}
                </ul>
              </div>
            </div>

            {/* Location Section */}
            <div>
              <div className='border p-4' style={{ borderRadius: '8px', padding: '10px', marginTop: '10px' }}>
                <h6 style={{fontSize: '17px'}}>Location</h6>
                <ul className="list-unstyled" style={{ margin: '0' }}>
                  {[
                    { icon: <FaMapMarkerAlt style={iconStyle} className="me-3" />, title: 'Address', value: job.address },
                    { icon: <FaMapMarkerAlt style={iconStyle} className="me-3" />, title: 'City', value:  job.city },
                  ].map((item, index) => (
                    <div key={index}>
                      <li key={index} className="d-flex align-items-center mt-3">
                        {item.icon}
                        <div>
                          <h6 className="mb-1" style={{fontSize: '15px'}}>{item.title}</h6>
                          <p className="mb-2 mt-1" style={{fontSize: '14px'}}>{item.value}</p>
                        </div>
                      </li>
                      {index !== 1 && <hr style={{ margin: '5px 0' }} />}
                    </div>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default JobDetailsModal;
