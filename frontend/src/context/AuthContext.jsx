// src/context/AuthContext.jsx
import React, { createContext, useState, useContext, useEffect } from 'react';

// 1. Create the Context
const AuthContext = createContext();

// 2. Create the Provider Component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check if user is already logged in on app load
  useEffect(() => {
    const storedUser = localStorage.getItem('vendorBridgeUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  // MOCK LOGIN FUNCTION (Will connect to Spring Boot later)
  const login = async (email, password) => {
    // SIMULATION: In reality, you'd do an axios.post('/api/auth/login') here
    // We are faking a backend response based on the email typed.
    
    let simulatedRole = 'officer'; // Default role
    if (email.includes('vendor')) simulatedRole = 'vendor';
    if (email.includes('manager')) simulatedRole = 'approver';
    if (email.includes('admin')) simulatedRole = 'admin';

    const mockUser = {
      id: Math.floor(Math.random() * 1000),
      email: email,
      role: simulatedRole,
      name: email.split('@')[0], // Just taking the first part of email as name
      token: 'fake-jwt-token-12345'
    };

    setUser(mockUser);
    localStorage.setItem('vendorBridgeUser', JSON.stringify(mockUser));
    return mockUser;
  };

  // MOCK REGISTER FUNCTION
  const register = async (userData) => {
    // SIMULATION: axios.post('/api/auth/register', userData)
    console.log("Registered user:", userData);
    return true; 
  };

  // LOGOUT FUNCTION
  const logout = () => {
    setUser(null);
    localStorage.removeItem('vendorBridgeUser');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

// 3. Custom hook to use the context easily in any file
export const useAuth = () => {
  return useContext(AuthContext);
};