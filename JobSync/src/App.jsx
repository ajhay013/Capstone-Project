import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import MyNavbar from './components/navbar';
import FindJob from './Pages/FindJob';
import FindEmployer from './Pages/findemployer';
import Home from './Pages/Home';
import RegistrationForm from './Pages/Registration';
import Footer from './components/Footer';
import SignInForm from './Pages/SignInForm';
import EmployerRegistrationForm from './Pages/EmployerRegistration';
import LogoIcon from './components/LogoIcon';
import EmailVerification from './Pages/EmailVerification';
import SignInEmployer from './Pages/SignInEmployer';
import JobDetails from './Pages/JobDetails';
import { AuthProvider, useAuth } from './AuthContext'; 
import DashboardApplicant from './Pages/Applicants/Home';
import Header from './components/header';
import ProtectedRoute from './components/ProtectedRoute';

import CompanyProfilePage from './Pages/Employer/CompanyProfile';
import CompanySocialMedia from './Pages/Employer/SocialMedia';
import FoundingInfo from './Pages/Employer/FoundingInfo';
import CompanyContactPage from './Pages/Employer/Contact';
import JobAlerts from './Pages/Applicants/JobAlerts';

{/* Applicant Dashboard Pages */}
import Overview from './Pages/Applicants/ApplicantDashboard/Overview';
import AppliedJobs from './Pages/Applicants/ApplicantDashboard/AppliedJobs';
import FavoriteJobs from './Pages/Applicants/ApplicantDashboard/FavoriteJobs';
import ApplicantSettings from './Pages/Applicants/ApplicantDashboard/ApplicantSettings';

import EmployerDetails from './Pages/Applicants/employerdetails';

{/* Employer Dashboard Pages */}
import EmployerOverview from './Pages/Employer/EmployerDashboard/EmployerOverview';
import EmployerProfile from './Pages/Employer/EmployerDashboard/EmployerProfile';
import PostJobs from './Pages/Employer/EmployerDashboard/PostJob';
import MyJobs from './Pages/Employer/EmployerDashboard/MyJobs';
import EmployerMessage from './Pages/Employer/EmployerDashboard/EmployerMessage';
import SavedApplicant from './Pages/Employer/EmployerDashboard/SavedApplicant';
import EmployerSettings from './Pages/Employer/EmployerDashboard/EmployerSettings';
import AccountSettings from './pages/employer/employerdashboard/employersettings/accountsettings';


import Step1ScreeningQuestions from './Pages/Employer/EmployerDashboard/EmployerMessage';


import ViewApplications from './Pages/Employer/EmployerDashboard/ViewApplications';

import FindApplicant from './Pages/Employer/findapplicant';
import Applications from './Pages/Employer/Applications';

{/* Employer Settings Pages */}
import CompanySettings from './pages/employer/employerdashboard/employersettings/companysettings';
import SocmedSettings from './pages/employer/employerdashboard/employersettings/socmedsettings';
import FoundingSettings from './pages/employer/employerdashboard/employersettings/foundingsettings';

import EmployerDashboard from './Pages/Employer/Dashboard';
import CustomerSupport from './Pages/CustomerSupport';

import HomeEmployer from './Pages/Employer/Home';
import HeaderComponent from './components/HeaderComponent';
import SearchJobs from './components/searchbar';
import JobsAlert from './Pages/Applicants/ApplicantDashboard/JobsAlert';
import HeaderProgress from './components/headerProgress';
import CompletedProfile from './Pages/Employer/CompletedProfile';
import SemiFooter from './components/SemiFooter';



