import React, { createContext, useState, useContext } from 'react';

const JobContext = createContext();

export const useJobContext = () => useContext(JobContext);

export const JobProvider = ({ children }) => {
    const [jobData, setJobData] = useState({});

    const resetJobData = () => {
        setJobData({
            jobTitle: '',
            jobDescription: '',
            minSalary: '',
            maxSalary: '',
            expirationDate: '',
        });
    };

    return (
        <JobContext.Provider value={{ jobData, setJobData, resetJobData }}>
            {children}
        </JobContext.Provider>
    );
};
