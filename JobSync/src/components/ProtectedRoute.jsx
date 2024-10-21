import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../AuthContext'; // Adjust the import path as necessary

const ProtectedRoute = ({ children }) => {
    const { user, loading } = useAuth(); // Access user and loading state from AuthContext

    if (loading) {
        // Render a loading indicator while the auth state is being determined
        return <div>Loading...</div>;
    }

    if (!user) {
        // If there is no user, redirect to login
        return <Navigate to="/candidate_login" />;
    }

    return children; // If user exists, render the children (protected component)
};

export default ProtectedRoute;
