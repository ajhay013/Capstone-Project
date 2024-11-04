import React from 'react';
import { useAuth } from '../AuthContext';
import SearchJobs from './searchbar';
import EmployerHeader from './EmployerHeader';

const USER_TYPES = {
    APPLICANT: 'applicant',
    EMPLOYER: 'employer',
};

function HeaderComponent() {
    const { user } = useAuth();

    const renderHeader = () => {
        if (user && user.userType === USER_TYPES.APPLICANT) {
            return <SearchJobs />;
        } else if (user && user.userType === USER_TYPES.EMPLOYER) {
            return <EmployerHeader />;
        }
    };

    return <div>{renderHeader()}</div>;
}

export default HeaderComponent;
