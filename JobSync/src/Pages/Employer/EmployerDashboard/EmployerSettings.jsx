import React, { useState } from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import { FaBuilding, FaCalendar, FaLink, FaCogs } from 'react-icons/fa';
import EmployerSidebar from '../../../components/EmployerSidebar';
import CompanySettings from '../../../pages/employer/employerdashboard/employersettings/companysettings';
import FoundingInfo from '../../../pages/employer/employerdashboard/employersettings/foundingsettings';
import SocialMediaInfo from '../../../pages/employer/employerdashboard/employersettings/socmedsettings';
import AccountSettings from '../../../pages/employer/employerdashboard/employersettings/accountsettings';

export default function EmployerSettings() {
  const [activeKey, setActiveKey] = useState('companysettings');

  const tabStyles = (isActive) => ({
    color: isActive ? '#0A65CC' : '#757575',
  });

  return (
    <div className="d-flex">
      <div className="sidebar" style={{ width: '20%', minWidth: '250px' }}>
        <EmployerSidebar />
      </div>

      <div style={{ flex: 1, padding: 0, marginTop: '65px' }}>
        <h3 style={{ marginLeft: '20px', float: 'left' }}>Employer Settings</h3>
        <Tabs
          activeKey={activeKey}
          onSelect={(k) => setActiveKey(k)}
          id="employer-tabs"
          className="px-4"
          style={{ marginTop: '50px' }}
        >
          <Tab
            eventKey="companysettings"
            title={
              <>
                <FaBuilding style={{ marginRight: '8px', ...tabStyles(activeKey === 'companysettings') }} />
                <span style={tabStyles(activeKey === 'companysettings')}>Company Settings</span>
              </>
            }
          >
            <CompanySettings />
          </Tab>

          <Tab
            eventKey="foundingInfo"
            title={
              <>
                <FaCalendar style={{ marginRight: '8px', ...tabStyles(activeKey === 'foundingInfo') }} />
                <span style={tabStyles(activeKey === 'foundingInfo')}>Founding Info</span>
              </>
            }
          >
            <FoundingInfo />
          </Tab>

          <Tab
            eventKey="socialMediaInfo"
            title={
              <>
                <FaLink style={{ marginRight: '8px', ...tabStyles(activeKey === 'socialMediaInfo') }} />
                <span style={tabStyles(activeKey === 'socialMediaInfo')}>Social Media Info</span>
              </>
            }
          >
            <SocialMediaInfo />
          </Tab>

          <Tab
            eventKey="accountSettings"
            title={
              <>
                <FaCogs style={{ marginRight: '8px', ...tabStyles(activeKey === 'accountSettings') }} />
                <span style={tabStyles(activeKey === 'accountSettings')}>Account Settings</span>
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
