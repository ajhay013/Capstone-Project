import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { FaGraduationCap, FaBriefcase, FaUserTie, FaCalendarAlt, FaMapMarkerAlt, FaRegClock, FaComments, FaTag, FaDollarSign, FaClock } from 'react-icons/fa';

const JobDetailsModal = ({ show, handleClose }) => {
  const iconStyle = { color: '#007bff', fontSize: '1.5em' }; // Blue color for icons

  return (
    <Modal show={show} onHide={handleClose} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Job Details</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div className="d-flex">
          {/* Left Section */}
          <div className="flex-grow-1 me-3">
            <div className="d-flex align-items-center mb-3">
              <img
                src="../../src/assets/riot.png"
                alt="Company Logo"
                className="me-2"
                style={{ width: '100px', height: 'auto' }}
              />
              <div>
                <h5 className="mb-0">Visual Designer</h5>
                <small>Pasig</small>
              </div>
            </div>

            {/* Job Description */}
            <h6 className="mt-4">Job Description</h6>
            <p style={{ textAlign: 'justify' }}>
              Join our vibrant team and apply your creativity and expertise in UI/UX design in a supportive and dynamic environment. Our workplace culture is centered around mutual respect and a commitment to a healthy work/life balance.
            </p>

            {/* Job Requirements */}
            <h6 className="mt-4">Job Requirements</h6>
            <ul>
              <li>Proven experience in UI/UX design with a strong portfolio.</li>
              <li>Proficiency in design tools such as Figma, Sketch, or Adobe XD.</li>
              <li>Strong understanding of user-centered design principles.</li>
              <li>Ability to work collaboratively in a fast-paced environment.</li>
              <li>Excellent communication and problem-solving skills.</li>
            </ul>

            {/* How to Apply */}
            <h6 className="mt-4">How to Apply</h6>
            <p style={{ textAlign: 'justify' }}>
              Interested candidates can apply by submitting their resume and portfolio through our application form. We look forward to hearing from you!
            </p>

            {/* Job Benefits */}
            <h6 className="mt-4">Job Benefits</h6>
            <div className="d-flex flex-wrap gap-2 mb-3">
              {['Distributed Team', 'Medical Insurance', 'Learning Budgets', 'We hire old (and young)'].map((benefit, index) => (
                <span key={index} style={{ padding: '5px 10px', backgroundColor: 'transparent', border: '1px solid #007bff', color: '#007bff', borderRadius: '7px' }}>
                  {benefit}
                </span>
              ))}
            </div>

            {/* Google Maps Location */}
            <div className="mt-4">
              <iframe
                src="https://www.google.com/maps/embed?..."
                width="100%"
                height="200"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                title="Location Map"
              ></iframe>
            </div>
          </div>

          {/* Right Section */}
          <div className="border-start ps-3" style={{ minWidth: '250px' }}>
            {/* Apply Buttons */}
            <div className="d-flex mb-3">
            <Button
              variant="outline-primary"
              style={{ width: '200px', height: '45px', fontSize: '15px', padding: '0', backgroundColor: '#0A65CC' , color: 'white', border: 'none' }}
              className="me-2"
            >
            <FaRegClock /> Pending
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
              <div className="d-flex justify-content-start align-items-center p-3 border" style={{ border: '2px solid #ccc', borderRadius: '8px' }}>
                <div className="d-flex flex-column align-items-start me-4">
                  <FaBriefcase style={iconStyle} className="mb-2" />
                  <h6 className="mb-0">Job Role</h6>
                  <p className="mb-0" style={{ fontSize: '14px', padding: '0', margin: '0' }}>Graphic Design</p>
                </div>
                <div className="d-flex flex-column align-items-start">
                  <FaTag style={iconStyle} className="mb-2" />
                  <h6 className="mb-0">Tags</h6>
                  <p className="mb-0" style={{ fontSize: '14px', padding: '0', margin: '0' }}>VisualDesign</p>
                </div>
              </div>
            </div>

            {/* Salary & Type */}
            <div className="d-flex flex-column p-3 border" style={{ border: '2px solid #ccc', borderRadius: '8px' }}>
              <div className="d-flex align-items-center">
                <FaDollarSign style={iconStyle} className="me-2" />
                <div>
                  <h6 className="mb-0">Salary</h6>
                  <p className="mb-0">₱60,000 - ₱100,000</p>
                </div>
              </div>

              <div className="d-flex align-items-center mt-3">
                <FaClock style={iconStyle} className="me-2" />
                <div>
                  <h6 className="mb-0">Salary Type</h6>
                  <p className="mb-0">Full-Time</p>
                </div>
              </div>

              <hr style={{ margin: '5px 0' }} />

              {/* Advance Information */}
              <div className="mb-3">
                <h6>Advance Information</h6>
                <ul className="list-unstyled">
                  {[
                    { icon: <FaGraduationCap style={iconStyle} className="me-2" />, title: 'Education', value: 'Graduate of Bachelor Degree' },
                    { icon: <FaBriefcase style={iconStyle} className="me-3" />, title: 'Experience', value: '2-5 Years Experience' },
                    { icon: <FaUserTie style={iconStyle} className="me-3" />, title: 'Job Type', value: 'Full-Time' },
                    { icon: <FaUserTie style={iconStyle} className="me-3" />, title: 'Job Level', value: 'Mid-Level' },
                    { icon: <FaCalendarAlt style={iconStyle} className="me-3" />, title: 'Expiration Date', value: 'September 28, 2024' }
                  ].map((item, index) => (
                    <div key={index}>
                      <li className="d-flex align-items-center mt-3">
                        {item.icon}
                        <div>
                          <h6 className="mb-0">{item.title}</h6>
                          <p className="mb-0">{item.value}</p>
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
              <div style={{ border: '2px solid #ccc', borderRadius: '8px', padding: '10px', marginTop: '10px' }}>
                <h6>Location</h6>
                <ul className="list-unstyled" style={{ margin: '0' }}>
                  {[
                    { icon: <FaMapMarkerAlt style={iconStyle} className="me-3" />, title: 'Address', value: '11F, One Ayala West Tower, Ayala Avenue' },
                    { icon: <FaMapMarkerAlt style={iconStyle} className="me-3" />, title: 'City', value: 'Makati City' },
                  ].map((item, index) => (
                    <li key={index} className="d-flex align-items-center mt-3">
                      {item.icon}
                      <div>
                        <h6 className="mb-1">{item.title}</h6>
                        <p className="mb-0">{item.value}</p>
                      </div>
                      <hr style={{ margin: '5px 0' }} />
                    </li>
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
