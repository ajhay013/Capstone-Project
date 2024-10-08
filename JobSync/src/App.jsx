import React from 'react';
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

function Layout() {
  const location = useLocation();
  
  const hideSearchJobs = location.pathname === '/registration' || location.pathname === '/registration_employer' || location.pathname === '/signin' || location.pathname === '/email_verification';

  return (
    <>
      <MyNavbar />
      {!hideSearchJobs ? <SearchJobs /> : <LogoIcon />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/findjob' element={<FindJob />} />
        <Route path='/signin' element={<SignInForm />} />
        <Route path='/registration' element={<RegistrationForm />} />
        <Route path='/registration_employer' element={<EmployerRegistrationForm />} />
        <Route path='/email_verification' element={<EmailVerification />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}

export default App;
