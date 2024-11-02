import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from '../assets/logo3.png';

export default function LogoIcon({ centered = false }) {
  return (
    <header className={`p-3 ${centered ? 'centered-logo' : 'logo_only'}`} style={{ marginTop: centered ? '-20%' : '0' }}>
      <div className={`container ${centered ? 'd-flex justify-content-center align-items-center' : ''}`}>
        <Link to="/" style={{ color: '#212529', textAlign: centered ? 'center' : 'left' }}>
          <div className={`logo d-flex ${centered ? 'flex-column align-items-center' : 'align-items-center mb-2 mb-md-0'}`}>
            <img src={logo} alt="JobSync Logo" width={centered ? '150' : '88'} height={centered ? '130' : '76'} />
            <span className={`ms-2 fw-bold ${centered ? 'mt-3 fs-1' : 'fs-2'}`}>JobSync</span>
          </div>
        </Link>
      </div>
    </header>
  );
}
