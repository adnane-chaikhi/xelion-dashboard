import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Users from '../components/Users';
// import Home from './components/Home';   // Home component (or any other components you want)
import Sidebar from '../components/SideBar';
import Installations from './Installations';
import Settings from './Settings';
import Billing  from './Billing';
import Maintenance from './Maintenance';
import Analytics from '../components/Analytics';
import Alerts from './Alerts';
import EnergyProduction from './EnergyProduction';
const Dashboard = () => {
  const currentUser = { role: 'Admin' }; // Or 'Admin', 'Support', etc.

  const allowedRoutes = {
    Admin: ['users', 'installations', 'billing', 'settings'],
    Technician: ['installations'],
    Support: ['settings'],
  };
  const canAccess = (route) => allowedRoutes[currentUser.role]?.includes(route);

  return (
    
      <div className="App">
        <div className="flex">
          {/* Sidebar is always visible */}
          <Sidebar />

          {/* Main content area */}
          <div className="flex-grow">
            <Routes>
              <Route path="/" element={<Analytics />} />
              <Route path="/users" element={<Users />} />
              <Route path="/installations" element={<Installations />} />
              {canAccess('billing') && <Route path="/billing" element={<Billing />} />}
              <Route path="/maintenance" element={<Maintenance/>} />
              <Route path="/energy_production" element={<EnergyProduction/>} />
              <Route path="/alerts" element={<Alerts/>} />
              <Route path="/settings" element={<Settings/>} />
            </Routes>
          </div>
        </div>
      </div>

  );
};

export default Dashboard;
