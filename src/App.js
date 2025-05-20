import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './i18n'; // before App is rendered

import Users from './components/Users';
// import Home from './components/Home';   // Home component (or any other components you want)
import Sidebar from './components/SideBar';
import Dashboard from './pages/Dashboard.js';
import Login from './pages/Login.js'
import Register from './pages/Register.js';
const App = () => {
  return (
    <Router>
      <div className="App">
        <div className="flex">

          {/* Main content area */}
          <div className="flex-grow">
            <Routes>
              <Route path="/*" element={<Dashboard/>} />
              <Route path="/login" element={<Login/>} />
              <Route path="/Register" element={<Register/>} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
};

export default App;
