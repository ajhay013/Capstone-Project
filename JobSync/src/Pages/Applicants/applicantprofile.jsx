import React, { useState } from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import { FaBuilding, FaCalendar, FaLink } from 'react-icons/fa';
import Personal from '../../pages/applicants/applicantprofile/personal';
import AddressInfo from '../../Pages/Applicants/ApplicantProfile/address';
import Socmedlinks from '../../pages/applicants/applicantprofile/socmedlinks';

export default function ApplicantProfile() {
  const [activeKey, setActiveKey] = useState('personal');

  const tabStyles = (isActive) => ({
    color: isActive ? '#0A65CC' : '#757575',
  });

  return (
    <div style={{ padding: 0, marginTop: '170px', marginLeft: '220px' }}>
      {/* Tab Bar Container */}
      <div
        style={{
          background: 'white',
          padding: '0 16px',
          borderBottom: '1px solid #ddd',
          width: '100%',
          position: 'relative', // Default position
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
            title={
              <>
                <FaBuilding style={{ marginRight: '8px', ...tabStyles(activeKey === 'personal') }} />
                <span style={tabStyles(activeKey === 'personal')}>Personal</span>
              </>
            }
          >
            <div style={{ padding: '20px', minHeight: '600px' }}>
              <Personal />
            </div>
          </Tab>

          <Tab
            eventKey="address"
            title={
              <>
                <FaCalendar style={{ marginRight: '8px', ...tabStyles(activeKey === 'address') }} />
                <span style={tabStyles(activeKey === 'address')}>Address</span>
              </>
            }
          >
            <div style={{ padding: '20px', minHeight: '600px' , marginTop: '145px' }}>
              <AddressInfo />
            </div>
          </Tab>

          <Tab
            eventKey="socmedlinks"
            title={
              <>
                <FaLink style={{ marginRight: '8px', ...tabStyles(activeKey === 'socmedlinks') }} />
                <span style={tabStyles(activeKey === 'socmedlinks')}>Social Media Links</span>
              </>
            }
          >
            <div style={{ padding: '20px', minHeight: '600px' , marginTop: '105px'}}>
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
