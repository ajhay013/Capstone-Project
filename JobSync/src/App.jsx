import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import MyNavbar from './components/navbar';
import FindJob from './Pages/FindJob';
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



{/* Employer Dashboard Pages */}
import EmployerOverview from './Pages/Employer/EmployerDashboard/EmployerOverview';
import EmployerProfile from './Pages/Employer/EmployerDashboard/EmployerProfile';
import PostJobs from './Pages/Employer/EmployerDashboard/PostJob';
import MyJobs from './Pages/Employer/EmployerDashboard/MyJobs';
import EmployerMessage from './Pages/Employer/EmployerDashboard/EmployerMessage';
import SavedApplicant from './Pages/Employer/EmployerDashboard/SavedApplicant';
import EmployerSettings from './Pages/Employer/EmployerDashboard/EmployerSettings';

{/* Employer Settings Pages */}
import CompanySettings from './pages/employer/employerdashboard/employersettings/companysettings';
import SocmedSettings from './pages/employer/employerdashboard/employersettings/socmedsettings';
import FoundingSettings from './pages/employer/employerdashboard/employersettings/foundingsettings';
import AccountSettings from './pages/employer/employerdashboard/employersettings/accountsettings';

import EmployerDashboard from './Pages/Employer/Dashboard';
import CustomerSupport from './Pages/CustomerSupport';

import HomeEmployer from './Pages/Employer/Home';
import HeaderComponent from './components/HeaderComponent';
import SearchJobs from './components/searchbar';
import JobsAlert from './Pages/Applicants/ApplicantDashboard/JobsAlert';



function Layout({ userId, setUserId }) {
  const location = useLocation();
  const { user } = useAuth();
  const hideSearchJobs = location.pathname === '/registration' || 
                         location.pathname === '/registration_employer' || 
                         location.pathname === '/candidate_login' || 
                         location.pathname === '/employer_login';
  const centeredIcon = location.pathname === '/email_verification';
  const hideHeader = location.pathname === '/customersupport';
  const showHeader = location.pathname === '/findjob' || 
                     location.pathname === '/employers' || 
                     location.pathname === '/jobAlerts' || 
                     location.pathname === '/jobdetails';
  const getPageTitle = () => {
    switch (location.pathname) {
      case '/findjob':
        return 'Find Job';
      case '/jobdetails':
        return 'Job Details';
      case '/employers':
        return 'Employers';
      case '/jobAlerts':
        return 'Job Alert';
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
      <MyNavbar userId={userId} setUserId={setUserId} />
      {centeredIcon ? (
          <LogoIcon centered />
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
        <Route path='/candidate_login' element={<SignInForm setUserId={setUserId} />} />
        <Route path='/employer_login' element={<SignInEmployer />} />
        <Route path='/registration' element={<RegistrationForm />} />
        <Route path='/registration_employer' element={<EmployerRegistrationForm />} />
        <Route path='/email_verification' element={<EmailVerification />} />
        <Route path='/jobdetails' element={<JobDetails />} />
        
        {/* For Employer */}
        <Route path="/home" element={<ProtectedRoute> <HomeEmployer /> </ProtectedRoute> } />
        <Route path='/employer/dashboard' element={<ProtectedRoute> <EmployerDashboard /> </ProtectedRoute> } />
        <Route path='/employer/companyprofile' element={<ProtectedRoute> <CompanyProfilePage /> </ProtectedRoute> } />
        <Route path='/employer/foundinginfo' element={<ProtectedRoute> <FoundingInfo /> </ProtectedRoute> } />
        <Route path='/employer/socialmedia' element={<ProtectedRoute> <CompanySocialMedia /> </ProtectedRoute> } />
        <Route path='/employer/contact' element={<ProtectedRoute> <CompanyContactPage /> </ProtectedRoute> } />
      
      {/* Applicant Dashboard Routing */}
        <Route path='/applicants/overview' element={<ProtectedRoute> <Overview /> </ProtectedRoute> } />
        <Route path='/applicants/appliedjobs' element={<ProtectedRoute><AppliedJobs /> </ProtectedRoute> } />
        <Route path='/applicants/favoritejobs' element={<ProtectedRoute> <FavoriteJobs /> </ProtectedRoute>} />
        <Route path='/applicants/jobsalert' element={<ProtectedRoute> <JobsAlert /> </ProtectedRoute>} />
        <Route path='/applicants/applicantsettings' element={<ProtectedRoute> <ApplicantSettings /> </ProtectedRoute>} />
  

      {/* Employer Dashboard Routing */}
        <Route path='/employer/overview' element={<ProtectedRoute> <EmployerOverview /> </ProtectedRoute>} />
        <Route path='/employer/profile' element={<ProtectedRoute> <EmployerProfile /> </ProtectedRoute>} />
        <Route path='/employer/postjob' element={ <ProtectedRoute> <PostJobs /> </ProtectedRoute> } />
        <Route path='/employer/myjobs' element={<ProtectedRoute> <MyJobs /> </ProtectedRoute>} />
        <Route path='/employer/message' element={<ProtectedRoute> <EmployerMessage /> </ProtectedRoute>} />
        <Route path='/employer/savedapplicant' element={<ProtectedRoute> <SavedApplicant /> </ProtectedRoute>} />  
        <Route path='/employer/settings' element={<ProtectedRoute> <EmployerSettings /> </ProtectedRoute>} />
      
      {/* Employer Settings Routing */}
        <Route path='/employer/employerdashboard/employersettings/companysettings' element={ <CompanySettings /> } />
        <Route path='/employer/employerdashboard/emoployersettings/foundingsettings' element={ <FoundingSettings /> } />
        <Route path='/employer/employerdashboard/employersettings/socmedsettings' element={ <SocmedSettings /> } />
        <Route path='/employer/employerdashboard/employersettings/accountsettings' element={ <AccountSettings /> } />
      
      </Routes>
      <Footer />
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
