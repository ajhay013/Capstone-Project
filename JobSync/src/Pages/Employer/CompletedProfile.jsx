import React from 'react';
import '../../css/Specific.css'; 
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-quill/dist/quill.snow.css';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

export default function CompletedProfile() {
  return (
    <div className="completed-profile">
      <div className="check-mark">✓✓</div>
      <div>
        <h2>🎉 Congratulations, Your company profile is 100% complete!</h2>
        <p>
            Your company profile is now fully set up and ready to showcase your business. 
            You've successfully provided all the necessary details to present your company to potential clients and job seekers.
        </p>
        <div className="button-container">
            <Link to="/employer/overview">
                <Button variant="secondary" style={{ marginRight: '10px', width: '200px', backgroundColor: '#d4edff', color: '#237fe8', height: '50px', border: 'none', fontWeight: '500' }}>
                    View Dashboard
                </Button>
            </Link>
            <Link to="/employer/postjob">
                <Button type="submit" style={{ width: '200px', backgroundColor: '#0A65CC', height: '50px', fontWeight: '500' }}>
                Post Job <FontAwesomeIcon icon={faArrowRight} style={{marginLeft: '5px'}}/>
                </Button>
            </Link>
        </div>
      </div> 
    </div>
  );
}