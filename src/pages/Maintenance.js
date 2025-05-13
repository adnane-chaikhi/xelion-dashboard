import React, { useState } from 'react';

const initialData = [
  {
    id: 'MNT-001',
    site: 'Site A',
    equipment: 'Inverter',
    type: 'Preventive',
    date: '2025-05-20',
    technician: 'Ali',
    status: 'In Progress',
  },
  {
    id: 'MNT-002',
    site: 'Site B',
    equipment: 'Panel Array',
    type: 'Corrective',
    date: '2025-05-22',
    technician: 'Imane',
    status: 'Pending',
  },
];

const statusColors = {
  'Pending': 'bg-yellow-600',
  'In Progress': 'bg-blue-600',
  'Completed': 'bg-green-600',
};

const statusOptions = ['Pending', 'In Progress', 'Completed'];

export default function MaintenanceListView() {
  const [maintenanceData, setMaintenanceData] = useState(initialData);
  const [openDropdownIndex, setOpenDropdownIndex] = useState(null);

  const handleStatusChange = (index, newStatus) => {
    const updated = [...maintenanceData];
    updated[index].status = newStatus;
    setMaintenanceData(updated);
    setOpenDropdownIndex(null);
  };

  return (
    <div className="p-6 bg-[#1f2937] min-h-screen text-white">
      <h1 className="text-2xl font-bold mb-6">🔧 Maintenance Tasks</h1>

      <div className="overflow-x-auto bg-[#111827] rounded-lg shadow">
        <table className="min-w-full text-sm text-left">
          <thead className="text-gray-400 uppercase bg-[#0f172a]">
            <tr>
              <th className="p-4">ID</th>
              <th className="p-4">Site</th>
              <th className="p-4">Equipment</th>
              <th className="p-4">Type</th>
              <th className="p-4">Date</th>
              <th className="p-4">Technician</th>
              <th className="p-4">Status</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {maintenanceData.map((task, index) => (
              <tr key={task.id} className="border-t border-gray-700 hover:bg-[#2a2f3b]">
                <td className="p-4 font-medium">{task.id}</td>
                <td className="p-4">{task.site}</td>
                <td className="p-4">{task.equipment}</td>
                <td className="p-4">{task.type}</td>
                <td className="p-4">{task.date}</td>
                <td className="p-4">{task.technician || '—'}</td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${statusColors[task.status]}`}>
                    {task.status}
                  </span>
                </td>
                <td className="p-4 relative">
                  <button
                    onClick={() =>
                      setOpenDropdownIndex(
                        openDropdownIndex === index ? null : index
                      )
                    }
                    className="text-xs px-3 py-1 bg-[#374151] hover:bg-yellow-600 rounded-md"
                  >
                    Change
                  </button>
                  {openDropdownIndex === index && (
                    <div className="absolute mt-2 right-0 bg-[#1f2937] border border-gray-700 rounded-md shadow-md z-10">
                      {statusOptions.map(
                        (option) =>
                          option !== task.status && (
                            <div
                              key={option}
                              onClick={() => handleStatusChange(index, option)}
                              className="px-4 py-2 text-sm text-white hover:bg-yellow-600 cursor-pointer"
                            >
                              Mark as {option}
                            </div>
                          )
                      )}
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
