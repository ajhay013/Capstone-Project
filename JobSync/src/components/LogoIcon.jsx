import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from '../assets/logo3.png'
import { useState } from 'react';



export default function LogoIcon() {

    const [selected, setSelected] = useState("Philippines");
  
    const handleSelect = (value) => {
      setSelected(value);
    };
  
  return (
    <header className="logo_only p-3">
      <div className="container">
        <div className="d-flex flex-wrap justify-content-between align-items-center">
          <Link to={"/"} style={{color: '#212529'}}>
          <div className="logo d-flex align-items-center mb-2 mb-md-0">
              <img src={logo} alt="JobSync Logo" width="88" height="76" />
            <span className="ms-2 fw-bold fs-2">JobSync</span>
          </div>
          </Link>
        </div>
      </div>
    </header>
  );
}
