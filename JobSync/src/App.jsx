import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import MyNavbar from './components/navbar';
import SearchJobs from './components/searchbar';
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
import { AuthProvider } from './AuthContext'; 
import DashboardApplicant from './Pages/Applicants/Home';
import Header from './components/header';
import ProtectedRoute from './components/ProtectedRoute'; // Import the ProtectedRoute component
import JobAlerts from './Pages/Applicants/JobAlerts';

function Layout({ userId, setUserId }) {
  const location = useLocation();

  const hideSearchJobs = location.pathname === '/registration' || 
                         location.pathname === '/registration_employer' || 
                         location.pathname === '/candidate_login' || 
                         location.pathname === '/email_verification' || 
                         location.pathname === '/employer_login';

  const showHeader = 
                     location.pathname === '/findjob' || 
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
    }
  };
  
  return (
    <>  
      <MyNavbar userId={userId} setUserId={setUserId} />
      {!hideSearchJobs ? <SearchJobs /> : <LogoIcon />}
      {showHeader && <Header pageTitle={getPageTitle()} />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/findjob' element={<FindJob/>} />
        <Route path='/candidate_login' element={<SignInForm setUserId={setUserId} />} />
        <Route path='/employer_login' element={<SignInEmployer />} />
        <Route path='/registration' element={<RegistrationForm />} />
        <Route path='/registration_employer' element={<EmployerRegistrationForm />} />
        <Route path='/email_verification' element={<EmailVerification />} />
        <Route path='/dashboard' element={<ProtectedRoute> <DashboardApplicant /> </ProtectedRoute> } />
        <Route path='/jobAlerts' element={<ProtectedRoute> <JobAlerts /> </ProtectedRoute> } />
        <Route path='/jobdetails' element={<JobDetails />} />
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
