import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null); 
    const [loading, setLoading] = useState(true); 

    const loadUserFromLocalStorage = () => {
        const savedUser = localStorage.getItem('user');
        if (savedUser) {
            setUser(JSON.parse(savedUser));
        } else {
            setUser(null);
        }
        setLoading(false); 
    };

    useEffect(() => {
        loadUserFromLocalStorage();

        const handleStorageChange = (event) => {
            if (event.key === 'user') {
                if (event.newValue === null) {
                    setUser(null); 
                } else {
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
        if (userData) {
            setUser(userData); 
            localStorage.setItem('user', JSON.stringify(userData)); 
        } else {
            console.error("Invalid user data. Cannot login.");
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user'); 
        window.dispatchEvent(new Event('storage'));
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
