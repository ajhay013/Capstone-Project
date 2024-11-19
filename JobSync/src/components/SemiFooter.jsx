import React from 'react';
import { useLocation } from 'react-router-dom';

function SemiFooter() {
  const location = useLocation();
  const isCompletePage = location.pathname === '/Complete' || location.pathname === '/complete' ;

  return (
    <div 
      className='mt-5' 
      style={{ 
        width: '100%', 
        position: isCompletePage ? 'fixed' : 'absolute',  
        left: '0', 
        margin: '0', 
        backgroundColor: '#343a40', 
        bottom: isCompletePage ? '0' : 'auto',  
      }}
    >
      <footer 
        className="py-4" 
        style={{ 
          width: '100%', 
          background: '#f1f8ff', 
          color: '#696969', 
          fontSize: '14px', 
          fontWeight: '400' 
        }}
      >
        <div className="container-fluid px-0">
          <div className="row d-flex justify-content-center align-items-center text-center mx-0" style={{ height: '100%' }}>
            <div className="col">
              © 2024 JobSync, me.jobsync@gmail.com. All Rights Reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default SemiFooter;
