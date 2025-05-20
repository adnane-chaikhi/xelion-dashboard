import React, { useState, useEffect } from 'react';
import { BellAlertIcon } from '@heroicons/react/24/outline';

const alertsMock = [
  {
    id: 'AL-001',
    message: 'Inverter offline at Site A',
    severity: 'critical',
    status: 'open',
    timestamp: '2025-05-19T12:30:00Z',
    site: 'Site A',
  },
  {
    id: 'AL-002',
    message: 'Battery below 20% at Site B',
    severity: 'warning',
    status: 'open',
    timestamp: '2025-05-19T14:00:00Z',
    site: 'Site B',
  },
  {
    id: 'AL-003',
    message: 'No data received from Site C (6h)',
    severity: 'info',
    status: 'acknowledged',
    timestamp: '2025-05-18T18:45:00Z',
    site: 'Site C',
  },
];

const severityStyles = {
  critical: 'bg-red-700 text-red-100',
  warning: 'bg-yellow-600 text-yellow-100',
  info: 'bg-blue-600 text-blue-100',
};

const Alerts = () => {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    setAlerts(alertsMock); // later replace with fetch
  }, []);

  const handleAcknowledge = (id) => {
    setAlerts(prev => prev.map(alert =>
      alert.id === id ? { ...alert, status: 'acknowledged' } : alert
    ));
  };

  return (
    <div className="p-6 bg-[#1f2937] min-h-screen text-white">
      <h1 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <BellAlertIcon className="w-6 h-6 text-yellow-400" /> System Alerts
      </h1>

      <div className="grid gap-4">
        {alerts.map(alert => (
          <div key={alert.id} className="bg-[#111827] p-4 rounded-lg shadow-md">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-semibold mb-1">{alert.message}</p>
                <p className="text-xs text-gray-400">
                  {new Date(alert.timestamp).toLocaleString()} • {alert.site}
                </p>
              </div>
              <span className={`text-xs px-2 py-1 rounded-full ${severityStyles[alert.severity]}`}>
                {alert.severity.charAt(0).toUpperCase() + alert.severity.slice(1)}
              </span>
            </div>

            <div className="mt-3 text-right">
              {alert.status === 'open' ? (
                <button
                  onClick={() => handleAcknowledge(alert.id)}
                  className="text-sm text-yellow-400 hover:underline"
                >
                  Acknowledge
                </button>
              ) : (
                <span className="text-sm text-green-400">Acknowledged</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Alerts;
