import React, { useState, useRef } from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import { FaKey, FaUser } from 'react-icons/fa'; 
import ApplicantsSidebar from '../../../components/applicantsidebar';
import PasswordSettings from './PasswordSettings';
import AccountSettings from './AccountSettings';

export default function ApplicantSettings() {
  const [activeKey, setActiveKey] = useState('passwordsettings');
  const fileInputRef = useRef(null);

  const tabStyles = (isActive) => ({
    color: isActive ? '#0A65CC' : '#757575',
  });

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setProfileImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleButtonClick = () => fileInputRef.current.click();

  return (
    <div className="d-flex">
      <div className="sidebar" style={{ width: '20%', minWidth: '250px' }}>
        <ApplicantsSidebar />
      </div>

      <div style={{ flex: 1, padding: 0, marginTop: '1px' }}>

        <Tabs
          activeKey={activeKey}
          onSelect={(k) => setActiveKey(k)}
          id="employer-tabs"
          className="px-4"
          style={{ marginTop: '50px' }}
        >
          <Tab
            eventKey="passwordsettings"
            title={
              <>
                <FaKey style={{ marginRight: '8px', ...tabStyles(activeKey === 'passwordsettings') }} />
                <span style={tabStyles(activeKey === 'passwordsettings')}>Password Settings</span>
              </>
            }
          >
            <PasswordSettings />
          </Tab>

          <Tab
            eventKey="accountsettings"
            title={
              <>
                <FaUser style={{ marginRight: '8px', ...tabStyles(activeKey === 'accountsettings') }} />
                <span style={tabStyles(activeKey === 'accountsettings')}>Account Settings</span>
              </>
            }
          >
            <AccountSettings />
          </Tab>
        </Tabs>
      </div>
    </div>
  );
}
