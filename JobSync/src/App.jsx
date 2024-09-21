// src/App.js
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { FaBriefcase, FaBuilding, FaUser, FaPlus } from 'react-icons/fa';

import MyNavbar from './components/navbar';
import Searchbar from './components/searchbar';

function App() {
  return (
    <BrowserRouter>
      <MyNavbar />
      <Searchbar />

      <Routes>
        <Route
          path="/"
          element={
            <div>
              <header className="text-center py-4">
                <h1>Find a job that suits your interest & skills.</h1>
              </header>
              <main className="container">
                <div className="search-bar d-flex justify-content-center align-items-center my-4">
                            
                </div>
                <div className="suggestions text-center mb-4">
                  <p>Suggestion: Designer, Programming, Digital Marketing, Video, Animation</p>
                </div>
                <div className="statistics d-flex justify-content-between">
                  <div className="text-center">
                    <FaBriefcase size={50} className="mb-2" />
                    <p>1,75,324 Live Jobs</p>
                  </div>
                  <div className="text-center">
                    <FaBuilding size={50} className="mb-2" />
                    <p>97,354 Companies</p>
                  </div>
                  <div className="text-center">
                    <FaUser size={50} className="mb-2" />
                    <p>38,47,154 Candidates</p>
                  </div>
                  <div className="text-center">
                    <FaPlus size={50} className="mb-2" />
                    <p>7,532 New Jobs</p>
                  </div>
                </div>
              </main>
            </div>
          }
        />
        {/* Add other routes as needed */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
