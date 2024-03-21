import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Updated import with Routes

import Register from './components/Register';
import Login from './components/Login';
import UserProfile from './components/UserProfile';
import AdminDashboard from './components/AdminDashboard';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token') || '');

  return (
    <Router>
      <Routes> {/* Wrap your Routes in a Routes component */}
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Login setToken={setToken} />} />
        <Route path="/user/profile" element={<UserProfile token={token} />} />
        <Route path="/admin/dashboard" element={<AdminDashboard token={token} />} />
      </Routes>
    </Router>
  );
}

export default App;
