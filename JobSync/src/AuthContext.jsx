import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null); // Start with null
    const [loading, setLoading] = useState(true); // New loading state

    // Function to fetch user from localStorage and update state
    const loadUserFromLocalStorage = () => {
        const savedUser = localStorage.getItem('user');
        if (savedUser) {
            console.log("Fetched user from localStorage: ", savedUser);
            setUser(JSON.parse(savedUser));
        } else {
            console.log("No user found in localStorage.");
            setUser(null);
        }
        setLoading(false); // Set loading to false after fetching user
    };

    // On mount, load the user from localStorage
    useEffect(() => {
        console.log("Loading user from localStorage on component mount.");
        loadUserFromLocalStorage();

        const handleStorageChange = (event) => {
            if (event.key === 'user') {
                if (event.newValue === null) {
                    console.log("User logged out in another tab.");
                    setUser(null); // Clear user if it was logged out
                } else {
                    console.log("localStorage 'user' changed, reloading user.");
                    loadUserFromLocalStorage(); // Reload user if localStorage changes
                }
            }
        };

        // Add event listener for storage changes
        window.addEventListener('storage', handleStorageChange);

        // Clean up the event listener on component unmount
        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    const login = (userData) => {
        console.log("Logging in with user data: ", userData);
        if (userData) {
            setUser(userData); // Save user in state
            localStorage.setItem('user', JSON.stringify(userData)); // Save user in localStorage
            console.log("User data saved to localStorage: ", JSON.stringify(userData));
        } else {
            console.error("Invalid user data. Cannot login.");
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user'); // Remove user from localStorage
        console.log("User logged out and localStorage cleared");
        // Emit an event for other tabs
        window.dispatchEvent(new Event('storage')); // Trigger a storage event
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
