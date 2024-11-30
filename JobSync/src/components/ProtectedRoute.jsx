import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../AuthContext'; 

const ProtectedRoute = ({ children }) => {
    const { user, loading } = useAuth(); 
    if (loading) {
        return <div id="preloader"></div>;
    }

    if (!user) {
        return <Navigate to="/candidate_login" />;
    }

    return children; 
};

export default ProtectedRoute;
