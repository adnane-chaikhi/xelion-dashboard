import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const initialData = [
  { id: 'CL-1001', name: 'Fatima Zahra', type: 'Residential', date: '2025-05-01', amount: 420.75, status: 'Paid' },
  { id: 'CL-1002', name: 'Youssef Karim', type: 'Commercial', date: '2025-04-20', amount: -150.0, status: 'Unpaid' },
  { id: 'CL-1003', name: 'Imane El Arabi', type: 'Industrial', date: '2025-03-12', amount: 560.0, status: 'Overdue' },
];

export default function Billing() {
  const { t } = useTranslation();

  const [data, setData] = useState(initialData);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [formType, setFormType] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const [newEntry, setNewEntry] = useState({
    id: '',
    name: '',
    type: '',
    date: '',
    amount: '',
    status: 'Unpaid',
  });

  const handleAddEntry = (e) => {
    e.preventDefault();
    if (!newEntry.name || !newEntry.amount || !newEntry.date) return;
    setData([{ ...newEntry, amount: parseFloat(newEntry.amount) }, ...data]);
    setShowForm(false);
    setNewEntry({ id: '', name: '', type: '', date: '', amount: '', status: 'Unpaid' });
  };

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

  const totalRevenue = data.filter(d => d.status === 'Paid').reduce((acc, d) => acc + d.amount, 0);
  const totalUnpaid = data.filter(d => d.status === 'Unpaid').reduce((acc, d) => acc + d.amount, 0);
  const totalOverdue = data.filter(d => d.status === 'Overdue').reduce((acc, d) => acc + d.amount, 0);

  const openForm = (type) => {
    setFormType(type);
    setShowForm(true);
    setDropdownOpen(false);
  };

  return (
    <div className="p-6 bg-[#172137] min-h-screen text-gray-100">
      <h1 className="text-2xl font-bold mb-6">{t('billing_overview')}</h1>

      {/* Analytics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-[#1f2937] p-4 rounded-lg shadow">
          <p className="text-sm text-gray-400">{t('total_revenue')}</p>
          <p className="text-xl font-bold text-green-400">${totalRevenue.toFixed(2)}</p>
        </div>
        <div className="bg-[#1f2937] p-4 rounded-lg shadow">
          <p className="text-sm text-gray-400">{t('total_unpaid')}</p>
          <p className="text-xl font-bold text-yellow-400">${Math.abs(totalUnpaid).toFixed(2)}</p>
        </div>
        <div className="bg-[#1f2937] p-4 rounded-lg shadow">
          <p className="text-sm text-gray-400">{t('overdue_amount')}</p>
          <p className="text-xl font-bold text-red-400">${Math.abs(totalOverdue).toFixed(2)}</p>
        </div>
      </div>

      {/* Create Button Dropdown */}
      <div className="relative mb-6">
        <button
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-4 py-2 rounded inline-flex items-center"
        >
          {t('create')} ▼
        </button>

        {dropdownOpen && (
          <div className="absolute mt-2 bg-[#1f2937] border border-gray-700 rounded shadow-lg z-10 w-44">
            <button onClick={() => openForm('Bill')} className="w-full text-left px-4 py-2 hover:bg-yellow-600 text-white">
              + {t('add_bill')}
            </button>
            <button onClick={() => openForm('Quote')} className="w-full text-left px-4 py-2 hover:bg-yellow-600 text-white">
              + {t('add_quote')}
            </button>
          </div>
        )}
      </div>

      {/* Billing Form */}
      {showForm && (
        <form onSubmit={handleAddEntry} className="bg-[#1f2937] p-6 rounded-lg mb-8 space-y-4">
          <h2 className="text-xl font-semibold mb-4">Create {formType}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input type="text" placeholder="Client ID" className="px-4 py-2 bg-[#111827] border border-gray-700 rounded" value={newEntry.id} onChange={(e) => setNewEntry({ ...newEntry, id: e.target.value })} />
            <input type="text" placeholder="Full Name" className="px-4 py-2 bg-[#111827] border border-gray-700 rounded" value={newEntry.name} onChange={(e) => setNewEntry({ ...newEntry, name: e.target.value })} />
            <input type="text" placeholder="Installation Type" className="px-4 py-2 bg-[#111827] border border-gray-700 rounded" value={newEntry.type} onChange={(e) => setNewEntry({ ...newEntry, type: e.target.value })} />
            <input type="date" className="px-4 py-2 bg-[#111827] border border-gray-700 rounded" value={newEntry.date} onChange={(e) => setNewEntry({ ...newEntry, date: e.target.value })} />
            <input type="number" placeholder="Amount" className="px-4 py-2 bg-[#111827] border border-gray-700 rounded" value={newEntry.amount} onChange={(e) => setNewEntry({ ...newEntry, amount: e.target.value })} />
            <select className="px-4 py-2 bg-[#111827] border border-gray-700 rounded" value={newEntry.status} onChange={(e) => setNewEntry({ ...newEntry, status: e.target.value })}>
              <option value="Paid">Paid</option>
              <option value="Unpaid">Unpaid</option>
              <option value="Overdue">Overdue</option>
            </select>
          </div>
          <button type="submit" className="mt-4 bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded">
            Save {formType}
          </button>
        </form>
      )}

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="px-4 py-2 bg-[#1f2937] text-white border border-gray-700 rounded focus:outline-none focus:ring focus:ring-yellow-500"
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-2 bg-[#1f2937] text-white border border-gray-700 rounded"
        >
          <option value="All">All</option>
          <option value="Paid">Paid</option>
          <option value="Unpaid">Unpaid</option>
          <option value="Overdue">Overdue</option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-[#1f2937] shadow rounded-lg">
        <table className="min-w-full text-sm text-left text-gray-300">
          <thead className="bg-[#111827] text-gray-400 border-b border-gray-700">
            <tr>
              <th className="p-4">{t('client_id')}</th>
              <th className="p-4">{t('full_name')}</th>
              <th className="p-4">{t('installation_type')}</th>
              <th className="p-4">{t('date')}</th>
              <th className="p-4">{t('amount')}</th>
              <th className="p-4">{t('status')}</th>
              <th className="p-4 text-right">{t('actions')}</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length === 0 ? (
              <tr>
                <td colSpan="7" className="p-6 text-center text-gray-500">No matching results.</td>
              </tr>
            ) : (
              filteredData.map((client, index) => (
                <tr key={client.id} className="border-b border-gray-700 hover:bg-[#2a2f3b]">
                  <td className="p-4 font-medium text-white">{client.id}</td>
                  <td className="p-4">{client.name}</td>
                  <td className="p-4">{client.type}</td>
                  <td className="p-4">{client.date}</td>
                  <td className="p-4">
                    <span className={client.amount >= 0 ? 'text-green-400' : 'text-red-400'}>
                      {client.amount >= 0 ? '+' : '-'}${Math.abs(client.amount).toFixed(2)}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      client.status === 'Paid'
                        ? 'bg-green-700 text-green-100'
                        : client.status === 'Unpaid'
                        ? 'bg-yellow-700 text-yellow-100'
                        : 'bg-red-700 text-red-100'
                    }`}>
                      {client.status}
                    </span>
                  </td>
                  <td className="p-4 text-right space-x-2">
                    <select
                      value={client.status}
                      onChange={(e) => handleStatusChange(index, e.target.value)}
                      className="bg-[#1f2937] border border-gray-600 text-white rounded px-2 py-1 text-xs focus:outline-none"
                    >
                      <option>Paid</option>
                      <option>Unpaid</option>
                      <option>Overdue</option>
                    </select>
                    <button
                      onClick={() => handleDownload(client)}
                      className="text-yellow-400 text-xs hover:underline"
                    >
                      Download
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
