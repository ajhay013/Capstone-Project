import React, { useState } from 'react';
import { FaChevronLeft } from 'react-icons/fa'; 

export default function HiringNotification({ onContinue, onCancel }) {
  const [isTextVisible, setIsTextVisible] = useState(false);

  const handleChevronClick = () => {
    setIsTextVisible(!isTextVisible);
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        backgroundColor: '#f8f9fa',
        padding: '20px',
        borderRadius: '8px',
        border: '1px solid #ddd',
        marginBottom: '20px',
        position: 'relative',
        marginTop: '40px',
        marginLeft: '-30px',
        overflow: 'hidden',
        width: '110%', 
        height: isTextVisible ? 'auto' : '120px',
        transition: 'height 0.3s ease-out',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <img
            src="./src/assets/profes.jpg"
            alt="Profile"
            style={{
              borderRadius: '50%',
              height: '50px',
              width: '50px',
              objectFit: 'cover'
            }}
          />
          <div>
            <p style={{ margin: 0, fontSize: '16px', fontWeight: 500 }}>
            </p>
          </div>
        </div>
        <FaChevronLeft
          style={{
            color: '#888',
            cursor: 'pointer',
            transition: 'transform 0.3s ease', 
            transform: isTextVisible ? 'rotate(-90deg)' : 'rotate(0deg)',
          }}
          onClick={handleChevronClick}
        />
      </div>
      <div
        style={{
          marginTop: '10px',
          fontSize: '15px',
          color: '#555',
          height: isTextVisible ? 'auto' : '0',
          overflow: 'hidden',
          paddingTop: isTextVisible ? '10px' : '0',
          transition: 'height 0.3s ease, padding-top 0.3s ease',
        }}
      >
        By continuing, you agree to 
        <a
          href="https://example.com/jobs-terms"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            color: '#0073b1',
            textDecoration: 'underline',
            marginLeft: '5px',
          }}
        >
          JobSync's Jobs Terms and Conditions
        </a> 
        including our 
        <a
          href="https://example.com/non-discrimination-policy"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            color: '#0073b1',
            textDecoration: 'underline',
            marginLeft: '5px',
          }}
        >
          policies prohibiting discriminatory job posts
        </a>.
      </div>
    </div>
  );
}
