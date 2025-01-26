import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Analytics from './Analytics'; // Ensure the import path is correct
import Sidebar from './SideBar'; // Assuming Sidebar.js is in the same directory
import Header from './Header';
import Bookings from './Bookings';

const Dashboard = () => {
  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 px-8 bg-gray-100">
        <Header/>
        <Routes>
          {/* Nested route for /dashboard/analytics */}
          <Route path="/analytics" element={<Analytics />} />
           {/* Default route for /bookings */}
          <Route path="/bookings" element={<Bookings />} />
          
          {/* Default route for /dashboard */}
          <Route path="/" element={<Analytics />} />
        </Routes>
      </main>
    </div>
  );
};

export default Dashboard;
