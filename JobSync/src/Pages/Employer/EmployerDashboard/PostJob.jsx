import React, { useState } from 'react';
import EmployerSidebar from '../../../components/EmployerSidebar';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useAuth } from '../../../AuthContext'; 
import { useNavigate } from 'react-router-dom';
import { postToEndpoint } from '../../../components/apiService';
import Swal from 'sweetalert2';


export default function PostJobs() {
    const { user } = useAuth(); 
    const navigate = useNavigate();
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
    const handleMinSalaryChange = (e) => {
        let value = e.target.value;
        value = value.replace(/[^0-9]/g, '');
    
        if (value.length > 3) {
            value = value.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }
        setMinSalary(value); 
    };
    
    const handleKeyDown = (e) => {
        const currentValue = e.target.value;
        if (currentValue.length === 0 && e.key === '0') {
            e.preventDefault();
        }
    
        if (!/[0-9]/.test(e.key) && e.key !== 'Backspace' && e.key !== 'Delete' 
            && e.key !== 'Tab' && e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') {
            e.preventDefault();
        }
    };
    
    const handleMaxSalaryChange = (e) => {
        let value = e.target.value;
        value = value.replace(/[^0-9]/g, '');
    
        if (value.length > 3) {
            value = value.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }
        setMaxSalary(value);
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const cleanedBenefits = selectedBenefits
            .map(benefit => benefit.trim())  
            .filter(benefit => benefit !== "") 
            .join(', '); 
        const jobData = {
            employer_id: user?.id,
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
            selectedBenefits: cleanedBenefits,
            jobDescription,
        };
        try {
            await postToEndpoint('/postJobs.php', jobData);
            Swal.fire({
                icon: 'success',
                title: 'Job Saved!',
                text: 'Your job was posted successfully.',
                showCancelButton: true,
                cancelButtonText: 'Close',
                confirmButtonText: 'Go to My Jobs',
                allowOutsideClick: false, 
                allowEscapeKey: false     
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/employer/myjobs');
                    setTimeout(() => {
                        window.scrollTo(0, 0);
                    }, 300);
                } else {
                    Swal.close();
                    setTimeout(() => {
                        window.scrollTo(0, 0);
                    }, 300);
                }
            });
    
            resetForm();
        } catch (error) {
            console.error('Error saving job:', error);
    
            Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'There was an issue saving the job. Please try again.',
                confirmButtonText: 'Close',
            });
        }
    };
    
    
    
    const resetForm = () => {
        setJobTitle('');
        setJobTags('');
        setJobRole('');
        setMinSalary('');
        setMaxSalary('');
        setSalaryType('');
        setEducation('');
        setExperience('');
        setJobType('');
        setExpirationDate(new Date());
        setJobLevel('');
        setAddress('');
        setCity('');
        setSelectedBenefits([]);
        setJobDescription('');
    };

    const jobBenefits = [
        'Health Insurance', 'Paid Time Off', '401(k)', 'Bonuses', 'Work from Home',
        'Paid Holidays', 'Gym Membership', 'Stock Options', 'Retirement Plans', 'Child Care',
        'Dental Insurance', 'Life Insurance', 'Flexible Hours', 'Commuter Benefits', 'Tuition Reimbursement',
        'Relocation Assistance', 'Employee Assistance Program', 'Pet Insurance', 'Mental Health Days', 'Disability Insurance'
    ];

    const modules = {
        toolbar: [
            [{ 'header': [null, '3'] }],
            [{ 'font': [] }],
            [{ 'size': ['small', 'medium', 'large'] }],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            [{ 'align': [] }],
            ['bold', 'italic', 'underline', 'strike'],
            ['link'],
            ['blockquote', 'code-block'],
            [{ 'color': [] }, { 'background': [] }],
            ['clean'],
        ],
    };
    
    const handleNextClick = () => {
        const Jobdata = {
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
        };
        navigate('/step2', { state: Jobdata }); // Pass data as state
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    return (
        <div className="d-flex">
            <div className="sidebar" style={{ width: '20%', minWidth: '250px' }}>
                <EmployerSidebar />
            </div>
            <div className="content" style={{ width: '80%', marginTop: '60px', textAlign: 'left' }}>
                <h2 style={{
                    fontSize: '24px', color: '#626262', fontWeight: '600',
                    marginTop: '25px', marginLeft: '40px'
                }}>
                    Post Jobs
                </h2>
                <form onSubmit={handleSubmit} style={{ marginLeft: '20px', textAlign: 'left' }}>
                    {/* Job Title and Tags */}
                    <div className="form-group" style={{ padding: '0 20px' }}>
                        <label htmlFor="jobTitle" style={{ fontWeight: '500', color: '#454545', fontSize: '14px'}}>Job Title</label>
                        <input
                            type="text"
                            id="jobTitle"
                            value={jobTitle}
                            onChange={(e) => setJobTitle(e.target.value)}
                            className="form-control register1"
                            style={{ width: '100%' }}
                            placeholder="Add job title"
                            required
                        />
                    </div>
                    <div className="form-row" style={{ display: 'flex', gap: '30px', padding: '20px',}}>
                        <div className="form-group" style={{ flex: '1.5', marginRight: '30px' }}>
                            <label htmlFor="jobTags" style={{ fontWeight: '500', color: '#454545', fontSize: '14px'}}>Job Tags</label>
                            <input
                                type="text"
                                id="jobTags"
                                value={jobTags}
                                onChange={(e) => setJobTags(e.target.value)}
                                className="form-control register1"
                                style={{ width: '100%' }}
                                placeholder="Job keywords, tags"
                                required
                            />
                        </div>
                        <div className="form-group" style={{ flex: '1' }}>
                            <label htmlFor="jobRole" style={{ fontWeight: '500', color: '#454545', fontSize: '14px'}}>Job Role</label>
                            <input
                                type="text"
                                id="jobRole"
                                value={jobRole}
                                onChange={(e) => setJobRole(e.target.value)}
                                className="form-control register1"
                                style={{ width: '100%' }}
                                placeholder="Add job role"
                                required
                            />
                        </div>
                    </div>

                    <div className="form-group" style={{ padding: '20px' }}>
                        <label style={{ fontWeight: '500', color: '#454545', fontSize: '19px'}}>Salary</label>
                        <div className="form-row" style={{ display: 'flex', gap: '20px', marginTop: '10px' }}>
                            <div className="form-group" style={{ flex: '1' }}>
                                <label htmlFor="minSalary" style={{ fontWeight: '500', color: '#454545', fontSize: '14px'}}>Min Salary</label>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <input 
                                        type="text" 
                                        className="form-control register1" 
                                        style={{ backgroundColor: '#eee', width: '50px', marginRight: '-1px', borderRadius: '10px 0px 0px 10px', textAlign: 'center', fontWeight: '500'}} 
                                        value="₱" 
                                        disabled 
                                    />
                                    <input
                                        id="minSalary"
                                        name="minSalary"
                                        value={minSalary}
                                        onChange={handleMinSalaryChange}
                                        onKeyDown={handleKeyDown}
                                        className="form-control register1"
                                        style={{ flex: '1', appearance: 'textfield', borderRadius: '0px 10px 10px 0px' }}
                                        placeholder="Minimum salary..."
                                        required
                                    />
                                </div>
                            </div>

                            <div className="form-group" style={{ flex: '1' }}>
                                <label htmlFor="maxSalary" style={{ fontWeight: '500', color: '#454545', fontSize: '14px'}}>Max Salary</label>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <input 
                                        type="text" 
                                        className="form-control register1" 
                                        style={{ backgroundColor: '#eee', width: '50px', marginRight: '-1px', borderRadius: '10px 0px 0px 10px', textAlign: 'center', fontWeight: '500'}} 
                                        value="₱" 
                                        disabled 
                                    />
                                    <input
                                        id="maxSalary"
                                        name="maxSalary"
                                        value={maxSalary}
                                        onChange={handleMaxSalaryChange}
                                        onKeyDown={handleKeyDown}
                                        className="form-control register1"
                                        style={{ flex: '1', appearance: 'textfield', borderRadius: '0px 10px 10px 0px' }}
                                        placeholder="Maximum salary..."
                                        required
                                    />
                                </div>

                            </div>

                            <div className="form-group" style={{ flex: '1' }}>
                                <label htmlFor="salaryType" style={{ fontWeight: '500', color: '#454545', fontSize: '14px'}}>Salary Type</label>
                                <select
                                    id="salaryType"
                                    value={salaryType}
                                    onChange={(e) => setSalaryType(e.target.value)}
                                    className="form-control register1"
                                    required
                                >
                                    <option value="" disabled>Select type</option>
                                    <option value="Hourly">Hourly</option>
                                    <option value="Monthly">Monthly</option>
                                    <option value="Yearly">Yearly</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Advanced Information Section */}
                    <div
                        className="form-group"
                        style={{
                           
                            padding: '20px',
                        }}
                    >
                        <label style={{ fontWeight: '500', color: '#454545', fontSize: '19px'}}>Advanced Information</label>

                        {/* First Row: Min Salary, Max Salary, and Job Type */}
                        <div
                            className="form-row"
                            style={{ display: 'flex', gap: '20px', marginTop: '10px' }}
                        >
                        {/* Education Dropdown */}
                            <div className="form-group" style={{ flex: '1' }}>
                                <label htmlFor="education" style={{ fontWeight: '500', fontSize: '14px', color: '#454545' }}>Education</label>
                                <select
                                    id="education"
                                    value={education}
                                    onChange={(e) => setEducation(e.target.value)}
                                    className="form-control register1"
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
                                <label htmlFor="experience" style={{ fontWeight: '500', fontSize: '14px', color: '#454545' }}>Experience</label>
                                <select
                                    id="experience"
                                    value={experience}
                                    onChange={(e) => setExperience(e.target.value)}
                                    className="form-control register1"
                                    required
                                >
                                    <option value="" disabled>Select experience level</option>
                                    <option value="1 year - 2 years">1 year - 2 years</option>
                                    <option value="3 years - 4 years">3 years - 4 years</option>
                                    <option value="5 years - 6 years">5 years - 6 years</option>
                                    <option value="7 years and Above">7 years and Above</option>
                                </select>
                            </div>

                            {/* Job Type Dropdown */}
                            <div className="form-group" style={{ flex: '1' }}>
                                <label htmlFor="jobType" style={{ fontWeight: '500', color: '#454545', fontSize: '14px'}}>Job Type</label>
                                <select
                                    id="jobType"
                                    value={jobType}
                                    onChange={(e) => setJobType(e.target.value)}
                                    className="form-control register1"
                                    required
                                >
                                    <option value="" disabled>Select job type</option>
                                    <option value="Full-time">Full-time</option>
                                    <option value="Part-time">Part-time</option>
                                    <option value="Temporary">Temporary</option>
                                    <option value="Contract">Contract</option>
                                    <option value="Freelance">Freelance</option>
                                    <option value="Internship">Internship</option>
                                </select>
                            </div>
                        </div>

                            {/* Second Row: Expiration Date and Job Level */}
                            <div className="form-row" style={{ display: 'flex', gap: '20px', marginTop: '20px' }}
    
    
                            >
                            {/* Expiration Date */}
                            <div className="form-group" style={{ flex: '1' }}>
                                <label htmlFor="expirationDate" style={{ fontWeight: '500', display: 'block', fontSize: '14px'}}>Expiration Date</label>
                                    <DatePicker
                                        id="expirationDate"
                                        selected={expirationDate}
                                        onChange={(date) => setExpirationDate(date)}
                                        className="form-control register1"
                                        required
                                    />
                            </div>

                            {/* Job Level */}
                            <div className="form-group" style={{ flex: '1' }}>
                                <label htmlFor="jobLevel" style={{ fontWeight: '500', color: '#454545', fontSize: '14px'}}>Job Level</label>
                                    <select
                                        id="jobLevel"
                                        value={jobLevel}
                                        onChange={(e) => setJobLevel(e.target.value)}
                                        className="form-control register1"
                                        required
                                    >
                                    <option value="" disabled>Select job level</option>
                                    <option value="Entry Level">Entry Level</option>
                                    <option value="Mid Level">Mid Level</option>
                                    <option value="Senior Level">Senior Level</option>
                                    <option value="Manager Level">Manager Level</option>
                                    <option value="Director Level">Director Level</option>
                                    <option value="Executive Level">Executive Level</option>
                                    </select>
                                </div>
                            </div>
                        </div>


                    {/* Location Section */}
                    <div className="form-group" style={{ padding: '20px', backgroundColor: '#f4f4f4', borderRadius: '8px' }}>
                        <label style={{ fontWeight: '500', color: '#454545', fontSize: '19px'}}>Location</label>
                        <div className="form-row" style={{ display: 'flex', gap: '20px', marginTop: '10px' }}>
                            <div className="form-group" style={{ flex: '1' }}>
                                <label htmlFor="address" style={{ fontWeight: '500', color: '#454545', fontSize: '14px'}}>Address</label>
                                <input
                                    type="text"
                                    id="address"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    className="form-control register1"
                                    placeholder="Enter address"
                                    required
                                />
                            </div>
                            <div className="form-group" style={{ flex: '1' }}>
                                <label htmlFor="city" style={{ fontWeight: '500', color: '#454545', fontSize: '14px'}}>City</label>
                                <input
                                    type="text"
                                    id="city"
                                    value={city}
                                    onChange={(e) => setCity(e.target.value)}
                                    className="form-control register1"
                                    placeholder="Enter city"
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    {/* Job Benefits Section */}
                    <div className="form-group" style={{ padding: '20px' }}>
                        <label style={{ fontWeight: '500', color: '#454545', fontSize: '19px'}}>Job Benefits</label>
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
                                        color: selectedBenefits.includes(benefit) ? '#0056b3' : '#333',
                                        borderColor: selectedBenefits.includes(benefit) ? '#007bff' : '#ddd',
                                    }}
                                    onMouseEnter={(e) => {
                                        e.target.style.backgroundColor = selectedBenefits.includes(benefit) ? '#007bff59' : '#f0f0f0';
                                        e.target.style.borderColor = selectedBenefits.includes(benefit) ? '#0056b3' : '#bbb';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.target.style.backgroundColor = selectedBenefits.includes(benefit) ? '#007bff59' : 'transparent';
                                        e.target.style.borderColor = selectedBenefits.includes(benefit) ? '#007bff' : '#ddd';
                                    }}
                                >
                                    {benefit}
                                </button>
                            ))}
                        </div>
                    </div>

                     {/* Job Description Section */}
                     <div className="form-group" style={{ padding: '0px 20px' }}>
                        <label htmlFor="jobDescription" className='mb-2' style={{ fontWeight: '500', color: '#454545', fontSize: '19px'}}>Job Description</label>
                        <ReactQuill
                            value={jobDescription}
                            onChange={setJobDescription}
                            theme="snow"
                            placeholder="Describe the job"
                            className="form-control"
                            style={{ width: '100%' }}
                            modules={modules} 
                        />
                    </div>



                    {/* Next Button */}
                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' , marginTop: '40px'}}>
                        <button
                            type="button"
                            className="btn btn-primary"
                            style={{ marginLeft: '50px', marginTop: '15px', width: '150px', padding: '11px' }}
                            onClick={handleNextClick}
                        >
                            Next
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