function Layout({ userId, setUserId }) {
  const location = useLocation();
  const { user } = useAuth();
  const hideSearchJobs = location.pathname === '/registration' || 
                         location.pathname === '/registration_employer' || 
                         location.pathname === '/candidate_login' || 
                         location.pathname === '/employer_login';
  const centeredIcon = location.pathname === '/email_verification';
  
  const hideHeader = location.pathname === '/customersupport';

  const hideFooter = location.pathname === '/employer/companyprofile' ||
                     location.pathname === '/employer/foundinginfo' ||
                     location.pathname === '/employer/socialmedia' ||
                     location.pathname === '/Complete' ||
                     location.pathname === '/complete' ||
                     location.pathname === '/employer/contact';
  
  const hideEmployerHeader = location.pathname === '/employer/companyprofile' ||
                             location.pathname === '/employer/foundinginfo' ||
                             location.pathname === '/employer/socialmedia' ||
                             location.pathname === '/Complete' ||
                             location.pathname === '/complete' ||
                             location.pathname === '/employer/contact';

  const showHeader = ['/findjob', '/jobdetails/:job_id', '/findemployer', '/jobAlerts' , '/employer/findapplicant' , '/employer/applications' ].some((path) =>
    location.pathname.startsWith(path.replace(':job_id', ''))
  );


  const getPageTitle = () => {
    if (location.pathname.startsWith('/jobdetails/')) {
      return 'Job Details';
    }
    switch (location.pathname) {
      case '/findjob':
        return 'Find Job';
      case '/findemployer':
        return 'Employers';
      case '/jobAlerts':
        return 'Job Alert';
      case '/employer/findapplicant':
        return 'Applicants';
      case '/employer/applications':
        return 'Applications';
      default:
        return '';
    }
  };

  const renderHomePage = () => {
    if (!user) {
      return <Home />;
    } else if (user && user.userType === 'applicant') {
      return <Home />;
    } else if (user && user.userType === 'employer') {
      return <ProtectedRoute> <EmployerOverview /> </ProtectedRoute>;
    }
    return <Home />;
  };

  return (
    <>  
      {!hideEmployerHeader && <MyNavbar userId={userId} setUserId={setUserId} />}
      {centeredIcon ? (
          <LogoIcon centered />
      ) : hideEmployerHeader ? (
          <HeaderProgress />
      ) : hideHeader ? (
          <CustomerSupport />
      ) : user ? (
          <HeaderComponent />
      ) : !hideSearchJobs ? (
          <SearchJobs />
      ) : (
          <LogoIcon />
      )}

      {showHeader && <Header pageTitle={getPageTitle()} />}
      <Routes>
        
        <Route path="/" element={renderHomePage()} />
        <Route path='/findjob' element={<FindJob/>} />
        <Route path='/findemployer' element={<FindEmployer />} />
        <Route path='/candidate_login' element={<SignInForm setUserId={setUserId} />} />
        <Route path='/employer_login' element={<SignInEmployer />} />
        <Route path='/registration' element={<RegistrationForm />} />
        <Route path='/registration_employer' element={<EmployerRegistrationForm />} />
        <Route path='/email_verification' element={<EmailVerification />} />
        <Route path="/jobdetails/:job_id" element={<JobDetails />} />

       
        
        {/* For Employer */}
        <Route path="/home" element={<ProtectedRoute> <HomeEmployer /> </ProtectedRoute> } />
        <Route path='/employer/dashboard' element={<ProtectedRoute> <EmployerDashboard /> </ProtectedRoute> } />
        <Route path='/employer/companyprofile' element={<ProtectedRoute> <CompanyProfilePage /> </ProtectedRoute> } />
        <Route path='/employer/foundinginfo' element={<ProtectedRoute> <FoundingInfo /> </ProtectedRoute> } />
        <Route path='/employer/socialmedia' element={<ProtectedRoute> <CompanySocialMedia /> </ProtectedRoute> } />
        <Route path='/employer/contact' element={<ProtectedRoute> <CompanyContactPage /> </ProtectedRoute> } />


        <Route path='/employer/findapplicant' element={<ProtectedRoute> <FindApplicant /> </ProtectedRoute> } />
      
      {/* Applicant Dashboard Routing */}
        <Route path='/applicants/overview' element={<ProtectedRoute> <Overview /> </ProtectedRoute> } />
        <Route path='/applicants/appliedjobs' element={<ProtectedRoute><AppliedJobs /> </ProtectedRoute> } />
        <Route path='/applicants/favoritejobs' element={<ProtectedRoute> <FavoriteJobs /> </ProtectedRoute>} />
        <Route path='/applicants/jobsalert' element={<ProtectedRoute> <JobsAlert /> </ProtectedRoute>} />
        <Route path='/applicants/applicantsettings' element={<ProtectedRoute> <ApplicantSettings /> </ProtectedRoute>} />

        <Route path='/employerdetails' element={<ProtectedRoute> <EmployerDetails /> </ProtectedRoute>} />
  

      {/* Employer Dashboard Routing */}
        <Route path='/employer/overview' element={<ProtectedRoute> <EmployerOverview /> </ProtectedRoute>} />
        <Route path='/employer/profile' element={<ProtectedRoute> <EmployerProfile /> </ProtectedRoute>} />
        <Route path='/employer/postjob' element={ <ProtectedRoute> <PostJobs /> </ProtectedRoute> } />
        <Route path='/employer/myjobs' element={<ProtectedRoute> <MyJobs /> </ProtectedRoute>} />
        <Route path='/employer/message' element={<ProtectedRoute> <EmployerMessage /> </ProtectedRoute>} />
        <Route path='/employer/savedapplicant' element={<ProtectedRoute> <SavedApplicant /> </ProtectedRoute>} />  
        <Route path='/employer/settings' element={<ProtectedRoute> <EmployerSettings /> </ProtectedRoute>} />

        <Route path='/viewapplications/:job_id' element={<ProtectedRoute> <ViewApplications /> </ProtectedRoute>} />
        <Route path='/employer/applications' element={<ProtectedRoute> <Applications /> </ProtectedRoute>} />  


        <Route path='/employer/employermessage' element={<ProtectedRoute> <Step1ScreeningQuestions /> </ProtectedRoute>} />
      
      {/* Employer Settings Routing */}
        <Route path='/employer/employersettings/companysettings' element={<ProtectedRoute> <CompanySettings /> </ProtectedRoute> } />
        <Route path='/employer/emoployersettings/foundingsettings' element={<ProtectedRoute> <FoundingSettings /> </ProtectedRoute>} />
        <Route path='/employer/employersettings/socmedsettings' element={<ProtectedRoute> <SocmedSettings /> </ProtectedRoute>} />
        <Route path='/employer/employersettings/accountsettings' element={ <ProtectedRoute><AccountSettings /> </ProtectedRoute>} />
      


      </Routes>
      {!hideFooter ? <Footer /> : <SemiFooter />}
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
          <Layout />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
