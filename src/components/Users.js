import React, { useState, useEffect } from 'react';
import { Pencil , Trash } from 'lucide-react';
import  useApi  from './useApi'; // Assuming useApi is a custom hook for fetching data
import Modal from './Modal'; // Modal component
import UserForm from './UserForm'; // Form for creating/editing users
const apiUrl =  'http://localhost/solar%20energy/backend/controllers/users.php';

const Users = () => {
  const [users,setUsers] = useState([]); // Fetch users data from API
  const [isEditing , setIsediting] =  useState(false);
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

        
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, [sendRequest]);
  /***************************************************** */
  const handleOpenModal = (user = null) => {
    
        if(user) {
          setEditingUser(user);
          setIsediting(true);
          console.log(editingUser);
        }
        setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingUser(null);
    setIsediting(false);
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
      <div className="flex-1 py-6 bg-gray-100">
        <div className="max-w-[90%] mx-auto">
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
                        className="px-2 items-center gap-2 text-sm text-blue-600 hover:text-blue-800"
                      >
                        <Pencil className="w-5 h-5 text-blue-500" />

                      </button>
                      <button
                        // onClick={() => handleDeleteUser(user.id)} // Implement delete function
                        className=" items-center gap-2 text-sm text-red-600 hover:text-red-800"
                      >
                       <Trash/>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Modal for Add/Edit User */}
          {showModal && (
            <Modal onClose={handleCloseModal} title={isEditing ? 'Edit User' : 'Add User'}>
              <UserForm  isEditing={isEditing} user={editingUser} />
            </Modal>
          )}
        </div>
      </div>
    </div>
  );
};

export default Users;
