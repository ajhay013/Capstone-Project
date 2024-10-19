import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const savedUser = sessionStorage.getItem('user');
        console.log("Fetched user from sessionStorage: ", savedUser);
        return savedUser ? JSON.parse(savedUser) : null;
    });

    const login = (userData) => {
        // Assuming userData includes a userType property
        console.log("Logging in with user data: ", userData); 
        setUser(userData); // Save user in state
        sessionStorage.setItem('user', JSON.stringify(userData)); // Save user in session storage
        console.log("User data saved to sessionStorage");
    };

    const logout = () => {
        setUser(null); 
        sessionStorage.removeItem('user'); 
        console.log("User logged out and sessionStorage cleared");
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
