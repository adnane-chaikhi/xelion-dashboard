import React, { useState } from 'react';

const initialData = [
  {
    id: 'CL-1001',
    name: 'Fatima Zahra',
    type: 'Residential',
    date: '2025-05-01',
    amount: 420.75,
    status: 'Paid',
  },
  {
    id: 'CL-1002',
    name: 'Youssef Karim',
    type: 'Commercial',
    date: '2025-04-20',
    amount: -150.0,
    status: 'Unpaid',
  },
  {
    id: 'CL-1003',
    name: 'Imane El Arabi',
    type: 'Industrial',
    date: '2025-03-12',
    amount: 560.0,
    status: 'Overdue',
  },
];

export default function Billing() {
  const [data, setData] = useState(initialData);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [showForm, setShowForm] = useState(false);
  const [newBill, setNewBill] = useState({
    id: '',
    name: '',
    type: '',
    date: '',
    amount: '',
    status: 'Unpaid',
  });

  const handleStatusChange = (index, newStatus) => {
    const updated = [...data];
    updated[index].status = newStatus;
    setData(updated);
  };

  const handleDownload = (client) => {
    alert(`Downloading invoice for ${client.name}...`);
  };

  const filteredData = data.filter((client) => {
    const matchesSearch = client.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || client.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalRevenue = data
    .filter((item) => item.amount > 0 && item.status === 'Paid')
    .reduce((sum, item) => sum + item.amount, 0);

  const totalUnpaid = data
    .filter((item) => item.status === 'Unpaid')
    .reduce((sum, item) => sum + item.amount, 0);

  const totalOverdue = data
    .filter((item) => item.status === 'Overdue')
    .reduce((sum, item) => sum + item.amount, 0);

  const handleAddBill = (e) => {
    e.preventDefault();
    if (!newBill.name || !newBill.amount || !newBill.date) return;
    setData([{ ...newBill, amount: parseFloat(newBill.amount) }, ...data]);
    setShowForm(false);
    setNewBill({ id: '', name: '', type: '', date: '', amount: '', status: 'Unpaid' });
  };

  return (
    <div className="p-6 bg-[#172137] min-h-screen text-gray-100">
      <h1 className="text-2xl font-bold mb-6">Billing Overview</h1>

      {/* Billing Analytics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-[#1f2937] p-4 rounded-lg shadow">
          <p className="text-sm text-gray-400">Total Revenue (Paid)</p>
          <p className="text-xl font-bold text-green-400">${totalRevenue.toFixed(2)}</p>
        </div>
        <div className="bg-[#1f2937] p-4 rounded-lg shadow">
          <p className="text-sm text-gray-400">Total Unpaid</p>
          <p className="text-xl font-bold text-yellow-400">${Math.abs(totalUnpaid).toFixed(2)}</p>
        </div>
        <div className="bg-[#1f2937] p-4 rounded-lg shadow">
          <p className="text-sm text-gray-400">Overdue Amount</p>
          <p className="text-xl font-bold text-red-400">${Math.abs(totalOverdue).toFixed(2)}</p>
        </div>
      </div>

      {/* Toggle Add Bill Form */}
      <div className="mb-6">
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-4 py-2 rounded"
        >
          {showForm ? 'Cancel' : 'Add New Bill / Quote'}
        </button>
      </div>

      {/* Hidden Add Bill Form */}
      {showForm && (
        <form onSubmit={handleAddBill} className="bg-[#1f2937] p-6 rounded-lg mb-8 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Client ID"
              className="px-4 py-2 bg-[#111827] border border-gray-700 rounded"
              value={newBill.id}
              onChange={(e) => setNewBill({ ...newBill, id: e.target.value })}
            />
            <input
              type="text"
              placeholder="Full Name"
              className="px-4 py-2 bg-[#111827] border border-gray-700 rounded"
              value={newBill.name}
              onChange={(e) => setNewBill({ ...newBill, name: e.target.value })}
            />
            <input
              type="text"
              placeholder="Installation Type"
              className="px-4 py-2 bg-[#111827] border border-gray-700 rounded"
              value={newBill.type}
              onChange={(e) => setNewBill({ ...newBill, type: e.target.value })}
            />
            <input
              type="date"
              className="px-4 py-2 bg-[#111827] border border-gray-700 rounded"
              value={newBill.date}
              onChange={(e) => setNewBill({ ...newBill, date: e.target.value })}
            />
            <input
              type="number"
              placeholder="Amount"
              className="px-4 py-2 bg-[#111827] border border-gray-700 rounded"
              value={newBill.amount}
              onChange={(e) => setNewBill({ ...newBill, amount: e.target.value })}
            />
            <select
              className="px-4 py-2 bg-[#111827] border border-gray-700 rounded"
              value={newBill.status}
              onChange={(e) => setNewBill({ ...newBill, status: e.target.value })}
            >
              <option value="Paid">Paid</option>
              <option value="Unpaid">Unpaid</option>
              <option value="Overdue">Overdue</option>
            </select>
          </div>
          <button
            type="submit"
            className="mt-4 bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded"
          >
            Add Bill
          </button>
        </form>
      )}

      {/* Table remains unchanged below this line (reuse your table component) */}
      {/* ... billing table code here ... */}
    </div>
  );
}
