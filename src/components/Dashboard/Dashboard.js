import React, { useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Analytics from './Analytics';
import Sidebar from './SideBar';
import Header from './Header';
import Bookings from './Bookings';
import axios from 'axios';

const Dashboard = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifySession = async () => {
      try {
        const response = await axios.get('http://localhost/cleanease/backend/controllers/login.php', {
          withCredentials: true, // Ensure cookies are sent
        });

        if (!response.data.success) {
          console.log(response);
          navigate('/login');
         
          
           // Redirect if session is invalid
        }
      } catch (error) {
        console.log("error");
        navigate('/login'); // Redirect on error
      } finally {
        setLoading(false);
      }
    };

    verifySession();
  }, [navigate]);

  if (loading) {
    return <div>Loading...</div>; // Show loading state while checking session
  }

  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 px-8 bg-gray-100">
        <Header />
        <Routes>
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/bookings" element={<Bookings />} />
          <Route path="/" element={<Analytics />} />
        </Routes>
      </main>
    </div>
  );
};

export default Dashboard;
