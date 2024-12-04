import React, { useState } from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import { FaBuilding, FaCalendar, FaLink } from 'react-icons/fa';
import AddressInfo from '../../Pages/Applicants/ApplicantProfile/address';
import Socmedlinks from '../../pages/applicants/applicantprofile/socmedlinks';
import Personal from './ApplicantProfile/personal';

export default function ApplicantProfile() {
  const [activeKey, setActiveKey] = useState('personal');


  const tabStyles = (isActive) => ({
    color: isActive ? '#0A65CC' : '#757575',
  });

  return (
    <div className='containter' style={{ padding: 0, marginTop: '70px', maxWidth: '1200px', width: '100%' }}>
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
              background: '#fbfbfb',
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
              background: '#fbfbfb',
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
              background: '#fbfbfb',
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
