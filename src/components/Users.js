import React, { useState, useEffect } from 'react';
import { Pencil, Trash } from 'lucide-react';
import useApi from './useApi';
import { useTranslation } from 'react-i18next';

const apiUrl = 'http://localhost/solar%20energy/backend/controllers/users.php';

const Users = () => {
  const { t } = useTranslation();
  const [users, setUsers] = useState([]);
  const [isEditing, setIsediting] = useState(false);
  const { sendRequest } = useApi();
  const [showForm, setShowForm] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterRole, setFilterRole] = useState('All');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role_name: '',
    city: '',
    installation_type: '',
    status: '',
    description: ''
  });

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await sendRequest(apiUrl, 'GET');
        setUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    fetchUsers();
  }, [sendRequest]);

  const handleOpenForm = (user = null) => {
    if (user) {
      setFormData(user);
      setEditingUser(user);
      setIsediting(true);
    } else {
      setFormData({
        name: '',
        email: '',
        role_name: '',
        city: '',
        installation_type: '',
        status: '',
        description: ''
      });
      setEditingUser(null);
      setIsediting(false);
    }
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingUser(null);
    setIsediting(false);
    setFormData({
      name: '',
      email: '',
      role_name: '',
      city: '',
      installation_type: '',
      status: '',
      description: ''
    });
  };

  const handleSearchChange = (event) => setSearchQuery(event.target.value);
  const handleRoleFilterChange = (event) => setFilterRole(event.target.value);

  const filteredUsers = users?.filter((user) => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = filterRole === 'All' || user.role_name === filterRole;
    return matchesSearch && matchesRole;
  });

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log(isEditing ? 'Updating user' : 'Adding user', formData);
    handleCloseForm();
  };

  return (
    <div className="flex-1 py-10 px-4 bg-[#172137] min-h-screen text-white">
      <div className="max-w-7xl mx-auto">
        {/* Top controls */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder={t('search_by_name')}
              className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
            />
            <select
              value={filterRole}
              onChange={handleRoleFilterChange}
              className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none"
            >
              <option value="All">{t('all')}</option>
              <option value="Admin">Admin</option>
              <option value="Technician">Technician</option>
              <option value="Support">Support</option>
              <option value="Client">Client</option>
            </select>
          </div>
          <button
            onClick={() => handleOpenForm()}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2 rounded-md shadow-lg"
          >
            + {t('create')}
          </button>
        </div>

        {/* Form */}
        {showForm && (
          <div className="bg-[#1f2937] text-white shadow-md rounded-lg p-6 mb-8">
            <h2 className="text-xl font-bold mb-4">
              {isEditing ? t('edit') + ' ' + t('users') : t('create') + ' ' + t('users')}
            </h2>
            <form onSubmit={handleFormSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm mb-1">{t('name')}</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 rounded bg-[#172137] border border-gray-700"
                  required
                />
              </div>
              <div>
                <label className="block text-sm mb-1">{t('email')}</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3 py-2 rounded bg-[#172137] border border-gray-700"
                  required
                />
              </div>
              <div>
                <label className="block text-sm mb-1">{t('role')}</label>
                <select
                  value={formData.role_name}
                  onChange={(e) => setFormData({ ...formData, role_name: e.target.value })}
                  className="w-full px-3 py-2 rounded bg-[#172137] border border-gray-700"
                >
                  <option value="">Select</option>
                  <option value="Admin">Admin</option>
                  <option value="Technician">Technician</option>
                  <option value="Support">Support</option>
                </select>
              </div>
              <div>
                <label className="block text-sm mb-1">{t('installation_type')}</label>
                <select
                  value={formData.installation_type}
                  onChange={(e) => setFormData({ ...formData, installation_type: e.target.value })}
                  className="w-full px-3 py-2 rounded bg-[#172137] border border-gray-700"
                >
                  <option value="">Select</option>
                  <option value="Residential">Residential</option>
                  <option value="Commercial">Commercial</option>
                  <option value="Industrial">Industrial</option>
                </select>
              </div>
              <div>
                <label className="block text-sm mb-1">{t('status')}</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="w-full px-3 py-2 rounded bg-[#172137] border border-gray-700"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                  <option value="Suspended">Suspended</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm mb-1">Notes / Description</label>
                <textarea
                  rows="3"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3 py-2 rounded bg-[#172137] border border-gray-700"
                />
              </div>
              <div className="md:col-span-2 text-right">
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded transition"
                >
                  {isEditing ? t('edit') : t('create')}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Table */}
        <div className="overflow-x-auto bg-[#1f2937] rounded-xl shadow-lg">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-[#273549] text-gray-300 uppercase tracking-wide">
              <tr>
                <th className="px-6 py-4">{t('user_id')}</th>
                <th className="px-6 py-4">{t('name')}</th>
                <th className="px-6 py-4">{t('email')}</th>
                <th className="px-6 py-4">{t('role')}</th>
                <th className="px-6 py-4">{t('location')}</th>
                <th className="px-6 py-4">{t('installation_type')}</th>
                <th className="px-6 py-4">{t('status')}</th>
                <th className="px-6 py-4 text-right">{t('actions')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-[#2d3748]">
                  <td className="px-6 py-4">{user.id}</td>
                  <td className="px-6 py-4">{user.name}</td>
                  <td className="px-6 py-4">{user.email}</td>
                  <td className="px-6 py-4">{user.role_name}</td>
                  <td className="px-6 py-4">{user.city}</td>
                  <td className="px-6 py-4">{user.installation_type}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      user.status === 'Active'
                        ? 'bg-green-400/20 text-green-300'
                        : 'bg-red-400/20 text-red-300'
                    }`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right space-x-2">
                    <button onClick={() => handleOpenForm(user)} className="text-blue-400 hover:text-blue-200">
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button className="text-red-400 hover:text-red-200">
                      <Trash className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Users;
