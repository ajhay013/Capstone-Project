import React, { useState, useEffect } from 'react';
import EmployerSidebar from '../../../components/EmployerSidebar';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from 'react-router-dom';
import { useJobContext } from '../../../JobContext';

export default function PostJobs() {
    const navigate = useNavigate();
    const [minSalary, setMinSalary] = useState('');
    const [maxSalary, setMaxSalary] = useState('');
    const [expirationDate, setExpirationDate] = useState(new Date());
    const [selectedBenefits, setSelectedBenefits] = useState([]);
    const { jobData, setJobData } = useJobContext();
    const [formData, setFormData] = useState(jobData || {}); 


    const handleBenefitSelect = (benefit) => {
        setSelectedBenefits((prev) => {
            const newSelection = prev.includes(benefit)
                ? prev.filter((item) => item !== benefit)  
                : [...prev, benefit];  
    
            setFormData((prevFormData) => ({
                ...prevFormData,
                selectedBenefits: newSelection, 
            }));
    
            return newSelection;
        });
    };
    useEffect(() => {
        if (formData.selectedBenefits) {
            setSelectedBenefits(formData.selectedBenefits);  
        }
    }, [formData.selectedBenefits]);
    
    const handleMinSalaryChange = (e) => {
        let value = e.target.value;
        value = value.replace(/[^0-9]/g, ''); 
    
        if (value.length > 3) {
            value = value.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }
    
        setMinSalary(value); 
        setFormData((prev) => ({ ...prev, minSalary: value })); 
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
        setFormData((prev) => ({ ...prev, maxSalary: value }));
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
    const handleChange = (e) => {
        const { name, value } = e.target || e;  
        
        if (name === 'minSalary') {
            handleMinSalaryChange(e); 
        } else if (name === 'maxSalary') {
            handleMaxSalaryChange(e);
        } else if (name === 'expirationDate') {
            setExpirationDate(value);
            setFormData((prev) => ({ ...prev, expirationDate: value })); 
        } else if (name === 'selectedBenefits') {
            setFormData((prev) => ({ ...prev, selectedBenefits }));
        } else {
            setFormData((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handleNext = () => {
        setJobData(formData); 
        window.scrollTo({ top: 0, behavior: 'smooth' });
        navigate('/step2', { state: { jobData: formData } });
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
                <form style={{ marginLeft: '20px', textAlign: 'left' }}>
                    <div className="form-group" style={{ padding: '0 20px' }}>
                        <label htmlFor="jobTitle" style={{ fontWeight: '500', color: '#454545', fontSize: '14px'}}>Job Title</label>
                            <input
                                type="text"
                                id="jobTitle"
                                name="jobTitle" 
                                value={formData.jobTitle || ''} 
                                onChange={handleChange}
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
                                name="jobTags"
                                value={formData.jobTags || ''}
                                onChange={handleChange}
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
                                name="jobRole"
                                value={formData.jobRole || ''}
                                onChange={handleChange}
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
                                        value={formData.minSalary || ''}
                                        onChange={handleChange}                                                                               
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
                                        value={formData.maxSalary || ''}
                                        onChange={handleChange}           
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
                                    name="salaryType" 
                                    value={formData.salaryType || ''}
                                    onChange={handleChange}                         
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
                    <div
                        className="form-group"
                        style={{
                           
                            padding: '20px',
                        }}
                    >
                        <label style={{ fontWeight: '500', color: '#454545', fontSize: '19px'}}>Advanced Information</label>

                        <div
                            className="form-row"
                            style={{ display: 'flex', gap: '20px', marginTop: '10px' }}
                        >
                            <div className="form-group" style={{ flex: '1' }}>
                                <label htmlFor="education" style={{ fontWeight: '500', fontSize: '14px', color: '#454545' }}>Education</label>
                                <select
                                    id="education"
                                    name="education"
                                    value={formData.education || ''}
                                    onChange={handleChange}                              
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
                            <div className="form-group" style={{ flex: '1' }}>
                                <label htmlFor="experience" style={{ fontWeight: '500', fontSize: '14px', color: '#454545' }}>Experience</label>
                                <select
                                    id="experience"
                                    name='experience'
                                    value={formData.experience || ''}
                                    onChange={handleChange}                        
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
                            <div className="form-group" style={{ flex: '1' }}>
                                <label htmlFor="jobType" style={{ fontWeight: '500', color: '#454545', fontSize: '14px'}}>Job Type</label>
                                <select
                                    id="jobType"
                                    name='jobType'
                                    value={formData.jobType || ''}
                                    onChange={handleChange}                        
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

                            <div className="form-row" style={{ display: 'flex', gap: '20px', marginTop: '20px' }}>
                                <div className="form-group" style={{ flex: '1' }}>
                                    <label 
                                        htmlFor="expirationDate" 
                                        style={{ fontWeight: '500', display: 'block', fontSize: '14px' }}
                                    >
                                        Expiration Date
                                    </label>
                                    <DatePicker
                                        id="expirationDate"
                                        name="expirationDate"
                                        selected={formData.expirationDate}
                                        onChange={(date) => handleChange({ target: { name: 'expirationDate', value: date } })}
                                        className="form-control register1"
                                        required
                                        dateFormat="MM-dd-yyyy" 
                                        placeholderText="Select a date" 
                                    />

                                </div>
                            <div className="form-group" style={{ flex: '1' }}>
                                <label htmlFor="jobLevel" style={{ fontWeight: '500', color: '#454545', fontSize: '14px'}}>Job Level</label>
                                    <select
                                        id="jobLevel"
                                        name='jobLevel'
                                        value={formData.jobLevel || ''}
                                        onChange={handleChange}                                  
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
                    <div className="form-group" style={{ padding: '20px', backgroundColor: '#f4f4f4', borderRadius: '8px' }}>
                        <label style={{ fontWeight: '500', color: '#454545', fontSize: '19px'}}>Location</label>
                        <div className="form-row" style={{ display: 'flex', gap: '20px', marginTop: '10px' }}>
                            <div className="form-group" style={{ flex: '1' }}>
                                <label htmlFor="address" style={{ fontWeight: '500', color: '#454545', fontSize: '14px'}}>Address</label>
                                <input
                                    type="text"
                                    id="address"
                                    name='address'
                                    value={formData.address || ''}
                                    onChange={handleChange}                        
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
                                    name='city'
                                    value={formData.city  || ''}
                                    onChange={handleChange}                   
                                    className="form-control register1"
                                    placeholder="Enter city"
                                    required
                                />
                            </div>
                        </div>
                    </div>
                    <div className="form-group" style={{ padding: '20px' }}>
                        <label style={{ fontWeight: '500', color: '#454545', fontSize: '19px' }}>Job Benefits</label>
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
                    <div className="form-group" style={{ padding: '0px 20px' }}>
                        <label htmlFor="jobDescription" className='mb-2' style={{ fontWeight: '500', color: '#454545', fontSize: '19px'}}>Job Description</label>
                        <ReactQuill
                            value={formData.jobDescription || ''}
                            onChange={(value) => handleChange({ target: { name: 'jobDescription', value } })}
                            theme="snow"
                            placeholder="Describe the job"
                            className="form-control"
                            style={{ width: '100%' }}
                            modules={modules} 
                        />
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' , marginTop: '40px'}}>
                        <button
                            type="button"
                            className="btn btn-primary"
                            style={{ marginLeft: '50px', marginTop: '15px', width: '150px', padding: '11px' }}
                            onClick={handleNext}
                        >
                            Next
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
