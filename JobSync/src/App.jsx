import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import MyNavbar from './components/navbar';
import SearchJobs from './components/searchbar';
import FindJob from './Pages/FindJob';
import Home from './Pages/Home';
import RegistrationForm from './Pages/Registration';
import SignInForm from './Pages/SignInForm';
import EmployerRegistrationForm from './Pages/EmployerRegistration';
import LogoIcon from './components/LogoIcon';
import EmailVerification from './Pages/EmailVerification';
import SignInEmployer from './Pages/SignInEmployer';
import { AuthProvider } from './AuthContext'; 
import DashboardApplicant from './Pages/Applicants/Dashboard';

function Layout({ userId, setUserId }) {
  const location = useLocation();

  const hideSearchJobs = location.pathname === '/registration' || location.pathname === '/registration_employer' || location.pathname === '/candidate_login' || location.pathname === '/email_verification' || location.pathname === '/employer_login';

  return (
    <>
      <MyNavbar userId={userId} setUserId={setUserId} />
      {!hideSearchJobs ? <SearchJobs /> : <LogoIcon />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/findjob' element={<FindJob />} />
        <Route path='/candidate_login' element={<SignInForm setUserId={setUserId} />} />
        <Route path='/employer_login' element={<SignInEmployer />} />
        <Route path='/registration' element={<RegistrationForm />} />
        <Route path='/registration_employer' element={<EmployerRegistrationForm />} />
        <Route path='/email_verification' element={<EmailVerification />} />
        <Route path='/dashboard' element={<DashboardApplicant />} />
      </Routes>
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
