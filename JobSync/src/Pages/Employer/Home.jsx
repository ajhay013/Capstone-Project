import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../App.css';
import { FaBriefcase, FaBuilding, FaUser, FaPlus } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import JobSyncFlow from '../../components/jobsyncflow.jsx';
import PopularCategories from '../../components/popularcategories';
import JobCards from '../../components/jobcards';

export default function Home() {
    return (
        <div> 
            <header className="container text-center py-4">
                <div className="row align-items-center">
                    {/* Column for the text */}
                    <div className="col-md-7 text-md-start text-center">
                        <h1>Find a job that suits<br />your interest & skills.</h1>
                    </div>
                    
                    {/* Column for the image */}
                    <div className="col-md-4 text-md-end text-center">
                        <img 
                            src="https://i0.wp.com/freelancemethod.com/wp-content/uploads/2021/06/blogging.png?resize=768%2C576&ssl=1" 
                            alt="Job search" 
                            className="img-fluid" 
                            style={{ maxWidth: '120%' }} 
                        />
                    </div>
                </div>
            </header>

            <main className="container" style={{ marginTop: '50px'}}>
                <div className="search-bar d-flex justify-content-center align-items-center my-4">
                    {/* Search bar content */}
                </div>

                <div className="suggestions text-md-start mb-4">
                    <p style={{fontWeight:'600'}}>Suggestion: Designer, Programming, Digital Marketing, Video, Animation</p>
                </div>

                <div className="statistics d-flex justify-content-between">
                    <div className="text-center border p-3 d-flex align-items-center justify-content-center">
                        <FaBriefcase size={50} style={{backgroundColor: '#E7F0FA', marginRight: '20px', padding: '10px', borderRadius: '10px', color:'#0A65CC' }} className="mb-2" />
                        <p className="mb-0" style={{fontWeight: '600'}}>1,75,324<br />Live Jobs</p>
                    </div>
                    <div className="text-center border p-3 d-flex align-items-center justify-content-center">
                        <FaBuilding size={50} style={{backgroundColor: '#0A65CC', marginRight: '20px', padding: '10px', borderRadius: '10px', color:'#FFFFFF' }} className="mb-2" />
                        <p className="mb-0" style={{fontWeight: '600'}}>97,354<br />Companies</p>
                    </div>
                    <div className="text-center border p-3 d-flex align-items-center justify-content-center">
                        <FaUser size={50} style={{backgroundColor: '#E7F0FA', marginRight: '20px', padding: '10px', borderRadius: '10px', color:'#0A65CC' }} className="mb-2" />
                        <p className="mb-0" style={{fontWeight: '600'}}>38,47,154<br />Candidates</p>
                    </div>
                    <div className="text-center border p-3 d-flex align-items-center justify-content-center">
                        <FaPlus size={50} style={{backgroundColor: '#E7F0FA', marginRight: '20px', padding: '10px', borderRadius: '10px', color:'#0A65CC' }} className="me-2" />
                        <p className="mb-0" style={{fontWeight: '600'}}>7,532<br />New Jobs</p>
                    </div>
                </div>

                {/* JobSyncFlow Component */}
                <div className="my-5">
                    <JobSyncFlow />
                </div>

                 {/* Popular Categories Section */}
                 <div className="my-5">
                    <PopularCategories />
                </div>

                <div>
            {/* Featured Job Header */}
            <div className="d-flex justify-content-between align-items-center my-5">
                <h4>Featured Jobs</h4>
                <Link to="/findjob" style={{ textDecoration: 'none', color: '#0A65CC' }}>
                    <div className="d-flex align-items-center">
                        <span>View All</span>
                        <i className="fas fa-arrow-right ms-2"></i>
                    </div>
                </Link>
            </div>

            {/* Job Cards Section */}
            <div className="my-5">
                <JobCards />
            </div>
        </div>

            </main>
        </div>
    );
}
