import React from 'react';

function Footer() {
  return (
    <div className='mt-5' style={{ 
      width: '100%', 
      position: 'absolute',
      left: '0',
      margin: '0', 
      backgroundColor: '#343a40',
    }}>
    <footer className="bg-dark text-light py-4" style={{ width: '100%' }}>
      <div className="container-fluid px-0">
        <div className="row d-flex justify-content-between text-center mx-0">
          
          {/* Logo and Contact Info */}
          <div className="col-lg-2 col-md-6 mb-2">
            <p>
              <img src="./src/assets/logo3.png" alt="JobSync Logo" className="mb-2" style={{ width: '50px' }} /> JobSync
            </p>
            <p className="mb-1"><strong>Call now:</strong> (319) 555-0115</p>
          </div>

          {/* Quick Link */}
          <div className="col-lg-2 col-md-6 mb-2">
            <h5 className="text-white">Quick Link</h5>
            <ul className="list-unstyled">
              <li><a href="#" className="custom-link">About</a></li>
              <li><a href="#" className="custom-link">Contact</a></li>
              <li><a href="#" className="custom-link">Blog</a></li>
            </ul>
          </div>

          {/* Candidate Links */}
          <div className="col-lg-2 col-md-6 mb-2">
            <h5 className="text-white">Candidate</h5>
            <ul className="list-unstyled">
              <li><a href="#" className="custom-link">Browse Jobs</a></li>
              <li><a href="#" className="custom-link">Browse Employers</a></li>
              <li><a href="#" className="custom-link">Candidate Dashboard</a></li>
              <li><a href="#" className="custom-link">Saved Jobs</a></li>
            </ul>
          </div>

          {/* Support Links */}
          <div className="col-lg-2 col-md-6 mb-2">
            <h5 className="text-white">Support</h5>
            <ul className="list-unstyled">
              <li><a href="#" className="custom-link">FAQs</a></li>
              <li><a href="#" className="custom-link">Privacy Policy</a></li>
              <li><a href="#" className="custom-link">Terms & Conditions</a></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
    </div>
  );
};

export default Footer;
