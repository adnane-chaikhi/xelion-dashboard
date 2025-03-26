import React, { useState, useEffect } from 'react';

const UserForm = ({ user, onSave }) => {
  // State for the form fields
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'User',
  });

  // If a user is passed (for editing), populate the form fields
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name,
        email: user.email,
        role: user.role,
      });
    }
  }, [user]);

  // Handle form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    onSave(formData); // Pass form data to parent component (Users.js) for saving
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-semibold">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border border-blue-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-semibold">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border border-blue-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label htmlFor="role" className="block text-sm font-semibold">Role</label>
        <select
          id="role"
          name="role"
          value={formData.role}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border border-blue-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="User">User</option>
          <option value="Admin">Admin</option>
        </select>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {user ? 'Update User' : 'Add User'}
        </button>
      </div>
    </form>
  );
};

export default UserForm;
