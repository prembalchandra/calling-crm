// src/App.jsx

import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import './App.css';

import Login from './LoginComponents/Login';
import AdminDashboard from './LayoutComponents/AdminDashboard';
import SuperAdminDashboard from './LayoutComponents/SuperAdminDashboard';
import Sidebar from './components/MainComponents/sidebar/Sidebar';
import Header from './components/MainComponents/header/Header';

const AppContent = () => {
  const location = useLocation();

  // State to track login status and role
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn') === 'true');
  const [role, setRole] = useState(localStorage.getItem('role'));

  // This effect updates login status if localStorage changes (logout or login)
  useEffect(() => {
    const checkLogin = () => {
      setIsLoggedIn(localStorage.getItem('isLoggedIn') === 'true');
      setRole(localStorage.getItem('role'));
    };
    window.addEventListener('storage', checkLogin);
    return () => window.removeEventListener('storage', checkLogin);
  }, []);

  const showLayout = isLoggedIn && (role === 'admin' || role === 'superadmin');

  return (
    <>
      {showLayout ? (
        <div className="flex">
          <Sidebar />
          <div className="flex-1">
            <Header />
            <Routes>
              {role === 'admin' && (
                <Route path="/admin/*" element={<AdminDashboard />} />
              )}
              {role === 'superadmin' && (
                <Route path="/superadmin/*" element={<SuperAdminDashboard />} />

              )}
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </div>
        </div>
      ) : (
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      )}
    </>
  );
};

const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;
