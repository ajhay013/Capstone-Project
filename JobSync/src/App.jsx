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
import JobAlerts from './Pages/Applicants/JobAlerts';
import CompanyProfilePage from './Pages/Employer/CompanyProfile';
import CompanySocialMedia from './Pages/Employer/SocialMedia';
import FoundingInfo from './Pages/Employer/FoundingInfo';
import CompanyContactPage from './Pages/Employer/Contact';
import EmployerDashboard from './Pages/Employer/Dashboard';
import CustomerSupport from './Pages/CustomerSupport';
import HomeEmployer from './Pages/Employer/Home';
import HeaderComponent from './components/HeaderComponent';
import SearchJobs from './components/searchbar';


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
      return <ProtectedRoute> <HomeEmployer /> </ProtectedRoute>;
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
        
        {/* For Applicants */}
        <Route path='/dashboard' element={<ProtectedRoute> <DashboardApplicant /> </ProtectedRoute> } />
        <Route path='/jobAlerts' element={<ProtectedRoute> <JobAlerts /> </ProtectedRoute> } />

        {/* For Employer */}
        <Route path="/home" element={<ProtectedRoute> <HomeEmployer /> </ProtectedRoute> } />
        <Route path='/employer/dashboard' element={<ProtectedRoute> <EmployerDashboard /> </ProtectedRoute> } />
        <Route path='/employer/companyprofile' element={<ProtectedRoute> <CompanyProfilePage /> </ProtectedRoute> } />
        <Route path='/employer/foundinginfo' element={<ProtectedRoute> <FoundingInfo /> </ProtectedRoute> } />
        <Route path='/employer/socialmedia' element={<ProtectedRoute> <CompanySocialMedia /> </ProtectedRoute> } />
        <Route path='/employer/contact' element={<ProtectedRoute> <CompanyContactPage /> </ProtectedRoute> } />
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
