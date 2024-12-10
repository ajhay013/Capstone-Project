import React, { useState, useEffect } from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import { FaBuilding, FaCalendar, FaLink } from 'react-icons/fa';
import AddressInfo from '../../Pages/Applicants/ApplicantProfile/address';
import Socmedlinks from '../../pages/applicants/applicantprofile/socmedlinks';
import Personal from './ApplicantProfile/personal';

export default function ApplicantProfile() {
  const [activeKey, setActiveKey] = useState('personal');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer); 
  }, []);

  const tabStyles = (isActive) => ({
    color: isActive ? '#0A65CC' : '#757575',
  });

  if (isLoading) {
    return (
      <div id="preloader">
      </div>
    );
  }
  return (
    <div className='containter' style={{ padding: 0, marginTop: '100px', maxWidth: '1200px', width: '100%' }}>
      {/* Tab Bar Container */}
      <div
        style={{
          borderBottom: '1px solid #ddd',
          position: 'relative', 
          marginleft: '0px'
        }}
      >
        <Tabs
          activeKey={activeKey}
          onSelect={(k) => setActiveKey(k)}
          id="applicant-tabs"
          className="px-4"
          style={{
            width: '100%',
          }}
        >
          <Tab
            eventKey="personal"
            style={{
              background: 'linear-gradient(49deg, rgba(232,242,255,1) 0%, rgba(255,255,255,1) 45%)',
              borderRadius: '8px',
              boxShadow: '0px 4px 11px rgba(0, 0, 0, 0.2)'
            }}
            title={
              <div style={{width: '160px', textAlign: 'left'}}>
                <FaBuilding style={{ marginRight: '10px', ...tabStyles(activeKey === 'personal') }} />
                <span style={tabStyles(activeKey === 'personal')}>Personal</span>
              </div>
            }
          >
            <div style={{ padding: '20px'}}>
              <Personal />
            </div>
          </Tab>

          <Tab
            eventKey="address"
            style={{
              background: 'linear-gradient(49deg, rgba(232,242,255,1) 0%, rgba(255,255,255,1) 45%)',
              borderRadius: '8px',
              boxShadow: '0px 4px 11px rgba(0, 0, 0, 0.2)'
            }}
            title={
              <div style={{width: '160px', textAlign: 'left'}}>
                <FaCalendar style={{ marginRight: '10px', ...tabStyles(activeKey === 'address') }} />
                <span style={tabStyles(activeKey === 'address')}>Address</span>
              </div>
            }
          >
            <div style={{ padding: '20px', width: '1220px'}}>
              <AddressInfo />
            </div>
          </Tab>

          <Tab
            eventKey="socmedlinks"
            style={{
              background: 'linear-gradient(49deg, rgba(232,242,255,1) 0%, rgba(255,255,255,1) 45%)',
              borderRadius: '8px',
              boxShadow: '0px 4px 11px rgba(0, 0, 0, 0.2)'
            }}
            title={
              <div style={{width: '200px', textAlign: 'left'}}>
                <FaLink style={{ marginRight: '10px', ...tabStyles(activeKey === 'socmedlinks') }} />
                <span style={tabStyles(activeKey === 'socmedlinks')}>Social Media Links</span>
              </div>
            }
          >
            <div style={{ padding: '20px', width: '1220px'}}>
              <Socmedlinks />
            </div>
          </Tab>
        </Tabs>
      </div>

      {/* Content Area */}
      <div
        style={{
          marginTop: '30px',
          position: 'relative',
        }}
      >
        {/* Tab content will render here */}
      </div>
    </div>
  );
}
