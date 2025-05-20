import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar, Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

export default function EnergyProduction() {
  const { t } = useTranslation();

  const weeklyData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: t('weekly_output'),
        data: [420, 460, 500, 550, 530, 490, 510],
        backgroundColor: 'rgba(234, 179, 8, 0.6)',
        borderColor: 'rgba(234, 179, 8, 1)',
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          color: 'white'
        }
      }
    },
    scales: {
      x: {
        ticks: { color: 'white' },
        grid: { color: '#374151' },
      },
      y: {
        ticks: { color: 'white' },
        grid: { color: '#374151' },
      }
    }
  };

  return (
    <div className="p-6 bg-[#1f2937] text-white min-h-screen">
      <h1 className="text-2xl font-bold mb-6">{t('energy_production')}</h1>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <Card title={t('total_energy')} value="125,000 kWh" />
        <Card title={t('today_output')} value="420 kWh" />
        <Card title={t('co2_savings')} value="78 tons" />
      </div>

      {/* Chart */}
      <div className="bg-[#111827] p-6 rounded-lg shadow-lg">
        <h2 className="text-lg font-semibold mb-4">{t('production_trends')}</h2>
        <Bar data={weeklyData} options={chartOptions} />
      </div>
    </div>
  );
}

function Card({ title, value }) {
  return (
    <div className="bg-[#111827] p-4 rounded shadow text-center">
      <p className="text-sm text-green-300">{title}</p>
      <p className="text-2xl font-semibold text-green-400">{value}</p>
    </div>
  );
}
