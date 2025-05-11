import React, { useState, useEffect } from 'react';
import { Pencil, Trash } from 'lucide-react';
import useApi from './useApi';
import Modal from './Modal';
import UserForm from './UserForm';

const apiUrl = 'http://localhost/solar%20energy/backend/controllers/users.php';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [isEditing, setIsediting] = useState(false);
  const { sendRequest } = useApi();
  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterRole, setFilterRole] = useState('All');

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

  const handleOpenModal = (user = null) => {
    if (user) {
      setEditingUser(user);
      setIsediting(true);
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingUser(null);
    setIsediting(false);
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

  return (
    <div className="flex-1 py-10 px-4 min-h-screen text-white">
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
            onClick={() => handleOpenModal()}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2 rounded-md shadow-lg"
          >
            + Add User
          </button>
        </div>

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
                <th className="px-6 py-4">Last Login</th>
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
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      user.role_name === 'Admin'
                        ? 'bg-blue-500/20 text-blue-300'
                        : user.role_name === 'Technician'
                        ? 'bg-yellow-500/20 text-yellow-300'
                        : user.role_name === 'Support'
                        ? 'bg-purple-500/20 text-purple-300'
                        : 'bg-green-500/20 text-green-300'
                    }`}>
                      {user.role_name}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-300">{user.city}</td>
                  <td className="px-6 py-4 text-gray-300">{user.installation_type}</td>
                  <td className="px-6 py-4 text-gray-400">{user.last_login}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      user.status === 'Active'
                        ? 'bg-green-400/20 text-green-300'
                        : user.status === 'Suspended'
                        ? 'bg-red-400/20 text-red-300'
                        : 'bg-gray-400/20 text-gray-300'
                    }`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right space-x-2">
                    <button onClick={() => handleOpenModal(user)} className="text-blue-400 hover:text-blue-200">
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

        {showModal && (
          <Modal onClose={handleCloseModal} title={isEditing ? 'Edit User' : 'Add User'}>
            <UserForm isEditing={isEditing} user={editingUser} />
          </Modal>
        )}
      </div>
    </div>
  );
};

export default Users;
