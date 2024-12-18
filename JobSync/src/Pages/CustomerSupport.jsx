import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../Responsive.css'

const CustomerSupport = () => {
  const [issueType, setIssueType] = useState('');
  const [subject, setSubject] = useState('');
  const [question, setQuestion] = useState('');
  const [attachment, setAttachment] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      issueType,
      subject,
      question,
      attachment,
    });
    alert('Form submitted successfully!');
  };

  return (
    <>
      <div className="container mt-5">
        <div className="row">
          {/* Form Column (Left Side) */}
          <div className="col-md-6 col-12">
            <div className="d-flex align-items-center mb-4">
              {/* Support Icon */}
              <img
                src="/src/assets/logo jobsync2.png"
                alt="Support Icon"
                style={{ width: '100px', height: 'auto', marginRight: '10px' }}
              />
              {/* Header Text */}
              <h3 className="mb-0">JobSync Support</h3>
            </div>
            <p className="fw-bold mb-1">christiandave.bernalbsis2022@gmail.com</p>
            <form onSubmit={handleSubmit}>
              {/* Issue Type */}
              <div className="mb-3" style={{ textAlign: 'left' }}>
                <label htmlFor="issueType" className="form-label">
                  Issue Type <span className="text-danger">*</span>
                </label>
                <select
                  id="issueType"
                  className="form-select"
                  value={issueType}
                  onChange={(e) => setIssueType(e.target.value)}
                  required
                >
                  <option value="">--</option>
                  <option value="Account Issue">Account Issue</option>
                  <option value="Technical Problem">Technical Problem</option>
                  <option value="Billing Inquiry">Billing Inquiry</option>
                </select>
              </div>

              {/* Subject */}
              <div className="mb-3" style={{ textAlign: 'left' }}>
                <label htmlFor="subject" className="form-label">
                  Subject <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  id="subject"
                  className="form-control"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  required
                />
              </div>

              {/* Question */}
              <div className="mb-3" style={{ textAlign: 'left' }}>
                <label htmlFor="question" className="form-label">
                  Your Question <span className="text-danger">*</span>
                </label>
                <textarea
                  id="question"
                  className="form-control"
                  rows="5"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  required
                ></textarea>
              </div>

              {/* Attachment */}
              <div className="mb-3" style={{ textAlign: 'left' }}>
                <label htmlFor="attachment" className="form-label text-primary" style={{ cursor: 'pointer' }}>
                  📎 Add an attachment
                </label>
                <input
                  type="file"
                  id="attachment"
                  className="form-control"
                  onChange={(e) => setAttachment(e.target.files[0])}
                />
              </div>

              {/* Submit Button */}
              <div className="mb-3" style={{ textAlign: 'left' }}>
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </div>

              {/* Note */}
              <p className="text-muted small" style={{ textAlign: 'left' }}>
                In order to answer your question or troubleshoot a problem, a JobSync representative may need to access
                your account, including, as needed, your messages and settings.
              </p>
            </form>
          </div>

          {/* Image Column (Right Side) */}
          <div className="col-md-6 col-12 d-flex justify-content-center align-items-center">
            <img
              src="/src/assets/customersupport.png"
              alt="Customer Support"
              style={{ maxWidth: '150%', height: 'auto', marginLeft: '250px', marginTop: '-100px' }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default CustomerSupport;
