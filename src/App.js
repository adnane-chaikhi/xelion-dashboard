import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './components/Dashboard/Dashboard'; // Adjust the path if needed

function App() {
  return (
    <Router>
      <Routes>
        {/* Redirect the root path to /dashboard */}
        <Route path="/" element={<Navigate to="/dashboard" />} />
        
        {/* Route for /dashboard */}
        <Route path="/dashboard/*" element={<Dashboard />} />
        
        {/* route for login */}
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
