import React, { useState, useEffect } from 'react';
import  useApi  from './useApi'; // Assuming useApi is a custom hook for fetching data
import Modal from './Modal'; // Modal component
import UserForm from './UserForm'; // Form for creating/editing users
const apiUrl =  'http://localhost/solar%20energy/backend/controllers/users.php';

const Users = () => {
  const [users,setUsers] = useState([]); // Fetch users data from API
  const { sendRequest } = useApi(); // Destructure the sendRequest method from your hook
  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterRole, setFilterRole] = useState('All');
/******************************FETCH USERS ************************************ */
  // Fetch users on component mount
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await sendRequest(apiUrl, 'GET');
        setUsers(data); // Set the response data to state
        console.log(users);
        
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, [sendRequest]);
  /***************************************************** */
  const handleOpenModal = (user = null) => {
    setEditingUser(user);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingUser(null);
  };

  // Search handler
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Filter by role handler
  const handleRoleFilterChange = (event) => {
    setFilterRole(event.target.value);
  };

  // Filter users based on search query and role
  const filteredUsers = users?.filter((user) => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = filterRole === 'All' || user.role === filterRole;
    return matchesSearch && matchesRole;
  });


  return (
    <div>
   
      {/* Main Content Area */}
      <div className="flex-1 p-6 bg-gray-100">
        <div className="max-w-screen-lg mx-auto">
          <div className="flex items-center justify-between mb-6">
            {/* Search & Filter Section */}
            <div className="flex space-x-6 items-center">
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Search by name..."
                className="px-4 py-2 border border-blue-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <select
                value={filterRole}
                onChange={handleRoleFilterChange}
                className="px-4 py-2 border border-blue-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="All">All Roles</option>
                <option value="Admin">Admin</option>
                <option value="User">User</option>
              </select>
            </div>

            <button
              onClick={() => handleOpenModal()}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Add User
            </button>
          </div>

          {/* Table for displaying users */}
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-300 shadow-md rounded-lg">
              <thead className="bg-[#111827] text-white">
                <tr>
                  <th className="py-3 px-4 text-left text-sm font-semibold">Name</th>
                  <th className="py-3 px-4 text-left text-sm font-semibold">Email</th>
                  <th className="py-3 px-4 text-left text-sm font-semibold">Role</th>
                  <th className="py-3 px-4 text-left text-sm font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers?.map((user) => (
                  <tr key={user.id} className="hover:bg-blue-50">
                    <td className="py-3 px-4 text-sm border-b border-gray-300">{user.name}</td>
                    <td className="py-3 px-4 text-sm border-b border-gray-300">{user.email}</td>
                    <td className="py-3 px-4 text-sm border-b border-gray-300">{user.role_name}</td>
                    <td className="py-3 px-4 text-sm border-b border-gray-300">
                      <button
                        onClick={() => handleOpenModal(user)}
                        className="text-blue-500 hover:text-blue-700 focus:outline-none mr-2 py-2 px-4 border border-blue-500 rounded-md"
                      >
                        Edit
                      </button>
                      <button
                        // onClick={() => handleDeleteUser(user.id)} // Implement delete function
                        className="text-red-500 hover:text-red-700 focus:outline-none py-2 px-4 border border-red-500 rounded-md"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Modal for Add/Edit User */}
          {showModal && (
            <Modal onClose={handleCloseModal} title={editingUser ? 'Edit User' : 'Add User'}>
              <UserForm/>
            </Modal>
          )}
        </div>
      </div>
    </div>
  );
};

export default Users;
