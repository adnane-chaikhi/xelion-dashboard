import React, { useState, useEffect } from 'react';
import { Pencil, Trash } from 'lucide-react';
import useApi from './useApi';

const apiUrl = 'http://localhost/solar%20energy/backend/controllers/users.php';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [isEditing, setIsediting] = useState(false);
  const { sendRequest } = useApi();
  const [showForm, setShowForm] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterRole, setFilterRole] = useState('All');
  const [formData, setFormData] = useState({ name: '', email: '', role_name: '', city: '', installation_type: '', status: '' , description : '' });

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
      setFormData({ name: '', email: '', role_name: '', city: '', installation_type: '', status: '' });
      setEditingUser(null);
      setIsediting(false);
    }
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingUser(null);
    setIsediting(false);
    setFormData({ name: '', email: '', role_name: '', city: '', installation_type: '', status: '' });
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleRoleFilterChange = (event) => {
    setFilterRole(event.target.value);
  };

  const filteredUsers = users?.filter((user) => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = filterRole === 'All' || user.role === filterRole;
    return matchesSearch && matchesRole;
  });

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log(isEditing ? 'Updating user' : 'Adding user', formData);
    // Use sendRequest here to POST or PUT depending on isEditing
    handleCloseForm();
  };

  return (
    <div className="flex-1 py-10 px-4 bg-[#172137] min-h-screen text-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search by name..."
              className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
            />
            <select
              value={filterRole}
              onChange={handleRoleFilterChange}
              className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none"
            >
              <option value="All">All Roles</option>
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
            + Add User
          </button>
        </div>

        {showForm && (
  <div className="bg-[#1f2937] text-white shadow-md rounded-lg p-6 mb-8">
    <h2 className="text-xl font-bold mb-4">{isEditing ? 'Edit User' : 'Add New User'}</h2>
    <form onSubmit={handleFormSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
      
      {/* Full Name */}
      <div>
        <label className="block text-sm font-medium mb-1">Full Name</label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full px-3 py-2 rounded bg-[#172137] text-white border border-gray-700 focus:outline-none"
          required
        />
      </div>

      {/* Email */}
      <div>
        <label className="block text-sm font-medium mb-1">Email</label>
        <input
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="w-full px-3 py-2 rounded bg-[#172137] text-white border border-gray-700 focus:outline-none"
          required
        />
      </div>

      {/* Role */}
      <div>
        <label className="block text-sm font-medium mb-1">Role</label>
        <select
          value={formData.role}
          onChange={(e) => setFormData({ ...formData, role: e.target.value })}
          className="w-full px-3 py-2 rounded bg-[#172137] text-white border border-gray-700"
        >
          <option value="User">User</option>
          <option value="Admin">Admin</option>
          <option value="Technician">Technician</option>
          <option value="Support">Support</option>
        </select>
      </div>

      {/* Installation Type */}
      <div>
        <label className="block text-sm font-medium mb-1">Installation Type</label>
        <select
          value={formData.installationType}
          onChange={(e) => setFormData({ ...formData, installationType: e.target.value })}
          className="w-full px-3 py-2 rounded bg-[#172137] text-white border border-gray-700"
        >
          <option value="">Select type</option>
          <option value="Residential">Residential</option>
          <option value="Commercial">Commercial</option>
          <option value="Industrial">Industrial</option>
        </select>
      </div>

      {/* Status */}
      <div>
        <label className="block text-sm font-medium mb-1">Status</label>
        <select
          value={formData.status}
          onChange={(e) => setFormData({ ...formData, status: e.target.value })}
          className="w-full px-3 py-2 rounded bg-[#172137] text-white border border-gray-700"
        >
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
          <option value="Suspended">Suspended</option>
        </select>
      </div>

      {/* Notes */}
      <div className="md:col-span-2">
        <label className="block text-sm font-medium mb-1">Notes / Description</label>
        <textarea
          rows="4"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className="w-full px-3 py-2 rounded bg-[#172137] text-white border border-gray-700"
          placeholder="Write any internal notes about the user..."
        />
      </div>

      {/* Submit */}
      <div className="md:col-span-2 text-right mt-4">
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded transition"
        >
          {isEditing ? 'Update User' : 'Create User'}
        </button>
      </div>
    </form>
  </div>
)}



        <div className="overflow-x-auto bg-[#1f2937] rounded-xl shadow-lg">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-[#273549] text-gray-300 uppercase tracking-wide">
              <tr>
                <th className="px-6 py-4">User ID</th>
                <th className="px-6 py-4">Name</th>
                <th className="px-6 py-4">Email</th>
                <th className="px-6 py-4">Role</th>
                <th className="px-6 py-4">Location</th>
                <th className="px-6 py-4">Type</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-[#2d3748] transition">
                  <td className="px-6 py-4 text-gray-200">{user.id}</td>
                  <td className="px-6 py-4 font-medium text-white">{user.name}</td>
                  <td className="px-6 py-4 text-gray-300">{user.email}</td>
                  <td className="px-6 py-4 text-gray-300">{user.role_name}</td>
                  <td className="px-6 py-4 text-gray-300">{user.city}</td>
                  <td className="px-6 py-4 text-gray-300">{user.installation_type}</td>
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