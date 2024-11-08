import React, { useState } from 'react';
import EmployerSidebar from '../../../components/EmployerSidebar';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';  // import styles for the editor
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function PostJobs() {
    const [jobTitle, setJobTitle] = useState('');
    const [jobTags, setJobTags] = useState('');
    const [jobRole, setJobRole] = useState('');
    const [minSalary, setMinSalary] = useState('');
    const [maxSalary, setMaxSalary] = useState('');
    const [salaryType, setSalaryType] = useState('');
    const [education, setEducation] = useState('');
    const [experience, setExperience] = useState('');
    const [jobType, setJobType] = useState('');
    const [expirationDate, setExpirationDate] = useState(new Date());
    const [jobLevel, setJobLevel] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [selectedBenefits, setSelectedBenefits] = useState([]);
    const [jobDescription, setJobDescription] = useState('');

    const handleBenefitSelect = (benefit) => {
        if (selectedBenefits.includes(benefit)) {
            setSelectedBenefits(selectedBenefits.filter(item => item !== benefit));
        } else {
            setSelectedBenefits([...selectedBenefits, benefit]);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log({
            jobTitle,
            jobTags,
            jobRole,
            minSalary,
            maxSalary,
            salaryType,
            education,
            experience,
            jobType,
            expirationDate,
            jobLevel,
            address,
            city,
            selectedBenefits,
            jobDescription,
        });
    };

    const jobBenefits = [
        'Health Insurance', 'Paid Time Off', '401(k)', 'Bonuses', 'Work from Home', 
        'Paid Holidays', 'Gym Membership', 'Stock Options', 'Retirement Plans', 'Child Care',
        'Dental Insurance', 'Life Insurance', 'Flexible Hours', 'Commuter Benefits', 'Tuition Reimbursement',
        'Relocation Assistance', 'Employee Assistance Program', 'Pet Insurance', 'Mental Health Days', 'Disability Insurance'
    ];

    return (
        <div className="d-flex">
            <div className="sidebar" style={{ width: '20%', minWidth: '250px' }}>
                <EmployerSidebar />
            </div>
            <div className="content" style={{ width: '80%', marginTop: '60px', textAlign: 'left' }}>
                <h2 style={{ fontSize: '24px', color: '#333', fontWeight: 'bold', marginBottom: '20px', marginTop: '25px', marginLeft: '20px' }}>
                    Post Jobs
                </h2>
                <form onSubmit={handleSubmit} style={{ marginLeft: '20px', textAlign: 'left' }}>
                    {/* Job Title and Tags */}
                    <div className="form-group" style={{ marginBottom: '20px' }}>
                        <label htmlFor="jobTitle" style={{ fontWeight: 'bold' }}>Job Title</label>
                        <input
                            type="text"
                            id="jobTitle"
                            value={jobTitle}
                            onChange={(e) => setJobTitle(e.target.value)}
                            className="form-control"
                            style={{ width: '100%' }}
                            placeholder="Add job title"
                            required
                        />
                    </div>
                    <div className="form-row" style={{ marginBottom: '20px', display: 'flex', gap: '30px' }}>
                        <div className="form-group" style={{ flex: '1.5', marginRight: '30px' }}>
                            <label htmlFor="jobTags" style={{ fontWeight: 'bold' }}>Job Tags</label>
                            <input
                                type="text"
                                id="jobTags"
                                value={jobTags}
                                onChange={(e) => setJobTags(e.target.value)}
                                className="form-control"
                                style={{ width: '100%' }}
                                placeholder="Job keywords, tags"
                                required
                            />
                        </div>
                        <div className="form-group" style={{ flex: '1' }}>
                            <label htmlFor="jobRole" style={{ fontWeight: 'bold' }}>Job Role</label>
                            <input
                                type="text"
                                id="jobRole"
                                value={jobRole}
                                onChange={(e) => setJobRole(e.target.value)}
                                className="form-control"
                                style={{ width: '100%' }}
                                placeholder="Add job role"
                                required
                            />
                        </div>
                    </div>
                 {/* Salary Section */}
                    <div className="form-group" style={{ marginBottom: '20px' }}>
                        <label style={{ fontWeight: 'bold' }}>Salary</label>
                            <div className="form-row" style={{ display: 'flex', gap: '20px', marginTop: '10px' }}>
        
                {/* Min Salary Dropdown */}
                    <div className="form-group" style={{ flex: '1' }}>
                        <label htmlFor="minSalary" style={{ fontWeight: 'bold' }}>Min Salary</label>
                    <select
                        id="minSalary"
                        value={minSalary}
                        onChange={(e) => setMinSalary(e.target.value)}
                        className="form-control"
                        required
                    >
                        <option value="" disabled>Select min salary</option>
                        <option value="30000">30,000</option>
                        <option value="40000">40,000</option>
                        <option value="50000">50,000</option>
                        <option value="60000">60,000</option>
                    </select>
                </div>

                {/* Max Salary Dropdown */}
                    <div className="form-group" style={{ flex: '1' }}>
                        <label htmlFor="maxSalary" style={{ fontWeight: 'bold' }}>Max Salary</label>
                <select
                    id="maxSalary"
                    value={maxSalary}
                    onChange={(e) => setMaxSalary(e.target.value)}
                    className="form-control"
                    required
                >
                    <option value="" disabled>Select max salary</option>
                    <option value="80000">80,000</option>
                    <option value="90000">90,000</option>
                    <option value="100000">100,000</option>
                    <option value="120000">120,000</option>
                </select>
                </div>


                            <div className="form-group" style={{ flex: '1' }}>
                                <label htmlFor="salaryType" style={{ fontWeight: 'bold' }}>Salary Type</label>
                                <select
                                    id="salaryType"
                                    value={salaryType}
                                    onChange={(e) => setSalaryType(e.target.value)}
                                    className="form-control"
                                    required
                                >
                                    <option value="" disabled>Select type</option>
                                    <option value="hourly">Hourly</option>
                                    <option value="monthly">Monthly</option>
                                    <option value="yearly">Yearly</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Advanced Information Section */}
<div className="form-group" style={{ marginBottom: '20px', padding: '20px', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
    <label style={{ fontWeight: 'bold' }}>Advanced Information</label>
    <div className="form-row" style={{ display: 'flex', gap: '20px', marginTop: '10px' }}>
        {/* Education Dropdown */}
        <div className="form-group" style={{ flex: '1' }}>
            <label htmlFor="education" style={{ fontWeight: 'bold' }}>Education</label>
            <select
                id="education"
                value={education}
                onChange={(e) => setEducation(e.target.value)}
                className="form-control"
                required
            >
                <option value="" disabled>Select education level</option>
                <option value="High School">High School</option>
                <option value="Associate Degree">Associate Degree</option>
                <option value="Bachelor's Degree">Bachelor's Degree</option>
                <option value="Master's Degree">Master's Degree</option>
                <option value="Doctorate">Doctorate</option>
            </select>
        </div>

        {/* Experience Dropdown */}
        <div className="form-group" style={{ flex: '1' }}>
            <label htmlFor="experience" style={{ fontWeight: 'bold' }}>Experience</label>
            <select
                id="experience"
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                className="form-control"
                required
            >
                <option value="" disabled>Select experience level</option>
                <option value="Entry Level">Entry Level</option>
                <option value="Mid Level">Mid Level</option>
                <option value="Senior Level">Senior Level</option>
                <option value="Manager">Manager</option>
                <option value="Director">Director</option>
            </select>
        </div>

        {/* Job Type Dropdown */}
        <div className="form-group" style={{ flex: '1' }}>
            <label htmlFor="jobType" style={{ fontWeight: 'bold' }}>Job Type</label>
            <select
                id="jobType"
                value={jobType}
                onChange={(e) => setJobType(e.target.value)}
                className="form-control"
                required
            >
                <option value="" disabled>Select job type</option>
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Contract">Contract</option>
                <option value="Temporary">Temporary</option>
                <option value="Internship">Internship</option>
            </select>
        </div>
    </div>


                   {/* Expiration Date and Job Level */}
                    <div className="form-row" style={{ display: 'flex', gap: '20px', marginTop: '20px' }}>
                        <div className="form-group" style={{ flex: '1' }}>
                            <label 
                            htmlFor="expirationDate" 
                            style={{ fontWeight: 'bold', display: 'block', marginBottom: '8px' }}
                        >
                            Expiration Date
                        </label>
                    <DatePicker
                        selected={expirationDate}
                        onChange={(date) => setExpirationDate(date)}
                        className="form-control"
                        dateFormat="yyyy-MM-dd"
                        placeholderText="Select a date"
                        required
                    />
                </div>

                    <div className="form-group" style={{ flex: '1' }}>
                        <label htmlFor="jobLevel" style={{ fontWeight: 'bold' }}>Job Level</label>
                            <select
                                id="jobLevel"
                                value={jobLevel}
                                onChange={(e) => setJobLevel(e.target.value)}
                                className="form-control"
                                required
                            >
                                <option value="" disabled>Select job level</option>
                                <option value="Entry">Entry</option>
                                <option value="Mid">Mid</option>
                                <option value="Senior">Senior</option>
                                <option value="Manager">Manager</option>
                                <option value="Director">Director</option>
                                <option value="Executive">Executive</option>
                            </select>
                        </div>
                    </div>

                    </div>

                    {/* Location Section */}
                    <div className="form-group" style={{ marginBottom: '20px', padding: '20px', backgroundColor: '#D9D9D9', borderRadius: '8px' }}>
                        <label style={{ fontWeight: 'bold', color: 'black' }}>Location</label>
                        <div className="form-row" style={{ display: 'flex', gap: '20px', marginTop: '10px' }}>
                            <div className="form-group" style={{ flex: '1' }}>
                                <label htmlFor="address" style={{ fontWeight: 'bold', color: 'black' }}>Address</label>
                                <input
                                    type="text"
                                    id="address"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    className="form-control"
                                    placeholder="Enter address"
                                    required
                                />
                            </div>
                            <div className="form-group" style={{ flex: '1' }}>
                                <label htmlFor="city" style={{ fontWeight: 'bold', color: 'black' }}>City</label>
                                <input
                                    type="text"
                                    id="city"
                                    value={city}
                                    onChange={(e) => setCity(e.target.value)}
                                    className="form-control"
                                    placeholder="Enter city"
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    {/* Job Benefits Section */}
                    <div className="form-group" style={{ marginBottom: '20px', padding: '20px' }}>
                        <label style={{ fontWeight: 'bold' }}>Job Benefits</label>
                        <div className="d-flex flex-wrap" style={{ gap: '10px', marginTop: '10px' }}>
                            {jobBenefits.map((benefit, index) => (
                                <button
                                    key={index}
                                    type="button"
                                    onClick={() => handleBenefitSelect(benefit)}
                                    className={`btn btn-outline-secondary ${selectedBenefits.includes(benefit) ? 'active' : ''}`}
                                    style={{
                                        marginBottom: '10px',
                                        backgroundColor: selectedBenefits.includes(benefit) ? '#007bff' : 'transparent',
                                        color: selectedBenefits.includes(benefit) ? 'white' : '#333',
                                        borderColor: selectedBenefits.includes(benefit) ? '#007bff' : '#ddd',
                                    }}
                                    onMouseEnter={(e) => {
                                        e.target.style.backgroundColor = selectedBenefits.includes(benefit) ? '#0056b3' : '#f0f0f0';
                                        e.target.style.borderColor = selectedBenefits.includes(benefit) ? '#0056b3' : '#bbb';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.target.style.backgroundColor = selectedBenefits.includes(benefit) ? '#007bff' : 'transparent';
                                        e.target.style.borderColor = selectedBenefits.includes(benefit) ? '#007bff' : '#ddd';
                                    }}
                                >
                                    {benefit}
                                </button>
                            ))}
                        </div>
                    </div>

                     {/* Job Description Section */}
                     <div className="form-group" style={{ marginBottom: '20px' }}>
                        <label htmlFor="jobDescription" style={{ fontWeight: 'bold' }}>Job Description</label>
                        <ReactQuill
                            value={jobDescription}
                            onChange={setJobDescription}
                            placeholder="Describe the job"
                            className="form-control"
                            style={{ width: '100%' }}
                        />
                    </div>

                    <button type="submit" className="btn btn-primary" style={{ marginTop: '20px' , width: '150px' }}>Post Job</button>
                </form>
            </div>
        </div>
    );
}
