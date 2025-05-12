import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/img/logo.png';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData); // Later: Send to backend
  };

  return (
    <div className="min-h-screen bg-[#111827] flex items-center justify-center px-4 relative overflow-hidden">
      
      {/* 🌞 Solar Background Animation */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-[-100px] left-[-100px] w-[300px] h-[300px] rounded-full bg-yellow-400 opacity-30 animate-ping" />
        <div className="absolute bottom-[20%] right-[10%] w-[120px] h-[120px] border-2 border-yellow-500 rounded-full animate-spin-slow opacity-40" />
      </div>

      {/* 💬 Registration Form */}
      <div className="relative z-10 w-full max-w-md bg-[#1f2937] text-white rounded-2xl shadow-xl p-8">
        <div className="flex justify-center mb-6">
          <img src={logo} alt="Xelion" className="w-16 h-16" />
        </div>

        <h2 className="text-2xl text-center font-bold mb-6">CREATE ACCOUNT</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-4 py-2 bg-[#111827] text-white border border-gray-600 rounded-md"
            required
          />

          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full px-4 py-2 bg-[#111827] text-white border border-gray-600 rounded-md"
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            className="w-full px-4 py-2 bg-[#111827] text-white border border-gray-600 rounded-md"
            required
          />

          <input
            type="password"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
            className="w-full px-4 py-2 bg-[#111827] text-white border border-gray-600 rounded-md"
            required
          />

          <button
            type="submit"
            className="w-full py-2 mt-2 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold rounded-md transition"
          >
            Sign Up
          </button>
        </form>

        <p className="text-sm text-gray-400 text-center mt-6">
          Already have an account?{' '}
          <Link to="/login" className="text-yellow-400 hover:underline">Log In</Link>
        </p>
      </div>

      {/* 🔧 CSS for animations */}
      <style>
        {`
          @keyframes spin-slow {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          .animate-spin-slow {
            animation: spin-slow 18s linear infinite;
          }
        `}
      </style>
    </div>
  );
};

export default Register;
