import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null); 
    const [loading, setLoading] = useState(true); 

    const loadUserFromLocalStorage = () => {
        const savedUser = localStorage.getItem('user');
        if (savedUser) {
            console.log("Fetched user from localStorage: ", savedUser);
            setUser(JSON.parse(savedUser));
        } else {
            console.log("No user found in localStorage.");
            setUser(null);
        }
        setLoading(false); 
    };

    useEffect(() => {
        console.log("Loading user from localStorage on component mount.");
        loadUserFromLocalStorage();

        const handleStorageChange = (event) => {
            if (event.key === 'user') {
                if (event.newValue === null) {
                    console.log("User logged out in another tab.");
                    setUser(null); 
                } else {
                    console.log("localStorage 'user' changed, reloading user.");
                    loadUserFromLocalStorage(); 
                }
            }
        };

        window.addEventListener('storage', handleStorageChange);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    const login = (userData) => {
        console.log("Logging in with user data: ", userData);
        if (userData) {
            setUser(userData); 
            localStorage.setItem('user', JSON.stringify(userData)); 
            console.log("User data saved to localStorage: ", JSON.stringify(userData));
        } else {
            console.error("Invalid user data. Cannot login.");
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user'); 
        console.log("User logged out and localStorage cleared");
        window.dispatchEvent(new Event('storage'));
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
