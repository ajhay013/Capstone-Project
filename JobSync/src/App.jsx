import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import MyNavbar from './components/navbar';
import SearchJobs from './components/searchbar';
import FindJob from './Pages/FindJob';
import Home from './Pages/Home';
import RegistrationForm from './Pages/Registration';
import SignInForm from './Pages/SignInForm';




function App() {
  return (
    <BrowserRouter>
      <MyNavbar />
      <SearchJobs />
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path='/findjob' element={<FindJob />} />
        <Route path='/signin' element={<SignInForm />} />
        <Route path='/registration' element={<RegistrationForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
