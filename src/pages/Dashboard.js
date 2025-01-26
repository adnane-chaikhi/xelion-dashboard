import React from 'react';
import Sidebar from '../components/SideBar'; // Assuming Sidebar.js is in the same directory

const Dashboard = () => {
  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 p-8 bg-gray-100">
        {/* Example Section 1 */}
        <section className="mb-8">
          <h2 className="text-3xl font-semibold mb-4">Dashboard Overview</h2>
          <p className="text-lg">Here you can view key statistics and data...</p>
        </section>

        {/* Example Section 2 */}
        <section className="mb-8">
          <h2 className="text-3xl font-semibold mb-4">Recent Bookings</h2>
          <p className="text-lg">Details of the most recent bookings...</p>
        </section>

        {/* Example Section 3 */}
        <section className="mb-8">
          <h2 className="text-3xl font-semibold mb-4">Services Overview</h2>
          <p className="text-lg">Overview of available services...</p>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
