import React from 'react';
import ApexCharts from 'react-apexcharts'; // Import ApexCharts component

const Analytics = () => {
  // Sample chart data
  const chartData = {
    series: [
      {
        name: 'Revenue',
        data: [1200, 1500, 1800, 2200, 2500, 2700],
      },
      {
        name: 'Jobs Completed',
        data: [100, 120, 150, 180, 210, 240],
      },
    ],
    options: {
      chart: {
        type: 'line',
        height: 350,
        zoom: {
          enabled: true,
        },
      },
      stroke: {
        curve: 'smooth',
      },
      title: {
        text: 'Company Performance',
        align: 'center',
        style: {
          fontSize: '24px',
          fontWeight: 'bold',
          fontFamily: 'Arial, sans-serif',
        },
      },
      xaxis: {
        categories: ['January', 'February', 'March', 'April', 'May', 'June'],
      },
      colors: ['#00E396', '#FF5733'], // Custom chart colors
      markers: {
        size: 5,
      },
      tooltip: {
        theme: 'dark',
      },
    },
  };

  return (
    <div className="p-8 space-y-8 bg-gray-100">
      {/* Analytics Heading */}
      <h2 className="text-3xl font-semibold text-gray-800 mb-6">Company Analytics</h2>

      {/* Cards Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Card 1 - Total Revenue */}
        <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center">
          <h3 className="text-xl font-semibold text-gray-700">Total Revenue</h3>
          <p className="text-2xl font-bold text-green-500 mt-2">$12,340</p>
          <p className="text-sm text-gray-500 mt-1">+10% from last month</p>
        </div>

        {/* Card 2 - New Clients */}
        <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center">
          <h3 className="text-xl font-semibold text-gray-700">New Clients</h3>
          <p className="text-2xl font-bold text-blue-500 mt-2">50</p>
          <p className="text-sm text-gray-500 mt-1">+15% from last month</p>
        </div>

        {/* Card 3 - Jobs Completed */}
        <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center">
          <h3 className="text-xl font-semibold text-gray-700">Jobs Completed</h3>
          <p className="text-2xl font-bold text-yellow-500 mt-2">200</p>
          <p className="text-sm text-gray-500 mt-1">+5% from last month</p>
        </div>
      </div>

      {/* Revenue and Jobs Completed Chart */}
      <div className="bg-white p-6 rounded-lg shadow-md mt-8">
        <ApexCharts
          options={chartData.options}
          series={chartData.series}
          type="line"
          height={350}
        />
      </div>
    </div>
  );
};

export default Analytics;
