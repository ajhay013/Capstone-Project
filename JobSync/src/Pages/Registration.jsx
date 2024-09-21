import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import React, { useState } from 'react'; 


function RegistrationForm() {
    const [formType, setFormType] = useState('candidate');
  
    return (
      <div className="container mt-5">
        <div className="d-flex justify-content-center mb-4">
          <button 
            className={`btn btn-primary mx-2 ${formType === 'candidate' ? 'active' : ''}`}
            onClick={() => setFormType('candidate')}
          >
            Candidate
          </button>
          <button 
            className={`btn btn-primary mx-2 ${formType === 'employer' ? 'active' : ''}`}
            onClick={() => setFormType('employer')}
          >
            Employer
          </button>
        </div>
  
        <form>
          <div className="row mb-3">
            <div className="col">
              <label htmlFor="firstName">First Name</label>
              <input type="text" className="form-control" id="firstName" placeholder="First Name" />
            </div>
            <div className="col">
              <label htmlFor="middleName">Middle Name</label>
              <input type="text" className="form-control" id="middleName" placeholder="Middle Name" />
            </div>
          </div>
  
          <div className="row mb-3">
            <div className="col">
              <label htmlFor="lastName">Last Name</label>
              <input type="text" className="form-control" id="lastName" placeholder="Last Name" />
            </div>
            <div className="col">
              <label htmlFor="suffix">Suffix</label>
              <input type="text" className="form-control" id="suffix" placeholder="Suffix (Optional)" />
            </div>
          </div>
  
          <div className="row mb-3">
            <div className="col">
              <label htmlFor="gender">Gender</label>
              <input type="text" className="form-control" id="gender" placeholder="Gender" />
            </div>
            <div className="col">
              <label htmlFor="contact">Contact</label>
              <input type="text" className="form-control" id="contact" placeholder="Contact Number" />
            </div>
          </div>
  
          <div className="mb-3">
            <label htmlFor="email">Email Address</label>
            <input type="email" className="form-control" id="email" placeholder="Email" />
          </div>
  
          {formType === 'candidate' && (
            <>
              <div className="mb-3">
                <label htmlFor="password">Password</label>
                <input type="password" className="form-control" id="password" placeholder="Password" />
              </div>
              <div className="mb-3">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input type="password" className="form-control" id="confirmPassword" placeholder="Confirm Password" />
              </div>
            </>
          )}
  
          <div className="d-flex justify-content-center">
            <button type="submit" className="btn btn-success">Create Account</button>
          </div>
        </form>
      </div>
    );
  }
  
export default RegistrationForm;