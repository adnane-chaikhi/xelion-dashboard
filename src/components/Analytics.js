import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const productionData = {
  labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  datasets: [
    {
      label: 'kWh Generated',
      data: [220, 280, 300, 450, 420, 370, 500],
      borderColor: 'rgba(234, 179, 8, 1)',
      backgroundColor: 'rgba(234, 179, 8, 0.2)',
      tension: 0.4,
      fill: true,
    },
  ],
};

const savingsData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      label: 'Savings ($)',
      data: [120, 150, 170, 190, 210, 240],
      borderColor: 'rgba(59, 130, 246, 1)',
      backgroundColor: 'rgba(59, 130, 246, 0.2)',
      tension: 0.4,
      fill: true,
    },
  ],
};

const chartOptions = {
  responsive: true,
  plugins: {
    legend: {
      labels: { color: 'white' }
    },
    title: {
      display: false,
    },
  },
  scales: {
    x: {
      ticks: { color: 'white' },
      grid: { color: '#374151' },
    },
    y: {
      ticks: { color: 'white' },
      grid: { color: '#374151' },
    },
  },
};

export default function DashboardAnalytics() {
  return (
    <div className="p-6 bg-[#1f2937] text-white min-h-screen">
      <h1 className="text-2xl font-bold mb-6">📊 Xelion Dashboard</h1>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Card title="Total Energy Produced" value="12,500 kWh" />
        <Card title="Today’s Output" value="420 kWh" />
        <Card title="Active Installations" value="128" />
        <Card title="Open Maintenance Tasks" value="6" />
      </div>

      {/* Two Charts Side by Side */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div className="bg-[#111827] p-4 rounded-lg">
          <h2 className="text-lg font-semibold mb-4">🔋 Production Trends</h2>
          <Line data={productionData} options={chartOptions} />
        </div>
        <div className="bg-[#111827] p-4 rounded-lg">
          <h2 className="text-lg font-semibold mb-4">💰 Savings Over Time</h2>
          <Line data={savingsData} options={chartOptions} />
        </div>
      </div>

      {/* Maintenance Summary */}
      <div className="bg-[#111827] p-6 rounded-lg mb-8">
        <h2 className="text-lg font-semibold mb-4">🛠️ Recent Maintenance</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-300">
          <div className="p-4 bg-[#1f2937] rounded shadow">
            <p><span className="text-yellow-400 font-semibold">MNT-032</span> - Site C</p>
            <p>Status: <span className="text-yellow-400">In Progress</span></p>
          </div>
          <div className="p-4 bg-[#1f2937] rounded shadow">
            <p><span className="text-green-400 font-semibold">MNT-031</span> - Site A</p>
            <p>Status: <span className="text-green-400">Completed</span></p>
          </div>
          <div className="p-4 bg-[#1f2937] rounded shadow">
            <p><span className="text-red-400 font-semibold">MNT-030</span> - Site B</p>
            <p>Status: <span className="text-red-400">Pending</span></p>
          </div>
        </div>
      </div>

      {/* System Alerts */}
      <div className="bg-[#111827] p-6 rounded-lg">
        <h2 className="text-lg font-semibold mb-4">🚨 System Alerts</h2>
        <ul className="text-sm text-red-400 space-y-2 list-disc pl-6">
          <li>Inverter offline at Site D</li>
          <li>Battery below 20% at Site E</li>
          <li>No data from Site F (12h)</li>
        </ul>
      </div>
    </div>
  );
}

function Card({ title, value }) {
  return (
    <div className="bg-[#111827] p-4 rounded-lg shadow text-center">
      <p className="text-sm text-green-400">{title}</p>
      <p className="text-2xl font-semibold text-green-400">{value}</p>
    </div>
  );
}
