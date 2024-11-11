import React from 'react';

const JobSyncFlow = () => {
  const containerStyle = {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '20px',
  };

  const jobSyncFlowStyle = {
    textAlign: 'center',
  };

  const iconStyle = {
    fontSize: '30px',
    backgroundColor: '#ffffff',
    padding: '10px',
    borderRadius: '50%',
    marginBottom: '10px',
  };

  const arrowStyle = {
    fontSize: '24px',
    color: '#3b82f6',
    textAlign: 'center',
  };

  const stepContainerStyle = {
    backgroundColor: '#f0f0f0',
    padding: '20px',
    borderRadius: '10px',
    textAlign: 'center',
    transition: 'transform 0.3s ease',  // Smooth transition
  };

  const stepContainerHoverStyle = {
    transform: 'scale(1.05)', // Zoom in effect
  };

  return (
    <div className="container my-5" style={containerStyle}>
      <div style={{ ...jobSyncFlowStyle, marginTop: '70px', marginBottom: '30px' }} className="text-center mb-4">
        <h2>How JobSync Work?</h2>
      </div>
      <div className="row justify-content-center align-items-center">
        <div
          className="col-md-2 p-3 d-flex flex-column align-items-center"
          style={stepContainerStyle}
          onMouseEnter={(e) => e.currentTarget.style.transform = stepContainerHoverStyle.transform}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
          <div style={iconStyle}>👤</div>
          <p>Create account</p>
        </div>
        <div className="col-auto" style={arrowStyle}>→</div>
        <div
          className="col-md-2 p-3 d-flex flex-column align-items-center"
          style={stepContainerStyle}
          onMouseEnter={(e) => e.currentTarget.style.transform = stepContainerHoverStyle.transform}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
          <div style={iconStyle}>📄</div>
          <p>Upload CV/Resume</p>
        </div>
        <div className="col-auto" style={arrowStyle}>→</div>
        <div
          className="col-md-2 p-3 d-flex flex-column align-items-center"
          style={stepContainerStyle}
          onMouseEnter={(e) => e.currentTarget.style.transform = stepContainerHoverStyle.transform}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
          <div style={iconStyle}>🔍</div>
          <p>Find suitable job</p>
        </div>
        <div className="col-auto" style={arrowStyle}>→</div>
        <div
          className="col-md-2 p-3 d-flex flex-column align-items-center"
          style={stepContainerStyle}
          onMouseEnter={(e) => e.currentTarget.style.transform = stepContainerHoverStyle.transform}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
          <div style={iconStyle}>📝</div>
          <p>Apply job</p>
        </div>
        <div className="col-auto" style={arrowStyle}>→</div>
        <div
          className="col-md-2 p-3 d-flex flex-column align-items-center"
          style={stepContainerStyle}
          onMouseEnter={(e) => e.currentTarget.style.transform = stepContainerHoverStyle.transform}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
          <div style={iconStyle}>💻</div>
          <p>Take Interview through video call</p>
        </div>
      </div>
    </div>
  );
};

export default JobSyncFlow;
