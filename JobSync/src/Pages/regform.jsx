import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';


import MyNavbar from './components/navbar';
import Searchbar from './components/searchbar';
import RegistrationForm from './components/registration';

function App() {
  return (
    <BrowserRouter>
      <MyNavbar />
      <Searchbar />

      <Routes>
   
      
        {/* Registration Route */}
        <Route path="/registration" element={<RegistrationForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
